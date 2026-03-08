import catalogRecords from "./mockData";

// Primo-style search scopes
export const SEARCH_SCOPES = [
  { id: "everything", label: "Everything" },
  { id: "books", label: "Books" },
  { id: "articles", label: "Articles & Papers" },
  { id: "electronic", label: "Online Resources" },
  { id: "course_reserves", label: "Course Reserves" },
];

// Facet definitions (mirrors Primo's facet categories)
export const FACET_DEFINITIONS = [
  { id: "resourceType", label: "Resource Type" },
  { id: "creationDate", label: "Date" },
  { id: "language", label: "Language" },
  { id: "topic", label: "Subject" },
  { id: "creator", label: "Author" },
  { id: "library", label: "Library" },
  { id: "availability", label: "Availability" },
];

// Sort options
export const SORT_OPTIONS = [
  { id: "relevance", label: "Relevance" },
  { id: "date_desc", label: "Date (Newest)" },
  { id: "date_asc", label: "Date (Oldest)" },
  { id: "title_asc", label: "Title (A-Z)" },
  { id: "title_desc", label: "Title (Z-A)" },
  { id: "author_asc", label: "Author (A-Z)" },
];

function normalizeText(text) {
  return (text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function tokenize(query) {
  // Handle quoted phrases
  const phrases = [];
  const remaining = query.replace(/"([^"]+)"/g, (_, phrase) => {
    phrases.push(normalizeText(phrase));
    return "";
  });
  const words = remaining.split(/\s+/).filter(Boolean).map(normalizeText);
  return { words, phrases };
}

function scoreRecord(record, query, scope) {
  const { words, phrases } = tokenize(query);
  const d = record.pnx.display;
  const f = record.pnx.facets;
  let score = 0;

  // Build searchable text fields with weights
  const fields = [
    { text: d.title, weight: 10 },
    { text: d.creator?.join(" "), weight: 6 },
    { text: d.subject?.join(" "), weight: 5 },
    { text: d.description, weight: 2 },
    { text: d.publisher, weight: 1 },
    { text: d.source || "", weight: 2 },
  ];

  // Score each word against each field
  for (const { text, weight } of fields) {
    const normalizedText = normalizeText(text);
    for (const word of words) {
      if (normalizedText.includes(word)) {
        score += weight;
        // Bonus for exact word boundary match
        if (new RegExp(`\\b${word}\\b`).test(normalizedText)) {
          score += weight * 0.5;
        }
      }
    }
    for (const phrase of phrases) {
      if (normalizedText.includes(phrase)) {
        score += weight * 2;
      }
    }
  }

  // Scope filtering — return -1 to exclude
  if (scope && scope !== "everything") {
    switch (scope) {
      case "books":
        if (f.resourceType !== "Book") return -1;
        break;
      case "articles":
        if (!["Article", "Conference Paper"].includes(f.resourceType)) return -1;
        break;
      case "electronic":
        if (!record.pnx.delivery.electronicLinks?.length) return -1;
        break;
      case "course_reserves": {
        const onReserve = record.pnx.delivery.holdings?.some(
          (h) => h.location?.includes("Reserve") || h.location?.includes("Course")
        );
        if (!onReserve) return -1;
        break;
      }
    }
  }

  return score;
}

function extractAvailability(record) {
  const holdings = record.pnx.delivery.holdings || [];
  const hasElectronic = (record.pnx.delivery.electronicLinks || []).length > 0;

  if (hasElectronic) return "Online";
  if (holdings.some((h) => h.available > 0 && h.status === "Available")) return "Available";
  if (holdings.some((h) => h.status === "In Library Use Only")) return "In Library Use Only";
  if (holdings.some((h) => h.status === "Checked Out")) return "Checked Out";
  return "Unknown";
}

function extractLibraries(record) {
  return (record.pnx.delivery.holdings || []).map((h) => h.library);
}

