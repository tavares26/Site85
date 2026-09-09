import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, photo } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

const DROP_IMAGE = photo("1662578354822-f8b43ecaeaaa", 1400);

export function DropSection() {
  const dropPieces = PRODUCTS.filter((p) => p.collection === "Drop 085");

  return (
    <section className="mt-28 bg-charcoal text-sand sm:mt-36">
      <Marquee
        items={["DROP 085", "85 PIECES PER STYLE", "ONE RUN", "NO RESTOCK"]}
        className="border-b border-sand/12 py-4 text-sand/50"
      />

      <div className="gutter mx-auto max-w-[120rem] py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="label text-ember-soft">03 — Limited run</p>
            <h2 className="mt-5 font-display text-[2.75rem] font-light leading-[0.98] tracking-[-0.02em] sm:text-[3.75rem]">
              Drop <span className="italic">085</span>
            </h2>
            <p className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-taupe-soft">
              Eighty-five units per style. Not a marketing number — the Scottish
              frame needs a week for a run that size, and the mill needs it back.
              When it sells through, it returns in February or not at all.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-sand/15 pt-7">
              {[
                { term: "Styles", detail: String(dropPieces.length).padStart(2, "0") },
                { term: "Per style", detail: "85" },
                { term: "Restock", detail: "None" },
              ].map((item) => (
                <div key={item.term}>
                  <dt className="label-xs text-taupe-soft">{item.term}</dt>
                  <dd className="mt-2 font-display text-3xl font-light">{item.detail}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/shop"
              className="label mt-10 inline-flex h-13 items-center border border-sand px-8 py-4 transition-colors duration-500 [transition-timing-function:var(--ease-editorial)] hover:bg-sand hover:text-charcoal"
            >
              See the drop
            </Link>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-charcoal-soft">
              <Image
                src={DROP_IMAGE}
                alt="Drop 085 outerwear photographed on location"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-[50%_35%]"
              />
            </div>

            <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
              {dropPieces.map((product) => (
                <li key={product.id}>
                  <Link href={`/product/${product.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-soft">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 22vw"
                        className="object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.05]"
                      />
                    </div>
                    <p className="mt-3 text-[0.8125rem] leading-snug">{product.name}</p>
                    <p className="mt-1 text-[0.75rem] tabular-nums text-taupe-soft">
                      {formatBRL(product.price)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
