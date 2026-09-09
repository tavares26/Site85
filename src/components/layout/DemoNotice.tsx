"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { STUDIO } from "@/data/site";

const DISMISS_KEY = "north85:demo-notice-dismissed";

/**
 * A small, dismissible corner card that keeps the demo framing visible without
 * blocking the experience. Stays out of the way on first paint.
 */
export function DemoNotice() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* storage unavailable — show it, it is only a notice */
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => setVisible(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* nothing to do */
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={
            reduced ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
          className="fixed bottom-4 right-4 z-40 hidden max-w-[19rem] border border-charcoal/15 bg-sand/95 p-5 shadow-[0_20px_50px_-30px_rgba(17,17,15,0.6)] backdrop-blur-md lg:block"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss notice"
            className="absolute right-3 top-3 text-taupe transition-colors hover:text-charcoal"
          >
            <X size={13} strokeWidth={1.5} />
          </button>

          <p className="label-xs text-ember">Demonstration</p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-charcoal">
            NORTH 85 is a fictional store built by {STUDIO.name}. Every flow works
            — nothing is charged.
          </p>
          <a
            href={STUDIO.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="label-xs link-rule mt-4 inline-block"
          >
            Talk to the studio →
          </a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
