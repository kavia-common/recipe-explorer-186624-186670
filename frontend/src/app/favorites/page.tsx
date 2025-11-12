"use client";

import { useEffect, useState } from "react";
import { getAllRecipes, type RecipeSummary } from "@/lib/dataService";
import RecipeCard from "@/components/RecipeCard";

export default function FavoritesPage() {
  const [all, setAll] = useState<RecipeSummary[]>([]);
  const [favIds, setFavIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("favorites");
    if (raw) setFavIds(JSON.parse(raw));
    (async () => {
      const data = await getAllRecipes();
      setAll(data);
      setLoading(false);
    })();
  }, []);

  const favs = all.filter((r) => favIds.includes(r.id));

  const remove = (id: string) => {
    const next = favIds.filter((x) => x !== id);
    setFavIds(next);
    localStorage.setItem("favorites", JSON.stringify(next));
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Favorites</h1>
      </header>

      {loading && <p className="text-gray-500">Loading favorites…</p>}

      {!loading && favs.length === 0 && (
        <p className="text-gray-500">No favorites yet. Explore recipes and add some!</p>
      )}

      {!loading && favs.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {favs.map((r) => (
            <div key={r.id} className="relative group">
              <RecipeCard recipe={r} />
              <button
                className="absolute top-2 right-2 btn btn-outline bg-white/90"
                onClick={() => remove(r.id)}
                aria-label={`Remove ${r.title} from favorites`}
              >
                Remove
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
