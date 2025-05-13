import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handleEnqueue = async () => {
    setLoading(true);
    const res = await fetch("/api/enqueue-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { foo: "bar" } }),
    });
    const json = await res.json();
    setLoading(false);
    if (json.jobId) {
      alert(`Job enqueued! ID: ${json.jobId}`);
    } else {
      alert("Failed to enqueue job");
    }
  };
  return (
    <div>
      Hello World.{" "}
      <Link href="/about">
        About
      </Link>
      <div style={{ marginTop: 20 }}>
        <button onClick={handleEnqueue} disabled={loading}>
          {loading ? "Enqueuing..." : "Enqueue Job"}
        </button>
      </div>
    </div>
  );
}
