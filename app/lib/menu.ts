/**
 * Carta completa de Pizzeria (página /menu).
 *
 * PARCIAL — sembrado con los ítems que llegaron completos en el brief. El
 * mensaje se cortó en la Hamburguesa Premium (e2); faltan precio y resto de
 * las secciones (pastas, sopas/ensaladas, postres, vinos, cervezas, tragos,
 * sin alcohol). Completar `MENU_DATA` cuando llegue la lista entera.
 *
 * Precios en pesos uruguayos. `tags` controla el filtro Almuerzo/Cena/Bar.
 */

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit?: string; // "500cc", "1/2 Pinta", "Pinta", "Copa", "Botella"
  priceSecondary?: number; // p. ej. precio de botella cuando hay precio de copa
  category:
    | "pizzas"
    | "entradas"
    | "pastas"
    | "sopas_ensaladas"
    | "postres"
    | "vinos"
    | "cervezas"
    | "tragos"
    | "sin_alcohol";
  tags: ("lunch" | "dinner" | "bar")[];
  /** Ausente o true = visible en la carta pública. false = despublicado sin borrar. */
  published?: boolean;
  image?: string;
}

/** Unsplash helper — reemplazar por fotos propias del local. */
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=75&auto=format&fit=crop`;

export const sectionLabels: Record<MenuItem["tags"][number], string> = {
  lunch: "Almuerzo",
  dinner: "Cena",
  bar: "Bar",
};

export const sectionOrder: MenuItem["tags"][number][] = ["lunch", "dinner", "bar"];

export const categoryLabels: Record<MenuItem["category"], string> = {
  entradas: "Entradas, chivitos y paninis",
  pizzas: "Pizzas napolitanas",
  pastas: "Pastas",
  sopas_ensaladas: "Sopas y ensaladas",
  postres: "Postres",
  vinos: "Vinos",
  cervezas: "Cervezas",
  tragos: "Tragos",
  sin_alcohol: "Sin alcohol",
};

export const categoryOrder: MenuItem["category"][] = [
  "entradas",
  "pizzas",
  "pastas",
  "sopas_ensaladas",
  "postres",
  "vinos",
  "cervezas",
  "tragos",
  "sin_alcohol",
];

export const MENU_DATA: MenuItem[] = [
  {
    id: "p1",
    name: "Margherita",
    description:
      "Salsa de tomate, Fior di Latte, Grana Padano, albahaca, aceite extra virgen",
    price: 590,
    category: "pizzas",
    tags: ["lunch", "dinner"],
    image: IMG("1574071318508-1cdbab80d002"),
  },
  {
    id: "p2",
    name: "Campestre",
    description:
      "Salsa de tomate, mozzarella, rúcula, jamón crudo, Grana Padano, aceite extra virgen",
    price: 720,
    category: "pizzas",
    tags: ["lunch", "dinner"],
    image: IMG("1593560708920-61dd98c46a4e"),
  },
  {
    id: "p3",
    name: "Fugazzeta",
    description:
      "Mozzarella, provolone, cebolla colorada, morrón asado, orégano fresco, aceite de ajo, sal marina",
    price: 680,
    category: "pizzas",
    tags: ["lunch", "dinner"],
    image: IMG("1513104890138-7c749659a591"),
  },
  {
    id: "p4",
    name: "Pepperoni",
    description:
      "Salsa de tomate, pepperoni, provolone, mozzarella, aceite de peperoncino",
    price: 690,
    category: "pizzas",
    tags: ["dinner"],
    image: IMG("1590534247854-e97d5e3feef6"),
  },
  {
    id: "p5",
    name: "Atrevida",
    description: "Pesto, Fior di Latte, rúcula, cherry y Parmigiano",
    price: 690,
    category: "pizzas",
    tags: ["dinner"],
    image: IMG("1585238342024-78d387f4a707"),
  },
  {
    id: "e1",
    name: "Chivito Creado en Punta del Este",
    description:
      "En pan de pizza, lomo o pollo, jamón, queso, panceta, tomate, lechuga y huevo",
    price: 695,
    category: "entradas",
    tags: ["lunch", "dinner"],
    image: IMG("1568901346375-23c9450c58cd"),
  },
];

export function formatPrice(n: number): string {
  return `$ ${new Intl.NumberFormat("es-UY").format(n)}`;
}
