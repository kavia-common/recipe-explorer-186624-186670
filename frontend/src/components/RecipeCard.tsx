"use client";

import Link from "next/link";
import Tag from "./Tag";
import React from "react";
import type { RecipeSummary } from "@/lib/dataService";
import Image from "next/image";

export default function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="card-surface overflow-hidden h-full flex flex-col">
      <Link href={`/recipes/${recipe.id}`} className="block focus:outline-none">
        <div className="relative w-full h-40">
          <Image
            src={recipe.image}
            alt={`${recipe.title} photo`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-16"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full"
               style={{ background: "rgba(245,158,11,0.9)", color: "white" }}
          >
            ★ {recipe.rating.toFixed(1)}
          </div>
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          <Link href={`/recipes/${recipe.id}`} className="hover:text-blue-700 transition-colors">
            {recipe.title}
          </Link>
        </h3>
        <div className="mt-auto flex flex-wrap gap-2">
          {recipe.tags.slice(0, 4).map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
    </article>
  );
}
