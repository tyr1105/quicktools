"use client";
import { useState, useMemo } from "react";

function mdToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^\- (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-brand-600 underline">$1</a>')
    .replace(/^---$/gm, "<hr/>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
  return "<p>" + html + "</p>";
}

const defaultMd = `# Hello World\n\nThis is a **Markdown** preview tool.\n\n## Features\n\n- Bold text with **asterisks**\n- Italic with *single asterisks*\n- Inline \`code\` blocks\n- [Links](https://quicktools.dev)\n\n---\n\nTry editing the left side!`;

export default function MarkdownPreview() {
  const [md, setMd] = useState(defaultMd);
  const html = useMemo(() => mdToHtml(md), [md]);

  return (
    <div className="tool-container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Markdown Preview</h1>
        <p className="text-gray-500">Write Markdown and see a live HTML preview side by side.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Markdown</label>
          <textarea className="code-input" value={md} onChange={e => setMd(e.target.value)} rows={20} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preview</label>
          <div className="min-h-[400px] p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
