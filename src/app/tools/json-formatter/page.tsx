"use client";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const formatJson = () => {
    try {
      if (!input.trim()) { setOutput(""); setError(""); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const copyOutput = () => navigator.clipboard.writeText(output);

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON Formatter and Validator</h1>
        <p className="text-gray-500">Paste your JSON to format, validate, minify, or beautify it.</p>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <button onClick={formatJson} className="btn-primary">Format</button>
        <button onClick={minifyJson} className="btn-secondary">Minify</button>
        <label className="flex items-center gap-2 text-sm text-gray-500">
          Indent:
          <select value={indent} onChange={e => setIndent(Number(e.target.value))} className="px-2 py-1 border rounded bg-white dark:bg-gray-900 dark:border-gray-700">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea className="code-input" placeholder="Paste JSON here" value={input} onChange={e => setInput(e.target.value)} rows={14} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && <button onClick={copyOutput} className="text-xs text-brand-600 hover:underline">Copy</button>}
          </div>
          <textarea className="code-output" readOnly value={error ? "Error: " + error : output} rows={14} style={error ? { color: "#ef4444" } : {}} />
        </div>
      </div>
    </div>
  );
}
