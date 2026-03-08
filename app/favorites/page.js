"use client";
import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getRecordById } from "@/lib/searchEngine";
import ResultItem from "@/components/ResultItem";
import CitationModal from "@/components/CitationModal";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [citingRecord, setCitingRecord] = useState(null);

  const records = favorites
    .map((id) => getRecordById(id))
    .filter(Boolean);

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>

      {records.length === 0 ? (
        <div className="favorites-empty">
          <p>No saved items yet</p>
          <p style={{ fontSize: "0.9rem" }}>
            Click &ldquo;Save&rdquo; on any search result to add it to your favorites.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: 16,
              padding: "10px 24px",
              background: "var(--primary)",
              color: "white",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Start Searching
          </Link>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--text-secondary)", marginBottom: 16, fontSize: "0.9rem" }}>
            {records.length} saved item{records.length !== 1 ? "s" : ""}
          </p>
          {records.map((record) => (
            <ResultItem
              key={record.id}
              record={record}
              onCite={setCitingRecord}
            />
          ))}
        </>
      )}

      {citingRecord && (
        <CitationModal
          record={citingRecord}
          onClose={() => setCitingRecord(null)}
        />
      )}
    </div>
  );
}
