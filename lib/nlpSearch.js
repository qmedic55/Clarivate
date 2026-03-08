/**
 * Natural Language Search Processor
 * Converts conversational queries into structured search parameters.
 * Simulates the NLP layer that Primo/Clarivate uses for query understanding.
 */

const DATE_PATTERNS = [
  { pattern: /(?:last|past)\s+(\d+)\s+years?/i, handler: (m) => ({ from: new Date().getFullYear() - parseInt(m[1]) }) },
  { pattern: /(?:since|after)\s+(\d{4})/i, handler: (m) => ({ from: parseInt(m[1]) }) },
  { pattern: /(?:before|prior to)\s+(\d{4})/i, handler: (m) => ({ to: parseInt(m[1]) }) },
  { pattern: /(?:between|from)\s+(\d{4})\s+(?:and|to|-)\s+(\d{4})/i, handler: (m) => ({ from: parseInt(m[1]), to: parseInt(m[2]) }) },
  { pattern: /(?:in|from)\s+(\d{4})/i, handler: (m) => ({ from: parseInt(m[1]), to: parseInt(m[1]) }) },
  { pattern: /(?:recent|latest|newest|new)/i, handler: () => ({ from: new Date().getFullYear() - 3 }) },
  { pattern: /(?:classic|old|historical|vintage)/i, handler: () => ({ to: 1990 }) },
];

const FORMAT_PATTERNS = [
  { pattern: /\b(?:article|paper|journal|peer[\s-]?review)/i, format: "articles" },
  { pattern: /\b(?:book|textbook|monograph|novel)/i, format: "books" },
  { pattern: /\b(?:online|digital|electronic|ebook|e-book)/i, format: "electronic" },
  { pattern: /\b(?:reserve|course|class|syllabus)/i, format: "course_reserves" },
];

const INTENT_PATTERNS = [
  { pattern: /(?:find|search|look for|get|show|give)\s+(?:me\s+)?/i, intent: "search" },
  { pattern: /(?:what|who|where|when|how|why|is|are|can|do|does)/i, intent: "question" },
  { pattern: /(?:recommend|suggest|best|top|popular|good)/i, intent: "recommend" },
  { pattern: /(?:compare|difference|versus|vs\.?)/i, intent: "compare" },
  { pattern: /(?:help|assist|guide)/i, intent: "help" },
];

const SUBJECT_KEYWORDS = {
  "machine learning": ["Machine Learning", "Artificial Intelligence", "Deep Learning"],
  "ai": ["Artificial Intelligence", "Machine Learning"],
  "artificial intelligence": ["Artificial Intelligence", "Machine Learning"],
  "computer science": ["Computer Science", "Programming", "Software Engineering"],
  "programming": ["Programming", "Computer Science", "Software Engineering"],
  "biology": ["Molecular Biology", "Genetics", "Biotechnology"],
  "genetics": ["Genetics", "Molecular Biology", "CRISPR"],
  "physics": ["Physics", "Quantum Computing", "Cosmology"],
  "history": ["World History", "History of Science"],
  "literature": ["Fiction", "World Literature"],
  "economics": ["Economics", "Microeconomics", "Macroeconomics"],
  "climate": ["Climate Change", "Environmental Science", "Sustainability"],
  "environment": ["Environmental Science", "Climate Change", "Sustainability"],
  "philosophy": ["Philosophy of Science", "Chinese Philosophy"],
  "chemistry": ["Organic Chemistry", "Chemistry"],
  "library": ["Library Science", "Academic Libraries", "Information Science"],
  "health": ["Healthcare", "Medical Informatics", "Digital Health"],
  "nlp": ["Natural Language Processing", "Deep Learning"],
  "data": ["Data Structures", "Database Systems", "Data Management"],
  "software": ["Software Engineering", "Programming", "Design Patterns"],
};

