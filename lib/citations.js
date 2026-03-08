/**
 * Citation formatters — generates citations in common academic styles
 * Mirrors Primo's citation export functionality
 */

export function formatAPA(record) {
  const d = record.pnx.display;
  const authors = d.creator || [];
  const year = d.date || "n.d.";
  const title = d.title;

  let authorStr;
  if (authors.length === 1) {
    const parts = authors[0].split(" ");
    const last = parts.pop();
    authorStr = `${last}, ${parts.map((p) => p[0] + ".").join(" ")}`;
  } else if (authors.length === 2) {
    authorStr = authors
      .map((a) => {
        const parts = a.split(" ");
        const last = parts.pop();
        return `${last}, ${parts.map((p) => p[0] + ".").join(" ")}`;
      })
      .join(", & ");
  } else if (authors.length > 2) {
    const parts = authors[0].split(" ");
    const last = parts.pop();
    authorStr = `${last}, ${parts.map((p) => p[0] + ".").join(" ")}, et al.`;
  } else {
    authorStr = "Unknown Author";
  }

  if (d.format === "Book") {
    const edition = d.edition ? ` (${d.edition})` : "";
    return `${authorStr} (${year}). *${title}*${edition}. ${d.publisher}.`;
  } else {
    const source = d.source ? ` *${d.source}*,` : "";
    const pages = d.pages ? ` ${d.pages}.` : ".";
    const doi = d.identifier?.doi ? ` https://doi.org/${d.identifier.doi}` : "";
    return `${authorStr} (${year}). ${title}.${source}${pages}${doi}`;
  }
}

export function formatMLA(record) {
  const d = record.pnx.display;
  const authors = d.creator || [];
  const title = d.title;

  let authorStr;
  if (authors.length === 1) {
    const parts = authors[0].split(" ");
    const last = parts.pop();
    authorStr = `${last}, ${parts.join(" ")}`;
  } else if (authors.length === 2) {
    const parts1 = authors[0].split(" ");
    const last1 = parts1.pop();
    authorStr = `${last1}, ${parts1.join(" ")}, and ${authors[1]}`;
  } else if (authors.length > 2) {
    const parts = authors[0].split(" ");
    const last = parts.pop();
    authorStr = `${last}, ${parts.join(" ")}, et al.`;
  } else {
    authorStr = "Unknown Author";
  }

  if (d.format === "Book") {
    return `${authorStr}. *${title}*. ${d.publisher}, ${d.date}.`;
  } else {
    const source = d.source ? ` *${d.source}*,` : "";
    const pages = d.pages ? ` ${d.pages},` : ",";
    return `${authorStr}. "${title}."${source}${pages} ${d.date}.`;
  }
}

export function formatChicago(record) {
  const d = record.pnx.display;
  const authors = d.creator || [];
  const title = d.title;

  let authorStr;
  if (authors.length === 1) {
    const parts = authors[0].split(" ");
    const last = parts.pop();
    authorStr = `${last}, ${parts.join(" ")}`;
  } else if (authors.length <= 3) {
    authorStr = authors
      .map((a, i) => {
        const parts = a.split(" ");
        const last = parts.pop();
        return i === 0 ? `${last}, ${parts.join(" ")}` : `${parts.join(" ")} ${last}`;
      })
      .join(", ");
  } else {
    const parts = authors[0].split(" ");
    const last = parts.pop();
    authorStr = `${last}, ${parts.join(" ")}, et al.`;
  }

  if (d.format === "Book") {
    return `${authorStr}. *${title}*. ${d.publisher}, ${d.date}.`;
  } else {
    const source = d.source ? ` *${d.source}*` : "";
    const pages = d.pages ? ` (${d.date}): ${d.pages}` : ` (${d.date})`;
    return `${authorStr}. "${title}."${source}${pages}.`;
  }
}

export function formatBibTeX(record) {
  const d = record.pnx.display;
  const authors = d.creator || ["Unknown"];
  const key = (authors[0].split(" ").pop() || "unknown").toLowerCase() + (d.date || "");
  const type = d.format === "Book" ? "book" : "article";

  let bib = `@${type}{${key},\n`;
  bib += `  author = {${authors.join(" and ")}},\n`;
  bib += `  title = {${d.title}},\n`;
  bib += `  year = {${d.date || ""}},\n`;

  if (d.format === "Book") {
    bib += `  publisher = {${d.publisher || ""}},\n`;
    if (d.identifier?.isbn) bib += `  isbn = {${d.identifier.isbn}},\n`;
  } else {
    if (d.source) bib += `  journal = {${d.source}},\n`;
    if (d.pages) bib += `  pages = {${d.pages.replace("pp. ", "")}},\n`;
    if (d.identifier?.doi) bib += `  doi = {${d.identifier.doi}},\n`;
  }

  bib += `}`;
  return bib;
}

export const CITATION_STYLES = [
  { id: "apa", label: "APA 7th Edition", format: formatAPA },
  { id: "mla", label: "MLA 9th Edition", format: formatMLA },
  { id: "chicago", label: "Chicago 17th Edition", format: formatChicago },
  { id: "bibtex", label: "BibTeX", format: formatBibTeX },
];
