/**
 * Every piece of content in this demo lives here.
 * Photography comes from Unsplash. Credits are listed in `photoCredits`
 * and printed on /locations so the demo carries its own attribution.
 */

export type Universe = "brooklyn" | "fifth";

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  name: string;
  duration: number; // minutes
  price: number; // USD
  blurb: string;
  detail: string;
};

export const brooklynServices: Service[] = [
  {
    id: "bk-skin",
    name: "The Skin Fade",
    duration: 45,
    price: 55,
    blurb: "Clipper work down to nothing, blended by eye.",
    detail:
      "Guards off at the nape, four passes of blending, finished with a razor line at the temple. Booked most on Fridays.",
  },
  {
    id: "bk-scissor",
    name: "Scissor Cut & Style",
    duration: 50,
    price: 60,
    blurb: "Shears only. Weight taken out, shape left in.",
    detail:
      "For hair long enough to fall. We cut dry so what you see in the chair is what walks out on Bedford Avenue.",
  },
  {
    id: "bk-shave",
    name: "Hot Towel Straight Shave",
    duration: 40,
    price: 50,
    blurb: "Steam, badger brush, cold finish.",
    detail:
      "Three towels, two passes, one blade that gets changed in front of you. Twenty minutes of it is just sitting still.",
  },
  {
    id: "bk-beard",
    name: "Beard Architecture",
    duration: 35,
    price: 40,
    blurb: "Lines set with a straight edge, not a guess.",
    detail:
      "Cheek line, neck line, corner shape. We map it to your jaw first and only then pick up the trimmer.",
  },
  {
    id: "bk-grey",
    name: "Grey Blending",
    duration: 30,
    price: 35,
    blurb: "Softened, not erased.",
    detail:
      "A ten minute process that takes the grey down about half. Nobody notices the colour, they notice you slept well.",
  },
  {
    id: "bk-father",
    name: "Father & Son",
    duration: 70,
    price: 85,
    blurb: "Two chairs, side by side, one appointment.",
    detail:
      "Two barbers work at the same time so nobody waits. First haircut certificates are kept behind the register.",
  },
];

export const fifthServices: Service[] = [
  {
    id: "ff-cut",
    name: "Precision Cut",
    duration: 60,
    price: 145,
    blurb: "Cut to the way your hair actually falls.",
    detail:
      "A consultation you sit through fully dressed, in front of a mirror, before a single section is taken.",
  },
  {
    id: "ff-colour",
    name: "Dimensional Colour",
    duration: 150,
    price: 320,
    blurb: "Three tones, no visible line of demarcation.",
    detail:
      "Foils, a root shadow and a gloss. Grown out at four months it still reads as intentional.",
  },
  {
    id: "ff-balayage",
    name: "Hand-Painted Balayage",
    duration: 180,
    price: 380,
    blurb: "Painted freehand against the light of the window.",
    detail:
      "No foil, no cap. Brightness placed where the sun would have put it if you lived somewhere warmer.",
  },
  {
    id: "ff-gloss",
    name: "Glass Gloss",
    duration: 45,
    price: 95,
    blurb: "Twenty minutes that reads as eight hours of sleep.",
    detail:
      "An acidic gloss that closes the cuticle. Booked the afternoon before something that gets photographed.",
  },
  {
    id: "ff-blowout",
    name: "The Fifth Blowout",
    duration: 45,
    price: 85,
    blurb: "Round brush, cold shot, no product weight.",
    detail:
      "The house style. Volume at the root, movement through the mid, ends left alone entirely.",
  },
  {
    id: "ff-bridal",
    name: "Bridal & Event Styling",
    duration: 120,
    price: 450,
    blurb: "Rehearsed once, delivered once.",
    detail:
      "A trial six weeks out with photographs from four angles, then the day itself, on location if you need it.",
  },
];

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

