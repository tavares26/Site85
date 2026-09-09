"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatBRL } from "@/lib/format";

export function FreeShippingBar({
  remaining,
  progress,
  qualifies,
}: {
  remaining: number;
  progress: number;
  qualifies: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-2.5">
      <p className="label-xs text-charcoal">
        {qualifies ? (
          <span className="text-ember">Shipping is on us</span>
        ) : (
          <>
            You&rsquo;re{" "}
            <span className="text-ember tabular-nums">{formatBRL(remaining)}</span>{" "}
            away from free shipping
          </>
        )}
      </p>

      <div
        className="h-px w-full bg-charcoal/15"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Progress toward free shipping"
      >
        <motion.div
          className={`h-px origin-left ${qualifies ? "bg-ember" : "bg-charcoal"}`}
          initial={false}
          animate={{ scaleX: qualifies ? 1 : progress }}
          transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
