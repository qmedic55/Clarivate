import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        About Ira&apos;s Library
      </h1>
      <div
        style={{
          background: "var(--bg-white)",
          border: "1px solid var(--border-light)",
          borderRadius: 8,
          padding: 28,
          lineHeight: 1.8,
          fontSize: "0.95rem",
          color: "var(--text)",
        }}
      >
        <p style={{ marginBottom: 16 }}>
          Founded in 2026 by Ira, who thought &ldquo;how hard can running a
          library be?&rdquo; Turns out, pretty hard. But we have snacks.
        </p>
        <p style={{ marginBottom: 16 }}>
          <strong>Our mission:</strong> to collect every book Ira has ever
          thought about reading but never actually started.
        </p>
        <p style={{ marginBottom: 16 }}>
          <strong>Our vision:</strong> a world where overdue fines don&apos;t
          exist (because we forgot to set them up).
        </p>
        <p>
          Our collection includes 25 carefully curated titles and access to
          literally millions more that we take no responsibility for.
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
