"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { agency } from "@/data/fictional-data";

const BK_IMAGE =
  "https://images.unsplash.com/photo-1781455793310-8427c96454c7?auto=format&fit=crop&w=1800&q=80";
const FF_IMAGE =
  "https://images.unsplash.com/photo-1606143412458-acc5f86de897?auto=format&fit=crop&w=1800&q=80";

type Side = "bk" | "ff" | null;

/** Desktop only: pointer-driven expansion needs a real pointer and real width. */
function usePointerLayout() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return ok;
}

export function SplitEntry() {
  const [side, setSide] = useState<Side>(null);
  const wide = usePointerLayout();
  const reduced = useReducedMotion();

  const grow = (self: Exclude<Side, null>) => {
    if (!wide || side === null) return 1;
    return side === self ? 1.62 : 1;
  };

  return (
    <main id="main" className="relative flex h-[100svh] w-full flex-col overflow-hidden md:flex-row">
      {/* ---------------------------------------------------------- Brooklyn */}
      <motion.section
        className="tex-grain group relative flex flex-1 flex-col justify-end overflow-hidden bg-bk-ink"
        animate={{ flexGrow: grow("bk") }}
        transition={{ duration: reduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setSide("bk")}
        onHoverEnd={() => setSide(null)}
      >
        <Image
          src={BK_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 62vw"
          className="object-cover object-center opacity-[0.42] transition-[opacity,transform] duration-[1200ms] ease-blade group-hover:scale-[1.04] group-hover:opacity-[0.55]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,21,0.35)_0%,rgba(23,23,21,0.8)_58%,rgba(23,23,21,0.97)_100%)]"
        />

        <Link
          href="/brooklyn"
          className="relative flex h-full flex-col justify-end p-6 pb-10 sm:p-10 md:p-12 md:pb-16"
          aria-label="Enter Brooklyn, the barbershop"
        >
          <span className="stamp absolute left-6 top-6 text-bk-brass sm:left-10 sm:top-10 md:left-12 md:top-12">
            One / Barbershop
          </span>

          <h2 className="font-slab text-mega uppercase leading-[0.8] text-bk-paper">
            <span className="block">Brook</span>
            <span className="-mt-[0.06em] block text-bk-brass">lyn</span>
          </h2>

          <p className="mt-5 max-w-[24ch] font-grot text-lg font-medium uppercase tracking-rivet text-bk-paper/75 sm:text-xl">
            Built sharp. Stay classic.
          </p>

          <span className="mt-7 inline-flex w-fit items-center gap-3 border-b border-bk-brass/60 pb-1 font-grot text-sm uppercase tracking-girder text-bk-brass">
            Enter the shop
            <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
              <path d="M0 4h24M20 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
        </Link>
      </motion.section>

      {/* ------------------------------------------------------------- Fifth */}
      <motion.section
        className="u-fifth group relative flex flex-1 flex-col justify-end overflow-hidden bg-ff-cream"
        animate={{ flexGrow: grow("ff") }}
        transition={{ duration: reduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setSide("ff")}
        onHoverEnd={() => setSide(null)}
      >
        <Image
          src={FF_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 62vw"
          className="object-cover object-top opacity-[0.9] grayscale transition-[filter,transform] duration-[1200ms] ease-blade group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(246,241,231,0.1)_0%,rgba(246,241,231,0.72)_52%,rgba(246,241,231,0.98)_100%)]"
        />

        <Link
          href="/fifth"
          className="relative flex h-full flex-col justify-end p-6 pb-10 sm:p-10 md:p-12 md:pb-16"
          aria-label="Enter Fifth, the beauty salon"
        >
          <span className="absolute left-6 top-6 font-garamond text-base italic text-ff-noir/60 sm:left-10 sm:top-10 md:left-12 md:top-12">
            Two, the beauty salon
          </span>

          <h2 className="font-didone text-mega leading-[0.8] text-ff-noir">
            <span className="block">Fifth</span>
            <span className="-mt-[0.1em] block italic text-ff-rouge">Avenue</span>
          </h2>

          <p className="mt-5 max-w-[26ch] font-garamond text-xl italic leading-snug text-ff-noir/75 sm:text-2xl">
            New York looks good on you.
          </p>

          <span className="mt-7 inline-flex w-fit items-center gap-3 border-b border-ff-noir/50 pb-1 font-garamond text-lg italic text-ff-noir">
            Enter the salon
            <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
              <path d="M0 4h24M20 1l4 3-4 3" stroke="currentColor" strokeWidth="0.9" />
            </svg>
          </span>
        </Link>
      </motion.section>

      {/* -------------------------------------------------------------- Seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 z-20 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-bk-brass/40 to-transparent md:left-1/2 md:top-0 md:h-full md:w-px md:-translate-x-1/2 md:translate-y-0 md:bg-gradient-to-b"
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bk-brass/50 bg-bk-ink font-didone text-2xl italic text-bk-brass">
          &amp;
        </span>
      </div>

      {/* ------------------------------------------------------------ Chrome */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 hidden items-center justify-center pt-6 md:flex">
        <p className="stamp rounded-full bg-bk-ink/70 px-5 py-2 text-bk-paper/80 backdrop-blur-sm">
          Brooklyn &amp; Fifth · Barber &amp; Beauty House
        </p>
      </header>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center pb-4">
        <p className="stamp text-[0.6rem] text-bk-paper/45 md:text-bk-paper/55">{agency.signature}</p>
      </footer>
    </main>
  );
}
