import Image from "next/image";
import Link from "next/link";
import { photo } from "@/data/products";
import { Reveal } from "@/components/ui/Reveal";
import { Packaging } from "./Packaging";

const STORY_IMAGE = photo("1763059010400-daa7c268b53e", 1400);

export function BrandStory() {
  return (
    <section className="gutter mx-auto max-w-[120rem] pt-28 sm:pt-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand-deep">
            <Image
              src={STORY_IMAGE}
              alt="The NORTH 85 flagship interior on Crosby Street"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
          <p className="label-xs mt-4 text-taupe">
            85 Crosby Street — cast iron, 1885
          </p>
        </Reveal>

        <div className="lg:col-span-6 lg:pt-10">
          <Reveal>
            <p className="label text-taupe">05 — The house</p>
            <h2 className="mt-5 font-display text-[2.25rem] font-light leading-[1.04] tracking-[-0.015em] sm:text-[3rem]">
              We opened with
              <span className="italic text-ember"> nine things</span> and
              took four years to reach fourteen.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/75">
              <p>
                NORTH 85 began as a stockroom on the second floor of a building
                on Crosby Street, selling six garments to people who already knew
                what they wanted. We have added slowly since, and removed almost
                as often.
              </p>
              <p>
                Nothing here is designed to be replaced next season. The trouser
                has had the same block since 2021 and the tee has been revised
                three times, each revision smaller than the last. That is the
                whole strategy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-charcoal/12 py-7">
              {[
                { term: "Founded", detail: "2019" },
                { term: "Styles", detail: "14" },
                { term: "Mills", detail: "6" },
              ].map((stat) => (
                <div key={stat.term}>
                  <dt className="label-xs text-taupe">{stat.term}</dt>
                  <dd className="mt-2 font-display text-3xl font-light tabular-nums">
                    {stat.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <p className="label-xs text-taupe">Identity & packaging</p>
              <div className="mt-5">
                <Packaging />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <Link href="/locations" className="label link-rule mt-9 inline-block">
              Visit Crosby Street →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
