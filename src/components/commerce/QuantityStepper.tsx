"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label,
  compact = false,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
  compact?: boolean;
}) {
  const box = compact ? "h-8 w-8" : "h-10 w-10";

  return (
    <div
      className="inline-flex items-center border border-charcoal/20"
      role="group"
      aria-label={`Quantity for ${label}`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min - 1, value - 1))}
        aria-label={value <= min ? `Remove ${label}` : `Decrease quantity of ${label}`}
        className={`${box} grid place-items-center transition-colors hover:bg-charcoal hover:text-sand`}
      >
        <Minus size={13} strokeWidth={1.5} />
      </button>
      <span
        aria-live="polite"
        className={`label grid ${compact ? "w-8" : "w-10"} place-items-center tabular-nums`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
        className={`${box} grid place-items-center transition-colors hover:bg-charcoal hover:text-sand disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal`}
      >
        <Plus size={13} strokeWidth={1.5} />
      </button>
    </div>
  );
}
