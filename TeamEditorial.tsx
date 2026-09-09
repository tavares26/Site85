import Image from "next/image";
import Link from "next/link";
import type { Professional } from "@/data/fictional-data";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/* Brooklyn: shop poster. Name set oversized and hung over the photo.   */
/* ------------------------------------------------------------------ */

export function BarberPlate({ p, index }: { p: Professional; index: number }) {
  const flip = index % 2 === 1;

  return (
    <Reveal as="article" className="rule-brass py-14 first:border-t-0 sm:py-20">
      <div
        className={`grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] lg:gap-14 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-bk-smoke sm:aspect-[5/6]">
            <Image
              src={p.portrait}
              alt={`${p.name}, ${p.role}`}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center contrast-[1.08] saturate-[0.7]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(200deg,rgba(23,23,21,0)_45%,rgba(23,23,21,0.85)_100%)]"
            />
          </div>

          <h2
            className={`pointer-events-none relative z-10 -mt-[0.36em] font-slab text-huge uppercase leading-[0.82] text-bk-paper ${
              flip ? "text-right" : ""
            }`}
          >
            {p.name.split(" ").map((word, i) => (
              <span key={word} className={i === 1 ? "block text-bk-brass" : "block"}>
                {word}
              </span>
            ))}
          </h2>

          <p
            className={`stamp mt-3 text-bk-brass/80 ${flip ? "text-right" : ""}`}
            aria-hidden
          >
            &ldquo;{p.handle}&rdquo;
          </p>
        </div>

        <div className="lg:pt-6">
          <p className="stamp text-bk-paper/45">
            {p.chair} <span className="mx-2 text-bk-brass">|</span> {p.role}
          </p>

          <p className="mt-5 max-w-measure font-grot text-xl leading-relaxed text-bk-paper/80">
            {p.bio}
          </p>

          <blockquote className="mt-7 border-l-2 border-bk-brass pl-5">
            <p className="max-w-measure font-grot text-2xl italic leading-snug text-bk-paper">
              {p.quote}
            </p>
          </blockquote>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-bk-brass/25 py-5">
            <div>
              <dt className="stamp text-bk-paper/45">Years</dt>
              <dd className="font-slab text-3xl text-bk-paper">{p.years}</dd>
            </div>
            <div>
              <dt className="stamp text-bk-paper/45">Rating</dt>
              <dd className="font-slab text-3xl text-bk-brass">{p.rating.toFixed(1)}</dd>
            </div>
            <div>
              <dt className="stamp text-bk-paper/45">Reviews</dt>
              <dd className="font-slab text-3xl text-bk-paper">{p.reviews}</dd>
            </div>
          </dl>

          <p className="mt-5 font-grot text-lg text-bk-paper/60">
            {p.specialties.join(", ")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {p.portfolio.map((src, i) => (
              <div key={src} className="relative h-24 w-20 overflow-hidden bg-bk-smoke sm:h-28 sm:w-24">
                <Image
                  src={src}
                  alt={`Work by ${p.name}, frame ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover saturate-[0.6]"
                />
              </div>
            ))}
          </div>

          <Link
            href={`/book?pro=${p.id}`}
            className="stamp mt-8 inline-flex items-center gap-3 bg-bk-brass px-6 py-3 text-bk-ink transition-colors hover:bg-bk-paper"
          >
            Book {p.name.split(" ")[0]}
            <svg width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden>
              <path d="M0 4h20M16 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Fifth: a magazine spread. Portrait bleeds, name reversed out of it.  */
/* ------------------------------------------------------------------ */

export function StylistSpread({ p, index }: { p: Professional; index: number }) {
  const flip = index % 2 === 1;
  const [first, ...rest] = p.name.split(" ");

  return (
    <Reveal as="article" className="py-16 sm:py-24">
      <div
        className={`grid gap-8 lg:grid-cols-12 lg:gap-12 ${flip ? "" : ""}`}
      >
        <div
          className={`relative lg:col-span-6 ${flip ? "lg:col-start-7" : "lg:col-start-1"}`}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-ff-champagne/40">
            <Image
              src={p.portrait}
              alt={`${p.name}, ${p.role}`}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-2 font-garamond text-base italic text-ff-noir/45">
            {p.handle}, photographed at {p.chair}
          </p>
        </div>

        <div
          className={`flex flex-col justify-center lg:col-span-5 ${
            flip ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-8"
          }`}
        >
          <h2 className="font-didone text-huge leading-[0.9] text-ff-noir">
            <span className="block">{first}</span>
            <span className="block italic text-ff-rouge">{rest.join(" ")}</span>
          </h2>

          <p className="mt-4 font-garamond text-xl text-ff-noir/55">{p.role}</p>

          <p className="mt-6 max-w-measure-serif font-garamond text-xl leading-relaxed text-ff-noir/80 first-letter:float-left first-letter:mr-2 first-letter:font-didone first-letter:text-6xl first-letter:leading-[0.78] first-letter:text-ff-rouge">
            {p.bio}
          </p>

          <blockquote className="mt-8">
            <p className="max-w-measure-serif font-didone text-2xl italic leading-snug text-ff-noir sm:text-3xl">
              &ldquo;{p.quote}&rdquo;
            </p>
          </blockquote>

          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-garamond text-lg text-ff-noir/60">
            {p.specialties.map((s, i) => (
              <span key={s} className="flex items-center gap-4">
                {i > 0 && <span className="h-4 w-px bg-ff-noir/25" aria-hidden />}
                {s}
              </span>
            ))}
          </p>

          <p className="mt-4 font-garamond text-lg text-ff-noir/60">
            <span className="text-ff-rouge">{p.rating.toFixed(1)}</span> from {p.reviews}{" "}
            reviews, {p.years} years behind the chair.
          </p>

          <div className="mt-6 flex gap-3">
            {p.portfolio.map((src, i) => (
              <div key={src} className="relative h-28 w-24 overflow-hidden bg-ff-champagne/40">
                <Image
                  src={src}
                  alt={`Work by ${p.name}, frame ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <Link
            href={`/book?pro=${p.id}`}
            className="stamp mt-8 inline-flex w-fit items-center gap-3 bg-ff-noir px-6 py-3 text-ff-chalk transition-colors hover:bg-ff-rouge"
          >
            Book {first}
            <svg width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden>
              <path d="M0 4h20M16 1l4 3-4 3" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
