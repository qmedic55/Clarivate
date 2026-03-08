import { NextResponse } from "next/server";

/**
 * API route that searches Open Library and normalizes results
 * into our PNX-style record format.
 *
 * Open Library Search API: https://openlibrary.org/dev/docs/api/search
 */

function transformOpenLibraryResult(doc) {
  const authors = doc.author_name || ["Unknown Author"];
  const subjects = (doc.subject || []).slice(0, 8);
  const languages = doc.language || [];
  const primaryLanguage = languages.includes("eng") ? "English"
    : languages.includes("spa") ? "Spanish"
    : languages.includes("fre") ? "French"
    : languages.includes("ger") ? "German"
    : languages[0] || "English";

  const isbn = doc.isbn ? doc.isbn[0] : null;
  const hasEbook = doc.ebook_access === "public" || doc.ebook_access === "borrowable";
  const firstPublishYear = doc.first_publish_year || doc.publish_year?.[0] || "Unknown";
  const publisher = doc.publisher ? doc.publisher[0] : "Unknown Publisher";
  const pages = doc.number_of_pages_median ? `${doc.number_of_pages_median} pages` : null;

  // Determine format
  let format = "Book";
  if (doc.type === "work") format = "Book";

  // Build electronic links
  const electronicLinks = [];
  if (hasEbook) {
    electronicLinks.push({
      url: `https://openlibrary.org${doc.key}`,
      label: "Read on Open Library",
      coverage: doc.ebook_access === "public" ? "Full text - Open Access" : "Borrowable",
    });
  }

  // Build holdings (simulated for prototype)
  const holdings = [];
  if (!hasEbook || Math.random() > 0.3) {
    const callBase = doc.ddc?.[0] || doc.lcc?.[0] || "Z999";
    holdings.push({
      library: "Main Library",
      location: "General Collection",
      callNumber: callBase,
      status: Math.random() > 0.3 ? "Available" : "Checked Out",
      copies: Math.floor(Math.random() * 3) + 1,
      available: Math.random() > 0.3 ? Math.floor(Math.random() * 2) + 1 : 0,
    });
  }

  return {
    id: `ol_${doc.key?.replace("/works/", "") || doc.cover_edition_key || Math.random().toString(36).slice(2)}`,
    source: "openlibrary",
    pnx: {
      display: {
        title: doc.title || "Untitled",
        creator: authors,
        publisher: publisher,
        date: String(firstPublishYear),
        format: format,
        language: primaryLanguage,
        description: doc.first_sentence ? (Array.isArray(doc.first_sentence) ? doc.first_sentence[0] : doc.first_sentence) : `A work by ${authors.join(", ")}. Published by ${publisher} (${firstPublishYear}).`,
        subject: subjects,
        identifier: {
          isbn: isbn,
          oclc: doc.oclc?.[0] || null,
          olid: doc.key,
        },
        pages: pages,
        coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
      },
      facets: {
        resourceType: format,
        language: primaryLanguage,
        creationDate: String(firstPublishYear),
        topic: subjects.slice(0, 3),
        creator: authors.slice(0, 2).map((a) => {
          const parts = a.split(" ");
          const last = parts.pop();
          return `${last}, ${parts.join(" ")}`;
        }),
      },
      delivery: {
        holdings: holdings,
        electronicLinks: electronicLinks,
      },
    },
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query.trim()) {
    return NextResponse.json({ records: [], totalResults: 0 });
  }

  try {
    const olUrl = new URL("https://openlibrary.org/search.json");
    olUrl.searchParams.set("q", query);
    olUrl.searchParams.set("page", String(page));
    olUrl.searchParams.set("limit", String(limit));
    olUrl.searchParams.set("fields", [
      "key", "title", "author_name", "first_publish_year", "publish_year",
      "publisher", "subject", "language", "isbn", "oclc", "lcc", "ddc",
      "cover_i", "cover_edition_key", "number_of_pages_median",
      "ebook_access", "first_sentence", "type",
    ].join(","));

    const response = await fetch(olUrl.toString(), {
      headers: { "User-Agent": "IrasLibrary/1.0 (Primo Prototype)" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Open Library API returned ${response.status}`);
    }

    const data = await response.json();
    const records = (data.docs || []).map(transformOpenLibraryResult);

    return NextResponse.json({
      records,
      totalResults: data.numFound || 0,
      totalPages: Math.ceil((data.numFound || 0) / limit),
      currentPage: page,
      source: "openlibrary",
    });
  } catch (error) {
    console.error("Open Library search failed:", error);
    return NextResponse.json(
      { records: [], totalResults: 0, error: error.message },
      { status: 500 }
    );
  }
}
