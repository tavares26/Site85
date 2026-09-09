"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[];
  name: string;
  badge?: string;
}) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="lg:flex lg:gap-4">
      {/* Thumbnail rail — vertical on desktop, hidden on mobile in favour of
          the native scroll strip below. */}
      <ul className="order-first hidden shrink-0 flex-col gap-3 lg:flex">
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-current={active === index}
              className={`relative block h-24 w-[4.5rem] overflow-hidden bg-sand-deep transition-opacity duration-500 ${
                active === index ? "opacity-100" : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image src={image} alt="" aria-hidden fill sizes="80px" className="object-cover" />
              {active === index && (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-charcoal" />
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="min-w-0 flex-1">
        {/* Desktop stage */}
        <div className="relative hidden aspect-[4/5] w-full overflow-hidden bg-sand-deep lg:block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={images[active]}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={
                reduced ? { duration: 0 } : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
              }
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={`${name} — view ${active + 1}`}
                fill
                priority={active === 0}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {badge && (
            <span className="label-xs absolute left-0 top-0 bg-sand/92 px-3 py-2 backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Mobile: a snap strip. Physical scrolling beats a carousel widget. */}
        <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 lg:hidden">
          {images.map((image, index) => (
            <div
              key={image}
              className="relative aspect-[4/5] w-[82vw] shrink-0 snap-center overflow-hidden bg-sand-deep"
            >
              <Image
                src={image}
                alt={`${name} — view ${index + 1}`}
                fill
                priority={index === 0}
                sizes="85vw"
                className="object-cover"
              />
              {badge && index === 0 && (
                <span className="label-xs absolute left-0 top-0 bg-sand/92 px-3 py-2 backdrop-blur-sm">
                  {badge}
                </span>
              )}
              <span className="label-xs absolute bottom-0 right-0 bg-sand/85 px-2.5 py-1.5 tabular-nums backdrop-blur-sm">
                {index + 1}/{images.length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
