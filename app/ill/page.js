import Link from "next/link";

export default function IllPage() {
  const steps = [
    "You request a book.",
    "We email another library.",
    "They ignore us.",
    "We email again with more exclamation marks.",
    "They respond 3 weeks later.",
    "The book arrives damaged.",
    "Everyone pretends this is fine.",
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Interlibrary Loan
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
          Want a book we don&apos;t have? We&apos;ll ask another library really
          nicely.
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>
          Process:
        </h3>
        <ol style={{ paddingLeft: 20, marginBottom: 20 }}>
          {steps.map((step, i) => (
            <li key={i} style={{ marginBottom: 6 }}>
              {step}
            </li>
          ))}
        </ol>
        <p style={{ marginBottom: 12 }}>
          <strong>Turnaround time:</strong> Somewhere between &ldquo;soon&rdquo;
          and &ldquo;heat death of the universe.&rdquo;
        </p>
        <p style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
          Note: We once got a book from a library in Finland. Nobody knows how.
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
