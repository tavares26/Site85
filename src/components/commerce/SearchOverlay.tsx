"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/data/products";
import { ARTICLES } from "@/data/journal";
import { CATEGORIES } from "@/data/site";
import { formatBRL } from "@/lib/format";

const SUGGESTIONS = [
  "Linen shirt",
  "Overshirt",
  "N85 fragrance",
  "Merino knit",
  "Leather tote",
  "Drop 085",
];

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const term = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (term.length < 2) return [];
    return PRODUCTS.filter((product) =>
      [
        product.name,
        product.subtitle,
        product.category,
        product.collection ?? "",
        product.composition,
        ...product.colors.map((c) => c.name),
        ...product.seo.keywords,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    ).slice(0, 6);
  }, [term]);

  const articleResults = useMemo(() => {
    if (term.length < 2) return [];
    return ARTICLES.filter((article) =>
      `${article.title} ${article.standfirst} ${article.category}`
        .toLowerCase()
        .includes(term)
    ).slice(0, 3);
  }, [term]);

  function go(href: string) {
    closeSearch();
    setQuery("");
    router.push(href);
  }

  return (
    <Drawer open={searchOpen} onClose={closeSearch} title="Search" side="top">
      <div className="max-h-[85vh] overflow-y-auto">
        <div className="gutter mx-auto w-full max-w-5xl py-8 sm:py-12">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (results[0]) go(`/product/${results[0].slug}`);
            }}
            className="flex items-center gap-4 border-b border-charcoal/25 pb-4"
          >
            <Search size={20} strokeWidth={1.25} className="shrink-0 text-taupe" />
            <label className="sr-only" htmlFor="search-input">
              Search products and journal
            </label>
            <input
              id="search-input"
              data-autofocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What are you looking for?"
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent font-display text-3xl font-light leading-tight placeholder:text-taupe/70 focus:outline-none sm:text-5xl"
            />
          </form>

          {term.length < 2 ? (
            <div className="grid gap-10 pt-9 sm:grid-cols-2">
              <div>
                <h3 className="label-xs text-taupe">Popular searches</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => setQuery(suggestion)}
                        className="label-xs border border-charcoal/20 px-3.5 py-2.5 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="label-xs text-taupe">Categories</h3>
                <ul className="mt-4 space-y-2.5">
                  {CATEGORIES.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/shop/${category.slug}`}
                        onClick={closeSearch}
                        className="group flex items-baseline gap-3 font-display text-2xl font-light transition-colors hover:text-ember"
                      >
                        <span className="label-xs text-taupe">{category.eyebrow}</span>
                        {category.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : results.length === 0 && articleResults.length === 0 ? (
            <p className="pt-10 text-[0.9375rem] text-taupe">
              Nothing matches &ldquo;{query}&rdquo;. Try a fabric, a colour, or a category.
            </p>
          ) : (
            <div className="space-y-10 pt-9">
              {results.length > 0 && (
                <div>
                  <h3 className="label-xs text-taupe">
                    {results.length} {results.length === 1 ? "product" : "products"}
                  </h3>
                  <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeSearch}
                          className="group block"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden bg-sand-deep">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 16vw"
                              className="object-cover transition-transform duration-[900ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.04]"
                            />
                          </div>
                          <p className="mt-3 text-[0.8125rem] leading-snug">{product.name}</p>
                          <p className="mt-1 text-[0.75rem] tabular-nums text-taupe">
                            {formatBRL(product.price)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {articleResults.length > 0 && (
                <div>
                  <h3 className="label-xs text-taupe">From the journal</h3>
                  <ul className="mt-4 divide-y divide-charcoal/10 border-t border-charcoal/10">
                    {articleResults.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/journal/${article.slug}`}
                          onClick={closeSearch}
                          className="flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-ember"
                        >
                          <span className="font-display text-xl font-light">
                            {article.title}
                          </span>
                          <span className="label-xs shrink-0 text-taupe">
                            {article.category}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
