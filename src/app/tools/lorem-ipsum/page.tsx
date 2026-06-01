"use client";
import { useState } from "react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generate(count: number, type: "paragraphs" | "sentences" | "words"): string {
  const rand = (n: number) => Math.floor(Math.random() * n);
  const sentence = () => {
    const len = 8 + rand(12);
    const words = Array.from({length: len}, () => WORDS[rand(WORDS.length)]);
    return words.join(" ").replace(/^./, c => c.toUpperCase()) + ".";
  };
  const para = () => Array.from({length: 3 + rand(4)}, sentence).join(" ");
  if (type === "words") return Array.from({length: count}, () => WORDS[rand(WORDS.length)]).join(" ");
  if (type === "sentences") return Array.from({length: count}, sentence).join(" ");
  return Array.from({length: count}, para).join("\n\n");
}

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Lorem Ipsum Generator</h1>
        <p className="text-gray-500">Generate placeholder text for your designs and layouts.</p>
      </div>
      <div className="max-w-2xl space-y-4">
        <div className="flex gap-2 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Count</label>
            <input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} className="w-20 px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select value={type} onChange={e => setType(e.target.value as any)} className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700">
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <button onClick={() => setOutput(generate(count, type))} className="btn-primary">Generate</button>
        </div>
        {output && (
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Output</label>
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-brand-600 hover:underline">Copy</button>
            </div>
            <textarea className="code-output" readOnly value={output} rows={12} />
          </div>
        )}
      </div>
    </div>
  );
}
