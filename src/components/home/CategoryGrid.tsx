import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/site";
import { photo } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";

const COVERS: Record<string, string> = {
  clothing: photo("1776633734832-ca4ad72e203a", 1200),
  accessories: photo("1624687943971-e86af76d57de", 1200),
  fragrance: photo("1638295916768-459f6cf440bc", 1200),
  lifestyle: photo("1603905179139-db12ab535ca9", 1200),
};

/** Vertical offsets applied per column so the row never sits on one baseline. */
const OFFSETS = ["lg:mt-0", "lg:mt-16", "lg:mt-6", "lg:mt-24"];

export function CategoryGrid() {
  return (
    <section className="gutter mx-auto max-w-[120rem] pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="02 — The floor"
        title="Four rooms,"
        italic="one point of view"
        description="How the store is laid out on Crosby Street, and how it is laid out here."
      />

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:items-start">
        {CATEGORIES.map((category, index) => (
          <Reveal
            key={category.slug}
            delay={index * 0.08}
            className={OFFSETS[index % OFFSETS.length]}
          >
            <Link href={`/shop/${category.slug}`} className="group block">
              <div className="relative aspect-[3/4.2] overflow-hidden bg-sand-deep">
                <Image
                  src={COVERS[category.slug]}
                  alt={`${category.label} at NORTH 85`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <h3 className="font-display text-2xl font-light text-sand sm:text-[1.75rem]">
                    {category.label}
                  </h3>
                  <span className="label-xs pb-1.5 text-sand/70">
                    {category.eyebrow}
                  </span>
                </div>
              </div>
              <p className="mt-4 max-w-xs text-[0.8125rem] leading-relaxed text-taupe">
                {category.blurb}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