export function buildFacets(results) {
  const facets = {};

  for (const def of FACET_DEFINITIONS) {
    facets[def.id] = {};
  }

  for (const result of results) {
    const f = result.pnx.facets;

    // Resource Type
    const rt = f.resourceType;
    facets.resourceType[rt] = (facets.resourceType[rt] || 0) + 1;

    // Date — bucket into ranges
    const year = parseInt(f.creationDate);
    let dateBucket;
    if (year >= 2020) dateBucket = "2020-present";
    else if (year >= 2010) dateBucket = "2010-2019";
    else if (year >= 2000) dateBucket = "2000-2009";
    else if (year >= 1900) dateBucket = "1900-1999";
    else dateBucket = "Before 1900";
    facets.creationDate[dateBucket] = (facets.creationDate[dateBucket] || 0) + 1;

    // Language
    facets.language[f.language] = (facets.language[f.language] || 0) + 1;

    // Topics
    for (const topic of f.topic || []) {
      facets.topic[topic] = (facets.topic[topic] || 0) + 1;
    }

    // Creators
    for (const creator of f.creator || []) {
      facets.creator[creator] = (facets.creator[creator] || 0) + 1;
    }

    // Libraries
    for (const lib of extractLibraries(result)) {
      facets.library[lib] = (facets.library[lib] || 0) + 1;
    }

    // Availability
    const avail = extractAvailability(result);
    facets.availability[avail] = (facets.availability[avail] || 0) + 1;
  }

  // Sort each facet by count descending
  for (const key of Object.keys(facets)) {
    const sorted = Object.entries(facets[key])
      .sort((a, b) => b[1] - a[1]);
    facets[key] = sorted;
  }

  return facets;
}

function applyFacetFilters(results, activeFacets) {
  if (!activeFacets || Object.keys(activeFacets).length === 0) return results;

  return results.filter((record) => {
    for (const [facetId, selectedValues] of Object.entries(activeFacets)) {
      if (!selectedValues || selectedValues.length === 0) continue;

      switch (facetId) {
        case "resourceType":
          if (!selectedValues.includes(record.pnx.facets.resourceType)) return false;
          break;
        case "language":
          if (!selectedValues.includes(record.pnx.facets.language)) return false;
          break;
        case "topic":
          if (!record.pnx.facets.topic?.some((t) => selectedValues.includes(t))) return false;
          break;
        case "creator":
          if (!record.pnx.facets.creator?.some((c) => selectedValues.includes(c))) return false;
          break;
        case "library": {
          const libs = extractLibraries(record);
          if (!libs.some((l) => selectedValues.includes(l))) return false;
          break;
        }
        case "availability": {
          const avail = extractAvailability(record);
          if (!selectedValues.includes(avail)) return false;
          break;
        }
        case "creationDate": {
          const year = parseInt(record.pnx.facets.creationDate);
          const matches = selectedValues.some((bucket) => {
            if (bucket === "2020-present") return year >= 2020;
            if (bucket === "2010-2019") return year >= 2010 && year < 2020;
            if (bucket === "2000-2009") return year >= 2000 && year < 2010;
            if (bucket === "1900-1999") return year >= 1900 && year < 2000;
            if (bucket === "Before 1900") return year < 1900;
            return false;
          });
          if (!matches) return false;
          break;
        }
      }
    }
    return true;
  });
}

function sortResults(results, sortBy, scores) {
  const sorted = [...results];
  switch (sortBy) {
    case "date_desc":
      sorted.sort((a, b) => parseInt(b.pnx.facets.creationDate) - parseInt(a.pnx.facets.creationDate));
      break;
    case "date_asc":
      sorted.sort((a, b) => parseInt(a.pnx.facets.creationDate) - parseInt(b.pnx.facets.creationDate));
      break;
    case "title_asc":
      sorted.sort((a, b) => a.pnx.display.title.localeCompare(b.pnx.display.title));
      break;
    case "title_desc":
      sorted.sort((a, b) => b.pnx.display.title.localeCompare(a.pnx.display.title));
      break;
    case "author_asc":
      sorted.sort((a, b) =>
        (a.pnx.display.creator?.[0] || "").localeCompare(b.pnx.display.creator?.[0] || "")
      );
      break;
    default:
      // Relevance — sort by score
      sorted.sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0));
  }
  return sorted;
}

/**
 * Main search function — mirrors Primo's search API behavior
 */
