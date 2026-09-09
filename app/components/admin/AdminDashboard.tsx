"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { SEED_RESERVATIONS, type ReservationRequest } from "../../lib/admin-demo";
import { MenuManager } from "./MenuManager";
import { ReservationsPanel } from "./ReservationsPanel";

type Tab = "carta" | "reservas";

export function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("reservas");
  const [reservations, setReservations] =
    useState<ReservationRequest[]>(SEED_RESERVATIONS);

  const pending = useMemo(
    () => reservations.filter((r) => r.status === "pendiente").length,
    [reservations],
  );

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[72rem] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl tracking-[-0.01em]">
              Pizzeria<span className="text-gold">.</span>
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
              Panel
            </span>
          </div>
          <div className="flex items-center gap-4 text-[0.82rem]">
            <Link
              href="/"
              className="text-muted transition-colors hover:text-ink"
            >
              Ver sitio
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-full border border-line px-3.5 py-1.5 font-medium text-ink transition-colors hover:border-ink"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[72rem] px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-2 rounded-[10px] border border-dashed border-line px-3.5 py-2.5 text-[0.8rem] text-faint">
          Maqueta — no hay backend. Los cambios se pierden al recargar.
        </div>

        <nav className="mt-6 flex gap-1 border-b border-line">
          <TabButton active={tab === "reservas"} onClick={() => setTab("reservas")}>
            Reservas
            {pending > 0 ? (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.7rem] font-bold text-[#3a1a10]">
                {pending}
              </span>
            ) : null}
          </TabButton>
          <TabButton active={tab === "carta"} onClick={() => setTab("carta")}>
            Carta
          </TabButton>
        </nav>

        <div className="mt-8">
          {tab === "reservas" ? (
            <ReservationsPanel
              reservations={reservations}
              onChange={setReservations}
            />
          ) : (
            <MenuManager />
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "-mb-px flex items-center border-b-2 px-4 py-3 text-[0.9rem] font-medium transition-colors",
        active
          ? "border-gold text-ink"
          : "border-transparent text-muted hover:text-ink",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
