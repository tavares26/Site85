import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, related } from "@/data/products";
import { CATEGORIES } from "@/data/site";
import { formatBRL } from "@/lib/format";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductPurchase } from "@/components/commerce/ProductPurchase";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: [{ url: product.images[0], alt: product.name }],
      type: "website",
    },
  };
}

const BADGE_COPY: Record<string, string> = {
  new: "New",
  drop: "Drop 085",
  sale: "Sale",
  last: "Last pieces",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const suggestions = related(product, 4);

  // Structured data helps the page describe itself even though the demo is
  // noindex — it is the markup a real store would ship.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo.description,
    image: product.images,
    brand: { "@type": "Brand", name: "NORTH 85" },
    material: product.composition,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="gutter mx-auto max-w-[120rem] pt-8">
        <nav aria-label="Breadcrumb" className="label-xs flex flex-wrap items-center gap-2 text-taupe">
          <Link href="/shop" className="link-rule">
            Shop
          </Link>
          <span aria-hidden>/</span>
          {category && (
            <>
              <Link href={`/shop/${category.slug}`} className="link-rule">
                {category.label}
              </Link>
              <span aria-hidden>/</span>
            </>
          )}
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      <article className="gutter mx-auto max-w-[120rem] pt-8 pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              name={product.name}
              badge={product.badge ? BADGE_COPY[product.badge] : undefined}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[6.5rem]">
              <header>
                {product.collection && (
                  <p className="label-xs text-taupe">{product.collection}</p>
                )}
                <h1 className="mt-4 font-display text-[2.25rem] font-light leading-[1.05] tracking-[-0.015em] sm:text-[2.75rem]">
                  {product.name}
                </h1>
                <p className="mt-3 text-[0.9375rem] text-taupe">{product.subtitle}</p>
              </header>

              <div className="mt-9">
                <ProductPurchase product={product} />
              </div>

              <div className="mt-10 space-y-5 border-t border-charcoal/12 pt-8">
                <p className="text-[0.9375rem] leading-relaxed text-charcoal/80">
                  {product.description}
                </p>

                <dl className="grid gap-x-6 gap-y-4 border-t border-charcoal/12 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="label-xs text-taupe">Composition</dt>
                    <dd className="mt-2 text-[0.8125rem] leading-relaxed">
                      {product.composition}
                    </dd>
                  </div>
                  <div>
                    <dt className="label-xs text-taupe">Origin</dt>
                    <dd className="mt-2 text-[0.8125rem] leading-relaxed">{product.origin}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="label-xs text-taupe">Care</dt>
                    <dd className="mt-2 text-[0.8125rem] leading-relaxed">{product.care}</dd>
                  </div>
                </dl>

                <div className="border-t border-charcoal/12 pt-6">
                  <h2 className="label-xs text-taupe">Details</h2>
                  <ul className="mt-4 space-y-2.5">
                    {product.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-3 text-[0.8125rem] leading-relaxed text-charcoal/80"
                      >
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-taupe" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-x-6 gap-y-4 border-t border-charcoal/12 pt-6 sm:grid-cols-2">
                  <div>
                    <h3 className="label-xs text-taupe">Shipping</h3>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed">
                      Free over {formatBRL(600)}. Express and store pickup at
                      checkout.
                    </p>
                  </div>
                  <div>
                    <h3 className="label-xs text-taupe">Returns</h3>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed">
                      30 days, unworn, tags attached. Fragrance is final sale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="gutter mx-auto max-w-[120rem] pb-8">
        <Reveal className="rule flex flex-wrap items-end justify-between gap-6 pt-14">
          <h2 className="font-display text-[2rem] font-light leading-tight sm:text-[2.5rem]">
            Wears well <span className="italic text-ember">with</span>
          </h2>
          <Link href="/shop" className="label link-rule pb-1">
            All products →
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
          {suggestions.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
