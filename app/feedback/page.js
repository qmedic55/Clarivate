import Link from "next/link";

export default function FeedbackPage() {
  const ratings = [
    { stars: "5 stars", text: "\"It was perfect, I love Ira's Library.\"" },
    { stars: "4 stars", text: '"Pretty good, could use more snacks."' },
    { stars: "3 stars", text: "\"It's a library, I guess.\"" },
    { stars: "2 stars", text: '"Ira was napping when I arrived."' },
    {
      stars: "1 star",
      text: "\"Unacceptable. We don't accept 1-star reviews.\"",
    },
  ];

  const feedback = [
    {
      quote: '"Why are the hours so inconsistent?"',
      response: "It's called work-life balance, look it up.",
    },
    {
      quote: '"The library cat bit me."',
      response: "Mr. Whiskers is going through something.",
    },
    {
      quote: '"Your search engine is surprisingly good."',
      response: "Thank Claude.",
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 24px" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 24 }}>
        Feedback
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
          We value your feedback! (Compliments only, please.)
        </p>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>
          Rate your experience:
        </h3>
        <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
          {ratings.map((r, i) => (
            <li
              key={i}
              style={{
                padding: "8px 0",
                borderBottom:
                  i < ratings.length - 1
                    ? "1px solid var(--border-light)"
                    : "none",
              }}
            >
              <strong>{r.stars}</strong> — {r.text}
            </li>
          ))}
        </ul>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12 }}>
          Common feedback we&apos;ve received:
        </h3>
        {feedback.map((f, i) => (
          <div
            key={i}
            style={{
              paddingBottom: 12,
              marginBottom: 12,
              borderBottom:
                i < feedback.length - 1
                  ? "1px solid var(--border-light)"
                  : "none",
            }}
          >
            <div style={{ fontStyle: "italic" }}>{f.quote}</div>
            <div style={{ color: "var(--text-secondary)", paddingLeft: 16 }}>
              — {f.response}
            </div>
          </div>
        ))}
        <p
          style={{
            marginTop: 20,
            fontStyle: "italic",
            color: "var(--text-secondary)",
          }}
        >
          To submit feedback, write it on a piece of paper, fold it into an
          airplane, and throw it in the general direction of the library.
        </p>
      </div>
      <div style={{ marginTop: 24 }}>
        <Link href="/">Back to Search</Link>
      </div>
    </div>
  );
}
