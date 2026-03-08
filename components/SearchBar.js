"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_SCOPES } from "@/lib/searchEngine";

export default function SearchBar({ initialQuery = "", initialScope = "everything", inline = false }) {
  const [query, setQuery] = useState(initialQuery);
  const [scope, setScope] = useState(initialScope);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (scope !== "everything") params.set("scope", scope);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className={inline ? "search-bar-inline" : ""}>
      <div className="search-container">
        <form className="search-bar" onSubmit={handleSubmit}>
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
          <input
            className="search-input"
            type="text"
            placeholder="Search books, articles, databases, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