export type Professional = {
  id: string;
  name: string;
  handle: string;
  role: string;
  universe: Universe;
  years: number;
  rating: number;
  reviews: number;
  chair: string;
  bio: string;
  quote: string;
  specialties: string[];
  portfolio: string[];
  portrait: string;
};

export const barbers: Professional[] = [
  {
    id: "bk-dez",
    name: "Desmond Ruiz",
    handle: "DEZ",
    role: "Master barber, chair one",
    universe: "brooklyn",
    years: 19,
    rating: 4.9,
    reviews: 412,
    chair: "Chair 01",
    bio: "Learned on Nostrand Avenue at fifteen, sweeping hair for a man who would not let him hold clippers until he could name every bone in the skull. Opened the Brooklyn room in 2016 with two chairs and a radio.",
    quote: "A fade is not a haircut. It is an argument about where light should stop.",
    specialties: ["Skin fades", "Straight razor", "Textured crops"],
    portfolio: [img("photo-1647140655214-e4a2d914971f", 900), img("photo-1672642150228-3fcd5826ec26", 900)],
    portrait: img("photo-1647140655214-e4a2d914971f", 1100),
  },
  {
    id: "bk-otis",
    name: "Otis Vance",
    handle: "THE HAND",
    role: "Straight razor specialist",
    universe: "brooklyn",
    years: 26,
    rating: 5.0,
    reviews: 268,
    chair: "Chair 02",
    bio: "Twenty-six years, three shops, one blade angle he refuses to discuss on the record. Shaves in near silence and finishes every service by turning the chair to face away from the mirror for ten seconds.",
    quote: "You want the towel hot enough to complain about. Not hot enough to move.",
    specialties: ["Hot towel shave", "Beard architecture", "Classic side part"],
    portfolio: [img("photo-1517832606299-7ae9b720a186", 900), img("photo-1598524374912-6b0b0bab43dd", 900)],
    portrait: img("photo-1517832606299-7ae9b720a186", 1100),
  },
  {
    id: "bk-sal",
    name: "Salvatore Greco",
    handle: "SAL",
    role: "Barber, scissor work",
    universe: "brooklyn",
    years: 11,
    rating: 4.8,
    reviews: 331,
    chair: "Chair 03",
    bio: "Third generation. His grandfather cut hair on Court Street with the same pair of Japanese shears Sal still uses on Saturdays, sharpened once a year by a man in Queens who does nothing else.",
    quote: "Clippers are fast. Shears are honest. I get paid for honest.",
    specialties: ["Scissor cut", "Grey blending", "Long layers"],
    portfolio: [img("photo-1598524374912-6b0b0bab43dd", 900), img("photo-1605497788044-5a32c7078486", 900)],
    portrait: img("photo-1598524374912-6b0b0bab43dd", 1100),
  },
  {
    id: "bk-june",
    name: "June Okafor",
    handle: "JUNE",
    role: "Barber, texture and curl",
    universe: "brooklyn",
    years: 8,
    rating: 4.9,
    reviews: 297,
    chair: "Chair 04",
    bio: "Came to barbering from sculpture and still talks about heads as volumes. Runs the Sunday apprentice hours, which is why the shop opens on a day it does not have to.",
    quote: "Curl has a direction. Cut against it and you spend a month apologising.",
    specialties: ["Curl patterns", "Tapered afros", "Kids' first cuts"],
    portfolio: [img("photo-1672642150228-3fcd5826ec26", 900), img("photo-1605497788044-5a32c7078486", 900)],
    portrait: img("photo-1672642150228-3fcd5826ec26", 1100),
  },
];

