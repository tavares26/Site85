"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Lock, ShieldAlert } from "lucide-react";
import { useStore, type Address } from "@/lib/store";
import {
  addressSchema, contactSchema, paymentSchema, DEMO_CARD, UF,
  type AddressValues, type ContactValues, type PaymentValues,
} from "@/lib/checkout-schema";
import { isValidCep } from "@/lib/commerce";
import { formatBRL, maskCardNumber, maskCep, maskExpiry, maskPhone } from "@/lib/format";
import { Field, SelectField } from "./Field";
import { CouponForm } from "./CouponForm";

const STEPS = [
  { key: "contact", label: "Contact" },
  { key: "delivery", label: "Delivery" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

export function CheckoutFlow() {
  const router = useRouter();
  const {
    lines, totals, ready, cep, setCep, shippingOptions, shipping,
    selectShipping, placeOrder,
  } = useStore();

  const [step, setStep] = useState<StepKey>("contact");
  const [contact, setContact] = useState<ContactValues | null>(null);
  const [address, setAddress] = useState<AddressValues | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const reduced = useReducedMotion();

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const contactForm = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "", firstName: "", lastName: "", phone: "", newsletter: true },
  });

  const addressForm = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      cep: cep || "", street: "", number: "", complement: "",
      district: "", city: "", state: "SP",
    },
  });

  const paymentForm = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardName: "", cardNumber: "", expiry: "", cvv: "" },
  });

  if (!ready) {
    return (
      <div className="gutter mx-auto max-w-[120rem] py-24">
        <p className="label-xs text-taupe">Preparing checkout…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="gutter mx-auto max-w-[120rem] py-24">
        <p className="label text-taupe">Checkout</p>
        <h1 className="mt-5 font-display text-[2.75rem] font-light leading-tight sm:text-[3.5rem]">
          There is nothing to check out.
        </h1>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-taupe">
          Add something to the bag and the four steps below will open up.
        </p>
        <Link
          href="/shop"
          className="label mt-9 inline-flex h-13 items-center bg-charcoal px-8 py-4 text-sand transition-colors hover:bg-charcoal-soft"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  function submitContact(values: ContactValues) {
    setContact(values);
    setStep("delivery");
  }

  function submitAddress(values: AddressValues) {
    setAddress(values);
    setCep(values.cep);
    selectShipping(null);
    setStep("shipping");
  }

  function confirmShipping() {
    if (!shipping) {
      setShippingError("Choose a delivery method to continue.");
      return;
    }
    setShippingError(null);
    setStep("payment");
  }

  function submitPayment(values: PaymentValues) {
    if (!contact || !address) return;
    setSubmitting(true);

    const full: Address = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      cep: address.cep,
      street: address.street,
      number: address.number,
      complement: address.complement,
      district: address.district,
      city: address.city,
      state: address.state,
    };

    const order = placeOrder({
      address: full,
      cardLast4: values.cardNumber.replace(/\D/g, "").slice(-4),
    });

    if (!order) {
      setSubmitting(false);
      return;
    }

    router.push(`/order/${order.id}`);
  }

  function fillDemoCard() {
    paymentForm.reset(DEMO_CARD);
    paymentForm.clearErrors();
  }

  const stepMotion = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="gutter mx-auto max-w-[120rem] pb-28 pt-12 sm:pt-16">
      <header className="max-w-3xl">
        <p className="label text-taupe">Checkout</p>
        <h1 className="mt-5 font-display text-[2.5rem] font-light leading-[1] tracking-[-0.02em] sm:text-[3.25rem]">
          Four steps, <span className="italic text-ember">no account.</span>
        </h1>
      </header>

      {/* Demo warning ------------------------------------------------- */}
      <div className="mt-9 flex items-start gap-3.5 border border-ember/30 bg-ember/[0.04] px-5 py-4">
        <ShieldAlert size={17} strokeWidth={1.4} className="mt-0.5 shrink-0 text-ember" />
        <div>
          <p className="label-xs text-ember">Demo checkout — no real payment will be processed</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-charcoal/75">
            Nothing you type here is transmitted anywhere. Card details are never
            stored, and the order that follows exists only in this browser.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* ---------------------------------------------------------- */}
        <div className="lg:col-span-7 xl:col-span-7">
          <ol className="rule-strong flex flex-wrap gap-x-7 gap-y-2 py-4">
            {STEPS.map((item, index) => {
              const done = index < stepIndex;
              const current = index === stepIndex;
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    disabled={index > stepIndex}
                    onClick={() => setStep(item.key)}
                    aria-current={current ? "step" : undefined}
                    className={`label-xs flex items-center gap-2 transition-colors disabled:cursor-not-allowed ${
                      current ? "text-charcoal" : done ? "text-taupe hover:text-charcoal" : "text-taupe/45"
                    }`}
                  >
                    <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                    {done && <Check size={11} strokeWidth={2} className="text-ember" />}
                  </button>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait" initial={false}>
            {/* Step 1 — Contact ------------------------------------- */}
            {step === "contact" && (
              <motion.form
                key="contact"
                {...stepMotion}
                onSubmit={contactForm.handleSubmit(submitContact)}
                className="pt-9"
                noValidate
              >
                <h2 className="font-display text-2xl font-light">Contact</h2>
                <p className="mt-2.5 text-[0.8125rem] text-taupe">
                  We send one confirmation and nothing else.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="sm:col-span-2"
                    error={contactForm.formState.errors.email?.message}
                    {...contactForm.register("email")}
                  />
                  <Field
                    label="First name"
                    autoComplete="given-name"
                    error={contactForm.formState.errors.firstName?.message}
                    {...contactForm.register("firstName")}
                  />
                  <Field
                    label="Last name"
                    autoComplete="family-name"
                    error={contactForm.formState.errors.lastName?.message}
                    {...contactForm.register("lastName")}
                  />
                  <Field
                    label="Phone"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(11) 90000-0000"
                    className="sm:col-span-2"
                    error={contactForm.formState.errors.phone?.message}
                    {...contactForm.register("phone", {
                      onChange: (event) => {
                        event.target.value = maskPhone(event.target.value);
                      },
                    })}
                  />
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-charcoal"
                    {...contactForm.register("newsletter")}
                  />
                  <span className="text-[0.8125rem] leading-relaxed text-taupe">
                    Send me the N85 letter — roughly once a month, when there is
                    something to say.
                  </span>
                </label>

                <button
                  type="submit"
                  className="label mt-9 h-13 w-full bg-charcoal px-8 text-sand transition-colors hover:bg-charcoal-soft sm:w-auto"
                >
                  Continue to delivery
                </button>
              </motion.form>
            )}

            {/* Step 2 — Delivery ------------------------------------ */}
            {step === "delivery" && (
              <motion.form
                key="delivery"
                {...stepMotion}
                onSubmit={addressForm.handleSubmit(submitAddress)}
                className="pt-9"
                noValidate
              >
                <h2 className="font-display text-2xl font-light">Delivery address</h2>
                <p className="mt-2.5 text-[0.8125rem] text-taupe">
                  Enter a CEP and the rest of the form fills itself in this demo.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-6">
                  <Field
                    label="CEP"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                    className="sm:col-span-2"
                    error={addressForm.formState.errors.cep?.message}
                    {...addressForm.register("cep", {
                      onChange: (event) => {
                        const masked = maskCep(event.target.value);
                        event.target.value = masked;
                        // Demo convenience: prefill the address once the CEP is complete.
                        if (isValidCep(masked) && !addressForm.getValues("street")) {
                          addressForm.setValue("street", "Rua Oscar Freire");
                          addressForm.setValue("district", "Jardins");
                          addressForm.setValue("city", "São Paulo");
                          addressForm.setValue("state", "SP");
                        }
                      },
                    })}
                  />
                  <Field
                    label="Street"
                    autoComplete="address-line1"
                    className="sm:col-span-4"
                    error={addressForm.formState.errors.street?.message}
                    {...addressForm.register("street")}
                  />
                  <Field
                    label="Number"
                    className="sm:col-span-2"
                    error={addressForm.formState.errors.number?.message}
                    {...addressForm.register("number")}
                  />
                  <Field
                    label="Complement"
                    hint="Optional"
                    className="sm:col-span-4"
                    {...addressForm.register("complement")}
                  />
                  <Field
                    label="District"
                    autoComplete="address-level3"
                    className="sm:col-span-3"
                    error={addressForm.formState.errors.district?.message}
                    {...addressForm.register("district")}
                  />
                  <Field
                    label="City"
                    autoComplete="address-level2"
                    className="sm:col-span-2"
                    error={addressForm.formState.errors.city?.message}
                    {...addressForm.register("city")}
                  />
                  <SelectField
                    label="State"
                    className="sm:col-span-1"
                    error={addressForm.formState.errors.state?.message}
                    {...addressForm.register("state")}
                  >
                    {UF.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </SelectField>
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="label h-13 bg-charcoal px-8 text-sand transition-colors hover:bg-charcoal-soft"
                  >
                    Continue to shipping
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("contact")}
                    className="label h-13 border border-charcoal/25 px-8 transition-colors hover:border-charcoal"
                  >
                    Back
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 3 — Shipping ------------------------------------ */}
            {step === "shipping" && (
              <motion.div key="shipping" {...stepMotion} className="pt-9">
                <h2 className="font-display text-2xl font-light">Delivery method</h2>
                <p className="mt-2.5 text-[0.8125rem] text-taupe">
                  Rates quoted for {addressForm.getValues("cep")}.
                </p>

                <ul className="mt-7 border-t border-charcoal/12">
                  {shippingOptions.map((option) => {
                    const active = shipping?.id === option.id;
                    const free = totals.qualifiesForFreeShipping && option.id !== "pickup";
                    return (
                      <li key={option.id} className="border-b border-charcoal/12">
                        <button
                          type="button"
                          onClick={() => {
                            selectShipping(option.id);
                            setShippingError(null);
                          }}
                          aria-pressed={active}
                          className={`flex w-full items-start justify-between gap-5 py-5 text-left transition-colors ${
                            active ? "text-charcoal" : "text-taupe hover:text-charcoal"
                          }`}
                        >
                          <span className="flex items-start gap-3.5">
                            <span
                              aria-hidden
                              className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full border transition-colors ${
                                active ? "border-charcoal bg-charcoal" : "border-charcoal/30"
                              }`}
                            />
                            <span>
                              <span className="label block text-charcoal">{option.name}</span>
                              <span className="mt-1.5 block text-[0.8125rem] leading-relaxed">
                                {option.detail}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem]">{option.eta}</span>
                            </span>
                          </span>
                          <span className="label shrink-0 tabular-nums text-charcoal">
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
                </ul>

                {shippingError && (
                  <p role="alert" className="label-xs mt-4 text-ember">
                    {shippingError}
                  </p>
                )}

                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={confirmShipping}
                    className="label h-13 bg-charcoal px-8 text-sand transition-colors hover:bg-charcoal-soft"
                  >
                    Continue to payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("delivery")}
                    className="label h-13 border border-charcoal/25 px-8 transition-colors hover:border-charcoal"
                  >
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Payment ------------------------------------- */}
            {step === "payment" && (
              <motion.form
                key="payment"
                {...stepMotion}
                onSubmit={paymentForm.handleSubmit(submitPayment)}
                className="pt-9"
                noValidate
              >
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-light">Payment</h2>
                    <p className="mt-2.5 flex items-center gap-2 text-[0.8125rem] text-taupe">
                      <Lock size={12} strokeWidth={1.5} />
                      Nothing is transmitted. Nothing is charged.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillDemoCard}
                    className="label h-11 border border-ember px-5 text-ember transition-colors hover:bg-ember hover:text-sand"
                  >
                    Use demo card
                  </button>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-6">
                  <Field
                    label="Name on card"
                    autoComplete="off"
                    className="sm:col-span-6"
                    error={paymentForm.formState.errors.cardName?.message}
                    {...paymentForm.register("cardName")}
                  />
                  <Field
                    label="Card number"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="0000 0000 0000 0000"
                    className="sm:col-span-6"
                    error={paymentForm.formState.errors.cardNumber?.message}
                    {...paymentForm.register("cardNumber", {
                      onChange: (event) => {
                        event.target.value = maskCardNumber(event.target.value);
                      },
                    })}
                  />
                  <Field
                    label="Expiry"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="MM/YY"
                    className="sm:col-span-3"
                    error={paymentForm.formState.errors.expiry?.message}
                    {...paymentForm.register("expiry", {
                      onChange: (event) => {
                        event.target.value = maskExpiry(event.target.value);
                      },
                    })}
                  />
                  <Field
                    label="CVV"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="000"
                    maxLength={4}
                    className="sm:col-span-3"
                    error={paymentForm.formState.errors.cvv?.message}
                    {...paymentForm.register("cvv")}
                  />
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="label h-13 bg-charcoal px-8 text-sand transition-colors hover:bg-charcoal-soft disabled:opacity-50"
                  >
                    {submitting ? "Placing order…" : `Place demo order — ${formatBRL(totals.total)}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="label h-13 border border-charcoal/25 px-8 transition-colors hover:border-charcoal"
                  >
                    Back
                  </button>
                </div>

                <p className="label-xs mt-5 text-taupe">
                  Demo checkout — no real payment will be processed
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Summary --------------------------------------------------- */}
        <aside className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
          <div className="space-y-7 border border-charcoal/15 p-6 sm:p-8 lg:sticky lg:top-[6.5rem]">
            <h2 className="label">
              Order summary — {lines.length} {lines.length === 1 ? "line" : "lines"}
            </h2>

            <ul className="max-h-72 space-y-4 overflow-y-auto">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3.5">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-sand-deep">
                    <Image
                      src={line.image}
                      alt={line.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center bg-charcoal px-1 text-[0.625rem] tabular-nums text-sand">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.8125rem] leading-snug">{line.product.name}</p>
                    <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.14em] text-taupe">
                      {line.color} · {line.size}
                    </p>
                  </div>
                  <p className="shrink-0 text-[0.8125rem] tabular-nums">
                    {formatBRL(line.lineTotal)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-charcoal/12 pt-6">
              <CouponForm compact />
            </div>

            <dl className="space-y-2.5 border-t border-charcoal/12 pt-6">
              <div className="flex items-baseline justify-between">
                <dt className="label-xs text-taupe">Subtotal</dt>
                <dd className="text-[0.875rem] tabular-nums">{formatBRL(totals.subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex items-baseline justify-between text-ember">
                  <dt className="label-xs">Discount</dt>
                  <dd className="text-[0.875rem] tabular-nums">−{formatBRL(totals.discount)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <dt className="label-xs text-taupe">Shipping</dt>
                <dd className="text-[0.875rem] tabular-nums">
                  {shipping
                    ? totals.shipping === 0
                      ? <span className="text-ember">Free</span>
                      : formatBRL(totals.shipping)
                    : <span className="text-taupe">Not selected</span>}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-charcoal/12 pt-3.5">
                <dt className="label">Total</dt>
                <dd className="font-display text-2xl tabular-nums">{formatBRL(totals.total)}</dd>
              </div>
            </dl>

            <Link href="/bag" className="label-xs link-rule inline-block text-taupe">
              Edit bag
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
