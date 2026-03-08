import Link from "next/link";

export default function NewsPage() {
  const headlines = [
    {
      date: "March 2026",
      headline:
        "Ira's Library Launches Website, Ira Immediately Finds Typo.",
    },
    {
      date: "February 2026",
      headline: "Gary the Plant Promoted to Senior Security Officer.",
    },
    {
      date: "January 2026",
      headline: "New Chair Acquired for Reading Room. It Squeaks.",
    },
    {
      date: "December 2025",
      headline:
        "Library Cat Mr. Whiskers Knocks Three Books Off Shelf, Sets New Personal Record.",
    },
    {
      date: "November 2025",
      headline:
        "Someone Actually Used the Interlibrary Loan System. Staff in Shock.",
    },
    {
      date: "October 2025",
      headline:
        "Ira Discovers Library Has a Basement. Investigation Ongoing.",
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Library News
      </h1>
      <div
        style={{
          background: "var(--bg-white)",
          border: "1px solid var(--border-light)",
          borderRadius: 8,
          padding: 28,
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 16 }}>
          Latest Headlines:
        </h3>
        {headlines.map((h, i) => (
          <div
            key={i}
            style={{
              paddingBottom: 14,
              marginBottom: 14,
              borderBottom:
                i < headlines.length - 1
                  ? "1px solid var(--border-light)"
                  : "none",
              fontSize: "0.95rem",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 4,
              }}
            >
              {h.date}
            </div>
            <div>{h.headline}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