export const stylists: Professional[] = [
  {
    id: "ff-margaux",
    name: "Margaux Deveraux",
    handle: "Creative Director",
    role: "Colour, editorial",
    universe: "fifth",
    years: 22,
    rating: 5.0,
    reviews: 508,
    chair: "Station I",
    bio: "Trained in Paris, spent eleven seasons backstage before deciding she preferred clients to castings. Opened the Fifth room to make the backstage standard available on a Tuesday afternoon.",
    quote: "Fashion is a season. A good colour is a year. I would rather do the year.",
    specialties: ["Dimensional colour", "Corrective work", "Editorial styling"],
    portfolio: [img("photo-1606143412458-acc5f86de897", 900), img("photo-1536180838057-b604200e6f36", 900)],
    portrait: img("photo-1606143412458-acc5f86de897", 1100),
  },
  {
    id: "ff-noor",
    name: "Noor Haddad",
    handle: "Senior Stylist",
    role: "Cutting, curl specialist",
    universe: "fifth",
    years: 14,
    rating: 4.9,
    reviews: 442,
    chair: "Station II",
    bio: "Cuts curl dry, always, and will politely refuse to do it any other way. Keeps a waiting list that she clears personally every January.",
    quote: "I am not cutting hair. I am deciding what your hair is allowed to do without you.",
    specialties: ["Dry cutting", "Curl shaping", "Fringe"],
    portfolio: [img("photo-1536180838057-b604200e6f36", 900), img("photo-1727341557146-4abab94d0812", 900)],
    portrait: img("photo-1536180838057-b604200e6f36", 1100),
  },
  {
    id: "ff-isabel",
    name: "Isabel Ferreira",
    handle: "Colourist",
    role: "Balayage, blonde",
    universe: "fifth",
    years: 10,
    rating: 4.9,
    reviews: 376,
    chair: "Station III",
    bio: "Paints against the window on the west side of the room because she will not judge tone under artificial light. Books blondes only, and says no more often than yes.",
    quote: "Blonde is not a colour. It is a maintenance schedule you agree to.",
    specialties: ["Hand-painted balayage", "Blonde correction", "Root shadow"],
    portfolio: [img("photo-1727341557146-4abab94d0812", 900), img("photo-1629511565591-a1d494ad6c58", 900)],
    portrait: img("photo-1727341557146-4abab94d0812", 1100),
  },
  {
    id: "ff-adaeze",
    name: "Adaeze Mensah",
    handle: "Styling & Bridal",
    role: "Events, finishing",
    universe: "fifth",
    years: 12,
    rating: 5.0,
    reviews: 291,
    chair: "Station IV",
    bio: "Has finished hair in four hotel bathrooms on the Upper East Side and one freight elevator. Keeps a rehearsal photograph of every bride, printed, in a book by the door.",
    quote: "On the day, nobody wants to be surprised. That is what the trial is for.",
    specialties: ["Bridal", "Updos", "Blowouts"],
    portfolio: [img("photo-1629511565591-a1d494ad6c58", 900), img("photo-1533392151650-269f96231f65", 900)],
    portrait: img("photo-1629511565591-a1d494ad6c58", 1100),
  },
];

export const allProfessionals = [...barbers, ...stylists];

/* ------------------------------------------------------------------ */
/* Galleries                                                           */
/* ------------------------------------------------------------------ */

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  meta: string;
  tilt: number;
  span: "tall" | "wide" | "square";
};

