import type { MetadataRoute } from "next";

/**
 * NORTH 85 is a fictional store. Indexing it would put invented products and
 * prices into search results, so the demo stays out of the index. Remove this
 * file (and the `robots` block in app/layout.tsx) to publish a real catalogue.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
