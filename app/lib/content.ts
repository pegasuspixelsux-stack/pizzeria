/**
 * Contenido estático para la maqueta de la home de Pizzeria.
 *
 * Pizzeria no es un negocio real. La dirección, el teléfono, el horario y los
 * precios de abajo son marcadores plausibles para Punta del Este / La Barra —
 * reemplazalos por datos reales antes de cualquier uso en producción.
 *
 * Fotografía: Unsplash (unsplash.com/license). Reemplazá los IDs `photo` por
 * imágenes con licencia o propias y acreditá a los fotógrafos según haga falta:
 *   hero        photo-1513104890138-7c749659a591
 *   midday      photo-1574071318508-1cdbab80d002
 *   dinner      photo-1571997478779-2adcbbe9ab2f
 *   bar         photo-1590947132387-155cc02f3212
 *   atmosphere  photo-1600628421055-4d30de868b8f
 */

const U = "https://images.unsplash.com/photo-";
const q = "&q=80&auto=format&fit=crop";

export const img = {
  hero: `${U}1513104890138-7c749659a591?w=2200&ar=16:10${q}`,
  midday: `${U}1574071318508-1cdbab80d002?w=1400&ar=1:1${q}`,
  dinner: `${U}1571997478779-2adcbbe9ab2f?w=1400&ar=1:1${q}`,
  bar: `${U}1590947132387-155cc02f3212?w=1400&ar=1:1${q}`,
  atmosphere: `${U}1600628421055-4d30de868b8f?w=1700&ar=4:3${q}`,
};

export const nav = [
  { label: "La Carta", href: "/menu" },
  { label: "La Pizza", href: "/#experiences" },
  { label: "Bar", href: "/#bar" },
  { label: "Eventos", href: "/#atmosphere" },
] as const;

export const hero = {
  place: "Punta del Este — Uruguay",
  title: ["Horno a leña,", "masa artesanal,", "y aire de mar."],
  subtitle:
    "Una pizzería napolitana sobre la Rambla — masa de fermentación lenta, tomate San Marzano, muzzarella fior di latte y un horno a 450 °C que hace una pizza en noventa segundos.",
  cta: "Ver la pizza",
};

export const narrative = "Un horno, una masa que cambia con el día.";

export const experiences = [
  {
    id: "the-midday",
    kicker: "12:30 — 16:00",
    title: "El Mediodía",
    body: "Mesas abiertas al agua, una carta corta que sale de la masa de la mañana y de lo que mandó la feria, y vino por copa hasta que se termina la tarde.",
    image: img.midday,
    alt: "Una pizza margarita napolitana de borde alto y leopardeado sobre una mesa de mármol.",
    link: "Reservá una mesa para el mediodía",
    detail: {
      trigger: "Hoy en la carta",
      lead: "La carta del mediodía es corta y casi toda roja. Un día reciente fue así:",
      items: [
        "Muzzarella — salsa de tomate casera, muzzarella fior di latte, aceitunas y orégano",
        "Margarita — San Marzano, muzzarella de búfala, albahaca",
        "Fugazzeta — cebolla dulce, muzzarella y provolone, doble masa",
        "Marinara — tomate, ajo, orégano, aceite de Garzón (sin queso)",
      ],
    },
  },
  {
    id: "the-dinner",
    kicker: "20:00 — 00:00",
    title: "La Cena",
    body: "La sala baja la luz y se pone cálida. La carta entera — entradas, fritos y pizzas que salen del horno de a una, de la Calabresa a la Margarita — velas sobre las copas, y la costa oscureciéndose del otro lado de las ventanas.",
    image: img.dinner,
    alt: "Dos pizzas al horno de leña sobre una mesa oscura con luz tenue, albahaca fresca encima.",
    link: "Reservá una mesa para la cena",
    detail: {
      trigger: "Bueno saber",
      lead: "Algunas notas antes de reservar el servicio de la noche:",
      items: [
        "Cada pizza se hace al momento — llegan de a una, no todas juntas",
        "Último pedido al horno 23:30; la cocina cierra a medianoche",
        "La barra junto al horno (seis lugares) se reserva solo por teléfono",
        "Bases sin gluten avisando, aunque el horno es compartido",
      ],
    },
  },
  {
    id: "the-bar",
    kicker: "19:00 — tarde",
    title: "El Bar",
    body: "Fritos y sfizi en la barra de mármol — crocchè, montanarine, pizza fritta — una estantería de amari que vale quedarse, y una carta corta del mismo horno hasta cerrar.",
    image: img.bar,
    alt: "Una mano levantando una porción de pizza al horno de leña en una barra de mármol.",
    link: "Ver el bar",
    detail: {
      trigger: "Desde la barra",
      lead: "La carta se mueve con la temporada. Los fijos que se quedan:",
      items: [
        "Negroni sbagliato — Campari, vermut de Torino, Prosecco",
        "Aperol spritz, naranja siciliana, borde con sal de mar",
        "Fainá recién hecha y una copa de moscato",
        "Pizza fritta — ricota, pimienta negra, tomate, frita al momento",
      ],
    },
  },
] as const;

export const atmosphere = {
  title: ["Seguimos el horario", "que marca el horno."],
  paragraphs: [
    "La masa madre se alimenta dos veces por día y se amasa a mano cada mañana, así que la pizza cambia un poco con el clima y con la sala. Armamos el lugar alrededor del horno — ventanales abiertos, una terraza que sigue el sol, y una barra desde donde se ve el fuego.",
    "Cenas privadas, degustaciones y celebraciones chicas toman la sala este o toda la terraza. Contanos la ocasión y cuántos son, y armamos un menú alrededor del horno.",
  ],
  cta: "Consultá por eventos",
};

