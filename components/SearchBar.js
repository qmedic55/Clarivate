"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_SCOPES } from "@/lib/searchEngine";
import { parseNaturalLanguage } from "@/lib/nlpSearch";

export default function SearchBar({ initialQuery = "", initialScope = "everything", inline = false }) {
  const [query, setQuery] = useState(initialQuery);
  const [scope, setScope] = useState(initialScope);
  const [nlpHint, setNlpHint] = useState(null);
  const [isNlpMode, setIsNlpMode] = useState(false);
  const router = useRouter();

  function handleQueryChange(e) {
    const val = e.target.value;
    setQuery(val);

    // Show NLP interpretation hint as user types
    if (isNlpMode && val.trim().length > 10) {
      const parsed = parseNaturalLanguage(val);
      if (parsed) {
        setNlpHint(parsed.explanation);
      }
    } else {
      setNlpHint(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
      router.push("/search");
      return;
    }

    if (isNlpMode) {
      const parsed = parseNaturalLanguage(query);
      if (parsed) {
        const params = new URLSearchParams();
        params.set("q", parsed.searchTerms || query);
        if (parsed.scope !== "everything") params.set("scope", parsed.scope);
        router.push(`/search?${params.toString()}`);
        return;
      }
    }

    const params = new URLSearchParams();
    params.set("q", query);
    if (scope !== "everything") params.set("scope", scope);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className={inline ? "search-bar-inline" : ""}>
      <div className="search-container">
        {/* Search mode toggle */}
        <div className="search-mode-toggle">
          <button
            type="button"
            className={`search-mode-btn ${!isNlpMode ? "active" : ""}`}
            onClick={() => { setIsNlpMode(false); setNlpHint(null); }}
          >
            Standard Search
          </button>
          <button
            type="button"
            className={`search-mode-btn ${isNlpMode ? "active" : ""}`}
            onClick={() => setIsNlpMode(true)}
          >
            Natural Language/AI
          </button>
        </div>

        <form className="search-bar" onSubmit={handleSubmit}>
          {!isNlpMode && (
            <select
              className="search-scope-select"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            >
              {SEARCH_SCOPES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          )}
          {isNlpMode && (
            <div className="search-nlp-badge">NLP</div>
          )}
          <input
            className="search-input"
            type="text"
            placeholder={
              isNlpMode
                ? "Try: \"find me recent books about machine learning\" or \"articles on climate change since 2020\"..."
                : "Search books, articles, databases, and more..."
            }
            value={query}
            onChange={handleQueryChange}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>

        {/* NLP interpretation hint */}
        {nlpHint && (
          <div className="nlp-hint">
            {nlpHint}
          </div>
        )}
      </div>
    </div>
  );
}
