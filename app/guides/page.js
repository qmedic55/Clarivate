import Link from "next/link";

export default function GuidesPage() {
  const guides = [
    "How to Pretend You Read the Whole Book (a 47-step guide)",
    "Wikipedia to Bibliography Pipeline: An Advanced Tutorial",
    "The Art of Citing Sources You Definitely Didn't Read",
    "Finding Articles at 2 AM: A Student's Survival Guide",
    "How to Make Your Reference List Look Longer Than It Is",
    "Advanced Google Searching: Beyond Page 1 (uncharted territory)",
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Research Guides
      </h1>
      <div
        style={{
          background: "var(--bg-white)",
          border: "1px solid var(--border-light)",
          borderRadius: 8,
          padding: 28,
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {guides.map((guide, i) => (
            <li
              key={i}
              style={{
                padding: "12px 0",
                borderBottom:
                  i < guides.length - 1
                    ? "1px solid var(--border-light)"
                    : "none",
                fontSize: "0.95rem",
              }}
            >
              {guide}
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
