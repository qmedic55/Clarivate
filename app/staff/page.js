import Link from "next/link";

export default function StaffPage() {
  const staff = [
    {
      name: "Ira",
      title: "Head Librarian, CEO, CFO, CTO, Janitor, and Snack Coordinator",
    },
    {
      name: "Also Ira",
      title:
        "Assistant to the Head Librarian (also Ira, just wearing a different hat)",
    },
    {
      name: "Gary the Plant",
      title:
        "Security & Morale Officer (hasn't moved in 3 years, very reliable)",
    },
    {
      name: "Mr. Whiskers",
      title: "Chief Napping Officer (the library cat, allegedly)",
    },
    {
      name: "Claude",
      title:
        "IT Department (does most of the actual work, won't stop talking about being helpful)",
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Staff Directory
      </h1>
      <div
        style={{
          background: "var(--bg-white)",
          border: "1px solid var(--border-light)",
          borderRadius: 8,
          padding: 28,
        }}
      >
        {staff.map((s) => (
          <div
            key={s.name}
            style={{
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            <div
              style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 4 }}
            >
              {s.name}
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              {s.title}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
