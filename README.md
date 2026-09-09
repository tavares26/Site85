# NORTH 85

A demonstration commerce experience for a fictional New York concept store,
built as a showcase by **Manhattan Studios**.

Fourteen products across four categories, a full purchase journey, and no
backend: bag, favourites, coupons, CEP-based shipping quotes, a four-step
checkout and order tracking all run in the browser.

> **This is a demonstration.** NORTH 85 is a fictional commerce experience.
> No products are sold and no real payments are processed.

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (tokens in `src/app/globals.css`) |
| Motion | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Type | Cormorant Garamond + Jost, via `next/font` |

No database, no authentication, no payment provider. State lives in a single
reducer (`src/lib/store.tsx`) and persists to `localStorage`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Routes

| Route | What it does |
| --- | --- |
| `/` | Editorial homepage — hero, new arrivals, categories, Drop 085, Private Sale, brand story, journal, Worn / 85 |
| `/shop` | Full catalogue with colour, size, price and availability filters plus five sort orders |
| `/shop/[category]` | Clothing, Accessories, Fragrance or Lifestyle |
| `/product/[slug]` | Gallery, colour and size variants, size guide, sticky mobile CTA, JSON-LD |
| `/search` | Standalone search over products and journal |
| `/favorites` | Wishlist, no account required |
| `/bag` | Full bag with coupons, CEP quoting and the free-shipping bar |
| `/checkout` | Contact → Delivery → Shipping → Payment, with **Use demo card** |
| `/order/[id]` | Confirmation and an animated tracking timeline |
| `/journal`, `/journal/[slug]` | N85 Journal |
| `/locations` | Crosby Street, with a drawn map |

## Demo codes

| Code | Effect |
| --- | --- |
| `NORTH10` | 10% off |
| `N85DEMO` | 15% off |
| `STUDIO85` | R$ 150 off orders over R$ 900 |
| `FREESHIP85` | Complimentary shipping |

Free shipping applies automatically over R$ 600. Any well-formed CEP
(`00000-000`) returns Standard, Express and Store Pickup; the first digit
shifts the rate so the quote varies believably.

## Notes on the build

**Hydration.** Currency and dates are formatted by hand rather than through
`Intl`, whose BRL output has shifted separator codepoints between ICU versions —
a classic source of server/client mismatch. Motion components never branch their
`initial` prop on `useReducedMotion()` (which returns `null` during SSR); the
preference is handled by `<MotionConfig reducedMotion="user">` and by varying
transition duration only.

**Reduced motion.** `prefers-reduced-motion: reduce` collapses every transition
and animation, including the CSS marquee and the masked word reveal in the hero.
Nothing is left hidden or mid-transform.

**Accessibility.** Skip link, focus trap and scroll lock on every drawer,
`aria-pressed` on all toggles, live regions on quantity steppers, and keyboard
focus rings that stay out of the way of pointer users.

## Testing

```bash
npm run build
npm start -- -p 3100
node scripts/smoke.mjs        # end-to-end journey + mobile + reduced motion
```

The smoke test drives the real browser through Home → Shop → Product → Bag →
Checkout → Tracking, asserts the size and shipping guards fire, checks for
horizontal overflow at 390px, and fails on any console or hydration error.

## Deploying

Configuration for both hosts is committed:

- **Vercel** — `vercel.json` (framework preset, security headers, `gru1` region)
- **Netlify** — `netlify.toml` (requires `@netlify/plugin-nextjs`)

Everything prerenders except `/order/[id]`, which is server-rendered on demand
because order ids are generated client-side.

The demo ships `noindex` (`src/app/robots.ts` and the `robots` block in
`src/app/layout.tsx`) so invented products never reach search results. Remove
both to publish a real catalogue.

## Credits

Photography from Unsplash — see [CREDITS.md](./CREDITS.md). Identity, packaging,
map, copy and journal written and drawn by Manhattan Studios.

---

**Want a store like this?** Manhattan Studios — +55 85 99782-3927