export const reviewsIntro = {
  title: "Opiniones",
  lede: "Testimonios ilustrativos para la demo — texto de muestra, no reseñas reales.",
};

export const reviews = [
  {
    author: "Comensal local",
    rating: 5,
    quote:
      "Una joya para cualquiera que aprecie la pizza auténtica y un ambiente divino. La salsa casera es fresca y llena de sabor, y las pizzas salen perfectas del horno a leña.",
    meta: "$600–800",
  },
  {
    author: "Pareja de Montevideo",
    rating: 5,
    quote:
      "Excelente pizzería. Casi siempre se llena, así que conviene llegar temprano o esperar un rato. El prosecco está buenísimo.",
    meta: "$1.400–1.600",
  },
  {
    author: "Visitante de temporada",
    rating: 5,
    quote:
      "Un lugar muy lindo con pizza al estilo italiano auténtico. Probé la de prosciutto, parmesano y rúcula y estaba deliciosa. Súper recomendable si visitás Punta del Este.",
    meta: "Cena",
  },
  {
    author: "Turista de Buenos Aires",
    rating: 5,
    quote:
      "Sin ninguna duda, por lejos la mejor pizza estilo italiano de Uruguay, no solo de Punta del Este.",
    meta: "Comer allí",
  },
  {
    author: "Familia, Punta del Este",
    rating: 5,
    quote:
      "Cuando estés en Punta no te podés perder este lugar. Ambiente increíble y pizzas al horno de leña espectaculares. Probé la fugazzeta y la italiana, buenísimas las dos.",
    meta: "$800–1.000",
  },
  {
    author: "Cliente habitual",
    rating: 5,
    quote:
      "Pizza rica a precio razonable y gran ambiente. El volcán con dulce de leche impresionante. Con una pizza y una fainá alcanza perfecto para dos.",
    meta: "Cena",
  },
] as const;

export const galleryIntro = {
  title: "Un vistazo al local",
  lede: "El horno, los platos y algunos momentos.",
};

export const gallery = [
  { src: img.hero, alt: "Del horno a leña", size: "hero" },
  { src: img.midday, alt: "Margherita apenas salida", size: "square" },
  {
    src: `${U}1590534247854-e97d5e3feef6?w=1400&ar=3:4${q}`,
    alt: "La mesa cuando baja la luz",
    size: "tall",
  },
  {
    src: `${U}1536935338788-846bb9981813?w=1200&ar=1:1${q}`,
    alt: "De la barra",
    size: "square",
  },
  {
    src: `${U}1509440159596-0249088772ff?w=1800&ar=21:9${q}`,
    alt: "Pan del día y entradas",
    size: "wide",
  },
  {
    src: `${U}1571877227200-a0d98ea607e9?w=1200&ar=1:1${q}`,
    alt: "Postres de la casa",
    size: "square",
  },
  {
    src: `${U}1544982503-9f984c14501a?w=1200&ar=1:1${q}`,
    alt: "Una porción y una birra",
    size: "square",
  },
] as const;

export const reservation = {
  title: "Reservá una mesa",
  lede: "Decinos cuándo y para cuántos. Guardamos la terraza y el salón por separado, así que elegí la sala donde querés estar.",
  note: "Maqueta de diseño — el formulario no envía nada. Para una reserva real, llamá al número de abajo.",
  times: ["12:30", "13:30", "15:00", "20:00", "20:30", "21:15", "22:00"],
  guests: [
    "1 persona",
    "2 personas",
    "3 personas",
    "4 personas",
    "5 personas",
    "6 personas",
    "7+ — llamanos",
  ],
  seatings: ["Terraza", "Salón", "Barra junto al horno"],
};

export const contact = {
  phoneLabel: "+598 42 77 21 40",
  phoneHref: "tel:+59842772140",
  emailLabel: "hola@pizzeria.uy",
  emailHref: "mailto:hola@pizzeria.uy",
};

export const locations = [
  {
    id: "peninsula",
    name: "Península",
    address: "Calle 20 (El Bulevar) esq. 27, Punta del Este",
    phoneLabel: "+598 42 44 00 00",
    phoneHref: "tel:+59842440000",
    hours: "Miércoles a lunes · 19:30 – 00:00",
  },
  {
    id: "maldonado",
    name: "Maldonado",
    address: "Av. Roosevelt esq. Dodera, Maldonado",
    phoneLabel: "+598 42 25 00 00",
    phoneHref: "tel:+59842250000",
    hours: "Martes a domingo · 19:00 – 23:30",
  },
  {
    id: "solanas",
    name: "Solanas",
    address: "Ruta 10 Km 118, Portezuelo",
    phoneLabel: "+598 42 57 00 00",
    phoneHref: "tel:+59842570000",
    hours: "Todos los días · 12:00 – 00:00",
  },
];

export const footerLinks = [
  {
    heading: "Visitá",
    items: [
      { label: "La Carta", href: "/menu" },
      { label: "La Pizza", href: "/#experiences" },
      { label: "Bar", href: "/#bar" },
      { label: "Eventos privados", href: "/#atmosphere" },
      { label: "Galería", href: "/#galeria" },
      { label: "Opiniones", href: "/#opiniones" },
      { label: "Reservá una mesa", href: "/#reserve" },
    ],
  },
  {
    heading: "Cocina",
    items: [
      { label: "La Carta completa", href: "/menu" },
      { label: "Vinos y amari", href: "/#bar" },
      { label: "Notas dietéticas", href: "/#reserve" },
      { label: "Tarjetas de regalo", href: "/#reserve" },
    ],
  },
];
