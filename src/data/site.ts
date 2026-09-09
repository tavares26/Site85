/**
 * Brand-level constants for the NORTH 85 demo store.
 * Everything here is fictional; the studio contact is the only real detail.
 */

export const STUDIO = {
  name: "Manhattan Studios",
  phone: "+55 85 99782-3927",
  phoneHref: "tel:+5585997823927",
  whatsappHref: "https://wa.me/5585997823927",
  signature: "DEMO BY MANHATTAN STUDIOS",
} as const;

export const BRAND = {
  name: "NORTH 85",
  slash: "NORTH / 85",
  short: "N85",
  tagline: "A concept store for considered dressing.",
  city: "New York",
  founded: 2019,
  email: "concierge@north85.demo",
} as const;

export const FREE_SHIPPING_THRESHOLD = 600;

export const CATEGORIES = [
  {
    slug: "clothing",
    label: "Clothing",
    eyebrow: "01",
    blurb:
      "Cut in Portugal and Japan from cloth we can trace. Six shapes, refined season after season instead of replaced.",
  },
  {
    slug: "accessories",
    label: "Accessories",
    eyebrow: "02",
    blurb:
      "Leather goods and acetate frames finished by hand. Hardware that patinas rather than plates.",
  },
  {
    slug: "fragrance",
    label: "Fragrance",
    eyebrow: "03",
    blurb:
      "Two compositions built in Grasse around cedar, iris and warm paper. Bottled in Cornish glass.",
  },
  {
    slug: "lifestyle",
    label: "Lifestyle",
    eyebrow: "04",
    blurb:
      "Objects for the hours you are not dressed for anyone. Stoneware, wax, quiet light.",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const STORE = {
  name: "NORTH 85 — Flagship",
  street: "85 Crosby Street",
  district: "SoHo, New York, NY 10012",
  hours: [
    { days: "Monday — Friday", time: "11:00 — 20:00" },
    { days: "Saturday", time: "10:00 — 21:00" },
    { days: "Sunday", time: "12:00 — 18:00" },
  ],
  services: [
    "Private appointments",
    "In-store alterations",
    "Fragrance consultation",
    "Same-day pickup",
  ],
} as const;
