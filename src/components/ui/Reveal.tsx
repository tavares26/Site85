"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Distance travelled on entry, in pixels. Collapsed under reduced motion. */
  distance?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Scroll-triggered entrance.
 *
 * The `initial` and `visible` values are identical on the server and the
 * client — only the transition duration reacts to the motion preference, which
 * is applied after mount and so never affects the hydrated markup. Under
 * reduced motion the element simply appears when it scrolls into view.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  distance = 28,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0, delay: 0 }
        : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}

/**
 * Splits a line into words that rise from behind a mask, in sequence.
 *
 * Driven by a CSS animation rather than Motion: it needs no JavaScript to
 * settle, renders identically on the server, and the reduced-motion block in
 * globals.css collapses it to its final frame automatically.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            className="animate-rise inline-block"
            style={{ animationDelay: `${delay + i * 0.055}s` }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