export function search({
  query = "",
  scope = "everything",
  sort = "relevance",
  activeFacets = {},
  page = 1,
  pageSize = 10,
  advancedFields = null,
} = {}) {
  let results;
  const scores = new Map();

  if (advancedFields) {
    // Advanced search — match each field independently
    results = catalogRecords.filter((record) => {
      for (const field of advancedFields) {
        if (!field.value) continue;
        const val = normalizeText(field.value);
        const d = record.pnx.display;
        let matches = false;

        switch (field.field) {
          case "title":
            matches = normalizeText(d.title).includes(val);
            break;
          case "author":
            matches = d.creator?.some((c) => normalizeText(c).includes(val));
            break;
          case "subject":
            matches = d.subject?.some((s) => normalizeText(s).includes(val));
            break;
          case "isbn":
            matches = normalizeText(d.identifier?.isbn || "").includes(val);
            break;
          case "any":
          default: {
            const all = [d.title, d.creator?.join(" "), d.subject?.join(" "), d.description, d.publisher].join(" ");
            matches = normalizeText(all).includes(val);
          }
        }

        if (field.operator === "NOT") matches = !matches;
        if (!matches && field.operator !== "NOT") return false;
        if (matches && field.operator === "NOT") return false;
      }
      return true;
    });

    results.forEach((r) => scores.set(r.id, 1));
  } else if (!query.trim()) {
    // Empty query — return everything (like Primo's "browse all")
    results = [...catalogRecords];
    results.forEach((r) => scores.set(r.id, 1));
  } else {
    // Standard search with scoring
    results = [];
    for (const record of catalogRecords) {
      const score = scoreRecord(record, query, scope);
      if (score > 0) {
        results.push(record);
        scores.set(record.id, score);
      }
    }
  }

  // Apply scope filter for non-query searches
  if (scope !== "everything" && !query.trim() && !advancedFields) {
    results = results.filter((r) => {
      const f = r.pnx.facets;
      switch (scope) {
        case "books": return f.resourceType === "Book";
        case "articles": return ["Article", "Conference Paper"].includes(f.resourceType);
        case "electronic": return (r.pnx.delivery.electronicLinks || []).length > 0;
        case "course_reserves":
          return r.pnx.delivery.holdings?.some(
            (h) => h.location?.includes("Reserve") || h.location?.includes("Course")
          );
        default: return true;
      }
    });
  }

  // Build facets BEFORE filtering by them
  const allFacets = buildFacets(results);

  // Apply facet filters
  results = applyFacetFilters(results, activeFacets);

  // Sort
  results = sortResults(results, sort, scores);

  // Pagination
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = results.slice(startIndex, startIndex + pageSize);

  return {
    records: paginatedResults,
    totalResults,
    totalPages,
    currentPage: page,
    facets: allFacets,
    query,
    scope,
    sort,
    didYouMean: null,
  };
}

/**
 * Get a single record by ID
 */
export function getRecordById(id) {
  return catalogRecords.find((r) => r.id === id) || null;
}

/**
 * Get related records (by shared subjects)
 */
export function getRelatedRecords(id, limit = 5) {
  const record = getRecordById(id);
  if (!record) return [];

  const topics = new Set(record.pnx.facets.topic || []);
  const scored = catalogRecords
    .filter((r) => r.id !== id)
    .map((r) => {
      const overlap = (r.pnx.facets.topic || []).filter((t) => topics.has(t)).length;
      return { record: r, score: overlap };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.record);
}

/**
 * Browse by call number (virtual shelf browse)
 */
export function browseShelf(callNumber, limit = 5) {
  const allWithCallNumbers = catalogRecords
    .filter((r) => r.pnx.delivery.holdings?.some((h) => h.callNumber))
    .map((r) => ({
      record: r,
      callNumber: r.pnx.delivery.holdings[0].callNumber,
    }))
    .sort((a, b) => a.callNumber.localeCompare(b.callNumber));

  const idx = allWithCallNumbers.findIndex(
    (item) => item.callNumber === callNumber
  );

  if (idx === -1) return allWithCallNumbers.slice(0, limit).map((i) => i.record);

  const start = Math.max(0, idx - Math.floor(limit / 2));
  const end = Math.min(allWithCallNumbers.length, start + limit);

  return allWithCallNumbers.slice(start, end).map((i) => i.record);
}
