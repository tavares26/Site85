"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import type { BeforeAfter, Universe } from "@/data/fictional-data";

/**
 * The divider is a real range input, so arrow keys, Home and End all work and
 * a screen reader announces a percentage. Pointer dragging writes to the same
 * value, which keeps one source of truth.
 */
export function BeforeAfterSlider({
  item,
  universe,
}: {
  item: BeforeAfter;
  universe: Universe;
}) {
  const [value, setValue] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const id = useId();
  const isBk = universe === "brooklyn";

  const fromPointer = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const pct = ((clientX - box.left) / box.width) * 100;
    setValue(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <figure className="w-full">
      <div
        ref={frame}
        className={`relative aspect-[4/5] w-full select-none overflow-hidden sm:aspect-[3/2] ${
          isBk ? "bg-bk-smoke" : "bg-ff-cream"
        }`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) fromPointer(e.clientX);
        }}
      >
        <Image
          src={item.before}
          alt={item.beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover ${isBk ? "" : "grayscale"}`}
        />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src={item.after}
            alt={item.afterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 w-px ${
            isBk ? "bg-bk-brass" : "bg-ff-chalk"
          }`}
          style={{ left: `${value}%` }}
        >
          <span
            className={`absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
              isBk ? "bg-bk-brass text-bk-ink" : "bg-ff-chalk text-ff-noir"
            }`}
          >
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
              <path d="M8 1L3 6l5 5M14 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </div>

        <span
          className={`stamp pointer-events-none absolute bottom-3 left-3 px-2 py-1 ${
            isBk ? "bg-bk-ink/80 text-bk-paper/80" : "bg-ff-noir/75 text-ff-chalk"
          }`}
        >
          Before
        </span>
        <span
          className={`stamp pointer-events-none absolute bottom-3 right-3 px-2 py-1 ${
            isBk ? "bg-bk-brass text-bk-ink" : "bg-ff-rouge text-ff-chalk"
          }`}
        >
          After
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Reveal the finished result for {item.title}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(value)}
        onChange={(e) => setValue(Number(e.target.value))}
        className={`mt-4 w-full cursor-ew-resize appearance-none bg-transparent
          [&::-webkit-slider-runnable-track]:h-px
          [&::-moz-range-track]:h-px
          [&::-webkit-slider-thumb]:mt-[-9px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
          [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full
          ${
            isBk
              ? "[&::-webkit-slider-runnable-track]:bg-bk-brass/40 [&::-moz-range-track]:bg-bk-brass/40 [&::-webkit-slider-thumb]:bg-bk-brass [&::-moz-range-thumb]:bg-bk-brass"
              : "[&::-webkit-slider-runnable-track]:bg-ff-noir/25 [&::-moz-range-track]:bg-ff-noir/25 [&::-webkit-slider-thumb]:bg-ff-rouge [&::-moz-range-thumb]:bg-ff-rouge"
          }`}
      />

      <figcaption className="mt-4">
        <h3
          className={
            isBk
              ? "font-slab text-2xl uppercase text-bk-paper"
              : "font-didone text-2xl text-ff-noir"
          }
        >
          {item.title}
        </h3>
        <p
          className={
            isBk
              ? "mt-1.5 max-w-measure font-grot text-lg text-bk-paper/60"
              : "mt-1.5 max-w-measure-serif font-garamond text-xl text-ff-noir/65"
          }
        >
          {item.note}
        </p>
        <p className={`stamp mt-2 ${isBk ? "text-bk-brass/80" : "text-ff-rouge/80"}`}>
          {item.by}
        </p>
      </figcaption>
    </figure>
  );
}
