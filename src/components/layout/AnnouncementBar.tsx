"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { STUDIO } from "@/data/site";

const MESSAGES = [
  <>Complimentary shipping on orders over R$ 600 — Brazil-wide</>,
  <>Drop 085 — eighty-five pieces per style, once</>,
  <>Private Sale is live for members · code NORTH10</>,
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % MESSAGES.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <div className="relative z-50 bg-charcoal text-sand">
      <div className="gutter mx-auto flex min-h-9 max-w-[120rem] items-center justify-between gap-4 py-2">
        <p className="label-xs hidden shrink-0 text-taupe-soft md:block">
          {STUDIO.signature}
        </p>

        <div className="relative flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -9 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              }
              className="label-xs flex items-center justify-center text-center leading-[1.6]"
            >
              {MESSAGES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="label-xs hidden shrink-0 text-taupe-soft lg:block">
          Site desenvolvido pela {STUDIO.name}, caso queira um igual,{" "}
          <a
            href={STUDIO.phoneHref}
            className="text-sand underline decoration-sand/40 underline-offset-4 transition-colors hover:decoration-sand"
          >
            clique aqui
          </a>
        </p>
      </div>
    </div>
  );
}
