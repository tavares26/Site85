import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/data/journal";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";

export function JournalPreview() {
  const [lead, ...rest] = ARTICLES.slice(0, 4);

  return (
    <section className="gutter mx-auto max-w-[120rem] pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="06 — Reading"
        title="N85"
        italic="Journal"
        link={{ href: "/journal", label: "All entries" }}
        description="Notes on making, wearing and keeping things. Written in the studio, published when it is finished."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <Link href={`/journal/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-sand-deep">
              <Image
                src={lead.cover}
                alt={lead.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="label-xs text-ember">{lead.category}</span>
              <span className="label-xs text-taupe">
                {formatDate(lead.date)} · {lead.readingTime} min
              </span>
            </div>
            <h3 className="mt-4 max-w-xl font-display text-[1.75rem] font-light leading-[1.15] transition-colors group-hover:text-ember sm:text-[2.25rem]">
              {lead.title}
            </h3>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-taupe">
              {lead.standfirst}
            </p>
          </Link>
        </Reveal>

        <div className="lg:col-span-5">
          <ul className="divide-y divide-charcoal/12 border-t border-charcoal/12">
            {rest.map((article, index) => (
              <Reveal as="li" key={article.slug} delay={index * 0.07}>
                <Link href={`/journal/${article.slug}`} className="group flex gap-5 py-6">
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden bg-sand-deep sm:w-28">
                    <Image
                      src={article.cover}
                      alt=""
                      aria-hidden
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-[1100ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.07]"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="label-xs text-ember">{article.category}</p>
                    <h3 className="mt-2.5 font-display text-xl font-light leading-tight transition-colors group-hover:text-ember">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-[0.75rem] text-taupe">
                      {formatDate(article.date)} · {article.readingTime} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
