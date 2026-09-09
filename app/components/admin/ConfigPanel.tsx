"use client";

import { useState, type ReactNode } from "react";

const label =
  "block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-adm-muted";
const field =
  "mt-2 w-full rounded-[10px] border border-adm-border bg-adm-panel px-3.5 py-2.5 text-[0.92rem] text-adm-ink outline-none transition-colors placeholder:text-adm-faint focus:border-adm-sidebar";

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
  const [saved, setSaved] = useState(false);

  const flash = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
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