function extractAuthor(query) {
  const byMatch = query.match(/(?:by|author|written by)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  if (byMatch) return byMatch[1];
  return null;
}

function extractSubjects(query) {
  const lower = query.toLowerCase();
  const found = [];
  for (const [keyword, subjects] of Object.entries(SUBJECT_KEYWORDS)) {
    if (lower.includes(keyword)) {
      found.push(...subjects);
    }
  }
  return [...new Set(found)];
}

function cleanQuery(query) {
  // Remove NLP filler words to get the core search terms
  return query
    .replace(/(?:find|search|look for|get|show|give|me|some|a few|any|about|on|the|topic of|related to|regarding|concerning|books?|articles?|papers?|resources?|materials?|that are|which are|please|can you|could you|i need|i want|i'm looking for)/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parse a natural language query into structured search parameters
 */
export function parseNaturalLanguage(rawQuery) {
  const query = rawQuery.trim();
  if (!query) return null;

  const result = {
    originalQuery: query,
    searchTerms: "",
    scope: "everything",
    dateRange: null,
    author: null,
    subjects: [],
    intent: "search",
    explanation: "",
  };

  // Detect intent
  for (const { pattern, intent } of INTENT_PATTERNS) {
    if (pattern.test(query)) {
      result.intent = intent;
      break;
    }
  }

  // Extract date range
  for (const { pattern, handler } of DATE_PATTERNS) {
    const match = query.match(pattern);
    if (match) {
      result.dateRange = handler(match);
      break;
    }
  }

  // Extract format/scope
  for (const { pattern, format } of FORMAT_PATTERNS) {
    if (pattern.test(query)) {
      result.scope = format;
      break;
    }
  }

  // Extract author
  result.author = extractAuthor(query);

  // Extract subjects
  result.subjects = extractSubjects(query);

  // Clean query to get core search terms
  result.searchTerms = cleanQuery(query);

  // Build human-readable explanation
  const parts = [];
  parts.push(`Searching for "${result.searchTerms || query}"`);
  if (result.scope !== "everything") {
    const scopeLabels = { books: "books", articles: "articles & papers", electronic: "online resources", course_reserves: "course reserves" };
    parts.push(`in ${scopeLabels[result.scope] || result.scope}`);
  }
  if (result.author) parts.push(`by ${result.author}`);
  if (result.dateRange) {
    if (result.dateRange.from && result.dateRange.to && result.dateRange.from === result.dateRange.to) {
      parts.push(`from ${result.dateRange.from}`);
    } else if (result.dateRange.from && result.dateRange.to) {
      parts.push(`between ${result.dateRange.from}-${result.dateRange.to}`);
    } else if (result.dateRange.from) {
      parts.push(`from ${result.dateRange.from} onwards`);
    } else if (result.dateRange.to) {
      parts.push(`before ${result.dateRange.to}`);
    }
  }
  if (result.subjects.length > 0) {
    parts.push(`(topics: ${result.subjects.slice(0, 3).join(", ")})`);
  }
  result.explanation = parts.join(" ");

  return result;
}

/**
 * Apply NLP-parsed parameters as facet filters
 */
export function nlpToFacets(parsed) {
  const facets = {};

  if (parsed.dateRange) {
    const year = new Date().getFullYear();
    const buckets = [];
    const from = parsed.dateRange.from || -Infinity;
    const to = parsed.dateRange.to || Infinity;

    if (from >= 2020 || (to >= 2020 && from <= year)) buckets.push("2020-present");
    if ((from <= 2019 && to >= 2010) || (from >= 2010 && from < 2020)) buckets.push("2010-2019");
    if ((from <= 2009 && to >= 2000) || (from >= 2000 && from < 2010)) buckets.push("2000-2009");
    if ((from <= 1999 && to >= 1900) || (from >= 1900 && from < 2000)) buckets.push("1900-1999");
    if (from < 1900 || to < 1900) buckets.push("Before 1900");

    if (buckets.length > 0) facets.creationDate = buckets;
  }

  if (parsed.subjects.length > 0) {
    facets.topic = parsed.subjects.slice(0, 3);
  }

  return facets;
}
