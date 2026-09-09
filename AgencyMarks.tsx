import Link from "next/link";
import { agency, type Universe } from "@/data/fictional-data";
import { Reveal, CutLine } from "@/components/Reveal";

/**
 * The closing statement of the demo. Same content in both houses, set in the
 * voice of whichever house you happen to be standing in.
 */
export function ThisIsADemonstration({ universe }: { universe: Universe }) {
  const isBk = universe === "brooklyn";

  return (
    <section
      id="demonstration"
      className={`relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12 ${
        isBk ? "tex-brick tex-grain" : "bg-ff-noir"
      }`}
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <h2
            id="demo-heading"
            className={
              isBk
                ? "font-slab text-colossal uppercase text-bk-paper"
                : "font-didone text-colossal text-ff-chalk"
            }
          >
            <CutLine>This is a</CutLine>
            <CutLine delay={0.08}>
              <span className={isBk ? "text-bk-brass" : "italic text-ff-champagne"}>
                demonstration
              </span>
            </CutLine>
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <Reveal>
            <p
              className={
                isBk
                  ? "max-w-measure font-grot text-xl leading-relaxed text-bk-paper/80"
                  : "max-w-measure-serif font-garamond text-2xl leading-relaxed text-ff-chalk/80"
              }
            >
              Brooklyn &amp; Fifth does not exist. The barbers, the colourists, the prices
              and the two addresses were written for this build. Everything you have
              clicked through, the split entry, the razor, the dryer, the six-step
              booking, is running in your browser with nothing behind it.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              className={
                isBk
                  ? "mt-6 max-w-measure font-grot text-xl leading-relaxed text-bk-paper/80"
                  : "mt-6 max-w-measure-serif font-garamond text-2xl leading-relaxed text-ff-chalk/80"
              }
            >
              It was built by {agency.name} to show what a single brand can look like when
              it is designed rather than assembled. If your business has two sides, or one
              side that deserves better than a template, this is the conversation.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="/book"
              className={
                isBk
                  ? "stamp mt-10 inline-flex w-fit items-center gap-4 bg-bk-brass px-8 py-4 text-bk-ink transition-colors hover:bg-bk-paper"
                  : "stamp mt-10 inline-flex w-fit items-center gap-4 bg-ff-chalk px-8 py-4 text-ff-noir transition-colors hover:bg-ff-champagne"
              }
            >
              {agency.cta}
              <svg width="28" height="8" viewBox="0 0 28 8" fill="none" aria-hidden>
                <path d="M0 4h26M22 1l4 3-4 3" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function UniverseFooter({ universe }: { universe: Universe }) {
  const isBk = universe === "brooklyn";

  const col = isBk ? "text-bk-paper/55" : "text-ff-noir/55";
  const head = isBk
    ? "stamp text-bk-brass"
    : "font-garamond text-base italic text-ff-rouge";

  return (
    <footer
      className={`px-5 py-14 sm:px-8 lg:px-12 ${
        isBk ? "border-t border-bk-brass/20 bg-bk-ink" : "border-t border-ff-noir/15 bg-ff-cream"
      }`}
    >
      <div className="mx-auto grid max-w-[92rem] gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className={head}>The Brooklyn Room</p>
          <p className={`mt-3 font-grot text-base leading-relaxed ${col}`}>
            214 Wythe Avenue
            <br />
            Williamsburg, Brooklyn
            <br />
            (718) 555-0142
          </p>
        </div>

        <div>
          <p className={head}>The Fifth Room</p>
          <p className={`mt-3 font-grot text-base leading-relaxed ${col}`}>
            1067 Fifth Avenue, third floor
            <br />
            Upper East Side, New York
            <br />
            (212) 555-0198
          </p>
        </div>

        <div>
          <p className={head}>Elsewhere</p>
          <ul className={`mt-3 space-y-1.5 font-grot text-base ${col}`}>
            <li>
              <Link href="/locations" className="link-underline">
                Both addresses
              </Link>
            </li>
            <li>
              <Link href="/book" className="link-underline">
                Book a chair
              </Link>
            </li>
            <li>
              <Link href="/" className="link-underline">
                Back to the split
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <p
            className={
              isBk
                ? "font-slab text-2xl uppercase leading-tight text-bk-paper/80"
                : "font-didone text-2xl leading-tight text-ff-noir/80"
            }
          >
            {isBk ? "Built sharp. Stay classic." : "New York looks good on you."}
          </p>
          <p className={`stamp ${isBk ? "text-bk-brass/70" : "text-ff-noir/45"}`}>
            {agency.signature}
          </p>
        </div>
      </div>

      <p
        className={`mx-auto mt-12 max-w-[92rem] pt-6 font-grot text-sm ${
          isBk ? "rule-brass text-bk-paper/35" : "rule-hair text-ff-noir/40"
        }`}
      >
        Fictional brand, fictional people, fictional addresses. Photography from
        Unsplash, credited on the locations page. No appointment made here reaches
        anyone.
      </p>
    </footer>
  );
}
