"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { name: "JSON Formatter", href: "/tools/json-formatter" },
  { name: "Base64 Encode/Decode", href: "/tools/base64" },
  { name: "URL Encoder", href: "/tools/url-encoder" },
  { name: "Hash Generator", href: "/tools/hash-generator" },
  { name: "Password Generator", href: "/tools/password-generator" },
  { name: "Color Converter", href: "/tools/color-converter" },
  { name: "QR Code Generator", href: "/tools/qr-code" },
  { name: "Regex Tester", href: "/tools/regex-tester" },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum" },
  { name: "Markdown Preview", href: "/tools/markdown-preview" },
  { name: "Diff Checker", href: "/tools/diff-checker" },
  { name: "JWT Decoder", href: "/tools/jwt-decoder" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.theme = next ? "dark" : "light";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-brand-600">⚡</span>
            <span>QuickTools</span>
            <span className="text-xs font-normal text-gray-400 hidden sm:inline">
              .dev
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                All Tools ▾
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-gray-800 hover:text-brand-700 dark:hover:text-brand-400"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={toggleDark}
              className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800 pt-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-gray-800 rounded-lg"
              >
                {t.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
