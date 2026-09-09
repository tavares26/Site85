"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatBRL } from "@/lib/format";
import { PageHeader } from "@/components/layout/PageHeader";
import { BagLineItem } from "./BagLineItem";
import { CouponForm } from "./CouponForm";
import { FreeShippingBar } from "./FreeShippingBar";
import { ShippingEstimator } from "./ShippingEstimator";

export function BagPageContent() {
  const { lines, totals, count, ready, clearBag } = useStore();

  if (!ready) {
    return (
      <div className="gutter mx-auto max-w-[120rem] py-24">
        <p className="label-xs text-taupe">Loading your bag…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow="Shopping bag"
          title="Nothing in the"
          italic="bag yet."
          description="Fourteen pieces, four categories, one point of view. Start wherever you like — the permanent collection is the safest entry."
        />
        <div className="gutter mx-auto max-w-[120rem] pb-28">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="label inline-flex h-13 items-center bg-charcoal px-8 py-4 text-sand transition-colors hover:bg-charcoal-soft"
            >
              Browse the shop
            </Link>
            <Link
              href="/favorites"
              className="label inline-flex h-13 items-center border border-charcoal/25 px-8 py-4 transition-colors hover:border-charcoal"
            >
              View favourites
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`Shopping bag — ${count} ${count === 1 ? "item" : "items"}`}
        title="Your"
        italic="selection."
      />

      <div className="gutter mx-auto max-w-[120rem] pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="rule-strong flex items-center justify-between py-4">
              <p className="label-xs text-taupe">Item</p>
              <button
                type="button"
                onClick={clearBag}
                className="label-xs link-rule text-taupe hover:text-ember"
              >
                Empty bag
              </button>
            </div>

            <ul className="divide-y divide-charcoal/10">
              {lines.map((line) => (
                <BagLineItem key={line.key} line={line} />
              ))}
            </ul>

            <Link href="/shop" className="label link-rule mt-8 inline-block">
              ← Continue shopping
            </Link>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="space-y-8 border border-charcoal/15 p-6 sm:p-8 lg:sticky lg:top-[6.5rem]">
              <h2 className="label">Order summary</h2>

              <FreeShippingBar
                remaining={totals.freeShippingRemaining}
                progress={totals.freeShippingProgress}
                qualifies={totals.qualifiesForFreeShipping}
              />

              <div className="border-t border-charcoal/12 pt-7">
                <CouponForm />
              </div>

              <div className="border-t border-charcoal/12 pt-7">
                <ShippingEstimator />
              </div>

              <dl className="space-y-2.5 border-t border-charcoal/12 pt-7">
                <div className="flex items-baseline justify-between">
                  <dt className="label-xs text-taupe">Subtotal</dt>
                  <dd className="font-sans text-[0.875rem] tabular-nums">
                    {formatBRL(totals.subtotal)}
                  </dd>
                </div>
                {totals.discount > 0 && (
                  <div className="flex items-baseline justify-between text-ember">
                    <dt className="label-xs">Discount</dt>
                    <dd className="font-sans text-[0.875rem] tabular-nums">
                      −{formatBRL(totals.discount)}
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between">
                  <dt className="label-xs text-taupe">Shipping</dt>
                  <dd className="font-sans text-[0.875rem] tabular-nums">
                    {totals.shipping === 0 ? (
                      totals.qualifiesForFreeShipping ? (
                        <span className="text-ember">Free</span>
                      ) : (
                        <span className="text-taupe">Calculated at checkout</span>
                      )
                    ) : (
                      formatBRL(totals.shipping)
                    )}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-charcoal/12 pt-3.5">
                  <dt className="label">Total</dt>
                  <dd className="font-display text-2xl tabular-nums">
                    {formatBRL(totals.total)}
                  </dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                className="label flex h-13 items-center justify-center bg-charcoal text-sand transition-colors hover:bg-charcoal-soft"
              >
                Proceed to checkout
              </Link>

              <p className="label-xs text-center text-taupe">
                Demo checkout — no real payment is processed
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
