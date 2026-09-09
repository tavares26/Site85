import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { ARTICLES } from "@/data/journal";
import { CATEGORIES } from "@/data/site";

const BASE = "https://north85.demo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/journal", "/locations", "/search"].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${BASE}/shop/${category.slug}`,
    lastModified: new Date("2026-09-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${BASE}/product/${product.slug}`,
    lastModified: new Date(product.releasedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = ARTICLES.map((article) => ({
    url: `${BASE}/journal/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...articleRoutes];
}
