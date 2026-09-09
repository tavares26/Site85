"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Drawer } from "@/components/ui/Drawer";
import { formatBRL } from "@/lib/format";
import { FreeShippingBar } from "./FreeShippingBar";
import { BagLineItem } from "./BagLineItem";
import { CouponForm } from "./CouponForm";

export function BagDrawer() {
  const { bagOpen, closeBag, lines, totals, count } = useStore();

  return (
    <Drawer
      open={bagOpen}
      onClose={closeBag}
      title={`Shopping bag${count > 0 ? ` (${count})` : ""}`}
    >
      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
          <p className="font-display text-3xl font-light">Your bag is empty.</p>
          <p className="max-w-xs text-[0.8125rem] leading-relaxed text-taupe">
            Fourteen pieces, four categories, one point of view. Start with the
            permanent collection.
          </p>
          <Link
            href="/shop"
            onClick={closeBag}
            data-autofocus
            className="label border border-charcoal px-7 py-3.5 transition-colors hover:bg-charcoal hover:text-sand"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <>
          <div className="border-b border-charcoal/12 px-5 py-4 sm:px-7">
            <FreeShippingBar
              remaining={totals.freeShippingRemaining}
              progress={totals.freeShippingProgress}
              qualifies={totals.qualifiesForFreeShipping}
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-7">
            <ul className="divide-y divide-charcoal/10">
              {lines.map((line) => (
                <BagLineItem key={line.key} line={line} compact onNavigate={closeBag} />
              ))}
            </ul>
          </div>

          <div className="space-y-4 border-t border-charcoal/12 px-5 py-5 sm:px-7">
            <CouponForm compact />

            <dl className="space-y-2 border-t border-charcoal/12 pt-4">
              <div className="flex items-baseline justify-between">
                <dt className="label-xs text-taupe">Subtotal</dt>
                <dd className="font-sans text-[0.8125rem] tabular-nums">
                  {formatBRL(totals.subtotal)}
                </dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex items-baseline justify-between text-ember">
                  <dt className="label-xs">Discount</dt>
                  <dd className="font-sans text-[0.8125rem] tabular-nums">
                    −{formatBRL(totals.discount)}
                  </dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-charcoal/12 pt-2.5">
                <dt className="label-xs">Total</dt>
                <dd className="font-display text-xl tabular-nums">
                  {formatBRL(totals.total - totals.shipping)}
                </dd>
              </div>
            </dl>

            <p className="text-[0.6875rem] leading-relaxed text-taupe">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="grid gap-2">
              <Link
                href="/checkout"
                onClick={closeBag}
                data-autofocus
                className="label flex h-13 items-center justify-center bg-charcoal py-4 text-sand transition-colors hover:bg-charcoal-soft"
              >
                Checkout — {formatBRL(totals.total - totals.shipping)}
              </Link>
              <Link
                href="/bag"
                onClick={closeBag}
                className="label flex items-center justify-center border border-charcoal/25 py-4 transition-colors hover:border-charcoal"
              >
                View full bag
              </Link>
            </div>

            <p className="label-xs text-center text-taupe">
              Demo checkout — no real payment is processed
            </p>
          </div>
        </>
      )}
    </Drawer>
  );
}
