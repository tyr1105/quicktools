"use client";
import { useState } from "react";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch { setOutput("Error: Invalid input"); }
  };

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">URL Encoder / Decoder</h1>
        <p className="text-gray-500">Encode or decode URL components for safe transmission.</p>
      </div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setMode("encode")} className={mode === "encode" ? "btn-primary" : "btn-secondary"}>Encode</button>
        <button onClick={() => setMode("decode")} className={mode === "decode" ? "btn-primary" : "btn-secondary"}>Decode</button>
        <button onClick={convert} className="btn-primary">Convert</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input</label>
          <textarea className="code-input" placeholder="Enter URL or text..." value={input} onChange={e => setInput(e.target.value)} rows={10} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-600 hover:underline">Copy</button>}
          </div>
          <textarea className="code-output" readOnly value={output} rows={10} />
        </div>
      </div>
    </div>
  );
}
