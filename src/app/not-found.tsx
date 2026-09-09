import Link from "next/link";
import { CATEGORIES } from "@/data/site";

export default function NotFound() {
  return (
    <div className="gutter mx-auto flex min-h-[70vh] max-w-[120rem] flex-col justify-center py-24">
      <p className="label text-taupe">Error 404</p>
      <h1 className="mt-6 max-w-3xl font-display text-[3rem] font-light leading-[0.98] tracking-[-0.02em] sm:text-[4.5rem]">
        This page was <span className="italic text-ember">edited out.</span>
      </h1>
      <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-taupe">
        Fitting for a house that removes as often as it adds. The address you
        tried does not exist — here is where everything else lives.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className="label-xs border border-charcoal bg-charcoal px-4 py-3 text-sand transition-colors hover:bg-charcoal-soft"
        >
          All products
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="label-xs border border-charcoal/20 px-4 py-3 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
          >
            {category.label}
          </Link>
        ))}
        <Link
          href="/journal"
          className="label-xs border border-charcoal/20 px-4 py-3 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
        >
          Journal
        </Link>
      </div>
    </div>
  );
}
