import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, byCategory } from "@/data/products";
import { CATEGORIES, type CategorySlug } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopBrowser } from "@/components/commerce/ShopBrowser";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

function findCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) return { title: "Not found" };

  const count = byCategory(category.slug).length;

  return {
    title: `${category.label} — ${count} pieces`,
    description: `${category.blurb} Shop ${count} ${category.label.toLowerCase()} pieces from the NORTH 85 concept store.`,
    alternates: { canonical: `/shop/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const products = byCategory(category.slug as CategorySlug);

  return (
    <>
      <PageHeader
        eyebrow={`${category.eyebrow} — ${products.length} pieces`}
        title={category.label}
        description={category.blurb}
      >
        <nav aria-label="Categories" className="mt-9 flex flex-wrap gap-2">
          <Link
            href="/shop"
            className="label-xs border border-charcoal/20 px-4 py-3 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
          >
            All ({PRODUCTS.length})
          </Link>
          {CATEGORIES.map((item) => {
            const active = item.slug === category.slug;
            return (
              <Link
                key={item.slug}
                href={`/shop/${item.slug}`}
                aria-current={active ? "page" : undefined}
                className={`label-xs border px-4 py-3 transition-colors ${
                  active
                    ? "border-charcoal bg-charcoal text-sand"
                    : "border-charcoal/20 hover:border-charcoal hover:bg-charcoal hover:text-sand"
                }`}
              >
                {item.label} ({PRODUCTS.filter((p) => p.category === item.slug).length})
              </Link>
            );
          })}
        </nav>
      </PageHeader>

      <ShopBrowser products={products} lockedCategory={category.slug} />
    </>
  );
}
