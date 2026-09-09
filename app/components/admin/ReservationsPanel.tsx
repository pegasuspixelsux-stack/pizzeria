"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  statusLabels,
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
  pendiente: "border-gold/50 bg-gold/15 text-gold",
  confirmada: "border-[#7FB37E]/50 bg-[#7FB37E]/15 text-[#8fca8c]",
  rechazada: "border-line bg-mist text-faint",
};

const dateFmt = new Intl.DateTimeFormat("es-UY", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

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
    onChange(
      reservations.map((x) => (x.id === r.id ? { ...x, status } : x)),
    );
    if (status === "confirmada" || status === "rechazada") {
      setToast(
        `Aviso ${status === "confirmada" ? "de confirmación" : "de rechazo"} enviado a ${r.name}.`,
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
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-muted hover:border-ink/40 hover:text-ink",
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
            className="rounded-[14px] border border-line bg-mist/40 p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{r.name}</p>
                <p className="mt-0.5 text-[0.88rem] text-muted">
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
              <p className="mt-3 border-l-2 border-line pl-3 text-[0.85rem] italic leading-relaxed text-muted">
                {r.note}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {r.status !== "confirmada" ? (
                <Action onClick={() => setStatus(r, "confirmada")}>
                  Confirmar
                </Action>
              ) : null}
              {r.status !== "rechazada" ? (
                <Action onClick={() => setStatus(r, "rechazada")}>
                  Rechazar
                </Action>
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
          <li className="rounded-[14px] border border-dashed border-line p-8 text-center text-[0.9rem] text-faint">
            Sin reservas en este filtro.
          </li>
        ) : null}
      </ul>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-ink px-4 py-2.5 text-[0.85rem] text-canvas shadow-lg">
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
          ? "text-muted hover:text-ink"
          : "border border-line text-ink hover:border-ink",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
