/**
 * Importación masiva de la carta desde CSV o Excel (.xlsx / .xls).
 *
 * CSV se parsea de forma nativa; Excel usa SheetJS (import dinámico, solo se
 * descarga cuando hace falta). Columnas esperadas (encabezado, sin importar
 * mayúsculas): name, description, price, category, tags, image, published.
 */

import type { MenuItem } from "./menu";
import { categoryOrder } from "./menu";

export type ParsedItem = Omit<MenuItem, "id">;

export type ImportResult = {
  items: ParsedItem[];
  skipped: number;
};

const CATS = new Set<string>(categoryOrder);
const DRINK_CATS = new Set(["vinos", "cervezas", "tragos", "sin_alcohol"]);

function pick(row: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = row[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      return String(v).trim();
    }
  }
  return "";
}

function toCategory(v: string): MenuItem["category"] {
  const s = v.toLowerCase().replace(/\s+/g, "_");
  return (CATS.has(s) ? s : "pizzas") as MenuItem["category"];
}

function toTags(v: string, category: MenuItem["category"]): MenuItem["tags"] {
  const raw = v.toLowerCase();
  const found = (["lunch", "dinner", "bar"] as const).filter((t) =>
    raw.includes(t),
  );
  if (found.length) return [...found];
  return DRINK_CATS.has(category) ? ["bar", "dinner"] : ["lunch", "dinner"];
}

function rowToItem(row: Record<string, unknown>): ParsedItem | null {
  const name = pick(row, "name", "nombre", "plato");
  const priceRaw = pick(row, "price", "precio");
  const price = Number(priceRaw.replace(/[^\d.,-]/g, "").replace(",", "."));
  if (!name || !priceRaw || Number.isNaN(price)) return null;

  const category = toCategory(pick(row, "category", "categoria", "categoría"));
  const publishedRaw = pick(row, "published", "publicado", "visible");

  return {
    name,
    description:
      pick(row, "description", "descripcion", "descripción") || undefined,
    price: Math.round(price),
    category,
    tags: toTags(pick(row, "tags", "servicio", "servicios"), category),
    image: pick(row, "image", "imageurl", "imagen", "foto") || undefined,
    published: publishedRaw
      ? !/^(false|no|0|oculto|off)$/i.test(publishedRaw)
      : true,
  };
}

function normalizeKeys(
  row: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[k.trim().toLowerCase()] = v;
  }
  return out;
}

/** Minimal CSV: quoted fields, escaped quotes, commas in fields, CRLF/LF. */
function parseCsv(text: string): Record<string, unknown>[] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      field = "";
      row = [];
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }

  const filled = rows.filter((r) => r.some((x) => x.trim() !== ""));
  if (filled.length < 2) return [];

  const header = filled[0].map((h) => h.trim());
  return filled.slice(1).map((r) => {
    const obj: Record<string, unknown> = {};
    header.forEach((h, idx) => {
      obj[h] = r[idx] ?? "";
    });
    return obj;
  });
}

export async function parseMenuFile(file: File): Promise<ImportResult> {
  let rawRows: Record<string, unknown>[];

  if (/\.csv$/i.test(file.name)) {
    rawRows = parseCsv(await file.text());
  } else {
    const XLSX = await import("xlsx");
    const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws);
  }

  const items: ParsedItem[] = [];
  let skipped = 0;
  for (const raw of rawRows) {
    const item = rowToItem(normalizeKeys(raw));
    if (item) items.push(item);
    else skipped += 1;
  }
  return { items, skipped };
}

export const CSV_TEMPLATE = [
  "name,description,price,category,tags,image,published",
  '"Margherita","San Marzano, fior di latte, albahaca",590,pizzas,lunch dinner,,true',
  '"Fainá","Clásica de garbanzo, al horno",120,entradas,lunch dinner,,true',
  '"Negroni sbagliato","Campari, vermut, Prosecco",420,tragos,bar,,true',
].join("\n");
