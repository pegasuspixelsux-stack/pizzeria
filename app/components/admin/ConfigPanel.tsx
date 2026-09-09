"use client";

import { useState, type ReactNode } from "react";
import { locations as SEED_LOCATIONS } from "../../lib/content";
import { categoryOrder } from "../../lib/menu";

const label =
  "block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-adm-muted";
const field =
  "mt-2 w-full rounded-[10px] border border-adm-border bg-adm-panel px-3.5 py-2.5 text-[0.92rem] text-adm-ink outline-none transition-colors placeholder:text-adm-faint focus:border-adm-sidebar";

type Loc = {
  name: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  whatsapp: string;
};

export function ConfigPanel() {
  const [local, setLocal] = useState({
    name: "Pizzeria",
    phone: "+598 42 77 21 40",
    email: "hola@pizzeria.uy",
  });
  const [reservas, setReservas] = useState({
    aforo: "40",
    sena: "0",
    turnos: "12:30, 13:30, 15:00, 20:00, 20:30, 21:15, 22:00",
  });
  const [avisos, setAvisos] = useState({
    whatsapp: true,
    email: true,
    nueva: true,
  });
  const [locs, setLocs] = useState<Loc[]>(
    SEED_LOCATIONS.map((l) => ({
      name: l.name,
      address: l.address,
      hours: l.hours.replace(/^[^·]*·\s*/, ""),
      phone: l.phoneLabel,
      email: "",
      whatsapp: "",
    })),
  );
  const [cats, setCats] = useState<string[]>([...categoryOrder]);
  const [newCat, setNewCat] = useState("");
  const [saved, setSaved] = useState(false);

  const flash = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  const setLoc = (i: number, key: keyof Loc, value: string) =>
    setLocs((prev) => prev.map((l, idx) => (idx === i ? { ...l, [key]: value } : l)));

  const addCat = () => {
    const c = newCat.trim().toLowerCase().replace(/\s+/g, "_");
    if (c && !cats.includes(c)) setCats((prev) => [...prev, c]);
    setNewCat("");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Section title="Datos del local">
        <Row label="Nombre">
          <input
            className={field}
            value={local.name}
            onChange={(e) => setLocal((l) => ({ ...l, name: e.target.value }))}
          />
        </Row>
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          <Row label="Teléfono">
            <input
              className={field}
              value={local.phone}
              onChange={(e) =>
                setLocal((l) => ({ ...l, phone: e.target.value }))
              }
            />
          </Row>
          <Row label="Correo">
            <input
              className={field}
              value={local.email}
              onChange={(e) =>
                setLocal((l) => ({ ...l, email: e.target.value }))
              }
            />
          </Row>
        </div>
      </Section>

      <Section title="Sucursales">
        <div className="space-y-4">
          {locs.map((loc, i) => (
            <div
              key={loc.name}
              className="rounded-[12px] border border-adm-border bg-adm-bg p-4"
            >
              <p className="text-[0.82rem] font-semibold text-adm-ink">
                {loc.name}
              </p>
              <div className="mt-3 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                <Row label="Dirección">
                  <input
                    className={field}
                    value={loc.address}
                    onChange={(e) => setLoc(i, "address", e.target.value)}
                    placeholder="Ej. Av. Gorlero 1234"
                  />
                </Row>
                <Row label="Horario">
                  <input
                    className={field}
                    value={loc.hours}
                    onChange={(e) => setLoc(i, "hours", e.target.value)}
                    placeholder="Ej. 12:00 – 00:00"
                  />
                </Row>
                <Row label="Teléfono">
                  <input
                    className={field}
                    value={loc.phone}
                    onChange={(e) => setLoc(i, "phone", e.target.value)}
                    placeholder="Ej. +598 4248 1234"
                  />
                </Row>
                <Row label="Correo">
                  <input
                    type="email"
                    className={field}
                    value={loc.email}
                    onChange={(e) => setLoc(i, "email", e.target.value)}
                    placeholder="Ej. puntadeleste@pizzeria.uy"
                  />
                </Row>
                <div className="sm:col-span-2">
                  <span className={label}>WhatsApp de pedidos</span>
                  <input
                    className={field}
                    value={loc.whatsapp}
                    onChange={(e) => setLoc(i, "whatsapp", e.target.value)}
                    placeholder="Con código de país — ej. +59899123456"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Categorías del menú">
        <p className="text-[0.85rem] text-adm-muted">
          Categorías disponibles para clasificar los platos de la carta.
        </p>
        <div className="flex gap-2">
          <input
            className={`${field} flex-1`}
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCat();
              }
            }}
            placeholder="Nueva categoría (ej. ensaladas)"
          />
          <button
            type="button"
            onClick={addCat}
            className="mt-2 shrink-0 rounded-[10px] bg-adm-sidebar px-4 text-[0.82rem] font-semibold text-white transition-colors hover:bg-adm-sidebar-deep"
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {cats.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-2 rounded-lg border border-adm-border bg-adm-bg px-3 py-1.5 text-[0.85rem] font-medium text-adm-sidebar"
            >
              {cat}
              <button
                type="button"
                onClick={() => setCats((prev) => prev.filter((c) => c !== cat))}
                aria-label={`Quitar ${cat}`}
                className="text-adm-faint transition-colors hover:text-[#b0442e]"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </Section>

      <Section title="Reservas">
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          <Row label="Aforo por turno">
            <input
              type="number"
              inputMode="numeric"
              className={field}
              value={reservas.aforo}
              onChange={(e) =>
                setReservas((r) => ({ ...r, aforo: e.target.value }))
              }
            />
          </Row>
          <Row label="Seña por persona ($)">
            <input
              type="number"
              inputMode="numeric"
              className={field}
              value={reservas.sena}
              onChange={(e) =>
                setReservas((r) => ({ ...r, sena: e.target.value }))
              }
            />
          </Row>
        </div>
        <Row label="Turnos (separados por coma)">
          <input
            className={field}
            value={reservas.turnos}
            onChange={(e) =>
              setReservas((r) => ({ ...r, turnos: e.target.value }))
            }
          />
        </Row>
      </Section>

      <Section title="Avisos al cliente">
        <Toggle
          checked={avisos.whatsapp}
          onChange={() => setAvisos((a) => ({ ...a, whatsapp: !a.whatsapp }))}
          label="Confirmar reservas por WhatsApp"
        />
        <Toggle
          checked={avisos.email}
          onChange={() => setAvisos((a) => ({ ...a, email: !a.email }))}
          label="Confirmar reservas por correo"
        />
        <Toggle
          checked={avisos.nueva}
          onChange={() => setAvisos((a) => ({ ...a, nueva: !a.nueva }))}
          label="Avisarme cuando entra una reserva nueva"
        />
      </Section>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={flash}
          className="rounded-full bg-adm-sidebar px-5 py-2.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-adm-sidebar-deep"
        >
          Guardar cambios
        </button>
        {saved ? (
          <span className="text-[0.82rem] text-[#3f7d3c]">
            Guardado (demo — no persiste).
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-adm-border bg-adm-panel p-5 shadow-[0_1px_2px_rgba(51,37,30,0.04)] sm:p-6">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-adm-sidebar">
        {title}
      </h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Row({
  label: text,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <span className={label}>{text}</span>
      {children}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label: text,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className="flex w-full items-center justify-between gap-4 text-left text-[0.9rem] text-adm-ink"
    >
      <span>{text}</span>
      <span
        className={[
          "relative h-6 w-10 shrink-0 rounded-full transition-colors",
          checked ? "bg-adm-sidebar" : "bg-adm-border",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[1.125rem]" : "left-0.5",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
