import type { RouteParams } from "next";

/**
 * Route segment config to type dynamic params for /recipes/[id]
 * See Next.js App Router typing for PageProps and segment configs.
 */
declare module "next" {
  // This declaration provides a typed params object for this segment
  interface GeneratedRouteParams {
    "recipes/[id]": RouteParams<{ id: string }>;
  }
}
