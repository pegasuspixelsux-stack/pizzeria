"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import Image from "next/image";
import {
  MENU_DATA,
  categoryLabels,
  categoryOrder,
  formatPrice,
  sectionLabels,
  sectionOrder,
  type MenuItem,
} from "../../lib/menu";

type AdminItem = MenuItem & { image?: string };

type Draft = {
  name: string;
  description: string;
  price: string;
  priceSecondary: string;
  unit: string;
  category: MenuItem["category"];
  tags: MenuItem["tags"];
  image?: string;
};

const empty: Draft = {
  name: "",
  description: "",
  price: "",
  priceSecondary: "",
  unit: "",
  category: "pizzas",
  tags: ["dinner"],
  image: undefined,
};

const field =
  "mt-2 w-full rounded-[10px] border border-line bg-canvas px-3.5 py-2.5 text-[0.92rem] text-ink outline-none transition-colors placeholder:text-faint focus:border-ocean";
const label =
  "block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted";

export function MenuManager() {
  const [items, setItems] = useState<AdminItem[]>(() => MENU_DATA.map((m) => ({ ...m })));
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);

  const grouped = useMemo(
    () =>
      categoryOrder
        .map((cat) => ({ cat, list: items.filter((i) => i.category === cat) }))
        .filter((g) => g.list.length > 0),
    [items],
  );

  const startNew = () => {
    setDraft(empty);
    setEditing("new");
  };

  const startEdit = (item: AdminItem) => {
    setDraft({
      name: item.name,
      description: item.description ?? "",
      price: String(item.price),
      priceSecondary: item.priceSecondary ? String(item.priceSecondary) : "",
      unit: item.unit ?? "",
      category: item.category,
      tags: [...item.tags],
      image: item.image,
    });
    setEditing(item.id);
  };

  const cancel = () => {
    setEditing(null);
    setDraft(empty);
  };

  const save = () => {
    const parsed: AdminItem = {
      id: editing === "new" ? crypto.randomUUID() : (editing as string),
      name: draft.name.trim() || "Sin nombre",
      description: draft.description.trim() || undefined,
      price: Number(draft.price) || 0,
      priceSecondary: draft.priceSecondary
        ? Number(draft.priceSecondary)
        : undefined,
      unit: draft.unit.trim() || undefined,
      category: draft.category,
      tags: draft.tags.length ? draft.tags : ["dinner"],
      image: draft.image,
    };
    setItems((prev) =>
      editing === "new"
        ? [...prev, parsed]
        : prev.map((i) => (i.id === parsed.id ? parsed : i)),
    );
    cancel();
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const toggleTag = (t: MenuItem["tags"][number]) =>
    setDraft((d) => ({
      ...d,
      tags: d.tags.includes(t)
        ? d.tags.filter((x) => x !== t)
        : [...d.tags, t],
    }));

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setDraft((d) => ({ ...d, image: URL.createObjectURL(file) }));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.9rem] text-muted">
          {items.length} platos en la carta
        </p>
        {editing === null ? (
          <button
            type="button"
            onClick={startNew}
            className="rounded-full bg-ink px-4 py-2 text-[0.82rem] font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5"
          >
            Agregar plato
          </button>
        ) : null}
      </div>

      {editing !== null ? (
        <div className="mt-5 rounded-[16px] border border-line bg-mist/40 p-5 sm:p-6">
          <h3 className="font-display text-lg text-ink">
            {editing === "new" ? "Nuevo plato" : "Editar plato"}
          </h3>

          <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label}>Nombre</label>
              <input
                className={field}
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="Margherita"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={label}>Descripción</label>
              <textarea
                className={`${field} min-h-[4.5rem] resize-y`}
                value={draft.description}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
                placeholder="Salsa de tomate, Fior di Latte, albahaca…"
              />
            </div>

            <div>
              <label className={label}>Precio</label>
              <input
                type="number"
                inputMode="numeric"
                className={field}
                value={draft.price}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, price: e.target.value }))
                }
                placeholder="590"
              />
            </div>

            <div>
              <label className={label}>Precio 2 (opcional)</label>
              <input
                type="number"
                inputMode="numeric"
                className={field}
                value={draft.priceSecondary}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, priceSecondary: e.target.value }))
                }
                placeholder="Botella, etc."
              />
            </div>

            <div>
              <label className={label}>Unidad (opcional)</label>
              <input
                className={field}
                value={draft.unit}
                onChange={(e) => setDraft((d) => ({ ...d, unit: e.target.value }))}
                placeholder="Copa · 500cc · Pinta"
              />
            </div>

            <div>
              <label className={label}>Categoría</label>
              <select
                className={field}
                value={draft.category}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    category: e.target.value as MenuItem["category"],
                  }))
                }
              >
                {categoryOrder.map((c) => (
                  <option
                    key={c}
                    value={c}
                    className="bg-[#2b1710] text-[#fdfbf7]"
                  >
                    {categoryLabels[c]}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={label}>Servicio</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {sectionOrder.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={[
                      "rounded-full border px-3 py-1.5 text-[0.8rem] transition-colors",
                      draft.tags.includes(t)
                        ? "border-ocean bg-ocean/10 text-ocean"
                        : "border-line text-muted hover:text-ink",
                    ].join(" ")}
                  >
                    {sectionLabels[t]}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={label}>Foto</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] border border-line bg-shell">
                  {draft.image ? (
                    <Image
                      src={draft.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFile}
                  className="text-[0.82rem] text-muted file:mr-3 file:rounded-full file:border file:border-line file:bg-canvas file:px-3 file:py-1.5 file:text-[0.8rem] file:text-ink"
                />
              </div>
              <p className="mt-1.5 text-[0.75rem] text-faint">
                Vista previa local — no se sube a ningún lado en esta maqueta.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={save}
              className="rounded-full bg-ink px-5 py-2.5 text-[0.82rem] font-semibold text-canvas"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={cancel}
              className="rounded-full px-4 py-2.5 text-[0.82rem] font-medium text-muted hover:text-ink"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-8 space-y-8">
        {grouped.map((g) => (
          <div key={g.cat}>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
              {categoryLabels[g.cat]}
            </h3>
            <ul className="mt-3 divide-y divide-line/60">
              {g.list.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 py-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[8px] border border-line bg-shell">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <p className="font-medium text-ink">{item.name}</p>
                      {item.unit ? (
                        <span className="text-[0.78rem] text-faint">
                          {item.unit}
                        </span>
                      ) : null}
                    </div>
                    {item.description ? (
                      <p className="mt-0.5 line-clamp-2 text-[0.85rem] text-muted">
                        {item.description}
                      </p>
                    ) : null}
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2 py-0.5 text-[0.68rem] text-muted"
                        >
                          {sectionLabels[t]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="tabular-nums text-[0.9rem] text-ink-soft">
                      {formatPrice(item.price)}
                    </span>
                    <div className="flex gap-2 text-[0.78rem]">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="text-muted hover:text-ink"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-muted hover:text-[#d98a6a]"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
