"use client";
import { useState } from "react";

function diff(a: string, b: string): { type: "same" | "add" | "del"; line: string }[] {
  const la = a.split("\n"), lb = b.split("\n");
  const result: { type: "same" | "add" | "del"; line: string }[] = [];
  const maxLen = Math.max(la.length, lb.length);
  for (let i = 0; i < maxLen; i++) {
    const lineA = la[i] ?? "", lineB = lb[i] ?? "";
    if (lineA === lineB) result.push({ type: "same", line: lineA });
    else {
      if (lineA !== undefined && i < la.length) result.push({ type: "del", line: lineA });
      if (lineB !== undefined && i < lb.length) result.push({ type: "add", line: lineB });
    }
  }
  return result;
}

export default function DiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [result, setResult] = useState<{ type: string; line: string }[]>([]);

  const compare = () => setResult(diff(left, right));

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Diff Checker</h1>
        <p className="text-gray-500">Compare two texts and see the differences highlighted.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Original Text</label>
          <textarea className="code-input" value={left} onChange={e => setLeft(e.target.value)} rows={12} placeholder="Paste original text..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Modified Text</label>
          <textarea className="code-input" value={right} onChange={e => setRight(e.target.value)} rows={12} placeholder="Paste modified text..." />
        </div>
      </div>
      <button onClick={compare} className="btn-primary mb-4">Compare</button>
      {result.length > 0 && (
        <div className="font-mono text-sm border rounded-lg overflow-hidden">
          {result.map((r, i) => (
            <div key={i} className={
              r.type === "add" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-0.5" :
              r.type === "del" ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-0.5 line-through" :
              "px-4 py-0.5"
            }>
              <span className="inline-block w-6 text-gray-400">{r.type === "add" ? "+" : r.type === "del" ? "-" : " "}</span>
              {r.line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
