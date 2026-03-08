import Link from "next/link";

export default function ContactPage() {
  const methods = [
    { method: "Phone", detail: "Don't call. We won't pick up." },
    {
      method: "Email",
      detail:
        "ira@iras-library.fake (average response time: 3-5 business weeks).",
    },
    {
      method: "Carrier Pigeon",
      detail: "Preferred method, BYOB (Bring Your Own Bird).",
    },
    { method: "Smoke Signals", detail: "Only on Wednesdays." },
    { method: "Telepathy", detail: "Currently in beta testing." },
    {
      method: "In-Person",
      detail:
        'Knock three times, say the password (it\'s "books"), and hope Ira is in a good mood.',
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Contact Us
      </h1>
      <div
        style={{
          background: "var(--bg-white)",
          border: "1px solid var(--border-light)",
          borderRadius: 8,
          padding: 28,
        }}
      >
        {methods.map((m) => (
          <div
            key={m.method}
            style={{
              paddingBottom: 14,
              marginBottom: 14,
              borderBottom: "1px solid var(--border-light)",
              fontSize: "0.95rem",
            }}
          >
            <strong>{m.method}:</strong> {m.detail}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
