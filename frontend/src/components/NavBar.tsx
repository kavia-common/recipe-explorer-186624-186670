"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-page flex items-center gap-4 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <Image src="/logo.svg" alt="Recipe Explorer logo" width={28} height={28} />
          <span className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
            Recipe Explorer
          </span>
        </Link>
        <div className="ml-auto">
          <Link className="btn btn-outline" href="/favorites" aria-label="Go to favorites">
            ★ Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
