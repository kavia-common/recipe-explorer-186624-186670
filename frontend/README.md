# Recipe Explorer – Frontend

A Next.js app for discovering and browsing recipes, styled with the Ocean Professional theme (primary #2563EB, secondary #F59E0B).

## Features
- Top navigation with logo/title, search, and Favorites link
- Home page showing a responsive grid of recipe cards (image, title, tags, rating)
- Recipe detail page `/recipes/[id]` with image, ingredients, steps, tags, time, servings, and favorite action
- Favorites page `/favorites` using client-side storage (localStorage) to persist selections
- Data service that fetches from an API when configured, or uses local mock data
- Accessible semantics, alt text, focus outlines, and loading/error states
- Smooth transitions and subtle gradients aligned to the theme

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Configuration

The app checks the environment variable `NEXT_PUBLIC_API_BASE`:
- When set, recipes are requested from:
  - `${NEXT_PUBLIC_API_BASE}/recipes` (list)
  - `${NEXT_PUBLIC_API_BASE}/recipes/{id}` (detail)
- When not set, the app uses mock data.

Other env variables are present but not required for basic usage.

Note: Set environment variables in the project's `.env` file. Do not commit secrets.

## Mock Data

- Location: `src/lib/mockData.ts`
- Contains at least 8 sample recipes with details for local development.
- You can modify or extend these samples as needed.

## Data Service

- Location: `src/lib/dataService.ts`
- Public functions:
  - `getAllRecipes()` – returns recipe summaries
  - `getRecipeById(id)` – returns recipe details
- Automatically switches between API and mock data based on `NEXT_PUBLIC_API_BASE`.

## Pages

- `/` – Home page with search (filters by title or tag on the client)
- `/recipes/[id]` – Recipe detail page
- `/favorites` – Favorites list using `localStorage`

## Styling

- Tailwind CSS is available and minimal custom CSS tokens are defined in `src/app/globals.css`.
- Theme: Ocean Professional (primary #2563EB, secondary #F59E0B)
- Reusable classes like `card-surface`, `btn`, and `tag-pill` are provided.

## Scripts

- `npm run dev` – Start Next.js development server
- `npm run build` – Build the app
- `npm run start` – Start the production server
- `npm run lint` – Lint the code

## Notes

- The app uses Next.js `app` directory routing.
- Favorites are stored as a list of recipe IDs in `localStorage` under the key `favorites`.

