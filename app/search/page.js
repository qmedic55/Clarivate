"use client";
import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import FacetPanel from "@/components/FacetPanel";
import ResultItem from "@/components/ResultItem";
import CitationModal from "@/components/CitationModal";
import Pagination from "@/components/Pagination";
import { search, SEARCH_SCOPES, SORT_OPTIONS } from "@/lib/searchEngine";

function parseAdvancedParams(adv) {
  if (!adv) return null;
  return adv.split("|").map((part) => {
    const [operator, field, value] = part.split(":");
    return { operator, field, value: decodeURIComponent(value || "") };
  });
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const scope = searchParams.get("scope") || "everything";
  const advParam = searchParams.get("adv");
  const advancedFields = parseAdvancedParams(advParam);

  const [activeFacets, setActiveFacets] = useState({});
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [citingRecord, setCitingRecord] = useState(null);

  const results = useMemo(
    () => search({ query, scope, sort, activeFacets, page, pageSize: 10, advancedFields }),
    [query, scope, sort, activeFacets, page, advancedFields]
  );

  const handleFacetChange = useCallback((facetId, values) => {
    setActiveFacets((prev) => {
      const next = { ...prev };
      if (values.length === 0) {
        delete next[facetId];
      } else {
        next[facetId] = values;
      }
      return next;
    });
    setPage(1);
  }, []);

  function clearAllFacets() {
    setActiveFacets({});
    setPage(1);
  }

  const activeFacetChips = Object.entries(activeFacets).flatMap(([facetId, values]) =>
    values.map((v) => ({ facetId, value: v }))
  );

  return (
    <>
      <SearchBar initialQuery={query} initialScope={scope} inline />

      {/* Scope tabs */}
      <div className="scope-tabs">
        <div className="scope-tabs-inner">
          {SEARCH_SCOPES.map((s) => (
            <button
              key={s.id}
              className={`scope-tab ${scope === s.id ? "active" : ""}`}
              onClick={() => {
                const params = new URLSearchParams();
                if (query) params.set("q", query);
                if (s.id !== "everything") params.set("scope", s.id);
                window.location.href = `/search?${params.toString()}`;
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="results-layout">
        {/* Facets sidebar */}
        <FacetPanel
          facets={results.facets}
          activeFacets={activeFacets}
          onFacetChange={handleFacetChange}
        />

        {/* Results main content */}
        <div>
          {/* Active facet chips */}
          {activeFacetChips.length > 0 && (
            <div className="active-facets">
              {activeFacetChips.map(({ facetId, value }) => (
                <span key={`${facetId}-${value}`} className="facet-chip">
                  {value}
                  <button onClick={() => handleFacetChange(
                    facetId,
                    (activeFacets[facetId] || []).filter((v) => v !== value)
                  )}>
                    &times;
                  </button>
                </span>
              ))}
              <button className="clear-all-facets" onClick={clearAllFacets}>
                Clear All
              </button>
            </div>
          )}

          {/* Results header */}
          <div className="results-header">
            <div className="results-count">
              {query ? (
                <>
                  <strong>{results.totalResults}</strong> results for &ldquo;{query}&rdquo;
                </>
              ) : (
                <>
                  <strong>{results.totalResults}</strong> results
                </>
              )}
            </div>
            <div className="results-sort">
              <span>Sort by:</span>
              <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results list */}
          {results.records.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: 8 }}>No results found</p>
              <p style={{ fontSize: "0.9rem" }}>Try adjusting your search terms or removing filters</p>
            </div>
          ) : (
            results.records.map((record) => (
              <ResultItem
                key={record.id}
                record={record}
                onCite={setCitingRecord}
              />
            ))
          )}

          {/* Pagination */}
          <Pagination
            currentPage={results.currentPage}
            totalPages={results.totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Citation Modal */}
      {citingRecord && (
        <CitationModal
          record={citingRecord}
          onClose={() => setCitingRecord(null)}
        />
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
