# BROOKLYN &amp; FIFTH

A demonstration site for a fictional barber and beauty house, built as a
commercial showcase for **Manhattan Studios**. Two brands, two palettes, two
typographic systems, one code base.

Nothing in here is real: the people, the prices, the reviews and both addresses
were written for the build. There is no backend, no database and no payment.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
npm run lint
```

Node 18.18 or newer. The first `npm install` and the first build both need
network access, because `next/font` downloads the four typefaces at build time
and photography is loaded from `images.unsplash.com`.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Split entry. Hover expands a side on desktop, stacked blocks on mobile |
| `/brooklyn` | Barbershop home |
| `/brooklyn/barbers` | Four editorial portraits with bios, portfolios and ratings |
| `/brooklyn/services` | Service list driven by the interactive straight razor |
| `/brooklyn/gallery` | The Wall, a pinned-up column layout |
| `/fifth` | Beauty salon home |
| `/fifth/team` | The Fifth Edit, magazine spreads |
| `/fifth/services` | Service list blown by the interactive hair dryer |
| `/fifth/edit` | Editorial gallery, issue four |
| `/book` | Six-step booking flow, entirely front-end |
| `/locations` | Both addresses with hand-drawn maps and photo credits |

## The two systems

|  | Brooklyn | Fifth |
| --- | --- | --- |
| Mood | Industrial, analogue, brick and brass | Upper East Side, editorial, paper |
| Colour | `#171715` `#34271E` `#B69A6A` `#E7DDC9` `#711E1E` | `#000000` `#FFFFFF` `#F6F1E7` `#E3C9A8` `#8A1520` |
| Display | Anton, uppercase, tight leading | Bodoni Moda, high contrast, real italics |
| Text | Barlow Condensed | Cormorant Garamond |
| Centrepiece | Straight razor that opens as you read the list | Hair dryer whose air is your scroll velocity |
| Focus ring | Brass | Rouge |

No Inter, Geist, Arial or Roboto anywhere in the build, by design.

## How the two centrepieces work

**The razor** (`components/RazorServices.tsx`) is a single SVG. The blade group
pivots on the brass pin at `(210, 452)` in view-box coordinates. It rests folded
at 158 degrees and springs open when a service is hovered, focused or tapped,
parking at a slightly different angle for each of the six services. The active
duration and price are etched onto the spine, so the razor is reading the list
back to you rather than decorating it.

**The dryer** (`components/DryerServices.tsx`) reads `useVelocity(scrollY)`,
smooths it through a spring and clamps it to a range. Each service line
multiplies that value by a weight that grows with its distance down the stream,
so the far end of the list travels further than the near end. Stop scrolling and
the lines fall back into alignment.

Both fall back to a static, fully legible state under
`prefers-reduced-motion: reduce`.

## Accessibility notes

- `prefers-reduced-motion` is honoured in CSS globally and again in every
  component through `useReducedMotion`, including the entry curtain, which does
  not render at all.
- The before/after sliders are real `<input type="range">` elements, so arrow
  keys, Home and End work and the position is announced as a percentage.
  Pointer dragging writes to the same value.
- Focus rings are visible and coloured per house.
- A skip link sits at the top of every page and every route has one `<main>`.
- The razor and both maps are `aria-hidden` or given `role="img"` with a label,
  and all of their information also exists in text.

## Structure

```
app/
  page.tsx              split entry
  brooklyn/             layout, home, barbers, services, gallery
  fifth/                layout, home, team, services, edit
  book/                 six-step flow
  locations/            both addresses
components/             heroes, centrepieces, sliders, nav, curtain, maps
data/fictional-data.ts  every service, person, photo and address
lib/motion.ts           shared variants and easings
```

Every string of content lives in `data/fictional-data.ts`. Change the brand
there and the whole site follows.

## Photography

All photographs come from Unsplash and belong to the photographers, credited in
full at the foot of `/locations` and listed in `photoCredits`. Swap the
`images.unsplash.com` URLs in the data file for your own assets and nothing else
needs to change.

---

`DEMO BY MANHATTAN STUDIOS`
