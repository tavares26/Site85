import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { formatBRL, discountPercent } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

export function PrivateSale() {
  const reduced = PRODUCTS.filter((p) => typeof p.compareAt === "number");
  if (reduced.length === 0) return null;

  return (
    <section className="gutter mx-auto max-w-[120rem] pt-28 sm:pt-36">
      <Reveal className="border border-ember/25 bg-ember/[0.035]">
        <div className="grid lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:col-span-5 lg:p-14">
            <div>
              <p className="label text-ember">04 — Private Sale</p>
              <h2 className="mt-5 font-display text-[2.25rem] font-light leading-[1.02] tracking-[-0.015em] sm:text-[3rem]">
                A short list,
                <span className="italic text-ember"> quietly reduced.</span>
              </h2>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-charcoal/75">
                Two pieces from the previous cut, held back for clients on the
                list. No banner, no countdown — they simply come down in price
                until they are gone.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="label inline-flex h-13 items-center bg-ember px-8 py-4 text-sand transition-colors duration-500 [transition-timing-function:var(--ease-editorial)] hover:bg-ember-soft"
              >
                Shop the sale
              </Link>
              <p className="label-xs text-taupe">Code NORTH10 at checkout</p>
            </div>
          </div>

          <ul className="grid gap-px bg-ember/15 sm:grid-cols-2 lg:col-span-7">
            {reduced.map((product) => (
              <li key={product.id} className="bg-sand">
                <Link href={`/product/${product.slug}`} className="group block h-full p-5 sm:p-7">
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand-deep">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 30vw"
                      className="object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.04]"
                    />
                    {product.compareAt && (
                      <span className="label-xs absolute left-0 top-0 bg-ember px-3 py-2 text-sand">
                        −{discountPercent(product.price, product.compareAt)}%
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[0.875rem] leading-snug">{product.name}</h3>
                  <p className="mt-1.5 text-[0.75rem] text-taupe">{product.subtitle}</p>
                  <p className="mt-3 flex items-baseline gap-2.5">
                    <span className="font-sans text-[0.875rem] tabular-nums text-ember">
                      {formatBRL(product.price)}
                    </span>
                    {product.compareAt && (
                      <span className="text-[0.75rem] tabular-nums text-taupe line-through">
                        {formatBRL(product.compareAt)}
                      </span>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
