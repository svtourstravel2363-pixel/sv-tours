"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", background: "#faf7f2", color: "#0f1b33", textAlign: "center", padding: 24 }}>
        <div>
          <h1>SV Tours & Travels</h1>
          <p>Something went wrong. Please try again or call 9860740890.</p>
          <button onClick={reset} style={{ padding: "12px 24px", borderRadius: 999, border: 0, background: "#0f172a", color: "#fff", fontWeight: 600 }}>Try again</button>
        </div>
      </body>
    </html>
  );
}
