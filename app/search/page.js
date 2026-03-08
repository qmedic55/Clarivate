"use client";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import FacetPanel from "@/components/FacetPanel";
import ResultItem from "@/components/ResultItem";
import CitationModal from "@/components/CitationModal";
import Pagination from "@/components/Pagination";
import { search as localSearch, buildFacets, SEARCH_SCOPES, SORT_OPTIONS } from "@/lib/searchEngine";

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

  // Combined results state
  const [allRecords, setAllRecords] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [facets, setFacets] = useState({});

  // Fetch results whenever query/scope/page changes
  useEffect(() => {
    let cancelled = false;

    async function fetchResults() {
      setLoading(true);

      // 1. Get local results (mock data)
      const local = localSearch({ query, scope, sort: "relevance", activeFacets: {}, page: 1, pageSize: 100, advancedFields });
      let combined = [...local.records];

      // 2. If there's a query, also fetch from Open Library
      if (query.trim() && !advancedFields) {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=20`);
          const data = await res.json();
          if (!cancelled && data.records) {
            // Merge: local first, then API results
            const localIds = new Set(combined.map((r) => r.id));
            const apiRecords = data.records.filter((r) => !localIds.has(r.id));
            combined = [...combined, ...apiRecords];
          }
        } catch (err) {
          console.error("API search failed, using local only:", err);
        }
      }

      if (!cancelled) {
        setAllRecords(combined);
        setTotalResults(combined.length);
        setFacets(buildFacets(combined));
        setLoading(false);
      }
    }

    fetchResults();
    return () => { cancelled = true; };
  }, [query, scope, page, advancedFields]);

  // Apply facet filters and sorting client-side
  const filteredRecords = applyClientFacets(allRecords, activeFacets);
  const sortedRecords = applySorting(filteredRecords, sort);
  const pageSize = 10;
  const totalPages = Math.ceil(sortedRecords.length / pageSize);
  const paginatedRecords = sortedRecords.slice((page - 1) * pageSize, page * pageSize);

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
          facets={facets}
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
              {loading ? (
                <span>Searching...</span>
              ) : query ? (
                <>
                  <strong>{sortedRecords.length}</strong> results for &ldquo;{query}&rdquo;
                </>
              ) : (
                <>
                  <strong>{sortedRecords.length}</strong> results
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

          {/* Loading state */}
          {loading ? (
            <div style={{ padding: "40px 0" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="result-item" style={{ opacity: 0.5 }}>
                  <div className="loading-skeleton" style={{ height: 20, width: "70%", marginBottom: 8 }} />
                  <div className="loading-skeleton" style={{ height: 14, width: "40%", marginBottom: 8 }} />
                  <div className="loading-skeleton" style={{ height: 14, width: "90%", marginBottom: 4 }} />
                  <div className="loading-skeleton" style={{ height: 14, width: "85%" }} />
                </div>
              ))}
            </div>
          ) : paginatedRecords.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: 8 }}>No results found</p>
              <p style={{ fontSize: "0.9rem" }}>Try adjusting your search terms or removing filters</p>
            </div>
          ) : (
            paginatedRecords.map((record) => (
              <ResultItem
                key={record.id}
                record={record}
                onCite={setCitingRecord}
              />
            ))
          )}

          {/* Pagination */}
          {!loading && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
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

// Client-side facet filtering (works on merged results)
function applyClientFacets(records, activeFacets) {
  if (!activeFacets || Object.keys(activeFacets).length === 0) return records;

  return records.filter((record) => {
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
          const libs = (record.pnx.delivery.holdings || []).map((h) => h.library);
          if (!libs.some((l) => selectedValues.includes(l))) return false;
          break;
        }
        case "availability": {
          const holdings = record.pnx.delivery.holdings || [];
          const hasElectronic = (record.pnx.delivery.electronicLinks || []).length > 0;
          let avail = "Unknown";
          if (hasElectronic) avail = "Online";
          else if (holdings.some((h) => h.available > 0 && h.status === "Available")) avail = "Available";
          else if (holdings.some((h) => h.status === "In Library Use Only")) avail = "In Library Use Only";
          else if (holdings.some((h) => h.status === "Checked Out")) avail = "Checked Out";
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

function applySorting(records, sortBy) {
  const sorted = [...records];
  switch (sortBy) {
    case "date_desc":
      sorted.sort((a, b) => parseInt(b.pnx.facets.creationDate || 0) - parseInt(a.pnx.facets.creationDate || 0));
      break;
    case "date_asc":
      sorted.sort((a, b) => parseInt(a.pnx.facets.creationDate || 0) - parseInt(b.pnx.facets.creationDate || 0));
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
      // Relevance — local results first, then API results
      break;
  }
  return sorted;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
