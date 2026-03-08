import Link from "next/link";

export default function SpecialPage() {
  const items = [
    "Ira's childhood book reports (mostly about dogs).",
    'A signed napkin from a guy who said he was "basically a published author."',
    "47 bookmarks collected from various hotel rooms.",
    "A first edition of something — we're not sure what, the cover fell off.",
    "The complete works of someone whose name we can't pronounce.",
    'A USB drive labeled "IMPORTANT" that no one has the courage to plug in.',
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Special Collections
      </h1>
      <div
        style={{
          background: "var(--bg-white)",
          border: "1px solid var(--border-light)",
          borderRadius: 8,
          padding: 28,
          fontSize: "0.95rem",
          lineHeight: 1.8,
        }}
      >
        <p style={{ marginBottom: 16 }}>Our special collections include:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          {items.map((item, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {item}
            </li>
          ))}
        </ul>
        <p style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
          Viewing by appointment only. The appointment is whenever Ira finds the
          key.
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
