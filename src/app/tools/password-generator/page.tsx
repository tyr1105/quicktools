"use client";
import { useState, useCallback } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [entropy, setEntropy] = useState(0);

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { setPassword("Select at least one option"); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr, x => chars[x % chars.length]).join("");
    setPassword(pw);
    const pool = (upper?26:0)+(lower?26:0)+(numbers?10:0)+(symbols?26:0);
    setEntropy(Math.round(length * Math.log2(pool)));
  }, [length, upper, lower, numbers, symbols]);

  const strength = entropy > 100 ? "Very Strong" : entropy > 60 ? "Strong" : entropy > 40 ? "Medium" : "Weak";
  const color = entropy > 100 ? "text-green-500" : entropy > 60 ? "text-green-400" : entropy > 40 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
        <p className="text-gray-500">Generate strong, random passwords with customizable options using crypto.getRandomValues.</p>
      </div>
      <div className="max-w-lg space-y-4">
        <div>
          <label className="flex justify-between text-sm font-medium mb-1">
            <span>Length</span><span>{length}</span>
          </label>
          <input type="range" min={4} max={64} value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-brand-600" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[["Uppercase (A-Z)", upper, setUpper], ["Lowercase (a-z)", lower, setLower], ["Numbers (0-9)", numbers, setNumbers], ["Symbols (!@#$)", symbols, setSymbols]].map(([label, val, set]: any) => (
            <label key={label} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} className="accent-brand-600" />{label}
            </label>
          ))}
        </div>
        <button onClick={generate} className="btn-primary w-full">Generate Password</button>
        {password && (
          <div className="relative">
            <div className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-lg break-all select-all pr-20">{password}</div>
            <button onClick={() => navigator.clipboard.writeText(password)} className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded">Copy</button>
            <div className="mt-2 text-sm">Entropy: <span className={color}>{entropy} bits ({strength})</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
