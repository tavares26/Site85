"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { stage, settle, riseLine, wipe, flatten } from "@/lib/motion";

type Kind = "settle" | "line" | "wipe";

const pick: Record<Kind, Variants> = { settle, line: riseLine, wipe };

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
} as const;

/**
 * Wraps a block so it arrives once, on first scroll into view, and never again.
 * With reduced motion on it renders the content flat and static.
 */
export function Reveal({
  children,
  kind = "settle",
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  kind?: Kind;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Tag = tags[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      variants={flatten(reduced, pick[kind])}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: reduced ? 0 : delay }}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its Reveal children into a single sequence. */
export function Stage({
  children,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : stage}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** A headline that comes up from behind its own baseline, one line at a time. */
export function CutLine({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{children}</span>;

  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
