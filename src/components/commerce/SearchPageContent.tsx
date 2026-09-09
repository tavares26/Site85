"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ARTICLES } from "@/data/journal";
import { CATEGORIES } from "@/data/site";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/format";

const SUGGESTIONS = [
  "Linen",
  "Merino",
  "Overshirt",
  "Fragrance",
  "Leather",
  "Charcoal",
  "Drop 085",
];

/**
 * The standalone search route. Same index as the overlay, laid out as a page
 * so a search can be linked to and returned to.
 */
export function SearchPageContent() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const term = query.trim().toLowerCase();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const products = useMemo(() => {
    if (term.length < 2) return [];
    return PRODUCTS.filter((product) =>
      [
        product.name,
        product.subtitle,
        product.category,
        product.collection ?? "",
        product.composition,
        product.origin,
        ...product.colors.map((c) => c.name),
        ...product.seo.keywords,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [term]);

  const articles = useMemo(() => {
    if (term.length < 2) return [];
    return ARTICLES.filter((article) =>
      `${article.title} ${article.standfirst} ${article.category}`
        .toLowerCase()
        .includes(term)
    );
  }, [term]);

  const empty = term.length >= 2 && products.length === 0 && articles.length === 0;

  return (
    <div className="gutter mx-auto max-w-[120rem] pb-28 pt-12 sm:pt-16">
      <Reveal>
        <p className="label text-taupe">Search</p>
        <div className="mt-6 flex items-center gap-4 border-b border-charcoal/25 pb-4">
          <SearchIcon size={22} strokeWidth={1.25} className="shrink-0 text-taupe" />
          <label className="sr-only" htmlFor="search-page-input">
            Search products and journal
          </label>
          <input
            ref={inputRef}
            id="search-page-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What are you looking for?"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent font-display text-3xl font-light leading-tight placeholder:text-taupe/70 focus:outline-none sm:text-5xl lg:text-6xl"
          />
        </div>
      </Reveal>

      {term.length < 2 && (
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="label-xs text-taupe">Try a fabric or a finish</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="label-xs border border-charcoal/20 px-4 py-3 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="label-xs text-taupe">Or start from a room</h2>
            <ul className="mt-5 divide-y divide-charcoal/12 border-t border-charcoal/12">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/shop/${category.slug}`}
                    className="flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-ember"
                  >
                    <span className="font-display text-2xl font-light">
                      {category.label}
                    </span>
                    <span className="label-xs text-taupe">{category.eyebrow}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}

      {empty && (
        <div className="mt-16 max-w-lg">
          <p className="font-display text-3xl font-light">
            Nothing matches &ldquo;{query}&rdquo;.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-taupe">
            The catalogue is only fourteen pieces deep. Try a broader term — a
            material, a colour, or the name of a category.
          </p>
          <Link href="/shop" className="label link-rule mt-7 inline-block">
            Browse everything →
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <section className="mt-14">
          <h2 className="label-xs text-taupe">
            {products.length} {products.length === 1 ? "product" : "products"}
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="mt-16">
          <h2 className="label-xs text-taupe">From the journal</h2>
          <ul className="mt-5 divide-y divide-charcoal/12 border-t border-charcoal/12">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/journal/${article.slug}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5 transition-colors hover:text-ember"
                >
                  <span className="font-display text-2xl font-light">{article.title}</span>
                  <span className="label-xs text-taupe">
                    {article.category} · {formatDate(article.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
