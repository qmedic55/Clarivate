"use client";
import { useState } from "react";
import { FACET_DEFINITIONS } from "@/lib/searchEngine";

export default function FacetPanel({ facets, activeFacets, onFacetChange }) {
  const [collapsed, setCollapsed] = useState({});
  const [expanded, setExpanded] = useState({});

  function toggleCollapse(facetId) {
    setCollapsed((prev) => ({ ...prev, [facetId]: !prev[facetId] }));
  }

  function toggleExpand(facetId) {
    setExpanded((prev) => ({ ...prev, [facetId]: !prev[facetId] }));
  }

  function handleFacetClick(facetId, value) {
    const current = activeFacets[facetId] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFacetChange(facetId, updated);
  }

  return (
    <div className="facet-panel">
      {FACET_DEFINITIONS.map((def) => {
        const items = facets[def.id] || [];
        if (items.length === 0) return null;

        const isCollapsed = collapsed[def.id];
        const isExpanded = expanded[def.id];
        const displayItems = isExpanded ? items : items.slice(0, 5);
        const selectedValues = activeFacets[def.id] || [];

        return (
          <div key={def.id} className="facet-group">
            <div
              className="facet-group-header"
              onClick={() => toggleCollapse(def.id)}
            >
              {def.label}
              <span className="toggle">{isCollapsed ? "+" : "-"}</span>
            </div>
            {!isCollapsed && (
              <div className="facet-items">
                {displayItems.map(([value, count]) => (
                  <label
                    key={value}
                    className={`facet-item ${selectedValues.includes(value) ? "selected" : ""}`}
                    onClick={() => handleFacetClick(def.id, value)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(value)}
                      onChange={() => {}}
                    />
                    <span>{value}</span>
                    <span className="count">{count}</span>
                  </label>
                ))}
                {items.length > 5 && (
                  <button
                    className="facet-show-more"
                    onClick={() => toggleExpand(def.id)}
                  >
                    {isExpanded ? "Show less" : `Show ${items.length - 5} more`}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
