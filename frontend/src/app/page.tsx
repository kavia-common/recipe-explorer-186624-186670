"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAllRecipes, type RecipeSummary } from "@/lib/dataService";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAllRecipes();
        if (mounted) setRecipes(data);
      } catch (e) {
        setError("Failed to load recipes.");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return recipes;
    const q = query.toLowerCase();
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [recipes, query]);

  return (
    <div className="space-y-6">
      {/* Page header with gradient */}
      <section className="rounded-xl p-6 card-surface" aria-label="Search recipes">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes by title or tag..."
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Search recipes"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">⌘K</span>
          </div>
          <Link href="/favorites" className="btn btn-outline">
            ★ Favorites
          </Link>
        </div>
      </section>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card-surface overflow-hidden">
              <div className="h-40 shimmer" />
              <div className="p-4">
                <div className="h-5 w-1/2 shimmer mb-2 rounded" />
                <div className="h-4 w-3/4 shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div role="alert" className="card-surface p-4 border-l-4" style={{ borderLeftColor: "var(--color-error)" }}>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <h2 className="text-xl font-semibold text-gray-800">
            {query ? `Results for “${query}”` : "Trending Recipes"}
          </h2>
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            aria-label="Recipe results"
          >
            {filtered.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </section>
          {filtered.length === 0 && (
            <p className="text-gray-500">No recipes match your search.</p>
          )}
        </>
      )}
    </div>
  );
}
