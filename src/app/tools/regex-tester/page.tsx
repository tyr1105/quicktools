"use client";
import { useState, useMemo } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");
  const [error, setError] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testStr) return { matches: [], highlighted: testStr };
    try {
      const re = new RegExp(pattern, flags);
      setError("");
      const matches: RegExpExecArray[] = [];
      let m;
      if (flags.includes("g")) {
        while ((m = re.exec(testStr)) !== null) { matches.push(m); if (!m[0]) break; }
      } else {
        m = re.exec(testStr);
        if (m) matches.push(m);
      }
      return { matches, highlighted: testStr };
    } catch (e: any) {
      setError(e.message);
      return { matches: [], highlighted: testStr };
    }
  }, [pattern, flags, testStr]);

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Regex Tester</h1>
        <p className="text-gray-500">Test regular expressions with real-time matching.</p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Pattern</label>
            <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} className="w-full px-4 py-2 border rounded-lg font-mono bg-white dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Enter regex pattern" />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium mb-1">Flags</label>
            <input type="text" value={flags} onChange={e => setFlags(e.target.value)} className="w-full px-4 py-2 border rounded-lg font-mono bg-white dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">Test String</label>
          <textarea className="code-input" value={testStr} onChange={e => setTestStr(e.target.value)} rows={6} placeholder="Enter test string" />
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">Matches: {result.matches.length}</div>
          {result.matches.length > 0 && (
            <div className="space-y-1 text-sm font-mono">
              {result.matches.map((m, i) => (
                <div key={i} className="text-brand-600 dark:text-brand-400">
                  Match {i+1}: &quot;{m[0]}&quot; at index {m.index}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
