import Link from "next/link";

export default function DigitalPage() {
  const initiatives = [
    "This website you're looking at right now (pretty impressive, right?).",
    "A Twitter account with 12 followers (one is Ira's mom).",
    "A blog that was updated once in 2026 and then forgotten.",
    "Plans to digitize our entire collection (step 1: buy a scanner... eventually).",
    "A very ambitious AI integration roadmap (you're looking at the prototype).",
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Digital Scholarship
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
        <p style={{ marginBottom: 16 }}>
          Ira&apos;s Library is at the cutting edge of digital scholarship,
          which means we have WiFi (most of the time).
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>
          Our digital initiatives include:
        </h3>
        <ul style={{ paddingLeft: 20 }}>
          {initiatives.map((item, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
