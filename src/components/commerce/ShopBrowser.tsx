"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/products";
import { CATEGORIES, type CategorySlug } from "@/data/site";
import { ProductCard } from "./ProductCard";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "name";

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "name", label: "A — Z" },
];

const PRICE_BANDS = [
  { key: "under-500", label: "Under R$ 500", test: (p: number) => p < 500 },
  { key: "500-1000", label: "R$ 500 — 1.000", test: (p: number) => p >= 500 && p < 1000 },
  { key: "1000-2000", label: "R$ 1.000 — 2.000", test: (p: number) => p >= 1000 && p < 2000 },
  { key: "over-2000", label: "Over R$ 2.000", test: (p: number) => p >= 2000 },
];

type Props = {
  products: Product[];
  /** Locks the category rail when rendering /shop/[category]. */
  lockedCategory?: CategorySlug;
};

export function ShopBrowser({ products, lockedCategory }: Props) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [categories, setCategories] = useState<CategorySlug[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [bands, setBands] = useState<string[]>([]);
  const [onlySale, setOnlySale] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const reduced = useReducedMotion();

  // Facets are derived from the products actually in scope, so a category page
  // never offers a filter that would return nothing.
  const facets = useMemo(() => {
    const colorMap = new Map<string, string>();
    const sizeSet = new Set<string>();
    for (const product of products) {
      for (const color of product.colors) colorMap.set(color.name, color.hex);
      for (const size of product.sizes) sizeSet.add(size);
    }
    return {
      colors: [...colorMap.entries()].sort((a, b) => a[0].localeCompare(b[0])),
      sizes: [...sizeSet],
    };
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      if (categories.length && !categories.includes(product.category)) return false;
      if (colors.length && !product.colors.some((c) => colors.includes(c.name))) return false;
      if (sizes.length && !product.sizes.some((s) => sizes.includes(s))) return false;
      if (onlySale && typeof product.compareAt !== "number") return false;
      if (bands.length) {
        const matched = PRICE_BANDS.filter((b) => bands.includes(b.key)).some((b) =>
          b.test(product.price)
        );
        if (!matched) return false;
      }
      return true;
    });

    list = [...list];
    switch (sort) {
      case "newest":
        list.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [products, categories, colors, sizes, bands, onlySale, sort]);

  const activeCount =
    categories.length + colors.length + sizes.length + bands.length + (onlySale ? 1 : 0);

  function toggle<T>(value: T, list: T[], set: (next: T[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function clearAll() {
    setCategories([]);
    setColors([]);
    setSizes([]);
    setBands([]);
    setOnlySale(false);
  }

  const filterPanel = (
    <div className="space-y-9">
      {!lockedCategory && (
        <FilterGroup title="Category">
          <ul className="space-y-2.5">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Checkbox
                  checked={categories.includes(category.slug)}
                  onChange={() => toggle(category.slug, categories, setCategories)}
                  label={category.label}
                  count={products.filter((p) => p.category === category.slug).length}
                />
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}

      {/* Seventeen colourways would run the whole height of the rail as a
          list, so they are shown as a swatch grid and named on selection. */}
      <FilterGroup title="Colour">
        <ul className="grid grid-cols-6 gap-2.5">
          {facets.colors.map(([name, hex]) => {
            const active = colors.includes(name);
            return (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => toggle(name, colors, setColors)}
                  aria-pressed={active}
                  aria-label={name}
                  title={name}
                  style={{ backgroundColor: hex }}
                  className={`block h-6 w-6 rounded-full border transition-all duration-300 ${
                    active
                      ? "border-charcoal ring-1 ring-charcoal ring-offset-2 ring-offset-sand"
                      : "border-charcoal/25 hover:border-charcoal/60"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {colors.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {colors.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => toggle(name, colors, setColors)}
                  className="label-xs inline-flex items-center gap-1.5 border border-charcoal/25 px-2.5 py-1.5 transition-colors hover:border-charcoal"
                >
                  {name}
                  <span aria-hidden className="text-taupe">
                    &times;
                  </span>
                  <span className="sr-only">Remove colour filter</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggle(size, sizes, setSizes)}
              aria-pressed={sizes.includes(size)}
              className={`label-xs border px-3 py-2.5 transition-colors ${
                sizes.includes(size)
                  ? "border-charcoal bg-charcoal text-sand"
                  : "border-charcoal/20 text-taupe hover:border-charcoal hover:text-charcoal"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <ul className="space-y-2.5">
          {PRICE_BANDS.map((band) => (
            <li key={band.key}>
              <Checkbox
                checked={bands.includes(band.key)}
                onChange={() => toggle(band.key, bands, setBands)}
                label={band.label}
                count={products.filter((p) => band.test(p.price)).length}
              />
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Availability">
        <Checkbox
          checked={onlySale}
          onChange={() => setOnlySale((v) => !v)}
          label="Reduced only"
          count={products.filter((p) => typeof p.compareAt === "number").length}
        />
      </FilterGroup>

      {activeCount > 0 && (
        <button type="button" onClick={clearAll} className="label-xs link-rule text-ember">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="gutter mx-auto max-w-[120rem]">
      {/* Toolbar ------------------------------------------------------- */}
      <div className="rule-strong sticky top-[4.25rem] z-30 -mx-5 flex items-center justify-between gap-4 bg-sand/92 px-5 py-3.5 backdrop-blur-md sm:-mx-10 sm:px-10 xl:-mx-16 xl:px-16">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPanelOpen((open) => !open)}
            aria-expanded={panelOpen}
            className="label inline-flex items-center gap-2.5 transition-colors hover:text-ember lg:hidden"
          >
            <SlidersHorizontal size={14} strokeWidth={1.25} />
            Filters
            {activeCount > 0 && <span className="text-ember">({activeCount})</span>}
          </button>
          <p className="label-xs text-taupe">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <label htmlFor="sort" className="label-xs hidden text-taupe sm:block">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="label-xs cursor-pointer appearance-none border border-charcoal/20 bg-transparent py-2.5 pl-3.5 pr-8 transition-colors hover:border-charcoal focus:border-charcoal focus:outline-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%2311110F' stroke-width='1'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
          >
            {SORTS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile filter sheet ------------------------------------------- */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
            }
            className="overflow-hidden lg:hidden"
          >
            <div className="relative border-b border-charcoal/12 py-8">
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Close filters"
                className="absolute right-0 top-6 grid h-8 w-8 place-items-center text-taupe hover:text-charcoal"
              >
                <X size={15} strokeWidth={1.25} />
              </button>
              {filterPanel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid ---------------------------------------------------------- */}
      <div className="grid gap-10 pt-10 lg:grid-cols-[13rem_1fr] lg:gap-12 xl:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[9rem] pb-16">{filterPanel}</div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 text-center">
              <p className="font-display text-3xl font-light">Nothing matches.</p>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-taupe">
                Try loosening a filter — the catalogue is only fourteen pieces
                deep, so a narrow combination can come back empty.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="label border border-charcoal px-7 py-3.5 transition-colors hover:bg-charcoal hover:text-sand"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 xl:grid-cols-3">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  priority={index < 3}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="label-xs mb-4 text-charcoal">{title}</h3>
      {children}
    </section>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`flex w-full items-center justify-between gap-3 text-left transition-colors ${
        checked ? "text-charcoal" : "text-taupe hover:text-charcoal"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          aria-hidden
          className={`grid h-3.5 w-3.5 shrink-0 place-items-center border transition-colors ${
            checked ? "border-charcoal bg-charcoal" : "border-charcoal/30"
          }`}
        >
          {checked && (
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3l2 2 4-4" stroke="#F1EEE7" strokeWidth="1.2" />
            </svg>
          )}
        </span>
        <span className="label-xs">{label}</span>
      </span>
      {typeof count === "number" && (
        <span className="text-[0.625rem] tabular-nums text-taupe">{count}</span>
      )}
    </button>
  );
}
