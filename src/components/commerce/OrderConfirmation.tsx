"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatBRL } from "@/lib/format";
import { STORE, STUDIO } from "@/data/site";
import { OrderTimeline } from "./OrderTimeline";

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const { getOrder, ready } = useStore();
  const [tracking, setTracking] = useState(false);
  const reduced = useReducedMotion();

  const order = ready ? getOrder(orderId) : undefined;

  if (!ready) {
    return (
      <div className="gutter mx-auto max-w-[120rem] py-24">
        <p className="label-xs text-taupe">Retrieving your order…</p>
      </div>
    );
  }

  // Orders live in this browser only. A shared or reloaded link that we cannot
  // resolve gets an honest explanation rather than a broken page.
  if (!order) {
    return (
      <div className="gutter mx-auto max-w-[120rem] py-20">
        <p className="label text-taupe">Order #{orderId}</p>
        <h1 className="mt-5 max-w-2xl font-display text-[2.5rem] font-light leading-[1.02] sm:text-[3.25rem]">
          We can&rsquo;t find that order <span className="italic text-ember">in this browser.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-taupe">
          This is a demonstration store, so orders are kept in local storage
          rather than on a server. They do not survive a different device, a
          private window, or cleared site data.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="label inline-flex h-13 items-center bg-charcoal px-8 py-4 text-sand transition-colors hover:bg-charcoal-soft"
          >
            Place a new demo order
          </Link>
          <a
            href={STUDIO.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="label inline-flex h-13 items-center border border-charcoal/25 px-8 py-4 transition-colors hover:border-charcoal"
          >
            Talk to {STUDIO.name}
          </a>
        </div>
      </div>
    );
  }

  const pickup = order.shipping.id === "pickup";

  return (
    <div className="gutter mx-auto max-w-[120rem] pb-28 pt-12 sm:pt-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
                }
                className="grid h-7 w-7 place-items-center rounded-full bg-ember"
              >
                <Check size={13} strokeWidth={2.2} className="text-sand" />
              </motion.span>
              <p className="label text-ember">Order confirmed</p>
            </div>

            <h1 className="mt-6 font-display text-[2.5rem] font-light leading-[1] tracking-[-0.02em] sm:text-[3.5rem]">
              Thank you,{" "}
              <span className="italic">{order.address.firstName}.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-charcoal/75">
              Your order{" "}
              <span className="tabular-nums text-charcoal">#{order.id}</span> is
              in. A confirmation would normally reach{" "}
              <span className="text-charcoal">{order.address.email}</span> — this
              being a demonstration, no email is sent and nothing is charged.
            </p>
          </motion.div>

          {!tracking ? (
            <button
              type="button"
              onClick={() => setTracking(true)}
              className="label group mt-9 inline-flex h-13 items-center gap-3 bg-charcoal px-8 text-sand transition-colors duration-500 [transition-timing-function:var(--ease-editorial)] hover:bg-charcoal-soft"
            >
              Track demo order
              <ArrowRight
                size={15}
                strokeWidth={1.4}
                className="transition-transform duration-500 [transition-timing-function:var(--ease-editorial)] group-hover:translate-x-1"
              />
            </button>
          ) : (
            <OrderTimeline startedAt={order.placedAt} />
          )}

          {/* Delivery details -------------------------------------- */}
          <div className="mt-12 grid gap-8 border-t border-charcoal/12 pt-9 sm:grid-cols-2">
            <div>
              <h2 className="label-xs text-taupe">
                {pickup ? "Collection point" : "Delivery address"}
              </h2>
              {pickup ? (
                <address className="mt-3 text-[0.875rem] not-italic leading-relaxed">
                  {STORE.name}
                  <br />
                  {STORE.street}
                  <br />
                  {STORE.district}
                </address>
              ) : (
                <address className="mt-3 text-[0.875rem] not-italic leading-relaxed">
                  {order.address.firstName} {order.address.lastName}
                  <br />
                  {order.address.street}, {order.address.number}
                  {order.address.complement ? ` — ${order.address.complement}` : ""}
                  <br />
                  {order.address.district}
                  <br />
                  {order.address.city} — {order.address.state}
                  <br />
                  <span className="tabular-nums">{order.address.cep}</span>
                </address>
              )}
            </div>

            <div>
              <h2 className="label-xs text-taupe">Method &amp; payment</h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed">
                {order.shipping.name}
                <br />
                <span className="text-taupe">{order.shipping.eta}</span>
              </p>
              <p className="mt-4 text-[0.875rem] leading-relaxed">
                Card ending{" "}
                <span className="tabular-nums">{order.cardLast4}</span>
                <br />
                <span className="text-ember">Not charged — demonstration</span>
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-charcoal/12 pt-9">
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-charcoal/75">
              This entire flow — bag, coupons, CEP quoting, checkout and tracking
              — runs in the browser, with no backend. If you want the same
              experience for a real catalogue,{" "}
              <a
                href={STUDIO.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="link-rule text-charcoal"
              >
                talk to {STUDIO.name}
              </a>
              .
            </p>
            <Link href="/shop" className="label link-rule mt-7 inline-block">
              Continue shopping →
            </Link>
          </div>
        </div>

        {/* Receipt ------------------------------------------------- */}
        <aside className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
          <div className="border border-charcoal/15 p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="label">Order</h2>
              <p className="label tabular-nums">#{order.id}</p>
            </div>

            <ul className="mt-7 space-y-4">
              {order.lines.map((line, index) => (
                <li key={`${line.productId}-${index}`} className="flex gap-3.5">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-sand-deep">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center bg-charcoal px-1 text-[0.625rem] tabular-nums text-sand">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.8125rem] leading-snug">{line.name}</p>
                    <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-taupe">
                      {line.color} · {line.size}
                    </p>
                  </div>
                  <p className="shrink-0 text-[0.8125rem] tabular-nums">
                    {formatBRL(line.price * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-7 space-y-2.5 border-t border-charcoal/12 pt-6">
              <div className="flex items-baseline justify-between">
                <dt className="label-xs text-taupe">Subtotal</dt>
                <dd className="text-[0.875rem] tabular-nums">{formatBRL(order.subtotal)}</dd>
              </div>
              {order.discount > 0 && (
                <div className="flex items-baseline justify-between text-ember">
                  <dt className="label-xs">
                    Discount{order.couponCode ? ` · ${order.couponCode}` : ""}
                  </dt>
                  <dd className="text-[0.875rem] tabular-nums">−{formatBRL(order.discount)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <dt className="label-xs text-taupe">Shipping</dt>
                <dd className="text-[0.875rem] tabular-nums">
                  {order.shippingCost === 0 ? (
                    <span className="text-ember">Free</span>
                  ) : (
                    formatBRL(order.shippingCost)
                  )}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-charcoal/12 pt-3.5">
                <dt className="label">Total</dt>
                <dd className="font-display text-2xl tabular-nums">{formatBRL(order.total)}</dd>
              </div>
            </dl>

            <p className="label-xs mt-6 border-t border-charcoal/12 pt-5 text-taupe">
              Demonstration receipt — no payment processed
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
