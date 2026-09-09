import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/data/journal";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "N85 Journal — Notes on Making, Wearing and Keeping",
  description:
    "The NORTH 85 journal: essays on craft, wardrobe editing, the Crosby Street flagship and how a limited drop actually works.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [lead, ...rest] = ARTICLES;

  return (
    <>
      <PageHeader
        eyebrow="N85 Journal"
        title="Notes on making,"
        italic="wearing and keeping."
        description="Written in the studio and published when it is finished, not when a calendar says so. Six entries so far."
      />

      <div className="gutter mx-auto max-w-[120rem] pb-28">
        {/* Lead ---------------------------------------------------- */}
        <Reveal>
          <Link href={`/journal/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand-deep sm:aspect-[21/9]">
              <Image
                src={lead.cover}
                alt={lead.title}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-[1300ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-7 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="label-xs text-ember">{lead.category}</span>
                  <span className="label-xs text-taupe">
                    {formatDate(lead.date)} · {lead.readingTime} min read
                  </span>
                </div>
                <h2 className="mt-4 max-w-3xl font-display text-[2rem] font-light leading-[1.08] transition-colors group-hover:text-ember sm:text-[2.75rem]">
                  {lead.title}
                </h2>
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-taupe lg:col-span-4 lg:pt-1">
                {lead.standfirst}
              </p>
            </div>
          </Link>
        </Reveal>

        {/* Rest ---------------------------------------------------- */}
        <div className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, index) => (
            <Reveal key={article.slug} delay={(index % 3) * 0.08}>
              <article>
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-deep">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="label-xs text-ember">{article.category}</span>
                    <span className="label-xs text-taupe">
                      {formatDate(article.date)} · {article.readingTime} min
                    </span>
                  </div>
                  <h2 className="mt-3.5 font-display text-2xl font-light leading-[1.15] transition-colors group-hover:text-ember">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-taupe">
                    {article.standfirst}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
