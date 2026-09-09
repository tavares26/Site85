import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  eyebrow,
  title,
  italic,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="gutter mx-auto max-w-[120rem] pb-12 pt-12 sm:pt-16">
      <Reveal>
        <p className="label text-taupe">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.75rem] font-light leading-[0.98] tracking-[-0.02em] sm:text-[4rem] lg:text-[4.75rem]">
          {title}
          {italic && <span className="italic text-ember"> {italic}</span>}
        </h1>
        {description && (
          <p className="mt-7 max-w-2xl text-[0.9375rem] leading-relaxed text-charcoal/75">
            {description}
          </p>
        )}
        {children}
      </Reveal>
    </header>
  );
}
