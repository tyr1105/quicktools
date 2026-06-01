"use client";
import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      setError("");
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch (e: any) {
      setError("Invalid input for " + mode + "ing: " + e.message);
      setOutput("");
    }
  };

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Base64 Encode / Decode</h1>
        <p className="text-gray-500">Convert text to Base64 or decode Base64 strings. Supports UTF-8.</p>
      </div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setMode("encode")} className={mode === "encode" ? "btn-primary" : "btn-secondary"}>Encode</button>
        <button onClick={() => setMode("decode")} className={mode === "decode" ? "btn-primary" : "btn-secondary"}>Decode</button>
        <button onClick={convert} className="btn-primary">Convert</button>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea className="code-input" placeholder="Enter text or Base64 string..." value={input} onChange={e => setInput(e.target.value)} rows={12} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-600 hover:underline">Copy</button>}
          </div>
          <textarea className="code-output" readOnly value={output} rows={12} />
        </div>
      </div>
    </div>
  );
}
