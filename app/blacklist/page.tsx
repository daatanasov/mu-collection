"use client";

import { useState, useEffect } from "react";

export default function BlacklistPage() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Load names
  const loadNames = async () => {
    const res = await fetch("/api/blacklist");
    const data = await res.json();
    setNames(data);
  };

  useEffect(() => {
    loadNames();
  }, []);

  // Add nickname
  const addName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const nickname = input.trim();
    if (!nickname) return;

    const res = await fetch("/api/blacklist", {
      method: "POST",
      body: JSON.stringify({ nickname }),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error);
      return;
    }

    const updated = await res.json();
    setNames(updated);
    setInput("");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Blacklist</h1>

      <form onSubmit={addName} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={input}
          placeholder="Enter nickname"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Names:</h2>
      <ul>
        {names.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
