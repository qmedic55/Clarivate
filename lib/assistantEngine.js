/**
 * Research Assistant Engine
 * Simulated AI assistant that helps users find library resources.
 * Mirrors Primo's AI-powered research assistant functionality.
 */

import { search, getRecordById } from "./searchEngine";
import { parseNaturalLanguage } from "./nlpSearch";

const GREETINGS = [
  "Hello! I'm your research assistant at Ira's Library. How can I help you find resources today?",
  "Hi there! I can help you search our catalog, find articles, suggest resources, or answer questions about using the library. What are you looking for?",
  "Welcome to Ira's Library! I'm here to help with your research. You can ask me to find books, articles, or anything in our collection.",
];

const HELP_RESPONSES = [
  "Here's what I can help with:\n\n- **Find resources**: \"Find me books about machine learning\"\n- **Search by author**: \"Show me articles by Stephen Hawking\"\n- **Filter by date**: \"Recent papers on climate change\"\n- **Specific formats**: \"Find journal articles about genetics\"\n- **Subject browsing**: \"What do you have on computer science?\"\n- **Citation help**: Click \"Cite\" on any record to generate citations\n\nJust type your question naturally — I'll figure out what you need!",
];

function findBestRecords(query, limit = 3) {
  const results = search({ query, scope: "everything", pageSize: limit });
  return results.records;
}

function formatRecordSuggestion(record) {
  const d = record.pnx.display;
  const authors = d.creator?.join(", ") || "Unknown";
  return `**${d.title}** by ${authors} (${d.date}) — ${d.format}`;
}

function generateResponse(userMessage, conversationHistory) {
  const msg = userMessage.trim().toLowerCase();

  // Greeting detection
  if (msg.match(/^(hi|hello|hey|good morning|good afternoon|howdy|what's up|sup)/)) {
    return {
      text: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
      records: [],
      action: null,
    };
  }

  // Help request
  if (msg.match(/^(help|what can you do|how do|commands|options|menu)/)) {
    return {
      text: HELP_RESPONSES[0],
      records: [],
      action: null,
    };
  }

  // Thank you
  if (msg.match(/^(thanks|thank you|thx|ty|cheers)/)) {
    return {
      text: "You're welcome! Let me know if you need anything else. Happy researching!",
      records: [],
      action: null,
    };
  }

  // Citation help
  if (msg.match(/cit(e|ation|ing)/)) {
    return {
      text: "To cite a resource:\n\n1. Search for the item you need\n2. Click **\"Cite\"** on any search result or record page\n3. Choose your citation style (APA, MLA, Chicago, or BibTeX)\n4. Copy to clipboard!\n\nOur citation tool supports APA 7th, MLA 9th, Chicago 17th, and BibTeX formats.",
      records: [],
      action: null,
    };
  }

  // Hours/location
  if (msg.match(/hour|open|close|location|where|when.*open/)) {
    return {
      text: "Great question! You can find our hours and locations on the [Hours & Locations](/hours) page. Spoiler: we're open whenever Ira feels like it.\n\nFor the most reliable access, try our **Online Resources** — those are available 24/7!",
      records: [],
      action: { type: "link", href: "/hours", label: "View Hours" },
    };
  }

  // Database / resource type questions
  if (msg.match(/database|what.*have|how many|collection size/)) {
    return {
      text: "Ira's Library has:\n\n- **25 curated local records** spanning books, articles, conference papers, and government documents\n- **Millions of books** searchable via our Open Library integration\n- Resources in **English, Spanish, French, German, and Chinese**\n- Coverage from **ancient texts to 2025 publications**\n\nTry searching for any topic — we cast a wide net!",
      records: [],
      action: null,
    };
  }

  // Interlibrary loan
  if (msg.match(/interlibrary|ill|borrow|don't have|can't find/)) {
    return {
      text: "Can't find what you need? Our Interlibrary Loan service can help! Check out [our ILL page](/ill) for details on how to request items from other libraries.\n\n(Fair warning: turnaround time is somewhere between \"soon\" and \"heat death of the universe.\")",
      records: [],
      action: { type: "link", href: "/ill", label: "Interlibrary Loan" },
    };
  }

  // Advanced search help
  if (msg.match(/advanced|boolean|filter|narrow|specific/)) {
    return {
      text: "For more precise searching, try our **Advanced Search**:\n\n- Combine multiple fields (title, author, subject, ISBN)\n- Use **AND**, **OR**, **NOT** operators\n- Target specific fields for exact matches\n\nOr just describe what you need here — I can help translate your question into a search!",
      records: [],
      action: { type: "link", href: "/advanced-search", label: "Advanced Search" },
    };
  }

  // Actual search request — use NLP parser
  const parsed = parseNaturalLanguage(userMessage);

  if (parsed && parsed.searchTerms) {
    const records = findBestRecords(parsed.searchTerms);
    const hasResults = records.length > 0;

    let text;
    if (hasResults) {
      const recordList = records.map((r, i) => `${i + 1}. ${formatRecordSuggestion(r)}`).join("\n");
      text = `${parsed.explanation}\n\nHere are some results from our local collection:\n\n${recordList}\n\nClick **\"Search\"** below to see the full results including books from Open Library, or refine your query!`;
    } else {
      text = `${parsed.explanation}\n\nI didn't find exact matches in our local collection, but click **\"Search\"** below to search Open Library's database of millions of books!`;
    }

    return {
      text,
      records,
      action: {
        type: "search",
        href: `/search?q=${encodeURIComponent(parsed.searchTerms)}${parsed.scope !== "everything" ? `&scope=${parsed.scope}` : ""}`,
        label: "Search",
        query: parsed.searchTerms,
        scope: parsed.scope,
      },
    };
  }

  // Fallback
  return {
    text: "I'm not quite sure what you're looking for. Try asking me something like:\n\n- \"Find books about artificial intelligence\"\n- \"Show me recent articles on climate change\"\n- \"What do you have by Stephen Hawking?\"\n- \"Help me cite a source\"\n\nOr just type any search terms and I'll find matching resources!",
    records: [],
    action: null,
  };
}

export { generateResponse };
