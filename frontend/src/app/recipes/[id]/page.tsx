"use client";

import { useEffect, useState } from "react";
import { getRecipeById, type RecipeDetail } from "@/lib/dataService";
import Image from "next/image";

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favIds, setFavIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      if (raw) setFavIds(JSON.parse(raw));
    } catch {}
  }, []);

  const isFav = favIds.includes(id);

  const toggleFav = () => {
    const next = isFav ? favIds.filter((x) => x !== id) : [...favIds, id];
    setFavIds(next);
    try {
      localStorage.setItem("favorites", JSON.stringify(next));
    } catch {}
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getRecipeById(id);
        if (mounted) setRecipe(data);
      } catch (e) {
        setError("Failed to load recipe.");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="card-surface overflow-hidden">
        <div className="h-64 shimmer" />
        <div className="p-6">
          <div className="h-6 w-1/3 shimmer mb-3 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-2/3 shimmer rounded" />
            <div className="h-4 w-1/2 shimmer rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div role="alert" className="card-surface p-4 border-l-4" style={{ borderLeftColor: "var(--color-error)" }}>
        <p className="text-sm text-red-600">{error ?? "Recipe not found."}</p>
      </div>
    );
  }

  return (
    <article className="space-y-6">
      <div className="card-surface overflow-hidden">
        <div className="w-full h-64 relative">
          <Image
            src={recipe.image}
            alt={`${recipe.title} photo`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4 flex-wrap">
            <h1 className="text-2xl font-semibold text-gray-900">{recipe.title}</h1>
            <button
              className={isFav ? "btn btn-primary" : "btn btn-outline"}
              onClick={toggleFav}
              aria-pressed={isFav}
            >
              {isFav ? "★ In Favorites" : "☆ Add to Favorites"}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {recipe.tags.map((t) => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Rating</dt>
              <dd className="font-medium">{recipe.rating.toFixed(1)} / 5</dd>
            </div>
            <div>
              <dt className="text-gray-500">Time</dt>
              <dd className="font-medium">{recipe.time} mins</dd>
            </div>
            <div>
              <dt className="text-gray-500">Servings</dt>
              <dd className="font-medium">{recipe.servings}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Difficulty</dt>
              <dd className="font-medium">{recipe.difficulty}</dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold mb-3">Steps</h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}
