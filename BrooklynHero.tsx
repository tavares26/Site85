"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const HERO =
  "https://images.unsplash.com/photo-1772567925625-3488620d1626?auto=format&fit=crop&w=2000&q=80";

/** One page-load sequence: rule, then the two lines, then the facts. */
export function BrooklynHero() {
  const reduced = useReducedMotion();
  const line = (delay: number) => ({
    initial: reduced ? false : { y: "112%" },
    animate: { y: "0%" },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-bk-ink pt-28">
      <Image
        src={HERO}
        alt="A barbershop window on a New York street after dark"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,21,0.9)_0%,rgba(23,23,21,0.45)_38%,rgba(23,23,21,0.96)_100%)]"
      />
      <div aria-hidden className="tex-grain absolute inset-0" />

      {/* A single brass rule dropped down the page, drawn on load */}
      <motion.span
        aria-hidden
        className="absolute left-5 top-0 w-px bg-bk-brass/50 sm:left-8 lg:left-12"
        initial={reduced ? false : { height: 0 }}
        animate={{ height: "58%" }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      />

      <div className="relative px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
        <h1 className="font-slab uppercase text-bk-paper">
          <span className="block overflow-hidden">
            <motion.span className="block text-mega leading-[0.82]" {...line(0.25)}>
              Built sharp.
            </motion.span>
          </span>
          <span className="mt-1 block overflow-hidden pl-[6vw] sm:pl-[10vw]">
            <motion.span className="block text-mega leading-[0.82] text-bk-brass" {...line(0.36)}>
              Stay classic.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-measure font-grot text-xl leading-relaxed text-bk-paper/75 sm:text-2xl">
            Four chairs on Wythe Avenue. A radio that only picks up one station properly.
            Clippers, shears and a straight razor that gets stropped in front of you
            because that part was never for show.
          </p>

          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            {[
              ["Est.", "2016"],
              ["Chairs", "04"],
              ["Walk-ins", "Before 11"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="stamp text-bk-paper/40">{k}</p>
                <p className="font-slab text-3xl uppercase text-bk-paper">{v}</p>
              </div>
            ))}

            <Link
              href="/book"
              className="stamp bg-bk-brass px-7 py-4 text-bk-ink transition-colors hover:bg-bk-paper"
            >
              Take a chair
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
