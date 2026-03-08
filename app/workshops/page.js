import Link from "next/link";

export default function WorkshopsPage() {
  const events = [
    {
      date: "March 15",
      title: '"Intro to Looking Busy While Actually on Your Phone"',
      detail: "2pm, Main Library",
    },
    {
      date: "March 22",
      title: '"Advanced Boolean Searching: AND, OR, and WHY"',
      detail: "Canceled, nobody signed up",
    },
    {
      date: "April 1",
      title: '"Is This Source Reliable? A Workshop"',
      detail: "Moved to April 2 because nobody trusted the April 1 date",
    },
    {
      date: "April 10",
      title: '"Ira Explains Primo for 45 Minutes"',
      detail: "Light refreshments, heavy sighing",
    },
    {
      date: "TBD",
      title: '"Library Escape Room"',
      detail: "It's just the library, the doors lock at 9pm",
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Workshops &amp; Events
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
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 16 }}>
          Upcoming Events:
        </h3>
        {events.map((e, i) => (
          <div
            key={i}
            style={{
              paddingBottom: 14,
              marginBottom: 14,
              borderBottom:
                i < events.length - 1
                  ? "1px solid var(--border-light)"
                  : "none",
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 2 }}>
              {e.date} — {e.title}
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              {e.detail}
            </div>
          </div>
        ))}
        <p
          style={{
            marginTop: 16,
            fontStyle: "italic",
            color: "var(--text-secondary)",
          }}
        >
          All events include free coffee until Ira finishes the pot.
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
