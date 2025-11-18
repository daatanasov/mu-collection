"use client";

import { useState, useEffect } from "react";

export default function BlacklistPage() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Load names on mount
  useEffect(() => {
    const loadNames = async () => {
      const res = await fetch("/api/blacklist");
      const data = await res.json();

      if (Array.isArray(data)) setNames(data);
      else setNames([]);
    };

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

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setNames(data); // Updated array from API
    setInput("");
  };

  // Filter names by search (case-insensitive)
  const filteredNames = names.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 40, maxWidth: 500 }}>
      <h1>Blacklist</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 20 }}
      />

      {/* Add Form */}
      <form onSubmit={addName} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={input}
          placeholder="Enter nickname"
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: 8, width: "70%" }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 10 }}>
          Add
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Names List */}
      <h2>Names</h2>
      <ul>
        {filteredNames.length === 0 && <p>No results.</p>}
        {filteredNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
