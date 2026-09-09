"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { CATEGORIES, BRAND } from "@/data/site";

/**
 * The primary bar stays at three entries — commerce, editorial, physical — so
 * the centred wordmark always has clear space at every breakpoint. Categories
 * are one level down: the chip row on /shop, the footer, the search overlay
 * and the mobile sheet all reach them directly.
 */
const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/journal", label: "Journal" },
  { href: "/locations", label: "Locations" },
];

const MOBILE_NAV = [
  { href: "/shop", label: "Shop" },
  ...CATEGORIES.map((c) => ({ href: `/shop/${c.slug}`, label: c.label })),
  { href: "/journal", label: "Journal" },
  { href: "/locations", label: "Locations" },
];

export function Header() {
  const pathname = usePathname();
  const { count, favorites, openBag, openSearch, ready } = useStore();
  const [scrolled, setScrolled] = useState(false);
  // The sheet remembers which route it was opened on, so navigating away
  // closes it during render rather than in a follow-up effect.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 [transition-timing-function:var(--ease-editorial)] ${
        scrolled || menuOpen
          ? "border-b border-charcoal/12 bg-sand/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="gutter mx-auto grid h-[4.25rem] max-w-[120rem] grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex min-w-0 items-center">
          <button
            type="button"
            onClick={() => setMenu({ open: !menuOpen, path: pathname })}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-ml-2 grid h-10 w-10 shrink-0 place-items-center lg:hidden"
          >
            {menuOpen ? <X size={18} strokeWidth={1.25} /> : <Menu size={18} strokeWidth={1.25} />}
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-7">
          {NAV.map((item) => {
            const active =
              item.href === "/shop"
                ? pathname === "/shop"
                : pathname.startsWith(item.href);
            return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`label link-rule whitespace-nowrap ${
                    active ? "text-ember" : "text-charcoal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link
          href="/"
          aria-label={`${BRAND.name} — home`}
          className="wordmark justify-self-center whitespace-nowrap text-[0.8125rem] tracking-[0.2em] sm:text-[0.9375rem] sm:tracking-[0.28em] lg:text-base lg:tracking-[0.34em]"
        >
          NORTH&nbsp;85
        </Link>

        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Open search"
            className="grid h-10 w-10 place-items-center transition-colors hover:text-ember"
          >
            <Search size={17} strokeWidth={1.25} />
          </button>

          <Link
            href="/favorites"
            aria-label={`Favourites${ready && favorites.length ? ` (${favorites.length})` : ""}`}
            className="relative hidden h-10 w-10 place-items-center transition-colors hover:text-ember sm:grid"
          >
            <Heart size={17} strokeWidth={1.25} />
            {ready && favorites.length > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-ember" />
            )}
          </Link>

          <button
            type="button"
            onClick={openBag}
            aria-label={`Shopping bag${ready && count ? ` (${count} items)` : ""}`}
            className="relative grid h-10 w-10 place-items-center transition-colors hover:text-ember"
          >
            <ShoppingBag size={17} strokeWidth={1.25} />
            {ready && count > 0 && (
              <span className="absolute -right-0.5 top-1 grid h-[1.05rem] min-w-[1.05rem] place-items-center rounded-full bg-charcoal px-1 text-[0.5625rem] font-medium tabular-nums text-sand">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            className="overflow-hidden border-t border-charcoal/12 bg-sand lg:hidden"
          >
            <nav aria-label="Mobile" className="gutter py-6">
              <ul className="space-y-1">
                {MOBILE_NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { delay: 0.06 + i * 0.045, duration: 0.5 }
                    }
                  >
                    <Link
                      href={item.href}
                      className="block py-2.5 font-display text-3xl font-light"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="rule mt-6 flex items-center gap-6 pt-6">
                <Link href="/favorites" className="label text-taupe">
                  Favourites
                </Link>
                <Link href="/bag" className="label text-taupe">
                  Bag
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