export const brooklynWall: GalleryItem[] = [
  {
    id: "w1",
    src: img("photo-1781455793310-8427c96454c7", 1200),
    alt: "Empty barbershop with leather chairs lined up under mirrors",
    caption: "Opening morning, 2016",
    meta: "Two chairs, one radio",
    tilt: -2.4,
    span: "wide",
  },
  {
    id: "w2",
    src: img("photo-1647140655214-e4a2d914971f", 900),
    alt: "Barber cutting a client's hair with scissors",
    caption: "Dez, chair one",
    meta: "Shot on a Tuesday",
    tilt: 1.8,
    span: "tall",
  },
  {
    id: "w3",
    src: img("photo-1759142449398-89357aa1bb36", 1000),
    alt: "Barbershop wall covered in vintage posters",
    caption: "The wall, west side",
    meta: "Nothing here is for sale",
    tilt: -1.2,
    span: "square",
  },
  {
    id: "w4",
    src: img("photo-1517832606299-7ae9b720a186", 900),
    alt: "Black and white photograph of a beard being trimmed",
    caption: "Otis, second pass",
    meta: "Blade changed in front of you",
    tilt: 2.6,
    span: "tall",
  },
  {
    id: "w5",
    src: img("photo-1772567925625-3488620d1626", 1200),
    alt: "Barbershop window on a New York street at night",
    caption: "Closing, 9:40pm",
    meta: "Corner of Wythe",
    tilt: -0.8,
    span: "wide",
  },
  {
    id: "w6",
    src: img("photo-1754294437661-129b86f868ea", 1000),
    alt: "Barbershop mirror with a patterned cape and tools on the counter",
    caption: "Station three",
    meta: "Cape by a friend in Ridgewood",
    tilt: 1.4,
    span: "square",
  },
  {
    id: "w7",
    src: img("photo-1605497788044-5a32c7078486", 900),
    alt: "Barber in a denim apron using a blow dryer on a client",
    caption: "Sal, finishing",
    meta: "Cold shot, always",
    tilt: -2.1,
    span: "tall",
  },
  {
    id: "w8",
    src: img("photo-1759134248487-e8baaf31e33e", 1200),
    alt: "Barbershop interior seen through the front window",
    caption: "From the sidewalk",
    meta: "Walk-ins before 11am",
    tilt: 0.9,
    span: "wide",
  },
];

export const fifthEdit: GalleryItem[] = [
  {
    id: "e1",
    src: img("photo-1606143412458-acc5f86de897", 1000),
    alt: "Portrait of a woman in a black top against a dark background",
    caption: "Ana, November",
    meta: "Colour by Margaux",
    tilt: 0,
    span: "tall",
  },
  {
    id: "e2",
    src: img("photo-1580618672591-eb180b1a973f", 1200),
    alt: "Stylist using a round brush and blow dryer on a client",
    caption: "The house blowout",
    meta: "Forty-five minutes",
    tilt: 0,
    span: "wide",
  },
  {
    id: "e3",
    src: img("photo-1536180838057-b604200e6f36", 1000),
    alt: "Black and white portrait of a woman",
    caption: "Eto, studio",
    meta: "Cut by Noor",
    tilt: 0,
    span: "tall",
  },
  {
    id: "e4",
    src: img("photo-1560869713-7d0a29430803", 900),
    alt: "Close view of a hand holding a curling iron",
    caption: "Set, not curled",
    meta: "Station IV",
    tilt: 0,
    span: "square",
  },
  {
    id: "e5",
    src: img("photo-1727341557146-4abab94d0812", 1000),
    alt: "Woman holding a black coat across her face",
    caption: "Off Madison",
    meta: "Balayage by Isabel",
    tilt: 0,
    span: "tall",
  },
  {
    id: "e6",
    src: img("photo-1634449571010-02389ed0f9b0", 1200),
    alt: "A stylist cutting a seated client's hair in a bright salon",
    caption: "The consultation",
    meta: "Before anything is sectioned",
    tilt: 0,
    span: "wide",
  },
  {
    id: "e7",
    src: img("photo-1533392151650-269f96231f65", 1000),
    alt: "Black and white studio portrait",
    caption: "Test, 5:15pm",
    meta: "Styling by Adaeze",
    tilt: 0,
    span: "tall",
  },
  {
    id: "e8",
    src: img("photo-1629511565591-a1d494ad6c58", 1000),
    alt: "Woman in a black blazer photographed indoors",
    caption: "The Fifth Edit, issue four",
    meta: "Full story in the room",
    tilt: 0,
    span: "square",
  },
];

/* ------------------------------------------------------------------ */
/* Before / after                                                      */
/* ------------------------------------------------------------------ */

