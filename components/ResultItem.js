"use client";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";

function getAvailability(record) {
  const holdings = record.pnx.delivery.holdings || [];
  const hasElectronic = (record.pnx.delivery.electronicLinks || []).length > 0;

  if (hasElectronic) return { label: "Available Online", className: "online" };
  if (holdings.some((h) => h.available > 0 && h.status === "Available"))
    return { label: "Available", className: "available" };
  if (holdings.some((h) => h.status === "In Library Use Only"))
    return { label: "In Library Use Only", className: "in-library" };
  if (holdings.some((h) => h.status === "Checked Out"))
    return { label: "Checked Out", className: "checked-out" };
  return { label: "Check Availability", className: "" };
}

function getTypeBadgeClass(format) {
  return format.toLowerCase().replace(/\s+/g, "-");
}

export default function ResultItem({ record, onCite }) {
  const d = record.pnx.display;
  const { isFavorite, toggleFavorite } = useFavorites();
  const avail = getAvailability(record);
  const favorited = isFavorite(record.id);

  const detailHref = record.source === "openlibrary"
    ? `/record/${record.id}?data=${encodeURIComponent(JSON.stringify(record))}`
    : `/record/${record.id}`;

  return (
    <div className="result-item">
      <div className="result-item-header">
        {d.coverUrl && (
          <img
            src={d.coverUrl}
            alt=""
            style={{ width: 60, height: 80, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1 }}>
          <div className="result-title">
            <Link href={detailHref}>{d.title}</Link>
          </div>
          <div className="result-authors">
            {d.creator?.join("; ")}
          </div>
          <div className="result-meta">
            {d.publisher} &middot; {d.date}
            {d.edition ? ` &middot; ${d.edition}` : ""}
            {d.source ? ` &middot; ${d.source}` : ""}
          </div>
        </div>
        <span className={`result-type-badge ${getTypeBadgeClass(d.format)}`}>
          {d.format}
        </span>
      </div>

      <div className="result-description">{d.description}</div>

      <div className="result-subjects">
        {d.subject?.slice(0, 5).map((s) => (
          <span key={s} className="subject-tag">{s}</span>
        ))}
      </div>

      <div className="result-footer">
        <div className="result-availability">
          <span className={`availability-dot ${avail.className}`} />
          {avail.label}
        </div>
        <div className="result-actions">
          <button
            className={`action-btn ${favorited ? "favorited" : ""}`}
            onClick={() => toggleFavorite(record.id)}
          >
            {favorited ? "Saved" : "Save"}
          </button>
          <button className="action-btn" onClick={() => onCite?.(record)}>
            Cite
          </button>
          <Link href={detailHref} className="action-btn">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
