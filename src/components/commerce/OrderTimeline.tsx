"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { TRACKING_STAGES } from "@/lib/commerce";

/**
 * Simulated tracking. Stages advance on a timer once the client asks to track,
 * so the demo actually shows movement rather than a static list.
 */
export function OrderTimeline({ startedAt }: { startedAt: string }) {
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (stage >= TRACKING_STAGES.length - 1) return;
    const timer = window.setTimeout(() => setStage((s) => s + 1), stage === 0 ? 900 : 2400);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const placed = new Date(startedAt);
  const stamps = TRACKING_STAGES.map((_, index) => {
    const at = new Date(placed.getTime() + index * 26 * 60 * 60 * 1000);
    return at;
  });

  return (
    <div className="mt-9">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="label">Tracking</h3>
        <p className="label-xs text-taupe">
          Simulated · updates every few seconds
        </p>
      </div>

      <ol className="mt-7">
        {TRACKING_STAGES.map((item, index) => {
          const done = index < stage;
          const current = index === stage;
          const reached = done || current;
          const last = index === TRACKING_STAGES.length - 1;

          return (
            <li key={item.key} className="relative flex gap-5 pb-9 last:pb-0">
              {/* Connector */}
              {!last && (
                <span
                  aria-hidden
                  className="absolute left-[0.6875rem] top-6 h-full w-px bg-charcoal/15"
                >
                  <motion.span
                    className="block w-px origin-top bg-charcoal"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: done ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: "100%" }}
                  />
                </span>
              )}

              <motion.span
                aria-hidden
                initial={false}
                animate={{
                  backgroundColor: reached ? "#11110F" : "rgba(17,17,15,0)",
                  borderColor: reached ? "#11110F" : "rgba(17,17,15,0.25)",
                  scale: current && !reduced ? [1, 1.14, 1] : 1,
                }}
                transition={{ duration: reduced ? 0 : 0.55 }}
                className="relative z-10 mt-1 grid h-[1.375rem] w-[1.375rem] shrink-0 place-items-center rounded-full border"
              >
                {done && <Check size={11} strokeWidth={2.2} className="text-sand" />}
                {current && <span className="h-1.5 w-1.5 rounded-full bg-sand" />}
              </motion.span>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p
                    className={`label ${
                      current ? "text-ember" : reached ? "text-charcoal" : "text-taupe"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="label-xs tabular-nums text-taupe">
                    {reached
                      ? `${String(stamps[index].getDate()).padStart(2, "0")}.${String(
                          stamps[index].getMonth() + 1
                        ).padStart(2, "0")} · ${String(stamps[index].getHours()).padStart(
                          2,
                          "0"
                        )}:${String(stamps[index].getMinutes()).padStart(2, "0")}`
                      : "Pending"}
                  </p>
                </div>
                <p
                  className={`mt-2 max-w-md text-[0.8125rem] leading-relaxed ${
                    reached ? "text-charcoal/75" : "text-taupe/70"
                  }`}
                >
                  {item.copy}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
