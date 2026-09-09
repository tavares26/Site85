"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brooklynServices } from "@/data/fictional-data";
import { CutLine } from "@/components/Reveal";

/**
 * The straight razor is the whole section, not an ornament beside it.
 * It rests almost closed. Touching any service throws the blade open, and each
 * service parks it at a slightly different angle, so working down the list
 * reads as a hand opening a razor one notch at a time.
 */

const REST_ANGLE = 158; // folded into the scale
const openAngle = (i: number) => 34 - i * 6;

function Razor({ angle, label, instant }: { angle: number; label: string; instant: boolean }) {
  return (
    <svg
      viewBox="0 0 420 940"
      className="h-full w-full"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#6f6f68" />
          <stop offset="26%" stopColor="#d8d6cd" />
          <stop offset="42%" stopColor="#f2efe6" />
          <stop offset="58%" stopColor="#b9b7ad" />
          <stop offset="78%" stopColor="#7c7a72" />
          <stop offset="100%" stopColor="#4a4842" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfcdc4" />
        </linearGradient>
        <linearGradient id="scale" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#241a13" />
          <stop offset="35%" stopColor="#4a3728" />
          <stop offset="62%" stopColor="#34271E" />
          <stop offset="100%" stopColor="#1a130d" />
        </linearGradient>
        <linearGradient id="brassPin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e3cd9c" />
          <stop offset="55%" stopColor="#B69A6A" />
          <stop offset="100%" stopColor="#6f5c37" />
        </linearGradient>
      </defs>

      {/* Scale, the handle. Fixed. */}
      <g>
        <rect x="168" y="452" width="84" height="452" rx="40" fill="url(#scale)" />
        <rect
          x="178"
          y="462"
          width="64"
          height="432"
          rx="32"
          fill="none"
          stroke="#B69A6A"
          strokeOpacity="0.32"
          strokeWidth="1.5"
        />
        <circle cx="210" cy="872" r="9" fill="url(#brassPin)" />
        <text
          x="210"
          y="700"
          textAnchor="middle"
          transform="rotate(90 210 700)"
          fill="#B69A6A"
          fillOpacity="0.65"
          fontSize="17"
          letterSpacing="7"
          fontFamily="var(--font-bk-body), sans-serif"
        >
          BROOKLYN &amp; FIFTH
        </text>
      </g>

      {/* Blade group, pivoting on the brass pin at (210, 452). */}
      <motion.g
        initial={false}
        animate={{ rotate: angle }}
        transition={instant ? { duration: 0 } : { type: "spring", stiffness: 78, damping: 15, mass: 0.9 }}
        style={{ transformBox: "view-box", transformOrigin: "210px 452px" }}
      >
        {/* Tang, the little lever your finger rests on */}
        <path d="M196 452 L224 452 L232 500 L188 500 Z" fill="#5d5a52" />

        {/* Body of the blade, spine on the right, edge on the left */}
        <path
          d="M196 452
             C 196 400, 186 300, 182 214
             C 180 158, 186 108, 202 74
             C 212 52, 226 44, 236 52
             C 244 58, 246 74, 244 104
             C 240 190, 236 330, 234 452 Z"
          fill="url(#steel)"
        />

        {/* Hollow grind, the bright band down the middle */}
        <path
          d="M206 448 C 204 350, 200 236, 202 160 C 203 118, 210 84, 220 66"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />

        {/* Cutting edge */}
        <path
          d="M196 452 C 196 400, 186 300, 182 214 C 180 158, 186 108, 202 74"
          stroke="url(#edge)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Etch on the spine */}
        <text
          x="228"
          y="300"
          textAnchor="middle"
          transform="rotate(-91 228 300)"
          fill="#3a382f"
          fillOpacity="0.85"
          fontSize="15"
          letterSpacing="4"
          fontFamily="var(--font-bk-body), sans-serif"
        >
          {label}
        </text>
      </motion.g>
    </svg>
  );
}

export function RazorServices() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const angle = reduced ? 22 : active === null ? REST_ANGLE : openAngle(active);
  const current = active === null ? null : brooklynServices[active];
  const etch = current ? `${current.duration} MIN · $${current.price}` : "SHEFFIELD STEEL";

  return (
    <section
      className="tex-brick tex-grain relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="bk-services-heading"
    >
      <div className="mx-auto max-w-[92rem]">
        <header className="mb-14 max-w-3xl">
          <h1
            id="bk-services-heading"
            className="font-slab text-colossal uppercase text-bk-paper"
          >
            <CutLine>What the</CutLine>
            <CutLine delay={0.08}>
              <span className="text-bk-brass">chair costs</span>
            </CutLine>
          </h1>
          <p className="mt-6 max-w-measure font-grot text-xl leading-relaxed text-bk-paper/70">
            Six services, four chairs, no packages and no upsell at the register. Run
            your eye down the list. The razor opens as you go.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(240px,340px)] lg:gap-16">
          {/* ------------------------------------------------------- the list */}
          <ul className="order-2 lg:order-1">
            {brooklynServices.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.id} className="rule-brass">
                  <button
                    type="button"
                    className="group w-full py-6 text-left sm:py-7"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(on ? null : i)}
                    aria-expanded={on}
                    aria-controls={`svc-${s.id}`}
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <span
                        className={`font-slab text-3xl uppercase transition-colors duration-300 sm:text-4xl lg:text-5xl ${
                          on ? "text-bk-brass" : "text-bk-paper group-hover:text-bk-brass"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className="stamp shrink-0 text-bk-paper/55">
                        {s.duration} min · ${s.price}
                      </span>
                    </span>

                    <span className="mt-2 block max-w-measure font-grot text-lg text-bk-paper/60">
                      {s.blurb}
                    </span>

                    <motion.span
                      id={`svc-${s.id}`}
                      className="block overflow-hidden"
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="mt-4 block max-w-measure border-l-2 border-bk-brass/60 pl-5 font-grot text-lg leading-relaxed text-bk-paper/75">
                        {s.detail}
                      </span>
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ------------------------------------------------------ the razor */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-28 mx-auto h-[46vh] w-full max-w-[220px] sm:h-[52vh] sm:max-w-[280px] lg:h-[74vh] lg:max-w-none">
              <Razor angle={angle} label={etch} instant={!!reduced} />
            </div>
            <p className="mt-4 text-center font-grot text-sm italic text-bk-paper/40 lg:text-left">
              {active === null
                ? "Folded. Pick a service."
                : `Open at ${brooklynServices[active].duration} minutes.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
