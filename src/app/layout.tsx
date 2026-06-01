import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "QuickTools - Free Online Developer Tools",
    template: "%s | QuickTools",
  },
  description:
    "Free, fast, and privacy-first online tools for developers. JSON formatter, Base64 encoder, hash generator, and more. No data sent to servers.",
  keywords: [
    "online tools",
    "developer tools",
    "json formatter",
    "base64 encoder",
    "hash generator",
    "password generator",
    "free tools",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
