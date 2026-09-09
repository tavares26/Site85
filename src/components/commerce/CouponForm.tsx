"use client";

import { useState } from "react";
import { Check, Tag, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { validateCoupon, COUPONS } from "@/lib/commerce";
import { formatBRL } from "@/lib/format";

export function CouponForm({ compact = false }: { compact?: boolean }) {
  const { coupon, applyCoupon, totals } = useStore();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const result = validateCoupon(value, totals.subtotal);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    applyCoupon(result.coupon.code);
    setValue("");
    setError(null);
  }

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 border border-ember/35 bg-ember/[0.04] px-3.5 py-3">
        <span className="label-xs flex min-w-0 items-center gap-2 text-ember">
          <Check size={13} strokeWidth={1.75} className="shrink-0" />
          <span className="truncate">
            {coupon.code} — {coupon.label}
          </span>
        </span>
        <button
          type="button"
          onClick={() => applyCoupon(null)}
          aria-label={`Remove coupon ${coupon.code}`}
          className="shrink-0 text-ember transition-opacity hover:opacity-60"
        >
          <X size={13} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {compact && !open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="label-xs link-rule inline-flex items-center gap-2 text-taupe hover:text-charcoal"
        >
          <Tag size={12} strokeWidth={1.5} />
          Have a promotion code?
        </button>
      ) : (
        <>
          <form onSubmit={submit} className="flex gap-2">
            <label className="sr-only" htmlFor="coupon-input">
              Promotion code
            </label>
            <input
              id="coupon-input"
              value={value}
              onChange={(event) => {
                setValue(event.target.value.toUpperCase());
                setError(null);
              }}
              placeholder="PROMOTION CODE"
              autoComplete="off"
              spellCheck={false}
              className="label-xs h-11 min-w-0 flex-1 border border-charcoal/20 bg-transparent px-3.5 placeholder:text-taupe focus:border-charcoal focus:outline-none"
            />
            <button
              type="submit"
              className="label-xs h-11 shrink-0 border border-charcoal bg-charcoal px-5 text-sand transition-colors hover:bg-charcoal-soft"
            >
              Apply
            </button>
          </form>

          {error && (
            <p role="alert" className="label-xs text-ember">
              {error}
            </p>
          )}

          <p className="text-[0.6875rem] leading-relaxed text-taupe">
            Demo codes:{" "}
            {COUPONS.map((c, i) => (
              <span key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    setValue(c.code);
                    setError(null);
                  }}
                  className="underline decoration-taupe/40 underline-offset-2 transition-colors hover:text-charcoal"
                >
                  {c.code}
                </button>
                {i < COUPONS.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </>
      )}

      {totals.discount > 0 && (
        <p className="label-xs text-ember">−{formatBRL(totals.discount)} applied</p>
      )}
    </div>
  );
}
