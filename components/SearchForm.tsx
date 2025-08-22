"use client";
import { useState } from "react";

export default function SearchForm() {
  const [mode, setMode] = useState("train");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState<string[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, from, to }),
    });
    const data = await res.json();
    setResults(data.results);
  }

  return (
    <div className="border p-4 rounded shadow">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <select value={mode} onChange={(e) => setMode(e.target.value)} className="border p-2">
          <option value="train">Train</option>
          <option value="bus">Bus</option>
          <option value="flight">Flight</option>
        </select>
        <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className="border p-2" />
        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className="border p-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
