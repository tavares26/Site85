"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { fifthServices } from "@/data/fictional-data";
import { CutLine } from "@/components/Reveal";

/**
 * The dryer runs the whole time you are on this page. Scroll velocity is the
 * air: move fast and the service lines lean away from the nozzle, stop and they
 * fall back into line. Items further down the stream travel further, the way
 * hair at the ends moves more than hair at the root.
 */

function Dryer({ push, still }: { push: MotionValue<number>; still: boolean }) {
  const streams = [0, 1, 2, 3, 4];
  const strandSkew = useTransform(push, (v) => v * 0.12);

  return (
    <svg viewBox="0 0 620 520" className="h-full w-full" aria-hidden focusable="false">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b2b2b" />
          <stop offset="34%" stopColor="#000000" />
          <stop offset="72%" stopColor="#161616" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3C9A8" />
          <stop offset="48%" stopColor="#f6ecdc" />
          <stop offset="100%" stopColor="#a98d68" />
        </linearGradient>
        <radialGradient id="grille" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#8A1520" />
          <stop offset="70%" stopColor="#3a0a0e" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>

      {/* Handle, raked back from the barrel */}
      <g transform="rotate(19 240 250)">
        <rect x="198" y="236" width="92" height="252" rx="30" fill="url(#body)" />
        <rect x="216" y="330" width="56" height="16" rx="8" fill="#E3C9A8" fillOpacity="0.85" />
        <rect x="216" y="360" width="56" height="10" rx="5" fill="#E3C9A8" fillOpacity="0.4" />
        <path
          d="M244 488 C 244 508, 206 506, 196 518"
          stroke="#000000"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Barrel */}
      <rect x="112" y="118" width="330" height="136" rx="68" fill="url(#body)" />
      <ellipse cx="126" cy="186" rx="20" ry="62" fill="url(#grille)" />
      <ellipse cx="126" cy="186" rx="12" ry="44" fill="none" stroke="#8A1520" strokeOpacity="0.5" strokeWidth="2" />
      <path
        d="M170 140 C 250 128, 340 130, 420 146"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Concentrator nozzle */}
      <path d="M440 128 L534 152 L534 220 L440 244 Z" fill="url(#chrome)" />
      <rect x="528" y="150" width="12" height="72" rx="5" fill="#8A1520" />

      {/* Air. Five streamlines, drawn short and let out of the nozzle. */}
      <g>
        {streams.map((i) => {
          const y = 158 + i * 16;
          const d = `M552 ${y} C 590 ${y - 8 + i * 3}, 640 ${y + 10}, 700 ${y + (i - 2) * 12}`;
          return (
            <motion.path
              key={i}
              d={d}
              stroke="#8A1520"
              strokeOpacity={0.28}
              strokeWidth={1.6}
              strokeLinecap="round"
              fill="none"
              strokeDasharray="26 44"
              initial={{ strokeDashoffset: 0 }}
              animate={still ? { strokeDashoffset: 0 } : { strokeDashoffset: -140 }}
              transition={
                still
                  ? { duration: 0 }
                  : { duration: 1.6 + i * 0.22, repeat: Infinity, ease: "linear" }
              }
            />
          );
        })}
      </g>

      {/* A single strand caught in the stream, tied to scroll velocity */}
      <motion.path
        d="M556 196 C 600 188, 646 206, 700 194"
        stroke="#000000"
        strokeOpacity={0.35}
        strokeWidth={2.2}
        fill="none"
        style={still ? undefined : { x: push, skewY: strandSkew }}
      />
    </svg>
  );
}

function ServiceLine({
  index,
  push,
  still,
  children,
}: {
  index: number;
  push: MotionValue<number>;
  still: boolean;
  children: React.ReactNode;
}) {
  const weight = 0.35 + index * 0.16;
  const x = useTransform(push, (v) => v * weight);
  const skew = useTransform(push, (v) => v * weight * 0.08);

  if (still) return <li className="rule-hair">{children}</li>;

  return (
    <motion.li className="rule-hair" style={{ x, skewX: skew }}>
      {children}
    </motion.li>
  );
}

export function DryerServices() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const still = !!reduced;

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 26, mass: 0.35 });
  // Clamp so a fling does not throw the type off the page.
  const push = useTransform(smooth, [-2600, 0, 2600], [-26, 0, 26], { clamp: true });

  return (
    <section
      ref={ref}
      className="tex-stock relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="ff-services-heading"
    >
      <div className="mx-auto max-w-[92rem]">
        <header className="mb-14 max-w-3xl">
          <h1 id="ff-services-heading" className="font-didone text-colossal text-ff-noir">
            <CutLine>The service</CutLine>
            <CutLine delay={0.08}>
              <span className="italic text-ff-rouge">list</span>
            </CutLine>
          </h1>
          <p className="mt-6 max-w-measure-serif font-garamond text-2xl leading-relaxed text-ff-noir/70">
            Prices are what they are because the appointments are long. Nothing on this
            list is booked back to back with anything else.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(220px,380px)_1fr] lg:gap-14">
          <div className="order-1">
            <div className="sticky top-28 h-[30vh] w-full sm:h-[36vh] lg:h-[58vh]">
              <Dryer push={push} still={still} />
            </div>
            <p className="mt-2 font-garamond text-base italic text-ff-noir/45">
              {still
                ? "Motion is off, so the air is off with it."
                : "Scroll and the list moves in the stream."}
            </p>
          </div>

          <ul className="order-2 overflow-hidden">
            {fifthServices.map((s, i) => (
              <ServiceLine key={s.id} index={i} push={push} still={still}>
                <div className="py-7 sm:py-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                    <h2 className="font-didone text-3xl text-ff-noir sm:text-4xl lg:text-5xl">
                      {s.name}
                    </h2>
                    <p className="shrink-0 font-garamond text-xl italic text-ff-rouge">
                      ${s.price}
                      <span className="ml-3 not-italic text-ff-noir/45">{s.duration} min</span>
                    </p>
                  </div>
                  <p className="mt-2 max-w-measure-serif font-garamond text-xl leading-relaxed text-ff-noir/70">
                    {s.blurb}
                  </p>
                  <p className="mt-3 max-w-measure-serif font-garamond text-lg italic leading-relaxed text-ff-noir/50">
                    {s.detail}
                  </p>
                </div>
              </ServiceLine>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
