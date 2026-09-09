import type { Metadata } from "next";
import Image from "next/image";
import { fifthEdit } from "@/data/fictional-data";
import { ThisIsADemonstration } from "@/components/AgencyMarks";
import { Reveal, CutLine } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Edit",
  description: "Issue four. Work from the four stations at 1067 Fifth Avenue.",
};

/** Spans are set per image so the page reads as a laid-out spread, not a grid. */
const place: Record<string, string> = {
  tall: "lg:col-span-5",
  wide: "lg:col-span-7",
  square: "lg:col-span-4",
};

export default function EditPage() {
  return (
    <>
      <section className="tex-stock px-5 pb-10 pt-36 sm:px-8 sm:pt-44 lg:px-12">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ff-noir/20 pb-5">
            <p className="font-garamond text-xl italic text-ff-noir/50">Issue four</p>
            <p className="font-garamond text-xl italic text-ff-noir/50">
              Eight pages, four stations
            </p>
          </div>

          <h1 className="mt-10 font-didone text-mega leading-[0.84] text-ff-noir">
            <CutLine>The</CutLine>
            <CutLine delay={0.08}>
              <span className="italic text-ff-rouge">Edit</span>
            </CutLine>
          </h1>

          <p className="mt-8 max-w-measure-serif font-garamond text-2xl leading-relaxed text-ff-noir/70">
            Photographed in the room, in the light we actually work in, with the hair as
            it left the chair. Nothing here was retouched, because the point of the
            exercise is that the colour holds up in a photograph taken at four in the
            afternoon.
          </p>
        </div>
      </section>

      <section className="tex-stock px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[92rem] grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {fifthEdit.map((e, i) => (
            <Reveal
              key={e.id}
              kind="wipe"
              delay={(i % 2) * 0.08}
              className={`${place[e.span]} ${i % 3 === 1 ? "lg:pt-20" : ""}`}
            >
              <figure>
                <div
                  className={`relative w-full overflow-hidden bg-ff-champagne/30 ${
                    e.span === "tall"
                      ? "aspect-[3/4]"
                      : e.span === "wide"
                        ? "aspect-[4/3]"
                        : "aspect-square"
                  }`}
                >
                  <Image
                    src={e.src}
                    alt={e.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-ff-noir/15 pt-2">
                  <span className="font-didone text-xl text-ff-noir">{e.caption}</span>
                  <span className="shrink-0 font-garamond text-lg italic text-ff-noir/50">
                    {e.meta}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <ThisIsADemonstration universe="fifth" />
    </>
  );
}
