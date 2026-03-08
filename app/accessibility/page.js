import Link from "next/link";

export default function AccessibilityPage() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Accessibility
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
          Ira&apos;s Library is committed to being accessible to everyone,
          assuming you can find the entrance (it&apos;s the door that sticks a
          little).
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>
          Accommodations we offer:
        </h3>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          <li style={{ marginBottom: 10 }}>
            The door is unlocked during business hours (see Hours page
            for... approximate times).
          </li>
          <li style={{ marginBottom: 10 }}>
            We have one wheelchair-accessible ramp that doubles as a book cart
            runway.
          </li>
          <li style={{ marginBottom: 10 }}>
            Large print? We can make the font bigger on this website. Just zoom
            in.
          </li>
          <li style={{ marginBottom: 10 }}>
            We accept all assistive animals. Gary the Plant does not judge.
          </li>
        </ul>
        <p style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
          If you need any accommodation not listed here, ask Ira. He&apos;ll
          figure it out. Probably.
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
