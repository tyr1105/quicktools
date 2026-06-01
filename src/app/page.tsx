import Link from "next/link";

const tools = [
  {
    name: "JSON Formatter",
    desc: "Format, validate, and beautify JSON data with syntax highlighting.",
    href: "/tools/json-formatter",
    icon: "{ }",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Base64 Encode/Decode",
    desc: "Encode text to Base64 or decode Base64 strings instantly.",
    href: "/tools/base64",
    icon: "🔤",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "URL Encoder",
    desc: "Encode or decode URL components for safe transmission.",
    href: "/tools/url-encoder",
    icon: "🔗",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Hash Generator",
    desc: "Generate SHA-256, SHA-384, SHA-512 hashes using Web Crypto API.",
    href: "/tools/hash-generator",
    icon: "#️⃣",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Password Generator",
    desc: "Create strong, random passwords with customizable options.",
    href: "/tools/password-generator",
    icon: "🔐",
    color: "from-yellow-500 to-orange-600",
  },
  {
    name: "Color Converter",
    desc: "Convert colors between HEX, RGB, and HSL formats with live preview.",
    href: "/tools/color-converter",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
  },
  {
    name: "QR Code Generator",
    desc: "Generate QR codes from any text or URL. Download as PNG.",
    href: "/tools/qr-code",
    icon: "📱",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Regex Tester",
    desc: "Test regular expressions with real-time matching and highlighting.",
    href: "/tools/regex-tester",
    icon: "✳️",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Lorem Ipsum",
    desc: "Generate placeholder text in paragraphs, sentences, or words.",
    href: "/tools/lorem-ipsum",
    icon: "📝",
    color: "from-gray-500 to-gray-700",
  },
  {
    name: "Markdown Preview",
    desc: "Write Markdown and see a live HTML preview side by side.",
    href: "/tools/markdown-preview",
    icon: "📄",
    color: "from-teal-500 to-emerald-600",
  },
  {
    name: "Diff Checker",
    desc: "Compare two texts and see the differences highlighted.",
    href: "/tools/diff-checker",
    icon: "🔍",
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "JWT Decoder",
    desc: "Decode and inspect JSON Web Tokens (JWT) to see header and payload.",
    href: "/tools/jwt-decoder",
    icon: "🎫",
    color: "from-amber-500 to-yellow-600",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-brand-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-900/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            100% Free &middot; No Sign-up &middot; Privacy-First
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Developer Tools,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              Right in Your Browser
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10">
            Fast, beautiful, and secure online tools for developers. Everything
            runs locally &mdash; your data never leaves your device.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="#tools"
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-brand-600/20"
            >
              Browse Tools
            </Link>
            <a
              href="https://github.com/tyr1105/quicktools"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              ⭐ Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["12+", "Free Tools"],
            ["0", "Data Collected"],
            ["100%", "Client-Side"],
            ["∞", "Usage Limit"],
          ].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl sm:text-3xl font-bold text-brand-600">
                {val}
              </div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">All Tools</h2>
          <p className="text-gray-500">
            Click any tool to start using it instantly. No installation required.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${t.color} text-white text-xl shadow-sm`}
              >
                {t.icon}
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {t.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {t.desc}
              </p>
              <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 group-hover:text-brand-500 transition-colors">
                →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ / SEO section */}
      <section className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why QuickTools?
          </h2>
          <div className="space-y-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🔒 Privacy-First
              </h3>
              <p>
                Every tool runs entirely in your browser using JavaScript. No
                data is ever sent to our servers. Your code, your text, your
                passwords &mdash; everything stays on your device.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ⚡ Blazing Fast
              </h3>
              <p>
                No server round-trips. Tools respond instantly because they run
                locally. Works offline once loaded.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                💯 Completely Free
              </h3>
              <p>
                No sign-up, no limits, no &quot;premium&quot; tier. Every tool is
                free to use forever. We believe developer tools should be
                accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
