"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useStore } from "@/lib/store";
import { isValidCep } from "@/lib/commerce";
import { formatBRL, maskCep } from "@/lib/format";

export function ShippingEstimator({ heading = "Delivery estimate" }: { heading?: string }) {
  const { cep, setCep, shippingOptions, shipping, selectShipping, totals } = useStore();
  const [draft, setDraft] = useState(cep);
  const [error, setError] = useState<string | null>(null);
  const reduced = useReducedMotion();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValidCep(draft)) {
      setError("Enter a CEP as 00000-000.");
      return;
    }
    setError(null);
    setCep(draft);
    selectShipping(null);
  }

  return (
    <section className="space-y-3.5">
      <h3 className="label-xs text-taupe">{heading}</h3>

      <form onSubmit={submit} className="flex gap-2">
        <label className="sr-only" htmlFor="cep-input">
          Postal code (CEP)
        </label>
        <input
          id="cep-input"
          value={draft}
          onChange={(event) => {
            setDraft(maskCep(event.target.value));
            setError(null);
          }}
          placeholder="00000-000"
          inputMode="numeric"
          autoComplete="postal-code"
          aria-invalid={Boolean(error)}
          className="label-xs h-11 min-w-0 flex-1 border border-charcoal/20 bg-transparent px-3.5 tabular-nums placeholder:text-taupe focus:border-charcoal focus:outline-none"
        />
        <button
          type="submit"
          className="label-xs h-11 shrink-0 border border-charcoal/25 px-5 transition-colors hover:bg-charcoal hover:text-sand"
        >
          Calculate
        </button>
      </form>

      {error && (
        <p role="alert" className="label-xs text-ember">
          {error}
        </p>
      )}

      <AnimatePresence initial={false}>
        {shippingOptions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            className="overflow-hidden"
          >
            {shippingOptions.map((option) => {
              const active = shipping?.id === option.id;
              const free =
                totals.qualifiesForFreeShipping && option.id !== "pickup";

              return (
                <li key={option.id} className="border-t border-charcoal/12 first:border-t-0">
                  <button
                    type="button"
                    onClick={() => selectShipping(option.id)}
                    aria-pressed={active}
                    className={`flex w-full items-start justify-between gap-4 py-3.5 text-left transition-colors ${
                      active ? "text-charcoal" : "text-taupe hover:text-charcoal"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={`mt-[3px] h-2.5 w-2.5 shrink-0 rounded-full border transition-colors ${
                          active ? "border-charcoal bg-charcoal" : "border-charcoal/30"
                        }`}
                      />
                      <span>
                        <span className="label-xs block text-charcoal">{option.name}</span>
                        <span className="mt-1 block text-[0.6875rem] leading-relaxed">
                          {option.detail}
                        </span>
                        <span className="mt-0.5 block text-[0.6875rem]">{option.eta}</span>
                      </span>
                    </span>
                    <span className="label-xs shrink-0 tabular-nums text-charcoal">
                      {option.price === 0 || free ? (
                        <span className="text-ember">Free</span>
                      ) : (
                        formatBRL(option.price)
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
