import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photo } from "@/data/products";
import { STORE, BRAND, STUDIO } from "@/data/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { StoreMap } from "@/components/layout/StoreMap";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Crosby Street Flagship — SoHo, New York",
  description:
    "The NORTH 85 flagship at 85 Crosby Street, SoHo. Opening hours, services, private appointments and in-store alterations.",
  alternates: { canonical: "/locations" },
};

const VIEWS = [
  { src: photo("1763059010400-daa7c268b53e", 1200), alt: "The main floor, looking toward the fragrance table" },
  { src: photo("1783700085825-1df197a49f40", 1200), alt: "The mezzanine, where the tailoring is held" },
  { src: photo("1765568691251-07bdb8bcd935", 1200), alt: "Accessories and leather goods along the north wall" },
];

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="One address"
        title="85 Crosby Street,"
        italic="SoHo."
        description="Cast iron, 1885, ground floor and mezzanine. We removed everything that had been added since 1970 and left the light alone."
      />

      <div className="gutter mx-auto max-w-[120rem] pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <StoreMap />
            <p className="label-xs mt-4 text-taupe">
              Between Prince and Spring · 40.7237° N, 73.9975° W
            </p>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-3xl font-light leading-tight">
                {STORE.name}
              </h2>
              <address className="mt-5 text-[0.9375rem] not-italic leading-relaxed text-charcoal/80">
                {STORE.street}
                <br />
                {STORE.district}
              </address>
              <a
                href={`mailto:${BRAND.email}`}
                className="label link-rule mt-5 inline-block"
              >
                {BRAND.email}
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 border-t border-charcoal/12 pt-8">
                <h3 className="label-xs text-taupe">Hours</h3>
                <dl className="mt-5 space-y-3">
                  {STORE.hours.map((entry) => (
                    <div
                      key={entry.days}
                      className="flex items-baseline justify-between gap-6 border-b border-charcoal/10 pb-3"
                    >
                      <dt className="text-[0.875rem]">{entry.days}</dt>
                      <dd className="text-[0.875rem] tabular-nums text-taupe">{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 border-t border-charcoal/12 pt-8">
                <h3 className="label-xs text-taupe">In store</h3>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {STORE.services.map((service) => (
                    <li key={service} className="flex gap-3 text-[0.875rem] leading-relaxed">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-taupe" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={STUDIO.whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label inline-flex h-13 items-center bg-charcoal px-8 py-4 text-sand transition-colors hover:bg-charcoal-soft"
                >
                  Book an appointment
                </a>
                <Link
                  href="/shop"
                  className="label inline-flex h-13 items-center border border-charcoal/25 px-8 py-4 transition-colors hover:border-charcoal"
                >
                  Shop online
                </Link>
              </div>
              <p className="label-xs mt-4 text-taupe">
                Fictional address — the appointment link reaches {STUDIO.name}.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Interior views ------------------------------------------- */}
        <section className="mt-20">
          <Reveal className="rule flex flex-wrap items-end justify-between gap-6 pt-12">
            <h2 className="font-display text-[2rem] font-light leading-tight sm:text-[2.5rem]">
              The <span className="italic text-ember">room</span>
            </h2>
            <Link href="/journal/crosby-street-on-a-tuesday" className="label link-rule pb-1">
              Crosby Street on a Tuesday →
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {VIEWS.map((view, index) => (
              <Reveal key={view.src} delay={index * 0.08}>
                <div
                  className={`relative w-full overflow-hidden bg-sand-deep ${
                    index === 1 ? "aspect-[3/4] sm:mt-12" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={view.src}
                    alt={view.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-[0.75rem] leading-relaxed text-taupe">{view.alt}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
