export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>⚡ QuickTools.dev</span>
            <span>·</span>
            <span>Free &amp; Privacy-First</span>
          </div>
          <p className="text-xs text-gray-400">
            All tools run 100% in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </footer>
  );
}
