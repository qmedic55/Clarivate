import Link from "next/link";

export default function HoursPage() {
  const hours = [
    { day: "Monday", time: "Whenever Ira wakes up — Whenever Ira gets tired" },
    { day: "Tuesday", time: "Same as Monday, but grumpier" },
    {
      day: "Wednesday",
      time: 'Closed for "professional development" (Netflix)',
    },
    {
      day: "Thursday",
      time: "Open, but don't ask Ira anything before noon",
    },
    { day: "Friday", time: "Open until Ira remembers it's Friday" },
    { day: "Saturday", time: '"Weekend hours" (translation: maybe)' },
    { day: "Sunday", time: "Ira needs a day off, come on" },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Hours &amp; Locations
      </h1>
      <div
        style={{
          background: "var(--bg-white)",
          border: "1px solid var(--border-light)",
          borderRadius: 8,
          padding: 28,
        }}
      >
        <table className="detail-table" style={{ width: "100%", marginBottom: 24 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingBottom: 12 }}>Day</th>
              <th style={{ textAlign: "left", paddingBottom: 12 }}>Hours</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((row) => (
              <tr key={row.day}>
                <th>{row.day}</th>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          Locations
        </h3>
        <p style={{ fontSize: "0.95rem", marginBottom: 8 }}>
          <strong>Main Library:</strong> Somewhere between a coffee shop and
          existential dread.
        </p>
        <p style={{ fontSize: "0.95rem" }}>
          <strong>Second Location:</strong> The cloud (not the computing kind,
          an actual cloud).
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
