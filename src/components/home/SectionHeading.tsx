import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  italic,
  link,
  description,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  link?: { href: string; label: string };
  description?: string;
  tone?: "dark" | "light";
}) {
  const muted = tone === "dark" ? "text-taupe" : "text-taupe-soft";

  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
      <div className="max-w-2xl">
        <p className={`label ${muted}`}>{eyebrow}</p>
        <h2 className="mt-4 font-display text-[2.25rem] font-light leading-[1.05] tracking-[-0.015em] sm:text-[3rem] lg:text-[3.5rem]">
          {title}
          {italic && <span className="italic text-ember"> {italic}</span>}
        </h2>
        {description && (
          <p className={`mt-5 max-w-xl text-[0.9375rem] leading-relaxed ${muted}`}>
            {description}
          </p>
        )}
      </div>

      {link && (
        <Link href={link.href} className="label link-rule shrink-0 pb-1">
          {link.label} →
        </Link>
      )}
    </Reveal>
  );
}
