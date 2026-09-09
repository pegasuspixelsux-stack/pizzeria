"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  statusLabels,
  toDigits,
  type ReservationRequest,
  type ReservationStatus,
} from "../../lib/admin-demo";

const FILTERS: { key: "todas" | ReservationStatus; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "pendiente", label: "Pendientes" },
  { key: "confirmada", label: "Confirmadas" },
  { key: "rechazada", label: "Rechazadas" },
];

const chip: Record<ReservationStatus, string> = {
  pendiente: "border-[#E0A82E]/40 bg-[#F5C542]/15 text-[#8a5c10]",
  confirmada: "border-[#7FB37E]/40 bg-[#7FB37E]/12 text-[#3f7d3c]",
  rechazada: "border-adm-border bg-adm-bg text-adm-faint",
};

const dateFmt = new Intl.DateTimeFormat("es-UY", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

function firstName(name: string) {
  return name.split(" ")[0];
}

/** Pre-filled confirmation the owner can send by WhatsApp or email. */
function confirmMessage(r: ReservationRequest) {
  const when = dateFmt.format(new Date(`${r.date}T00:00:00`));
  const people = `${r.guests} ${r.guests === 1 ? "persona" : "personas"}`;
  return `Hola ${firstName(r.name)}, te escribimos de Pizzeria. Confirmamos tu reserva para el ${when} a las ${r.time}, ${people} (${r.seating}). ¡Te esperamos!`;
}

export function ReservationsPanel({
  reservations,
  onChange,
}: {
  reservations: ReservationRequest[];
  onChange: (next: ReservationRequest[]) => void;
}) {
  const [filter, setFilter] = useState<"todas" | ReservationStatus>("todas");
  const [toast, setToast] = useState<string | null>(null);

  const rows = useMemo(() => {
    const list =
      filter === "todas"
        ? reservations
        : reservations.filter((r) => r.status === filter);
    return [...list].sort((a, b) => a.date.localeCompare(b.date));
  }, [reservations, filter]);

  const setStatus = (r: ReservationRequest, status: ReservationStatus) => {
    onChange(reservations.map((x) => (x.id === r.id ? { ...x, status } : x)));
    if (status === "confirmada" || status === "rechazada") {
      setToast(
        `Reserva de ${firstName(r.name)} marcada como ${statusLabels[status].toLowerCase()}.`,
      );
      window.setTimeout(() => setToast(null), 3200);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f.key === "todas"
              ? reservations.length
              : reservations.filter((r) => r.status === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={[
                "rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors",
                filter === f.key
                  ? "border-adm-sidebar bg-adm-sidebar text-white"
                  : "border-adm-border text-adm-muted hover:border-adm-sidebar/40 hover:text-adm-ink",
              ].join(" ")}
            >
              {f.label}
              <span className="ml-1.5 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 space-y-3">
        {rows.map((r) => (
          <li
            key={r.id}
            className="rounded-[14px] border border-adm-border bg-adm-panel p-4 shadow-[0_1px_2px_rgba(51,37,30,0.04)] sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-adm-ink">{r.name}</p>
                <p className="mt-0.5 text-[0.88rem] text-adm-muted">
                  {dateFmt.format(new Date(`${r.date}T00:00:00`))} · {r.time} ·{" "}
                  {r.guests} {r.guests === 1 ? "persona" : "personas"} ·{" "}
                  {r.seating}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.72rem] font-semibold ${chip[r.status]}`}
              >
                {statusLabels[r.status]}
              </span>
            </div>

            {r.note ? (
              <p className="mt-3 border-l-2 border-adm-border pl-3 text-[0.85rem] italic leading-relaxed text-adm-muted">
                {r.note}
              </p>
            ) : null}

            <div className="mt-4 border-t border-adm-border pt-3">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-adm-faint">
                Contacto
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.85rem]">
                {r.phone ? (
                  <>
                    <span className="tabular-nums text-adm-muted">{r.phone}</span>
                    <a
                      href={`https://wa.me/${toDigits(r.phone)}?text=${encodeURIComponent(confirmMessage(r))}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#2f8f45] transition-colors hover:text-[#256f37]"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${toDigits(r.phone)}`}
                      className="font-medium text-adm-ink transition-colors hover:text-adm-sidebar"
                    >
                      Llamar
                    </a>
                  </>
                ) : null}
                {r.email ? (
                  <>
                    <span className="text-adm-muted">{r.email}</span>
                    <a
                      href={`mailto:${r.email}?subject=${encodeURIComponent(
                        "Tu reserva en Pizzeria",
                      )}&body=${encodeURIComponent(confirmMessage(r))}`}
                      className="font-medium text-adm-ink transition-colors hover:text-adm-sidebar"
                    >
                      Email
                    </a>
                  </>
                ) : null}
                {!r.phone && !r.email ? (
                  <span className="text-adm-faint">Sin datos de contacto</span>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {r.status !== "confirmada" ? (
                <Action onClick={() => setStatus(r, "confirmada")}>
                  Confirmar
                </Action>
              ) : null}
              {r.status !== "rechazada" ? (
                <Action onClick={() => setStatus(r, "rechazada")}>Rechazar</Action>
              ) : null}
              {r.status !== "pendiente" ? (
                <Action subtle onClick={() => setStatus(r, "pendiente")}>
                  Volver a pendiente
                </Action>
              ) : null}
            </div>
          </li>
        ))}
        {rows.length === 0 ? (
          <li className="rounded-[14px] border border-dashed border-adm-border p-8 text-center text-[0.9rem] text-adm-faint">
            Sin reservas en este filtro.
          </li>
        ) : null}
      </ul>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-adm-ink px-4 py-2.5 text-[0.85rem] text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function Action({
  children,
  onClick,
  subtle,
}: {
  children: ReactNode;
  onClick: () => void;
  subtle?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors",
        subtle
          ? "text-adm-muted hover:text-adm-ink"
          : "border border-adm-border text-adm-ink hover:border-adm-sidebar hover:text-adm-sidebar",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
