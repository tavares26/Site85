"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Universe } from "@/data/fictional-data";

/**
 * Plays once when you arrive in a house, which in the App Router means once per
 * layout mount: crossing Brooklyn to Fifth replays it, moving between pages
 * inside a house does not. Four bands close over the screen in the outgoing
 * palette and lift in the incoming one, so the colour change reads as a cut
 * rather than a repaint.
 */
export function UniverseCurtain({ universe }: { universe: Universe }) {
  const [showing, setShowing] = useState(true);
  const reduced = useReducedMotion();
  const isBk = universe === "brooklyn";

  useEffect(() => {
    if (reduced) {
      setShowing(false);
      return;
    }
    const t = window.setTimeout(() => setShowing(false), 1150);
    return () => window.clearTimeout(t);
  }, [reduced]);

  if (reduced) return null;

  const bands = [0, 1, 2, 3];

  return (
    <AnimatePresence>
      {showing && (
        <motion.div
          key={universe}
          className="pointer-events-none fixed inset-0 z-[80] flex"
          aria-hidden
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.5 } }}
        >
          {bands.map((i) => (
            <motion.span
              key={i}
              className={`h-full flex-1 ${isBk ? "bg-bk-ink" : "bg-ff-cream"}`}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.06 * i,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ transformOrigin: isBk ? "top" : "bottom" }}
            />
          ))}

          <motion.span
            className={`absolute inset-0 flex items-center justify-center ${
              isBk
                ? "font-slab text-6xl uppercase tracking-rivet text-bk-brass sm:text-8xl"
                : "font-didone text-6xl italic text-ff-rouge sm:text-8xl"
            }`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {isBk ? "Brooklyn" : "Fifth"}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
