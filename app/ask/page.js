import Link from "next/link";

export default function AskPage() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Ask a Librarian
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
        <p style={{ marginBottom: 12 }}>
          Got a question? Ira might have an answer! (No guarantees.)
        </p>
        <p style={{ marginBottom: 12 }}>
          <strong>Current Status:</strong> Ira is... <em>*checks notes*</em>{" "}
          ...probably looking at memes.
        </p>
        <p style={{ marginBottom: 20 }}>
          <strong>Average response time:</strong> Depends on the complexity of
          the question and how interesting Ira&apos;s current YouTube rabbit
          hole is.
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
          Questions we CAN answer:
        </h3>
        <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
          <li>Where&apos;s the bathroom?</li>
          <li>What time do we close?</li>
          <li>Have you tried turning it off and on again?</li>
        </ul>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
          Questions we CANNOT answer:
        </h3>
        <ul style={{ paddingLeft: 20 }}>
          <li>The meaning of life.</li>
          <li>Why your printer isn&apos;t working.</li>
          <li>What your professor actually wants.</li>
        </ul>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
