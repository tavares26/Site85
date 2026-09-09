import { photo } from "./products";

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  category: "Craft" | "Places" | "Wardrobe" | "Studio";
  readingTime: number;
  date: string;
  cover: string;
  author: string;
  body: string[];
  pullQuote?: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "eight-weeks-in-a-block-of-acetate",
    title: "Eight Weeks in a Block of Acetate",
    standfirst:
      "Why the frames on our shelf take two months to make, and what happens in the barrel of beechwood chips.",
    category: "Craft",
    readingTime: 6,
    date: "2026-08-18",
    cover: photo("1788500657788-ddd329542124", 1800),
    author: "Editorial Desk",
    pullQuote:
      "A pair of injection-moulded frames takes ninety seconds. Ours takes eight weeks, and the difference is almost entirely time spent doing nothing.",
    body: [
      "There is a room in Cadore, in the Dolomites, where sheets of cellulose acetate rest in racks for four weeks before anyone touches them. Nothing is done to them. They are simply left, because acetate is a material with memory, and if you mill it while it still holds the tension of the press it will move later — on someone's face, in July, when they least expect it.",
      "The blocks arrive from Mazzucchelli, a mill that has been making acetate since 1849 and treats colour the way a paper mill treats stock. A tortoise pattern is not printed. It is built from stacked sheets of coloured cellulose, pressed together and then sliced across the grain, which is why no two frames from the same block are identical.",
      "Milling takes a day. Polishing takes a week, and most of that week the frames are not being touched by anyone either. They tumble in a rotating barrel filled with beechwood chips and a little pumice, and the friction does what a buffing wheel cannot: it reaches inside the bridge, along the temple channel, into the corners where a lens sits.",
      "Then the frames rest again. Then the hinges go in, heated and pressed rather than screwed through a plate. Then they rest one more time before anyone puts a lens near them. Eight weeks, and the only expensive part is the patience.",
      "We chose mineral glass over polycarbonate for the same reason. Polycarbonate is lighter and cheaper and it scratches if you look at it, and a scratched lens is how most sunglasses actually die — not broken, just quietly unusable. Glass is heavier. Glass is also still clear in four years.",
    ],
  },
  {
    slug: "the-case-for-owning-less-and-better",
    title: "The Case for Owning Less, and Better",
    standfirst:
      "Six garments, worn hard, will outlast thirty. A short argument for a wardrobe you can actually see.",
    category: "Wardrobe",
    readingTime: 5,
    date: "2026-08-05",
    cover: photo("1739481152766-d99054136793", 1800),
    author: "Editorial Desk",
    pullQuote:
      "The question is not what you would wear on a perfect day. It is what you reach for on an ordinary Tuesday, in the dark, without deciding.",
    body: [
      "Open most wardrobes and roughly a fifth of what is hanging there does the work. The rest is aspiration, obligation, or a sale in 2021. This is not a moral failing. It is what happens when clothing is cheap enough to buy without a decision.",
      "The counter-argument to a small wardrobe is usually boredom, and it is a fair one. But boredom in dressing almost never comes from too few clothes. It comes from clothes that do not fit properly, so nothing combines, so the same three safe things get worn while the rest waits.",
      "Start from the trouser. It is the hardest thing to buy well and the thing that decides whether everything above it reads as considered or accidental. A high rise and a straight leg will carry a tee as easily as a blazer. A low rise and a taper will fight both.",
      "Then two shirts, one knit, one overshirt, one jacket. Six things. Every one of them should work with every other one, which is a brutal test and the reason a limited palette exists in the first place. Charcoal, sand, taupe and off-white are not a minimalist affectation. They are a combinatorial shortcut.",
      "Buy the sixth thing last, and buy it in six months. The gap is where you find out what you actually needed.",
    ],
  },
  {
    slug: "crosby-street-on-a-tuesday",
    title: "Crosby Street on a Tuesday",
    standfirst:
      "Our flagship sits on a cobbled block in SoHo. Here is what the light does to it between nine and six.",
    category: "Places",
    readingTime: 4,
    date: "2026-07-22",
    cover: photo("1763059010400-daa7c268b53e", 1800),
    author: "Editorial Desk",
    body: [
      "The building went up in 1885 as a dry goods warehouse, and the cast iron front is still doing the job it was designed for: holding almost nothing up while letting an enormous amount of light in. We took the ground floor and the mezzanine and removed everything that had been added since 1970.",
      "At nine in the morning the light comes off the building opposite rather than the sky, which is why the front of the store reads warm and the back reads cold. We hung the knitwear at the back on purpose. Oat looks like oat there. Under the front windows it looks like cream.",
      "By two the sun has come over the roofline and the cobbles throw it back up through the glass in a way that no lighting plan can imitate. This is the hour the fragrance table works. The bottles are on a slab of honed Belgian bluestone, and for about forty minutes a day the whole surface glows.",
      "By six it is gone and the store becomes a room again, lit low and warm from the perimeter. We do not use downlights. Nothing here should look like it is being sold to you from above.",
      "Appointments are free and generally quiet. Ask for the mezzanine if you want an hour with the tailoring.",
    ],
  },
  {
    slug: "what-a-drop-actually-means",
    title: "What a Drop Actually Means",
    standfirst:
      "Drop 085 is eighty-five units per style. Not a marketing number — a production one.",
    category: "Studio",
    readingTime: 4,
    date: "2026-07-08",
    cover: photo("1783700085825-1df197a49f40", 1800),
    author: "Editorial Desk",
    pullQuote:
      "Scarcity as a tactic is cynical. Scarcity as a consequence of how you actually make things is just arithmetic.",
    body: [
      "There is a version of the limited drop that exists purely to create a queue. The stock was never limited. The urgency was manufactured in a spreadsheet, and everybody involved knows it.",
      "Ours is more boring than that. The Scottish frame that knits the merino runs a full-fashioned panel in about eleven minutes. A run of eighty-five garments occupies that machine for the better part of a week. Beyond that, the mill needs it back for someone else.",
      "The same is true of the Grasse batch. Nocturne is macerated for eight weeks before bottling, in a tank we do not own. Nine hundred bottles is what fits, once a year.",
      "So when a drop sells through, it sells through. We do not do a surprise restock two weeks later, because there is nothing to restock with until the next slot on the machine. The permanent collection exists precisely so that there is always something to buy that is not built this way.",
      "If you want a piece from Drop 085, the honest advice is the unglamorous one: buy it when you see it, or wait until February.",
    ],
  },
  {
    slug: "notes-on-a-house-scent",
    title: "Notes on a House Scent",
    standfirst:
      "Two years, forty-one modifications, and one argument about whether a fragrance can smell like paper.",
    category: "Craft",
    readingTime: 7,
    date: "2026-06-14",
    cover: photo("1638295916768-459f6cf440bc", 1800),
    author: "Editorial Desk",
    body: [
      "The brief we sent to Grasse was four words long: cold, dry, close. It came back as a question — cold like what? — and that question took most of the first year.",
      "Cold in fragrance is usually achieved with a green note or an aldehyde, and both of those read as clean rather than cold. What we wanted was the specific sensation of a room where the window has been open since morning: not fresh air, but air that has been still and slightly chilled.",
      "Modification twenty-two got there, with orris root doing most of the work. Iris is expensive and slow — the rhizomes are dried for three years before distillation — and it carries a powdery coldness that nothing synthetic quite replicates.",
      "The warm paper accord was the argument. Half the room thought it was a gimmick. The other half pointed out that everyone who smelled modification thirty-one described it, unprompted, as smelling like a bookshop. We kept it.",
      "Concentration was the last decision. Eighteen percent puts it in eau de parfum territory but at the quiet end, which means it stays within about an arm's length. That was deliberate. A house scent should be something people notice when they are already close enough to be talking to you.",
      "It ships in Cornish glass with a batch number on the base. If you find one you like, note the number — the naturals shift a little year to year, and we do not pretend otherwise.",
    ],
  },
  {
    slug: "the-hem-we-refuse-to-finish",
    title: "The Hem We Refuse to Finish",
    standfirst:
      "Our trousers arrive unhemmed. It is the single most common complaint we receive, and we are not changing it.",
    category: "Wardrobe",
    readingTime: 3,
    date: "2026-05-30",
    cover: photo("1617137968427-85924c800a22", 1800),
    author: "Editorial Desk",
    body: [
      "A trouser hemmed to a standard inseam is hemmed for nobody. The standard is an average, and an average leg belongs to almost no one, which is why so many otherwise good trousers break twice at the shoe or float above the heel.",
      "So ours arrive long, unfinished, with the raw edge overlocked. In store we will pin and finish them while you wait. Online we send a card with three measurements and the name of a tailor in most major cities, and we cover the cost the first time.",
      "The right answer, for most people, is a single soft break or none at all. A high rise with a full break reads heavy. The leg is cut straight from the knee precisely so that it can end cleanly.",
      "It is an inconvenience. It is also the difference between a trouser that looks bought and a trouser that looks yours, and that gap is wider than almost any other decision in the wardrobe.",
    ],
  },
];

export const ARTICLE_MAP = new Map(ARTICLES.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return ARTICLE_MAP.get(slug);
}
