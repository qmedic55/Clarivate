"use client";
import { useState, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getRecordById, getRelatedRecords, browseShelf } from "@/lib/searchEngine";
import { useFavorites } from "@/contexts/FavoritesContext";
import CitationModal from "@/components/CitationModal";

const SPINE_COLORS = [
  "#1a3a5c", "#8b4513", "#2d5016", "#4a0e4e", "#1c3d3d",
  "#5c1a1a", "#3d3d1c", "#1a1a5c", "#5c3d1a", "#2d2d2d",
];

function hashColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
  }
  return SPINE_COLORS[Math.abs(hash) % SPINE_COLORS.length];
}

export default function RecordPage({ params }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");

  // Try local first, then fall back to data from query param (Open Library records)
  let record = getRecordById(id);
  if (!record && dataParam) {
    try {
      record = JSON.parse(dataParam);
    } catch (e) {
      record = null;
    }
  }

  const [activeTab, setActiveTab] = useState("details");
  const [showCitation, setShowCitation] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!record) {
    return (
      <div style={{ textAlign: "center", padding: 80, color: "var(--text-muted)" }}>
        <h2>Record Not Found</h2>
        <p>The requested record could not be found.</p>
        <Link href="/" style={{ marginTop: 16, display: "inline-block" }}>Return to Search</Link>
      </div>
    );
  }

  const d = record.pnx.display;
  const holdings = record.pnx.delivery.holdings || [];
  const eLinks = record.pnx.delivery.electronicLinks || [];
  const related = getRelatedRecords(id, 5);
  const callNumber = holdings[0]?.callNumber;
  const shelfItems = callNumber ? browseShelf(callNumber, 7) : [];
  const favorited = isFavorite(record.id);

  const tabs = [
    { id: "details", label: "Details" },
    { id: "availability", label: `Availability (${holdings.length})` },
    { id: "links", label: `Online Access (${eLinks.length})` },
    { id: "shelf", label: "Virtual Shelf" },
    { id: "cite", label: "Cite" },
  ];

  function getStatusClass(status) {
    if (status === "Available") return "available";
    if (status === "Checked Out") return "checked-out";
    return "in-library";
  }

  return (
    <>
      <div className="record-page">
        <div className="record-main">
          {/* Breadcrumb */}
          <div className="record-breadcrumb">
            <Link href="/">Home</Link> &rsaquo;{" "}
            <Link href="/search">Search Results</Link> &rsaquo;{" "}
            {d.title}
          </div>

          {/* Header */}
          <div className="record-header">
            <span
              className={`result-type-badge ${d.format.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ marginBottom: 12, display: "inline-block" }}
            >
              {d.format}
            </span>
            <h1>{d.title}</h1>
            <div className="authors">{d.creator?.join("; ")}</div>
            <div className="meta-row">
              <span>{d.publisher}</span>
              <span>{d.date}</span>
              {d.edition && <span>{d.edition}</span>}
              {d.pages && <span>{d.pages}</span>}
              {d.language && <span>{d.language}</span>}
            </div>
            <div className="record-actions-bar">
              <button
                className={`action-btn ${favorited ? "favorited" : ""}`}
                onClick={() => toggleFavorite(record.id)}
              >
                {favorited ? "Saved" : "Save to Favorites"}
              </button>
              <button className="action-btn" onClick={() => setShowCitation(true)}>
                Cite
              </button>
              <button className="action-btn">Email</button>
              <button className="action-btn">Print</button>
              {holdings.length > 0 && holdings.some(h => h.status === "Available") && (
                <button className="action-btn" style={{ background: "var(--primary)", color: "white", borderColor: "var(--primary)" }}>
                  Request Item
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="record-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`record-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="record-tab-content">
            {activeTab === "details" && (
              <table className="detail-table">
                <tbody>
                  <tr>
                    <th>Title</th>
                    <td>{d.title}</td>
                  </tr>
                  <tr>
                    <th>Author(s)</th>
                    <td>{d.creator?.join("; ")}</td>
                  </tr>
                  <tr>
                    <th>Format</th>
                    <td>{d.format}</td>
                  </tr>
                  <tr>
                    <th>Publisher</th>
                    <td>{d.publisher}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{d.date}</td>
                  </tr>
                  {d.edition && (
                    <tr>
                      <th>Edition</th>
                      <td>{d.edition}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Language</th>
                    <td>{d.language}</td>
                  </tr>
                  {d.pages && (
                    <tr>
                      <th>Pages</th>
                      <td>{d.pages}</td>
                    </tr>
                  )}
                  {d.source && (
                    <tr>
                      <th>Source</th>
                      <td>{d.source}</td>
                    </tr>
                  )}
                  <tr>
                    <th>Subjects</th>
                    <td>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {d.subject?.map((s) => (
                          <Link
                            key={s}
                            href={`/search?q=${encodeURIComponent(s)}`}
                            className="subject-tag"
                            style={{ cursor: "pointer" }}
                          >
                            {s}
                          </Link>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{d.description}</td>
                  </tr>
                  {d.identifier?.isbn && (
                    <tr>
                      <th>ISBN</th>
                      <td>{d.identifier.isbn}</td>
                    </tr>
                  )}
                  {d.identifier?.doi && (
                    <tr>
                      <th>DOI</th>
                      <td>{d.identifier.doi}</td>
                    </tr>
                  )}
                  {d.identifier?.issn && (
                    <tr>
                      <th>ISSN</th>
                      <td>{d.identifier.issn}</td>
                    </tr>
                  )}
                  {d.identifier?.oclc && (
                    <tr>
                      <th>OCLC</th>
                      <td>{d.identifier.oclc}</td>
                    </tr>
                  )}
                  {d.identifier?.arxiv && (
                    <tr>
                      <th>arXiv</th>
                      <td>{d.identifier.arxiv}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "availability" && (
              <>
                {holdings.length === 0 ? (
                  <p style={{ color: "var(--text-muted)" }}>
                    No physical holdings. Check the Online Access tab for electronic versions.
                  </p>
                ) : (
                  <table className="holdings-table">
                    <thead>
                      <tr>
                        <th>Library</th>
                        <th>Location</th>
                        <th>Call Number</th>
                        <th>Status</th>
                        <th>Copies</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((h, i) => (
                        <tr key={i}>
                          <td>{h.library}</td>
                          <td>{h.location}</td>
                          <td style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                            {h.callNumber}
                          </td>
                          <td>
                            <span className={`status-badge ${getStatusClass(h.status)}`}>
                              {h.status}
                            </span>
                            {h.dueDate && (
                              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 8 }}>
                                Due: {h.dueDate}
                              </span>
                            )}
                          </td>
                          <td>{h.available} of {h.copies}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}

            {activeTab === "links" && (
              <>
                {eLinks.length === 0 ? (
                  <p style={{ color: "var(--text-muted)" }}>
                    No online access available for this record. Check physical availability.
                  </p>
                ) : (
                  eLinks.map((link, i) => (
                    <a key={i} href={link.url} className="electronic-link">
                      {link.label}
                      <span className="coverage">{link.coverage}</span>
                    </a>
                  ))
                )}
              </>
            )}

            {activeTab === "shelf" && (
              <>
                {shelfItems.length === 0 ? (
                  <p style={{ color: "var(--text-muted)" }}>
                    No shelf browse available for this record.
                  </p>
                ) : (
                  <>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16 }}>
                      Browse items shelved near this title (virtual shelf):
                    </p>
                    <div className="shelf-browse">
                      {shelfItems.map((item) => {
                        const cn = item.pnx.delivery.holdings?.[0]?.callNumber || "";
                        const isCurrent = item.id === record.id;
                        return (
                          <Link
                            key={item.id}
                            href={`/record/${item.id}`}
                            className={`shelf-item ${isCurrent ? "current" : ""}`}
                          >
                            <div
                              className="shelf-spine"
                              style={{ background: hashColor(item.pnx.display.title) }}
                            >
                              {item.pnx.display.title.length > 60
                                ? item.pnx.display.title.substring(0, 60) + "..."
                                : item.pnx.display.title}
                            </div>
                            <div className="call-number">{cn}</div>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "cite" && (
              <div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16 }}>
                  Generate a citation for this item in your preferred format:
                </p>
                <button
                  className="action-btn"
                  style={{ fontSize: "0.9rem", padding: "10px 20px" }}
                  onClick={() => setShowCitation(true)}
                >
                  Open Citation Tool
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="record-sidebar">
          {/* Quick Access */}
          {eLinks.length > 0 && (
            <div className="sidebar-card">
              <h3>Online Access</h3>
              {eLinks.map((link, i) => (
                <a key={i} href={link.url} className="electronic-link">
                  {link.label}
                  <span className="coverage">{link.coverage}</span>
                </a>
              ))}
            </div>
          )}

          {/* Availability Summary */}
          {holdings.length > 0 && (
            <div className="sidebar-card">
              <h3>Availability</h3>
              {holdings.map((h, i) => (
                <div key={i} style={{ marginBottom: 10, fontSize: "0.85rem" }}>
                  <div style={{ fontWeight: 600 }}>{h.library}</div>
                  <div style={{ color: "var(--text-secondary)" }}>{h.location}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <span className={`availability-dot ${h.available > 0 ? "available" : "checked-out"}`} />
                    <span>{h.available > 0 ? `${h.available} available` : "Checked out"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Related Records */}
          {related.length > 0 && (
            <div className="sidebar-card">
              <h3>Related Records</h3>
              {related.map((r) => (
                <div key={r.id} className="related-item">
                  <Link href={`/record/${r.id}`}>
                    {r.pnx.display.title}
                  </Link>
                  <div className="meta">
                    {r.pnx.display.creator?.[0]} &middot; {r.pnx.display.date}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Identifiers */}
          <div className="sidebar-card">
            <h3>Identifiers</h3>
            <table className="detail-table" style={{ fontSize: "0.8rem" }}>
              <tbody>
                {d.identifier?.isbn && (
                  <tr><th style={{ width: 60 }}>ISBN</th><td>{d.identifier.isbn}</td></tr>
                )}
                {d.identifier?.doi && (
                  <tr><th style={{ width: 60 }}>DOI</th><td>{d.identifier.doi}</td></tr>
                )}
                {d.identifier?.issn && (
                  <tr><th style={{ width: 60 }}>ISSN</th><td>{d.identifier.issn}</td></tr>
                )}
                {d.identifier?.oclc && (
                  <tr><th style={{ width: 60 }}>OCLC</th><td>{d.identifier.oclc}</td></tr>
                )}
                {d.identifier?.arxiv && (
                  <tr><th style={{ width: 60 }}>arXiv</th><td>{d.identifier.arxiv}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showCitation && (
        <CitationModal record={record} onClose={() => setShowCitation(false)} />
      )}
    </>
  );
}
