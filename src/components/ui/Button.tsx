import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost" | "sand";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-charcoal text-sand hover:bg-charcoal-soft border border-charcoal",
  outline:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-sand",
  ghost: "text-charcoal hover:text-ember border border-transparent",
  sand: "bg-sand text-charcoal hover:bg-paper border border-sand",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4",
  md: "h-12 px-7",
  lg: "h-14 px-9",
};

const BASE =
  "label inline-flex items-center justify-center gap-2.5 transition-all duration-500 [transition-timing-function:var(--ease-editorial)] disabled:opacity-40 disabled:pointer-events-none select-none";

export function Button({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <Link
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
