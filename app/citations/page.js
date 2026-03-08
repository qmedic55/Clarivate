import Link from "next/link";

export default function CitationsPage() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Citation Tools
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
        <p style={{ marginBottom: 20 }}>
          Our built-in citation generator supports APA, MLA, Chicago, and
          BibTeX. It&apos;s probably mostly accurate.
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>
          Ira&apos;s Citation Tips:
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            When in doubt, add &ldquo;et al.&rdquo; — it makes everything sound
            more academic.
          </li>
          <li
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            If you can&apos;t find the publication date, just write
            &ldquo;n.d.&rdquo; and hope nobody checks.
          </li>
          <li
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            The difference between APA and MLA? About 47 arguments among
            librarians.
          </li>
          <li style={{ padding: "10px 0" }}>
            Chicago style has footnotes. Lots of footnotes. Footnotes about
            footnotes.
          </li>
        </ul>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
