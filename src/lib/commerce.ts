import { FREE_SHIPPING_THRESHOLD } from "@/data/site";

/* ------------------------------------------------------------------ */
/* Coupons                                                             */
/* ------------------------------------------------------------------ */

export type Coupon = {
  code: string;
  label: string;
  kind: "percent" | "fixed" | "shipping";
  value: number;
  /** Minimum subtotal, in BRL, before the coupon is allowed. */
  minimum?: number;
};

export const COUPONS: Coupon[] = [
  { code: "NORTH10", label: "10% off the order", kind: "percent", value: 10 },
  { code: "N85DEMO", label: "15% off the order", kind: "percent", value: 15 },
  {
    code: "STUDIO85",
    label: "R$ 150 off orders over R$ 900",
    kind: "fixed",
    value: 150,
    minimum: 900,
  },
  { code: "FREESHIP85", label: "Complimentary shipping", kind: "shipping", value: 0 },
];

export type CouponResult =
  | { ok: true; coupon: Coupon }
  | { ok: false; reason: string };

export function validateCoupon(input: string, subtotal: number): CouponResult {
  const code = input.trim().toUpperCase();
  if (!code) return { ok: false, reason: "Enter a code to continue." };

  const coupon = COUPONS.find((c) => c.code === code);
  if (!coupon) return { ok: false, reason: `“${code}” is not a valid code.` };

  if (coupon.minimum && subtotal < coupon.minimum) {
    return {
      ok: false,
      reason: `${coupon.code} applies to orders over R$ ${coupon.minimum}.`,
    };
  }

  return { ok: true, coupon };
}

export function couponDiscount(coupon: Coupon | null, subtotal: number): number {
  if (!coupon) return 0;
  if (coupon.kind === "percent") {
    return Math.round(subtotal * (coupon.value / 100) * 100) / 100;
  }
  if (coupon.kind === "fixed") return Math.min(coupon.value, subtotal);
  return 0;
}

/* ------------------------------------------------------------------ */
/* Shipping                                                            */
/* ------------------------------------------------------------------ */

export type ShippingOption = {
  id: string;
  name: string;
  detail: string;
  eta: string;
  price: number;
};

const CEP_PATTERN = /^\d{5}-?\d{3}$/;

export function isValidCep(cep: string): boolean {
  return CEP_PATTERN.test(cep.trim());
}

/**
 * Fictional rates. The first CEP digit stands in for a region so the demo
 * returns something that at least varies believably instead of a constant.
 */
export function quoteShipping(cep: string): ShippingOption[] {
  const digits = cep.replace(/\D/g, "");
  const region = Number(digits[0] ?? "0");
  const far = region >= 6;
  const surcharge = far ? 12 : 0;

  return [
    {
      id: "standard",
      name: "Standard",
      detail: "Tracked, signature not required",
      eta: far ? "6 — 9 business days" : "4 — 6 business days",
      price: 24.9 + surcharge,
    },
    {
      id: "express",
      name: "Express",
      detail: "Tracked, signature on delivery",
      eta: far ? "3 — 4 business days" : "1 — 2 business days",
      price: 54.9 + surcharge,
    },
    {
      id: "pickup",
      name: "Store Pickup",
      detail: "85 Crosby Street, SoHo — ready in 24h",
      eta: "Collect from tomorrow, 11:00",
      price: 0,
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Totals                                                              */
/* ------------------------------------------------------------------ */

export type Totals = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  qualifiesForFreeShipping: boolean;
};

export function computeTotals(
  subtotal: number,
  coupon: Coupon | null,
  shipping: ShippingOption | null
): Totals {
  const discount = couponDiscount(coupon, subtotal);
  const discounted = Math.max(0, subtotal - discount);

  const qualifiesForFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || coupon?.kind === "shipping";

  let shippingCost = shipping?.price ?? 0;
  if (qualifiesForFreeShipping && shipping?.id !== "pickup") {
    shippingCost = 0;
  }

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    subtotal,
    discount,
    shipping: shippingCost,
    total: discounted + shippingCost,
    freeShippingRemaining: remaining,
    freeShippingProgress: Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD),
    qualifiesForFreeShipping,
  };
}

/* ------------------------------------------------------------------ */
/* Orders                                                              */
/* ------------------------------------------------------------------ */

export const TRACKING_STAGES = [
  {
    key: "placed",
    label: "Placed",
    copy: "We have your order. A confirmation is on its way to your inbox.",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    copy: "Payment authorised and stock reserved at the Crosby Street stockroom.",
  },
  {
    key: "preparing",
    label: "Preparing",
    copy: "Wrapped in tissue, boxed and labelled by hand.",
  },
  {
    key: "shipped",
    label: "Shipped",
    copy: "Collected by the carrier and moving toward you.",
  },
  {
    key: "delivered",
    label: "Delivered",
    copy: "Handed over. Thank you — we hope it earns its place.",
  },
] as const;

export type TrackingStage = (typeof TRACKING_STAGES)[number]["key"];

/** #N850024 style. Sequence is stored so repeat demo orders keep counting up. */
export function makeOrderId(sequence: number): string {
  return `N85${String(sequence).padStart(4, "0")}`;
}
