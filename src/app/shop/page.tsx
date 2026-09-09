import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopBrowser } from "@/components/commerce/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop All — Clothing, Accessories, Fragrance & Objects",
  description:
    "The complete NORTH 85 catalogue: fourteen pieces across clothing, accessories, fragrance and lifestyle. Filter by category, colour, size and price.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The collection"
        title="Everything we"
        italic="make."
        description="Fourteen pieces, revised rather than replaced. Filter by category, colour, size or price — or read the story behind each one on the product page."
      >
        <nav aria-label="Categories" className="mt-9 flex flex-wrap gap-2">
          <span className="label-xs border border-charcoal bg-charcoal px-4 py-3 text-sand">
            All ({PRODUCTS.length})
          </span>
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="label-xs border border-charcoal/20 px-4 py-3 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
            >
              {category.label} (
              {PRODUCTS.filter((p) => p.category === category.slug).length})
            </Link>
          ))}
        </nav>
      </PageHeader>

      <ShopBrowser products={PRODUCTS} />
    </>
  );
}
