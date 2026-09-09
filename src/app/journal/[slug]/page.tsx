import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/data/journal";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not found" };

  return {
    title: article.title,
    description: article.standfirst,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.standfirst,
      publishedTime: article.date,
      images: [{ url: article.cover, alt: article.title }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="pb-28">
      <div className="gutter mx-auto max-w-[120rem] pt-8">
        <nav aria-label="Breadcrumb" className="label-xs flex items-center gap-2 text-taupe">
          <Link href="/journal" className="link-rule">
            Journal
          </Link>
          <span aria-hidden>/</span>
          <span className="text-charcoal">{article.category}</span>
        </nav>
      </div>

      <header className="gutter mx-auto max-w-[120rem] pt-10">
        <Reveal className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-4">
            <span className="label-xs text-ember">{article.category}</span>
            <span className="label-xs text-taupe">
              {formatDate(article.date)} · {article.readingTime} min read · {article.author}
            </span>
          </div>
          <h1 className="mt-6 font-display text-[2.5rem] font-light leading-[1.02] tracking-[-0.02em] sm:text-[3.5rem] lg:text-[4.25rem]">
            {article.title}
          </h1>
          <p className="mt-7 max-w-2xl font-display text-xl font-light italic leading-relaxed text-charcoal/70 sm:text-2xl">
            {article.standfirst}
          </p>
        </Reveal>
      </header>

      <div className="gutter mx-auto max-w-[120rem] pt-12">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand-deep">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <div className="gutter mx-auto max-w-[120rem] pt-14">
        <div className="mx-auto max-w-[42rem]">
          {article.body.map((paragraph, index) => (
            <div key={index}>
              <Reveal>
                <p
                  className={`text-[1.0625rem] leading-[1.75] text-charcoal/85 ${
                    index === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.25rem] first-letter:font-light first-letter:leading-[0.78]"
                      : "mt-7"
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>

              {article.pullQuote && index === 1 && (
                <Reveal>
                  <blockquote className="my-12 border-l border-ember pl-7">
                    <p className="font-display text-2xl font-light italic leading-[1.35] text-charcoal sm:text-[1.75rem]">
                      {article.pullQuote}
                    </p>
                  </blockquote>
                </Reveal>
              )}
            </div>
          ))}

          <Reveal>
            <div className="mt-14 border-t border-charcoal/12 pt-8">
              <p className="label-xs text-taupe">
                {article.author} — NORTH 85, {formatDate(article.date)}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="gutter mx-auto max-w-[120rem] pt-24">
        <Reveal className="rule flex flex-wrap items-end justify-between gap-6 pt-12">
          <h2 className="font-display text-[2rem] font-light leading-tight sm:text-[2.5rem]">
            Keep <span className="italic text-ember">reading</span>
          </h2>
          <Link href="/journal" className="label link-rule pb-1">
            All entries →
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-3">
          {more.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.07}>
              <Link href={`/journal/${item.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-deep">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-editorial)] group-hover:scale-[1.05]"
                  />
                </div>
                <p className="label-xs mt-4 text-ember">{item.category}</p>
                <h3 className="mt-2.5 font-display text-xl font-light leading-tight transition-colors group-hover:text-ember">
                  {item.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