export type BeforeAfter = {
  id: string;
  title: string;
  note: string;
  by: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

export const brooklynBeforeAfter: BeforeAfter[] = [
  {
    id: "ba-bk-1",
    title: "Grown out to skin fade",
    note: "Fourteen weeks between the two frames. Forty-five minutes between the two haircuts.",
    by: "Desmond Ruiz",
    before: img("photo-1672642150228-3fcd5826ec26", 1000),
    after: img("photo-1647140655214-e4a2d914971f", 1000),
    beforeAlt: "Client in the chair before the cut",
    afterAlt: "The finished fade",
  },
  {
    id: "ba-bk-2",
    title: "Beard mapped to the jaw",
    note: "Cheek line dropped four millimetres. That is the whole change.",
    by: "Otis Vance",
    before: img("photo-1598524374912-6b0b0bab43dd", 1000),
    after: img("photo-1517832606299-7ae9b720a186", 1000),
    beforeAlt: "Beard before shaping",
    afterAlt: "Beard after the line work",
  },
  {
    id: "ba-bk-3",
    title: "Scissor cut, weight removed",
    note: "Nothing taken off the length. Everything taken out of the middle.",
    by: "Salvatore Greco",
    before: img("photo-1605497788044-5a32c7078486", 1000),
    after: img("photo-1598524374912-6b0b0bab43dd", 1000),
    beforeAlt: "Hair before the scissor work",
    afterAlt: "Hair after the scissor work",
  },
];

export const fifthBeforeAfter: BeforeAfter[] = [
  {
    id: "ba-ff-1",
    title: "Box dye to dimensional brunette",
    note: "One session, three tones, a root shadow to buy six months.",
    by: "Margaux Deveraux",
    before: img("photo-1634449571010-02389ed0f9b0", 1000),
    after: img("photo-1606143412458-acc5f86de897", 1000),
    beforeAlt: "Hair before the colour service",
    afterAlt: "Hair after the colour service",
  },
  {
    id: "ba-ff-2",
    title: "Curl cut dry",
    note: "No length lost. The shape was already in there.",
    by: "Noor Haddad",
    before: img("photo-1560869713-7d0a29430803", 1000),
    after: img("photo-1536180838057-b604200e6f36", 1000),
    beforeAlt: "Curls before the dry cut",
    afterAlt: "Curls after the dry cut",
  },
  {
    id: "ba-ff-3",
    title: "Balayage, second pass",
    note: "Painted against the west window. Glossed at the basin, not the chair.",
    by: "Isabel Ferreira",
    before: img("photo-1580618672591-eb180b1a973f", 1000),
    after: img("photo-1727341557146-4abab94d0812", 1000),
    beforeAlt: "Hair before balayage",
    afterAlt: "Hair after balayage",
  },
];

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export type Location = {
  id: string;
  universe: Universe;
  name: string;
  street: string;
  city: string;
  subway: string;
  phone: string;
  hours: { day: string; open: string }[];
  note: string;
  image: string;
  imageAlt: string;
  coords: { lat: number; lng: number };
};

export const locations: Location[] = [
  {
    id: "loc-brooklyn",
    universe: "brooklyn",
    name: "The Brooklyn Room",
    street: "214 Wythe Avenue",
    city: "Williamsburg, Brooklyn, NY 11249",
    subway: "L to Bedford Av · J M Z to Marcy Av",
    phone: "(718) 555-0142",
    hours: [
      { day: "Tue — Fri", open: "9:00 — 20:00" },
      { day: "Saturday", open: "8:00 — 19:00" },
      { day: "Sunday", open: "10:00 — 16:00, apprentice hours" },
      { day: "Monday", open: "Closed" },
    ],
    note: "Walk-ins taken before 11am on weekdays. Four chairs, no waiting room, one bench outside.",
    image: img("photo-1739131936348-aa227601f140", 1400),
    imageAlt: "A Williamsburg street lined with brick buildings",
    coords: { lat: 40.7191, lng: -73.9613 },
  },
  {
    id: "loc-fifth",
    universe: "fifth",
    name: "The Fifth Room",
    street: "1067 Fifth Avenue, third floor",
    city: "Upper East Side, New York, NY 10128",
    subway: "4 5 6 to 86 St · Q to 86 St",
    phone: "(212) 555-0198",
    hours: [
      { day: "Tue — Fri", open: "10:00 — 20:00" },
      { day: "Saturday", open: "9:00 — 18:00" },
      { day: "Sun — Mon", open: "By appointment only" },
    ],
    note: "By appointment. The buzzer is unmarked. Take the lift on the left to three.",
    image: img("photo-1649560065937-8405481a53d8", 1400),
    imageAlt: "A row of tall buildings with a clock on the facade",
    coords: { lat: 40.7857, lng: -73.9591 },
  },
];

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */

export const timeSlots = [
  "9:00",
  "9:45",
  "10:30",
  "11:15",
  "12:00",
  "13:30",
  "14:15",
  "15:00",
  "15:45",
  "16:30",
  "17:15",
  "18:00",
  "18:45",
  "19:30",
];

/** Slots that are shown as taken, so the grid does not look synthetic. */
export const takenSlots: Record<string, string[]> = {
  "bk-dez": ["10:30", "12:00", "15:00", "18:00"],
  "bk-otis": ["9:00", "13:30", "16:30"],
  "bk-sal": ["11:15", "14:15", "17:15", "19:30"],
  "bk-june": ["9:45", "15:45", "18:45"],
  "ff-margaux": ["9:00", "11:15", "15:00", "17:15"],
  "ff-noor": ["10:30", "14:15", "18:45"],
  "ff-isabel": ["9:45", "12:00", "16:30", "19:30"],
  "ff-adaeze": ["13:30", "15:45", "18:00"],
};

/* ------------------------------------------------------------------ */
/* Voice                                                               */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    id: "t1",
    universe: "brooklyn" as Universe,
    quote:
      "I moved to Chicago and flew back twice before I admitted what I was doing. Third time I just booked the chair and the flight together.",
    name: "Marcus T.",
    detail: "Client since 2017",
  },
  {
    id: "t2",
    universe: "brooklyn" as Universe,
    quote:
      "My son cried through his first haircut. June kept cutting and talking to him about dinosaurs. He asks to go now.",
    name: "Priya R.",
    detail: "Sunday hours",
  },
  {
    id: "t3",
    universe: "fifth" as Universe,
    quote:
      "Isabel told me no twice before she said yes. That is the reason I trusted her the third time.",
    name: "Helene V.",
    detail: "Blonde, four years",
  },
  {
    id: "t4",
    universe: "fifth" as Universe,
    quote:
      "The trial was six weeks out and she photographed it from four angles. On the day there were no decisions left to make.",
    name: "Caroline A.",
    detail: "Bridal, June",
  },
];

export const photoCredits = [
  "Barney Goodman", "Babak Eshaghian", "Chaps and Co", "Zachary Lancaster",
  "Adam Kring", "Nate Johnston", "Nathon Oski", "Jeppe Mønster",
  "Redd Francisco", "Lindsay Cash", "Adam Winger", "delfina pan",
  "Baylee Gramling", "ali nejatian", "Aiony Haust", "Branislav Rodman",
  "Anni Peng", "Dmytro Tolokonov", "Zoshua Colah", "Gerda", "B W",
];

export const agency = {
  name: "Manhattan Studios",
  signature: "DEMO BY MANHATTAN STUDIOS",
  demoWarning: "DEMO EXPERIENCE — NO REAL APPOINTMENT WILL BE CREATED.",
  cta: "I WANT A WEBSITE LIKE THIS",
};
