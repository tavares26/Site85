"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Universe } from "@/data/fictional-data";

const links: Record<Universe, { href: string; label: string }[]> = {
  brooklyn: [
    { href: "/brooklyn", label: "The Shop" },
    { href: "/brooklyn/barbers", label: "Barbers" },
    { href: "/brooklyn/services", label: "Services" },
    { href: "/brooklyn/gallery", label: "The Wall" },
    { href: "/locations", label: "Find Us" },
  ],
  fifth: [
    { href: "/fifth", label: "The Salon" },
    { href: "/fifth/team", label: "The Fifth Edit" },
    { href: "/fifth/services", label: "Services" },
    { href: "/fifth/edit", label: "The Edit" },
    { href: "/locations", label: "Find Us" },
  ],
};

export function UniverseNav({ universe }: { universe: Universe }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const isBk = universe === "brooklyn";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const shell = isBk
    ? scrolled
      ? "border-bk-brass/25 bg-bk-ink/92 backdrop-blur-md"
      : "border-transparent bg-transparent"
    : scrolled
      ? "border-ff-noir/15 bg-ff-cream/94 backdrop-blur-md"
      : "border-transparent bg-transparent";

  const wordmark = isBk
    ? "font-slab text-xl uppercase tracking-rivet text-bk-paper sm:text-2xl"
    : "font-didone text-xl text-ff-noir sm:text-2xl";

  const item = isBk
    ? "stamp text-bk-paper/70 hover:text-bk-brass"
    : "font-garamond text-lg text-ff-noir/70 hover:text-ff-rouge";

  const active = isBk ? "text-bk-brass" : "text-ff-rouge italic";

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${shell}`}
        aria-label={isBk ? "Brooklyn navigation" : "Fifth navigation"}
      >
        <div className="mx-auto flex max-w-[110rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href={isBk ? "/brooklyn" : "/fifth"} className={wordmark}>
            {isBk ? "Brooklyn" : "Fifth"}
            <span className={isBk ? "text-bk-brass" : "text-ff-rouge"}> &amp; </span>
            <span className={isBk ? "text-bk-paper/45" : "text-ff-noir/40"}>
              {isBk ? "Fifth" : "Brooklyn"}
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links[universe].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline ${item} ${pathname === l.href ? active : ""}`}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href={isBk ? "/fifth" : "/brooklyn"}
              className={
                isBk
                  ? "stamp border border-bk-brass/40 px-4 py-2 text-bk-brass transition-colors hover:bg-bk-brass hover:text-bk-ink"
                  : "font-garamond text-lg italic text-ff-noir/60 underline decoration-ff-rouge/50 underline-offset-4 transition-colors hover:text-ff-rouge"
              }
            >
              {isBk ? "Cross to Fifth" : "Cross to Brooklyn"}
            </Link>

            <Link
              href="/book"
              className={
                isBk
                  ? "stamp bg-bk-brass px-5 py-2.5 text-bk-ink transition-colors hover:bg-bk-paper"
                  : "stamp bg-ff-noir px-5 py-2.5 text-ff-chalk transition-colors hover:bg-ff-rouge"
              }
            >
              Book
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`lg:hidden ${isBk ? "text-bk-paper" : "text-ff-noir"}`}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={26} strokeWidth={1.4} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`fixed inset-0 z-[60] flex flex-col ${isBk ? "tex-brick" : "tex-stock"}`}
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className={wordmark}>{isBk ? "Brooklyn" : "Fifth"}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={isBk ? "text-bk-paper" : "text-ff-noir"}
                aria-label="Close menu"
              >
                <X size={26} strokeWidth={1.4} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-2 px-5 pb-16 sm:px-8">
              {links[universe].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduced ? false : { y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: reduced ? 0 : 0.16 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    className={
                      isBk
                        ? "block font-slab text-5xl uppercase leading-[1.05] text-bk-paper sm:text-6xl"
                        : "block font-didone text-5xl leading-[1.1] text-ff-noir sm:text-6xl"
                    }
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <div className={`mt-8 flex flex-col gap-4 pt-6 ${isBk ? "rule-brass" : "rule-hair"}`}>
                <Link
                  href="/book"
                  className={
                    isBk
                      ? "stamp w-fit bg-bk-brass px-6 py-3 text-bk-ink"
                      : "stamp w-fit bg-ff-noir px-6 py-3 text-ff-chalk"
                  }
                >
                  Book an appointment
                </Link>
                <Link
                  href={isBk ? "/fifth" : "/brooklyn"}
                  className={
                    isBk
                      ? "stamp text-bk-brass"
                      : "font-garamond text-lg italic text-ff-rouge"
                  }
                >
                  {isBk ? "Cross to Fifth" : "Cross to Brooklyn"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
