import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Recipe Explorer",
  description: "Discover and browse delicious recipes.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
          <div className="container-page flex items-center gap-4 py-3">
            <Link href="/" className="group flex items-center gap-3">
              <Image src="/logo.svg" alt="Recipe Explorer logo" width={32} height={32} />
              <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                Recipe Explorer
              </span>
            </Link>
            <div className="ml-auto">
              <Link
                className="btn btn-outline"
                href="/favorites"
                aria-label="Go to favorites"
              >
                ★ Favorites
              </Link>
            </div>
          </div>
        </header>
        <main className="container-page py-6">{children}</main>
        <footer className="container-page py-10 text-sm text-gray-500">
          <p>Built with the Ocean Professional theme.</p>
        </footer>
      </body>
    </html>
  );
}
