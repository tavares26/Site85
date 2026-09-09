import type { CategorySlug } from "./site";

/**
 * Photography is sourced from Unsplash and referenced by photo id so the
 * transform (width, crop, quality) stays in one place. See CREDITS.md for
 * per-image attribution.
 */
export function photo(id: string, width = 1400): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export type ColorVariant = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: CategorySlug;
  price: number;
  compareAt?: number;
  badge?: "new" | "drop" | "sale" | "last";
  collection?: string;
  images: string[];
  colors: ColorVariant[];
  sizes: string[];
  sizeType: "apparel" | "volume" | "one";
  description: string;
  details: string[];
  composition: string;
  care: string;
  origin: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  releasedAt: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "n85-001",
    slug: "essential-tee-085",
    name: "Essential Tee 085",
    subtitle: "Compacted jersey, boxed shoulder",
    category: "clothing",
    price: 249,
    badge: "new",
    collection: "Permanent",
    images: [photo("1581655353564-df123a1eb820"), photo("1622445275463-afa2ab738c34"), photo("1661181475147-bbd20ef65781"), photo("1562157873-818bc0726f68")],
    colors: [
      { name: "Chalk", hex: "#F1EEE7" },
      { name: "Charcoal", hex: "#11110F" },
      { name: "Taupe", hex: "#A39A8B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeType: "apparel",
    description:
      "The tee the rest of the wardrobe is measured against. Knitted in a compacted 240gsm Supima jersey that holds its line through a hundred washes, then cut with a squared shoulder and a hem that sits exactly at the hip. Wear it under the overshirt in February and on its own in August.",
    details: [
      "Boxed shoulder with a set-in sleeve",
      "Twin-needle hem, self-fabric neck tape",
      "Pre-shrunk — the size you buy is the size you keep",
      "Model is 1,83 m and wears a size M",
    ],
    composition: "100% Supima cotton, 240gsm",
    care: "Machine wash cold, tumble dry low, warm iron if you must.",
    origin: "Knitted and cut in Porto, Portugal",
    seo: {
      title: "Essential Tee 085 — Heavyweight Supima Cotton T-Shirt",
      description:
        "A 240gsm compacted Supima cotton tee with a boxed shoulder and hip-length hem. Three colourways, XS to XL, cut in Portugal.",
      keywords: ["heavyweight cotton t-shirt", "supima tee", "boxy fit t-shirt", "minimal menswear tee"],
    },
    releasedAt: "2026-08-14",
  },
  {
    id: "n85-002",
    slug: "atelier-linen-shirt",
    name: "Atelier Linen Shirt",
    subtitle: "Washed European linen, relaxed placket",
    category: "clothing",
    price: 690,
    badge: "new",
    collection: "Summer Permanent",
    images: [photo("1713881587420-113c1c43e28a"), photo("1776633733518-d81137214dc9"), photo("1776633734832-ca4ad72e203a"), photo("1713881604560-085594ed2c3d")],
    colors: [
      { name: "Raw White", hex: "#F5F2EB" },
      { name: "Sand", hex: "#DCD3C2" },
      { name: "Ink", hex: "#1B2129" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeType: "apparel",
    description:
      "Woven from Belgian flax, garment-washed twice so it arrives already soft and already yours. The placket is deliberately relaxed, the collar unfused, and the body cut with enough room to move without reading oversized. It creases. That is the point.",
    details: [
      "Unfused two-piece collar that stands on its own",
      "Mother-of-pearl buttons, hand-finished plackets",
      "Split side seam with a longer back hem",
      "Garment-washed twice for immediate softness",
    ],
    composition: "100% European flax linen, 165gsm",
    care: "Machine wash cold on a gentle cycle. Line dry. Press damp.",
    origin: "Woven in Belgium, made in Portugal",
    seo: {
      title: "Atelier Linen Shirt — Washed European Flax",
      description:
        "A garment-washed European flax linen shirt with an unfused collar and relaxed placket. Raw white, sand or ink.",
      keywords: ["european linen shirt", "washed linen shirt", "relaxed fit linen shirt", "summer shirt men"],
    },
    releasedAt: "2026-08-02",
  },
  {
    id: "n85-003",
    slug: "north-overshirt-heavy-twill",
    name: "North Overshirt",
    subtitle: "Heavy cotton twill, unlined",
    category: "clothing",
    price: 1180,
    compareAt: 1480,
    badge: "sale",
    collection: "Drop 085",
    images: [photo("1662578354822-f8b43ecaeaaa"), photo("1719418271955-79273259772d"), photo("1719417657786-032541528328"), photo("1719418730257-a9da9282da37")],
    colors: [
      { name: "Field Brown", hex: "#6B5544" },
      { name: "Charcoal", hex: "#11110F" },
      { name: "Olive", hex: "#4A4E3C" },
    ],
    sizes: ["S", "M", "L", "XL"],
    sizeType: "apparel",
    description:
      "The layer that does the most work in a New York autumn. A 12oz cotton twill, unlined so it never feels like a coat, with a squared box pleat at the back and two patch pockets deep enough to be useful. It softens at the elbows within a month and then it is finished.",
    details: [
      "12oz Japanese cotton twill, garment-dyed",
      "Box pleat at the centre back for reach",
      "Two chest patch pockets, two hand pockets",
      "Corozo buttons, chain-stitched hem",
    ],
    composition: "100% cotton twill, 12oz",
    care: "Machine wash cold, hang dry. Expect a soft fade at the seams.",
    origin: "Cloth milled in Okayama, made in Portugal",
    seo: {
      title: "North Overshirt — Heavy Japanese Cotton Twill",
      description:
        "An unlined 12oz Japanese twill overshirt with a box-pleat back and four pockets. Field brown, charcoal or olive.",
      keywords: ["cotton overshirt", "heavy twill shirt jacket", "unlined overshirt", "japanese twill jacket"],
    },
    releasedAt: "2026-07-21",
  },
  {
    id: "n85-004",
    slug: "merino-crew-knit",
    name: "Merino Crew Knit",
    subtitle: "Extra-fine merino, full-fashioned",
    category: "clothing",
    price: 890,
    badge: "drop",
    collection: "Drop 085",
    images: [photo("1574201635302-388dd92a4c3f"), photo("1631541909061-71e349d1f203"), photo("1631541911232-72bc7448820a"), photo("1562157873-818bc0726f68")],
    colors: [
      { name: "Oat", hex: "#D8CFBD" },
      { name: "Charcoal", hex: "#11110F" },
      { name: "Ember", hex: "#8C2F23" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeType: "apparel",
    description:
      "Knitted from 19.5-micron merino on a full-fashioned frame, which means the panels are shaped on the machine rather than cut from a sheet. Less waste, cleaner shoulders, no bulk at the armhole. Fine enough to wear under the blazer, warm enough that you will not want to.",
    details: [
      "19.5-micron extra-fine merino wool",
      "Full-fashioned panels, linked shoulder seams",
      "Ribbed crew neck that recovers its shape",
      "Mid-weight — a genuine three-season knit",
    ],
    composition: "100% extra-fine merino wool",
    care: "Hand wash cool or dry clean. Dry flat, away from light.",
    origin: "Knitted in Scotland",
    seo: {
      title: "Merino Crew Knit — Extra-Fine Full-Fashioned Wool",
      description:
        "A 19.5-micron extra-fine merino crew neck knitted full-fashioned in Scotland. Oat, charcoal or ember.",
      keywords: ["merino wool sweater", "extra fine merino crew neck", "full fashioned knitwear", "scottish knitwear"],
    },
    releasedAt: "2026-07-21",
  },
  {
    id: "n85-005",
    slug: "pleated-wool-trouser",
    name: "Pleated Wool Trouser",
    subtitle: "Single forward pleat, high rise",
    category: "clothing",
    price: 980,
    badge: "new",
    collection: "Permanent",
    images: [photo("1617137968427-85924c800a22"), photo("1642886513448-6e6997b8de4a"), photo("1622450180332-3da1126f10a4"), photo("1584273143981-41c073dfe8f8")],
    colors: [
      { name: "Charcoal", hex: "#11110F" },
      { name: "Stone", hex: "#B7AE9D" },
      { name: "Navy", hex: "#22293A" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    sizeType: "apparel",
    description:
      "A single forward pleat, a high rise and a leg that falls straight from the hip without a break at the shoe. Cut from a tropical wool that breathes in August and holds a crease in November. The waistband is extended and hooked, so it sits flat under a knit.",
    details: [
      "Single forward pleat, no belt loops",
      "Extended hook-and-bar waistband with side adjusters",
      "Unfinished hem — we will finish it in store, or your tailor will",
      "Half-lined to the knee",
    ],
    composition: "98% tropical wool, 2% elastane",
    care: "Dry clean. Steam between wears rather than pressing.",
    origin: "Cloth from Biella, made in Portugal",
    seo: {
      title: "Pleated Wool Trouser — High Rise Tropical Wool",
      description:
        "A single-pleat, high-rise trouser in Italian tropical wool with side adjusters and an unfinished hem. Sizes 28 to 38.",
      keywords: ["pleated wool trousers", "high rise trousers", "tropical wool pants", "tailored trousers men"],
    },
    releasedAt: "2026-08-09",
  },
  {
    id: "n85-006",
    slug: "the-85-blazer",
    name: "The 85 Blazer",
    subtitle: "Unstructured, patch pockets",
    category: "clothing",
    price: 2190,
    badge: "last",
    collection: "Permanent",
    images: [photo("1584273143981-41c073dfe8f8"), photo("1609195994377-dbffba3a4eb4"), photo("1719418730257-a9da9282da37"), photo("1642886513448-6e6997b8de4a")],
    colors: [
      { name: "Charcoal", hex: "#11110F" },
      { name: "Camel", hex: "#A98A63" },
    ],
    sizes: ["44", "46", "48", "50", "52"],
    sizeType: "apparel",
    description:
      "Built without canvas, shoulder pad or lining below the yoke, so it moves like a cardigan and reads like tailoring. Three patch pockets, a soft roll at the lapel, and a length that clears the seat. This is the last cut of the season — when it is gone it returns in February.",
    details: [
      "Fully unstructured: no canvas, no shoulder pad",
      "Three patch pockets, four working cuff buttons",
      "Half-lined across the back yoke only",
      "Soft-rolled notch lapel, two-button front",
    ],
    composition: "72% virgin wool, 28% linen",
    care: "Dry clean only. Hang on a broad wooden hanger.",
    origin: "Made in Naples, Italy",
    seo: {
      title: "The 85 Blazer — Unstructured Wool-Linen Jacket",
      description:
        "An unstructured Neapolitan blazer in wool-linen with three patch pockets and a soft-rolled lapel. Charcoal or camel.",
      keywords: ["unstructured blazer", "neapolitan jacket", "wool linen blazer", "soft tailoring"],
    },
    releasedAt: "2026-06-30",
  },
  {
    id: "n85-007",
    slug: "district-sunglasses",
    name: "District Sunglasses",
    subtitle: "Italian acetate, mineral glass",
    category: "accessories",
    price: 720,
    badge: "new",
    collection: "Permanent",
    images: [photo("1788500657788-ddd329542124"), photo("1589176449149-71f7ea77ec25"), photo("1618677366787-9727aacca7ea"), photo("1763059010400-daa7c268b53e")],
    colors: [
      { name: "Black", hex: "#141414" },
      { name: "Tortoise", hex: "#6A4A2C" },
      { name: "Smoke Crystal", hex: "#7E7A73" },
    ],
    sizes: ["One size"],
    sizeType: "one",
    description:
      "A squared frame with a keyhole bridge, milled from a block of Mazzucchelli acetate over eight weeks and polished in a barrel of beechwood chips. Mineral glass lenses, not polycarbonate, because scratches are what actually ends a pair of sunglasses.",
    details: [
      "Mazzucchelli M49 acetate, block-milled",
      "Mineral glass lenses, category 3, 100% UV",
      "Keyhole bridge with adjustable acetate temples",
      "Supplied in a hard shell case with a linen pouch",
    ],
    composition: "Italian acetate frame, mineral glass lens",
    care: "Rinse in cool water, dry with the cloth supplied.",
    origin: "Made in Cadore, Italy",
    seo: {
      title: "District Sunglasses — Italian Acetate, Mineral Glass",
      description:
        "Block-milled Mazzucchelli acetate sunglasses with a keyhole bridge and category-3 mineral glass lenses. Three colourways.",
      keywords: ["italian acetate sunglasses", "mineral glass sunglasses", "keyhole bridge sunglasses", "handmade sunglasses"],
    },
    releasedAt: "2026-08-11",
  },
  {
    id: "n85-008",
    slug: "meridian-frames",
    name: "Meridian Frames",
    subtitle: "Brushed titanium, gradient lens",
    category: "accessories",
    price: 860,
    badge: "drop",
    collection: "Drop 085",
    images: [photo("1594772861396-23c446eb457a"), photo("1589176449149-71f7ea77ec25"), photo("1788500657788-ddd329542124"), photo("1618677366787-9727aacca7ea")],
    colors: [
      { name: "Brushed Gold", hex: "#B79B62" },
      { name: "Gunmetal", hex: "#4A4E52" },
    ],
    sizes: ["One size"],
    sizeType: "one",
    description:
      "Beta-titanium wire drawn to 1.2mm, brushed rather than plated, so the finish wears in instead of flaking off. The gradient lens sits dark at the brow and clears toward the cheek, which is why they still work at dinner.",
    details: [
      "Beta-titanium wire frame, 1.2mm",
      "Gradient CR-39 lens, category 2",
      "Adjustable silicone nose pads",
      "Weighs 21g — you will forget them",
    ],
    composition: "Beta-titanium frame, CR-39 gradient lens",
    care: "Adjust in store, never by hand. Store in the case.",
    origin: "Made in Sabae, Japan",
    seo: {
      title: "Meridian Frames — Brushed Beta-Titanium Sunglasses",
      description:
        "21g beta-titanium sunglasses from Sabae with a gradient CR-39 lens and adjustable pads. Brushed gold or gunmetal.",
      keywords: ["titanium sunglasses", "japanese eyewear", "gradient lens sunglasses", "lightweight sunglasses"],
    },
    releasedAt: "2026-07-21",
  },
  {
    id: "n85-009",
    slug: "carryall-leather-tote",
    name: "Carryall Leather Tote",
    subtitle: "Vegetable-tanned, unlined",
    category: "accessories",
    price: 1690,
    badge: "new",
    collection: "Permanent",
    images: [photo("1624687943971-e86af76d57de"), photo("1732963947955-858ad7d5e540"), photo("1654707636750-ab67a11b21b7"), photo("1763059010400-daa7c268b53e")],
    colors: [
      { name: "Chestnut", hex: "#8C5A34" },
      { name: "Black", hex: "#141414" },
      { name: "Bone", hex: "#D6CBB6" },
    ],
    sizes: ["One size"],
    sizeType: "one",
    description:
      "One piece of vegetable-tanned shoulder leather, folded rather than panelled, so there are four seams in the whole bag. Unlined, because a lining is where a bag starts to fail. It arrives pale and honest and will be a different colour by the second winter.",
    details: [
      "Full-grain vegetable-tanned shoulder leather, 2.2mm",
      "Unlined body, four hand-saddle-stitched seams",
      "Fits a 15in laptop, a folder and a knit",
      "Solid brass hardware, no plating",
    ],
    composition: "Vegetable-tanned full-grain leather, solid brass",
    care: "Wipe with a dry cloth. Condition once a year, no more.",
    origin: "Tanned in Tuscany, made in Portugal",
    seo: {
      title: "Carryall Leather Tote — Vegetable-Tanned, Unlined",
      description:
        "A folded, unlined tote in 2.2mm vegetable-tanned Tuscan leather with saddle-stitched seams and solid brass hardware.",
      keywords: ["vegetable tanned leather tote", "unlined leather bag", "full grain leather tote", "laptop tote bag"],
    },
    releasedAt: "2026-08-06",
  },
  {
    id: "n85-010",
    slug: "soft-structure-shoulder-bag",
    name: "Soft Structure Shoulder Bag",
    subtitle: "Milled calf, magnetic closure",
    category: "accessories",
    price: 1290,
    compareAt: 1590,
    badge: "sale",
    collection: "Private Sale",
    images: [photo("1654707636750-ab67a11b21b7"), photo("1624687943971-e86af76d57de"), photo("1732963947955-858ad7d5e540"), photo("1765568691251-07bdb8bcd935")],
    colors: [
      { name: "Cocoa", hex: "#5A4231" },
      { name: "Charcoal", hex: "#11110F" },
    ],
    sizes: ["One size"],
    sizeType: "one",
    description:
      "Milled calf that slumps rather than stands, cut close to the body with a strap that shortens to the underarm. A hidden magnetic closure keeps it shut without a clasp to catch on a knit. Small on purpose: a phone, a wallet, a paperback.",
    details: [
      "Milled calfskin with a pebbled hand",
      "Hidden magnetic closure, no visible hardware",
      "Adjustable strap, 42cm to 62cm drop",
      "One interior slip pocket in suede",
    ],
    composition: "Milled calfskin, suede lining",
    care: "Keep dry. Spot-clean with a barely damp cloth.",
    origin: "Made in Ubrique, Spain",
    seo: {
      title: "Soft Structure Shoulder Bag — Milled Calfskin",
      description:
        "A slouched milled-calfskin shoulder bag with a hidden magnetic closure and adjustable strap. Cocoa or charcoal.",
      keywords: ["milled calfskin bag", "small shoulder bag", "soft leather bag", "minimal shoulder bag"],
    },
    releasedAt: "2026-06-18",
  },
  {
    id: "n85-011",
    slug: "n85-eau-de-parfum",
    name: "N85 Eau de Parfum",
    subtitle: "Cedar, iris, warm paper",
    category: "fragrance",
    price: 640,
    badge: "new",
    collection: "Permanent",
    images: [photo("1638295916768-459f6cf440bc"), photo("1574670700790-fa314ab37787"), photo("1647943746660-1640133068d5"), photo("1599682637135-92793191ae30")],
    colors: [{ name: "Clear", hex: "#EFEAE0" }],
    sizes: ["30 ML", "50 ML", "100 ML"],
    sizeType: "volume",
    description:
      "The house scent, built in Grasse over two years. It opens dry and slightly cold, like the first ten minutes in a room with the windows open, then warms into cedar and orris root over a base of ambrette and something close to warm paper. It sits near the skin. People have to be close to find it.",
    details: [
      "18% concentration eau de parfum",
      "Top: bergamot, pink pepper, cold iris",
      "Heart: cedarwood, orris root, violet leaf",
      "Base: ambrette seed, sandalwood, warm paper accord",
    ],
    composition: "Alcohol denat., parfum, aqua",
    care: "Store away from direct light. Three-year shelf life unopened.",
    origin: "Composed and bottled in Grasse, France",
    seo: {
      title: "N85 Eau de Parfum — Cedar, Iris & Warm Paper",
      description:
        "An 18% eau de parfum built in Grasse around cold iris, cedarwood and an ambrette base. 30ml, 50ml or 100ml.",
      keywords: ["cedar iris perfume", "eau de parfum unisex", "niche fragrance", "woody perfume"],
    },
    releasedAt: "2026-08-12",
  },
  {
    id: "n85-012",
    slug: "nocturne-085-extrait",
    name: "Nocturne 085 Extrait",
    subtitle: "Leather, incense, black fig",
    category: "fragrance",
    price: 980,
    badge: "drop",
    collection: "Drop 085",
    images: [photo("1599682637135-92793191ae30"), photo("1647943746660-1640133068d5"), photo("1574670700790-fa314ab37787"), photo("1638295916768-459f6cf440bc")],
    colors: [{ name: "Smoke", hex: "#3A352F" }],
    sizes: ["15 ML", "50 ML"],
    sizeType: "volume",
    description:
      "The evening counterpart, at 28% concentration, which is roughly three times what a cologne carries. Black fig and suede leather over frankincense, with a long dry-down that is still there in the morning. Two sprays is generous. Made once a year, in a batch of nine hundred.",
    details: [
      "28% concentration extrait de parfum",
      "Top: black fig, cardamom",
      "Heart: suede leather, frankincense, immortelle",
      "Base: labdanum, vetiver, benzoin",
    ],
    composition: "Alcohol denat., parfum, aqua",
    care: "Store upright, away from heat. Batch-numbered on the base.",
    origin: "Composed and bottled in Grasse, France",
    seo: {
      title: "Nocturne 085 Extrait — Leather, Incense & Black Fig",
      description:
        "A 28% extrait de parfum of suede leather, frankincense and black fig, made in a single annual batch. 15ml or 50ml.",
      keywords: ["extrait de parfum", "leather incense fragrance", "black fig perfume", "evening fragrance"],
    },
    releasedAt: "2026-07-21",
  },
  {
    id: "n85-013",
    slug: "studio-ceramic-candle",
    name: "Studio Ceramic Candle",
    subtitle: "Cedar & ash, 60 hours",
    category: "lifestyle",
    price: 340,
    badge: "new",
    collection: "Permanent",
    images: [photo("1603905179139-db12ab535ca9"), photo("1603897076223-17f346f02a03"), photo("1610410863509-aa6ee0b12d76"), photo("1612179543058-ab74d388e0ce")],
    colors: [
      { name: "Bisque", hex: "#DCD3C4" },
      { name: "Charcoal", hex: "#2A2724" },
    ],
    sizes: ["220 G"],
    sizeType: "volume",
    description:
      "Poured into a stoneware vessel thrown by a studio in Hudson Valley, each one slightly different where the glaze pooled. The scent is the store on a Tuesday morning: cedar shavings, cold ash, a little dry vetiver. Sixty hours, then wash the vessel and keep it.",
    details: [
      "Hand-thrown stoneware vessel, reactive glaze",
      "Coconut and rapeseed wax, no paraffin",
      "Single cotton wick, 60-hour burn",
      "Scent: cedar shavings, cold ash, dry vetiver",
    ],
    composition: "Coconut-rapeseed wax, cotton wick, stoneware vessel",
    care: "First burn two hours. Trim the wick to 5mm each time.",
    origin: "Vessel thrown in Hudson Valley, poured in Brooklyn",
    seo: {
      title: "Studio Ceramic Candle — Cedar & Ash, 60 Hours",
      description:
        "A cedar, cold ash and vetiver candle in a hand-thrown stoneware vessel. Coconut-rapeseed wax, 60-hour burn.",
      keywords: ["ceramic candle", "cedar scented candle", "hand thrown candle vessel", "coconut wax candle"],
    },
    releasedAt: "2026-08-04",
  },
  {
    id: "n85-014",
    slug: "objet-vessel-no4",
    name: "Objet Vessel No. 4",
    subtitle: "Matte stoneware, unglazed foot",
    category: "lifestyle",
    price: 420,
    badge: "last",
    collection: "Permanent",
    images: [photo("1610410863509-aa6ee0b12d76"), photo("1612179543058-ab74d388e0ce"), photo("1631541911232-72bc7448820a"), photo("1603897076223-17f346f02a03")],
    colors: [
      { name: "Bone", hex: "#E2DBCB" },
      { name: "Ash", hex: "#8E8A82" },
    ],
    sizes: ["One size"],
    sizeType: "one",
    description:
      "A vessel with no stated purpose, which is the honest description. Keys by the door, one stem of something, or nothing at all. Thrown in matte stoneware with the foot left unglazed so it sits with a little friction on a wooden surface. Twenty a month, no more.",
    details: [
      "Hand-thrown matte stoneware, 16cm tall",
      "Unglazed foot for grip and honesty",
      "Watertight — it will hold a stem",
      "Each piece signed and numbered on the base",
    ],
    composition: "Stoneware clay, matte glaze",
    care: "Hand wash. Not for the dishwasher or the oven.",
    origin: "Thrown in Hudson Valley, New York",
    seo: {
      title: "Objet Vessel No. 4 — Matte Stoneware, Hand-Thrown",
      description:
        "A 16cm hand-thrown matte stoneware vessel with an unglazed foot, signed and numbered. Bone or ash.",
      keywords: ["hand thrown stoneware vase", "matte ceramic vessel", "minimal ceramic vase", "studio pottery"],
    },
    releasedAt: "2026-05-22",
  },
];

export const PRODUCT_MAP = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return PRODUCT_MAP.get(slug);
}

export function byCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function related(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const rest = PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Every colour and size in the catalogue, for the filter rail. */
export const ALL_COLORS = Array.from(
  new Map(
    PRODUCTS.flatMap((p) => p.colors).map((c) => [c.name, c])
  ).values()
).sort((a, b) => a.name.localeCompare(b.name));

export const ALL_SIZES = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.sizes))
);

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
};
