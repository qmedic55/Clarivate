"use client";
import { useState } from "react";
import { CITATION_STYLES } from "@/lib/citations";

export default function CitationModal({ record, onClose }) {
  const [styleId, setStyleId] = useState("apa");

  if (!record) return null;

  const style = CITATION_STYLES.find((s) => s.id === styleId);
  const citation = style.format(record);

  function handleCopy() {
    navigator.clipboard.writeText(citation.replace(/\*/g, ""));
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Cite This Record</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 16 }}>
          {record.pnx.display.title}
        </p>

        <div className="citation-style-tabs">
          {CITATION_STYLES.map((s) => (
            <button
              key={s.id}
              className={`citation-style-tab ${styleId === s.id ? "active" : ""}`}
              onClick={() => setStyleId(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={`citation-output ${styleId === "bibtex" ? "bibtex" : ""}`}>
          {citation}
        </div>

        <button className="copy-btn" onClick={handleCopy}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}
