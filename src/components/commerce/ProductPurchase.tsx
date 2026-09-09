"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Heart, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { formatBRL, discountPercent } from "@/lib/format";
import { SizeGuide } from "./SizeGuide";

export function ProductPurchase({ product }: { product: Product }) {
  const { addToBag, toggleFavorite, isFavorite, ready } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const saved = ready && isFavorite(product.id);
  const onSale = typeof product.compareAt === "number";

  // The mobile sticky bar appears only once the inline buy block is out of view.
  useEffect(() => {
    const node = anchorRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(!entry.isIntersecting),
      { rootMargin: "-120px 0px 0px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!confirmed) return;
    const timer = window.setTimeout(() => setConfirmed(false), 2400);
    return () => window.clearTimeout(timer);
  }, [confirmed]);

  function submit() {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToBag({ productId: product.id, color, size, quantity });
    setConfirmed(true);
  }

  return (
    <>
      <div ref={anchorRef} className="space-y-8">
        {/* Price ---------------------------------------------------- */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p
            className={`font-display text-3xl font-light tabular-nums ${
              onSale ? "text-ember" : ""
            }`}
          >
            {formatBRL(product.price)}
          </p>
          {onSale && product.compareAt && (
            <>
              <p className="text-[0.9375rem] tabular-nums text-taupe line-through">
                {formatBRL(product.compareAt)}
              </p>
              <span className="label-xs bg-ember px-2.5 py-1.5 text-sand">
                −{discountPercent(product.price, product.compareAt)}%
              </span>
            </>
          )}
        </div>

        {/* Colour --------------------------------------------------- */}
        <fieldset>
          <legend className="label-xs mb-4 text-taupe">
            Colour — <span className="text-charcoal">{color}</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((variant) => {
              const active = variant.name === color;
              return (
                <button
                  key={variant.name}
                  type="button"
                  onClick={() => setColor(variant.name)}
                  aria-pressed={active}
                  aria-label={variant.name}
                  title={variant.name}
                  className={`h-9 w-9 rounded-full border transition-all duration-400 ${
                    active
                      ? "border-charcoal ring-1 ring-charcoal ring-offset-4 ring-offset-sand"
                      : "border-charcoal/20 hover:border-charcoal/50"
                  }`}
                  style={{ backgroundColor: variant.hex }}
                />
              );
            })}
          </div>
        </fieldset>

        {/* Size ----------------------------------------------------- */}
        {product.sizeType !== "one" && (
          <fieldset>
            <legend className="mb-4 flex w-full items-center justify-between gap-4">
              <span className="label-xs text-taupe">
                {product.sizeType === "volume" ? "Volume" : "Size"}
                {size && <span className="text-charcoal"> — {size}</span>}
              </span>
              <SizeGuide product={product} />
            </legend>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => {
                const active = option === size;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSize(option);
                      setSizeError(false);
                    }}
                    aria-pressed={active}
                    className={`label-xs min-w-[3.25rem] border px-4 py-3.5 transition-colors ${
                      active
                        ? "border-charcoal bg-charcoal text-sand"
                        : "border-charcoal/20 hover:border-charcoal"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {sizeError && (
              <p role="alert" className="label-xs mt-3 text-ember">
                Choose a {product.sizeType === "volume" ? "volume" : "size"} to continue.
              </p>
            )}
          </fieldset>
        )}

        {/* Quantity + actions --------------------------------------- */}
        <div className="space-y-3">
          <div className="flex items-stretch gap-2">
            <div className="flex items-center border border-charcoal/20">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="grid h-13 w-11 place-items-center transition-colors hover:bg-charcoal hover:text-sand disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
              >
                <Minus size={13} strokeWidth={1.5} />
              </button>
              <span aria-live="polite" className="label grid w-9 place-items-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                disabled={quantity >= 10}
                aria-label="Increase quantity"
                className="grid h-13 w-11 place-items-center transition-colors hover:bg-charcoal hover:text-sand disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charcoal"
              >
                <Plus size={13} strokeWidth={1.5} />
              </button>
            </div>

            <button
              type="button"
              onClick={submit}
              className="label relative h-13 flex-1 overflow-hidden bg-charcoal px-6 text-sand transition-colors duration-500 [transition-timing-function:var(--ease-editorial)] hover:bg-charcoal-soft"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={confirmed ? "added" : "add"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: reduced ? 0 : 0.28 }}
                  className="flex items-center justify-center gap-2"
                >
                  {confirmed ? (
                    <>
                      <Check size={14} strokeWidth={1.75} />
                      Added to bag
                    </>
                  ) : (
                    <>Add to bag — {formatBRL(product.price * quantity)}</>
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from favourites" : "Save to favourites"}
              className="grid h-13 w-13 shrink-0 place-items-center border border-charcoal/20 transition-colors hover:border-charcoal"
            >
              <Heart
                size={16}
                strokeWidth={1.25}
                className={saved ? "fill-ember text-ember" : ""}
              />
            </button>
          </div>

          <p className="label-xs text-center text-taupe">
            Demo checkout — no real payment will be processed
          </p>
        </div>
      </div>

      {/* Mobile sticky bar ------------------------------------------- */}
      <AnimatePresence>
        {ctaVisible && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
            }
            className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/12 bg-sand/95 backdrop-blur-md lg:hidden"
          >
            <div className="gutter flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.8125rem] leading-tight">{product.name}</p>
                <p
                  className={`mt-0.5 text-[0.75rem] tabular-nums ${
                    onSale ? "text-ember" : "text-taupe"
                  }`}
                >
                  {formatBRL(product.price)}
                  {size ? ` · ${size}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={submit}
                className="label h-12 shrink-0 bg-charcoal px-6 text-sand"
              >
                {confirmed ? "Added" : "Add to bag"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
