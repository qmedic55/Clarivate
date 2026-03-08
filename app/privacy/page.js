import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Privacy Policy
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
          Your privacy is very important to us. Here is our complete privacy
          policy:
        </p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            We collect your search queries to judge your reading taste (just
            kidding) (mostly).
          </li>
          <li
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            Your checkout history is between you, Ira, and that one database
            that definitely isn&apos;t backed up properly.
          </li>
          <li
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            We do not sell your data. Nobody has offered to buy it. If they did,
            we&apos;d probably just be flattered.
          </li>
          <li
            style={{
              padding: "10px 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            <strong>Cookies:</strong> This site uses cookies. Not the good kind.
            The tracking kind. But also Ira keeps actual cookies at the front
            desk. Those are free.
          </li>
          <li style={{ padding: "10px 0" }}>
            <strong>GDPR compliance:</strong> We have no idea what that stands
            for but it sounds important so we&apos;re mentioning it.
          </li>
        </ul>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
