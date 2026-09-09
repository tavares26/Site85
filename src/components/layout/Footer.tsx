import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, CATEGORIES, STORE, STUDIO } from "@/data/site";
import { Marquee } from "@/components/ui/Marquee";

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      ...CATEGORIES.map((c) => ({ href: `/shop/${c.slug}`, label: c.label })),
    ],
  },
  {
    heading: "The House",
    links: [
      { href: "/journal", label: "N85 Journal" },
      { href: "/locations", label: "Crosby Street" },
      { href: "/favorites", label: "Favourites" },
      { href: "/bag", label: "Shopping bag" },
    ],
  },
  {
    heading: "Client Care",
    links: [
      { href: "/locations", label: "Book an appointment" },
      { href: "/shop", label: "Size guidance" },
      { href: "/journal/the-hem-we-refuse-to-finish", label: "Alterations" },
      { href: "/journal/what-a-drop-actually-means", label: "About the drops" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-charcoal text-sand">
      <Marquee
        items={["NORTH / 85", "N85", "NEW YORK", "CROSBY STREET", "DROP 085", "SINCE 2019"]}
        className="border-b border-sand/12 py-4 text-sand/55"
      />

      <div className="gutter mx-auto max-w-[120rem] py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-md">
            <p className="wordmark text-lg">NORTH&nbsp;85</p>
            <p className="mt-5 font-display text-2xl font-light leading-snug text-sand/85">
              {BRAND.tagline}
            </p>
            <p className="mt-6 text-[0.8125rem] leading-relaxed text-taupe-soft">
              {STORE.street}
              <br />
              {STORE.district}
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="label link-rule mt-6 inline-block text-sand/80"
            >
              {BRAND.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 className="label-xs text-taupe-soft">{column.heading}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="link-rule text-[0.8125rem] text-sand/85 hover:text-sand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------
            Closing demonstration notice + the studio's own call to action.
        ---------------------------------------------------------------- */}
        <section className="mt-16 border-t border-sand/15 pt-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="label text-ember-soft">This is a demonstration</p>
              <p className="mt-5 font-display text-[1.75rem] font-light leading-[1.3] text-sand sm:text-[2.25rem]">
                NORTH 85 is a fictional commerce experience created by{" "}
                {STUDIO.name}. No products are sold and no real payments are
                processed.
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-taupe-soft">
                Site desenvolvido pela {STUDIO.name}, caso queira um igual,{" "}
                <a
                  href={STUDIO.phoneHref}
                  className="text-sand underline decoration-sand/40 underline-offset-4 transition-colors hover:decoration-sand"
                >
                  clique aqui
                </a>
                . {STUDIO.phone}
              </p>
            </div>

            <a
              href={STUDIO.whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="label group inline-flex h-14 shrink-0 items-center justify-center gap-3 border border-sand px-8 text-sand transition-colors duration-500 [transition-timing-function:var(--ease-editorial)] hover:bg-sand hover:text-charcoal"
            >
              I want a store like this
              <ArrowUpRight
                size={15}
                strokeWidth={1.25}
                className="transition-transform duration-500 [transition-timing-function:var(--ease-editorial)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </section>

        <div className="mt-14 flex flex-col gap-4 border-t border-sand/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-xs text-taupe-soft">
            © {BRAND.founded}—2026 {BRAND.name} — fictional brand
          </p>
          <p className="label-xs text-taupe-soft">{STUDIO.signature}</p>
        </div>
      </div>
    </footer>
  );
}
