"use client";
import { useState } from "react";

const algorithms = ["SHA-256", "SHA-384", "SHA-512"] as const;

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState<string>("SHA-256");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input) return;
    setLoading(true);
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const buffer = await crypto.subtle.digest(algo, data);
    const arr = Array.from(new Uint8Array(buffer));
    setHash(arr.map(b => b.toString(16).padStart(2, "0")).join(""));
    setLoading(false);
  };

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Hash Generator</h1>
        <p className="text-gray-500">Generate cryptographic hashes using the Web Crypto API. Runs entirely in your browser.</p>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        {algorithms.map(a => (
          <button key={a} onClick={() => setAlgo(a)} className={algo === a ? "btn-primary" : "btn-secondary"}>{a}</button>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Input text</label>
        <textarea className="code-input" placeholder="Enter text to hash..." value={input} onChange={e => setInput(e.target.value)} rows={6} />
      </div>
      <button onClick={generate} disabled={loading || !input} className="btn-primary mb-4">
        {loading ? "Generating..." : "Generate Hash"}
      </button>
      {hash && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">{algo} Hash</label>
            <button onClick={() => navigator.clipboard.writeText(hash)} className="text-xs text-brand-600 hover:underline">Copy</button>
          </div>
          <div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm break-all select-all">{hash}</div>
        </div>
      )}
    </div>
  );
}
