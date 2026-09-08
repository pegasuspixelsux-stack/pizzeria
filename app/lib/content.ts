/**
 * Static content for the Trattoria homepage mockup.
 *
 * Trattoria is not a real business. Address, phone, hours and prices below are
 * plausible placeholders for Punta del Este / La Barra — swap them for real
 * details before any production use.
 *
 * Photography: Unsplash (unsplash.com/license). Replace the `photo` IDs with
 * licensed or owned imagery and credit the photographers as needed:
 *   hero        photo-1507525428034-b723cf961d3e
 *   lunch       photo-1559339352-11d035aa65de
 *   dinner      photo-1414235077428-338989a2e8c0
 *   cocktails   photo-1470337458703-46ad1756a187
 *   atmosphere  photo-1471922694854-ff1b63b20054
 */

const U = "https://images.unsplash.com/photo-";
const q = "&q=80&auto=format&fit=crop";

export const img = {
  hero: `${U}1507525428034-b723cf961d3e?w=2200&ar=16:10${q}`,
  lunch: `${U}1559339352-11d035aa65de?w=1400&ar=1:1${q}`,
  dinner: `${U}1414235077428-338989a2e8c0?w=1400&ar=1:1${q}`,
  cocktails: `${U}1470337458703-46ad1756a187?w=1400&ar=1:1${q}`,
  atmosphere: `${U}1471922694854-ff1b63b20054?w=1700&ar=4:3${q}`,
};

export const nav = [
  { label: "Restaurant", href: "#experiences" },
  { label: "Cocktail Bar", href: "#cocktail-bar" },
  { label: "Events", href: "#atmosphere" },
] as const;

export const hero = {
  place: "Punta del Este — Uruguay",
  title: ["A table where", "the coast meets", "the evening."],
  subtitle:
    "A coastal kitchen and cocktail bar on the Rambla — one room, three lights: the long lunch, the golden hour, the last drink.",
  cta: "Discover the evening",
};

export const narrative = "One place, moments that change with the light.";

export const experiences = [
  {
    id: "the-lunch",
    kicker: "12:30 — 16:00",
    title: "The Lunch",
    body: "Tables open to the water, a short menu built on the morning's catch and market vegetables, and wine by the glass poured until the afternoon runs out.",
    image: img.lunch,
    alt: "A dining terrace set with white linen looking out over the sea at Punta del Este.",
    link: "Reserve for lunch",
    detail: {
      trigger: "On the plate today",
      lead: "The lunch menu is rewritten each morning. A recent day looked like this:",
      items: [
        "Raw brótola, lime, green almond, olive oil from Garzón",
        "Grilled provoleta, oregano, toasted sourdough",
        "Whole day-boat fish for two, salsa verde, burnt lemon",
        "Dulce de leche semifreddo, sea salt",
      ],
    },
  },
  {
    id: "the-dinner",
    kicker: "20:00 — 00:00",
    title: "The Dinner",
    body: "The room turns low and warm. Tasting plates and larger cuts from the grill, candlelight on the glassware, and the coast going dark beyond the windows.",
    image: img.dinner,
    alt: "A plated fine-dining course with wine glasses in a warmly lit restaurant.",
    link: "Reserve for dinner",
    detail: {
      trigger: "Good to know",
      lead: "A few notes before you book the evening service:",
      items: [
        "Smart-casual — no formal dress code, but the room dims low",
        "Last seating at 23:00; the kitchen closes at midnight",
        "The chef's counter (six seats) is booked by phone only",
        "Tasting menu for the full table, with a shorter à la carte list",
      ],
    },
  },
  {
    id: "the-cocktail-bar",
    kicker: "19:00 — late",
    title: "The Cocktail Bar",
    body: "Stirred and built drinks at the marble counter, an amaro shelf worth staying for, and a smaller list of snacks from the same kitchen until close.",
    image: img.cocktails,
    alt: "A bartender straining an amber cocktail over a large ice cube in a dim bar.",
    link: "See the bar",
    detail: {
      trigger: "From the bar",
      lead: "The list changes with the season. House pours that tend to stay:",
      items: [
        "Rambla Negroni — Uruguayan gin, Amaro Montenegro, blood orange",
        "Faro Sour — pisco, quince, egg white, Andes bitters",
        "Clarified paloma, grapefruit oil, mezcal float",
        "A rotating amaro flight of three, poured at the counter",
      ],
    },
  },
] as const;

export const atmosphere = {
  title: ["We keep the hours", "the sea keeps."],
  paragraphs: [
    "Punta del Este slows down and speeds up with the season and the tide. We built the room around that — long open windows, a terrace that follows the sun, and a menu rewritten as often as the fishermen change what they bring us.",
    "Private dinners, tastings and small celebrations take the east room or the whole terrace. Tell us the occasion and the number, and we will shape an evening around the light you want to be in.",
  ],
  cta: "Enquire about events",
};

export const reservation = {
  title: "Reserve a table",
  lede: "Tell us when, and for how many. We hold the terrace and the dining room separately, so choose the room you want to be in.",
  note: "Design mockup — the form does not send anything. For a real booking, call the number below.",
  times: ["12:30", "13:30", "15:00", "20:00", "20:30", "21:15", "22:00"],
  guests: ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ — call us"],
  seatings: ["Terrace", "Dining room", "Cocktail bar"],
};

export const contact = {
  street: "Rambla Gral. Artigas, parada 6",
  area: "La Barra, Maldonado 20003",
  country: "Punta del Este, Uruguay",
  phoneLabel: "+598 42 77 21 40",
  phoneHref: "tel:+59842772140",
  emailLabel: "mesa@trattoria.uy",
  emailHref: "mailto:mesa@trattoria.uy",
};

export const hours = [
  { days: "Monday", value: "Closed" },
  { days: "Tuesday — Thursday", value: "12:30 – 16:00 · 20:00 – 00:00" },
  { days: "Friday — Saturday", value: "12:30 – 16:00 · 20:00 – 01:00" },
  { days: "Sunday", value: "12:30 – 17:00" },
];

export const footerLinks = [
  {
    heading: "Visit",
    items: [
      { label: "Restaurant", href: "#experiences" },
      { label: "Cocktail Bar", href: "#cocktail-bar" },
      { label: "Private events", href: "#atmosphere" },
      { label: "Reserve a table", href: "#reserve" },
    ],
  },
  {
    heading: "Kitchen",
    items: [
      { label: "Sample menu", href: "#experiences" },
      { label: "Wine & amaro list", href: "#cocktail-bar" },
      { label: "Dietary notes", href: "#reserve" },
      { label: "Gift certificates", href: "#reserve" },
    ],
  },
];
