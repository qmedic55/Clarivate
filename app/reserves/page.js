import Link from "next/link";

export default function ReservesPage() {
  const reserves = [
    {
      course: "ECON 101",
      item: 'That one textbook that costs $300 but is "required."',
    },
    {
      course: "CS 201",
      item: "A Stack Overflow printout (ring-bound).",
    },
    {
      course: "PHIL 300",
      item: 'An empty folder labeled "The Truth."',
    },
    {
      course: "LIT 400",
      item: "Just vibes.",
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Course Reserves
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
          <strong>Professors:</strong> Place items on reserve by sending Ira a
          strongly worded email.
        </p>
        <p style={{ marginBottom: 20 }}>
          <strong>Students:</strong> Course reserve items have a checkout period
          of 2 hours, which is just enough time to realize you should have
          started studying earlier.
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>
          Current Reserves:
        </h3>
        <table className="detail-table" style={{ width: "100%", marginBottom: 20 }}>
          <tbody>
            {reserves.map((r) => (
              <tr key={r.course}>
                <th>{r.course}</th>
                <td>{r.item}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <strong>Fine for late return:</strong> a formal written apology.
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
