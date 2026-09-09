"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SEED_RESERVATIONS, type ReservationRequest } from "../../lib/admin-demo";
import { MenuManager } from "./MenuManager";
import { ReservationsPanel } from "./ReservationsPanel";
import { ConfigPanel } from "./ConfigPanel";

type Tab = "reservas" | "carta" | "config";

const TITLES: Record<Tab, string> = {
  reservas: "Reservas",
  carta: "Carta",
  config: "Configuración",
};

export function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("reservas");
  const [reservations, setReservations] =
    useState<ReservationRequest[]>(SEED_RESERVATIONS);

  const pending = useMemo(
    () => reservations.filter((r) => r.status === "pendiente").length,
    [reservations],
  );

  const navItem = (
    key: Tab,
    opts: { badge?: number; className?: string } = {},
  ) => (
    <button
      key={key}
      type="button"
      onClick={() => setTab(key)}
      className={[
        "flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
        tab === key
          ? "bg-adm-sidebar-deep text-ink"
          : "text-muted/80 hover:bg-adm-sidebar-deep/60 hover:text-ink",
        opts.className ?? "",
      ].join(" ")}
    >
      <span>{TITLES[key]}</span>
      {opts.badge ? (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.7rem] font-bold text-adm-sidebar-deep">
          {opts.badge}
        </span>
      ) : null}
    </button>
  );

  return (
    <div className="flex min-h-dvh bg-adm-bg text-adm-ink">
      {/* Terracotta sidebar — desktop, pinned to the viewport */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-adm-sidebar text-ink md:flex">
        <div className="border-b border-white/10 p-6">
          <p className="font-display text-xl tracking-[-0.01em] text-gold">
            Pizzería · Panel
          </p>
          <p className="mt-1 text-xs text-muted/70">Gestión — maqueta</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItem("reservas", { badge: pending })}
          {navItem("carta")}
          {navItem("config", { className: "mt-auto" })}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-4 text-xs text-muted/70">
          <Link href="/" className="block transition-colors hover:text-ink">
            Ver sitio →
          </Link>
          <p>
            Sesión activa como{" "}
            <span className="font-semibold text-gold">Gerente</span>
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Terracotta bar — mobile */}
        <div className="flex items-center gap-2 overflow-x-auto bg-adm-sidebar px-4 py-3 md:hidden">
          <span className="mr-1 font-display text-gold">Panel</span>
          {(["reservas", "carta", "config"] as Tab[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={[
                "shrink-0 rounded-full px-3 py-1.5 text-[0.8rem] font-medium transition-colors",
                tab === key ? "bg-adm-sidebar-deep text-ink" : "text-muted/80",
              ].join(" ")}
            >
              {TITLES[key]}
              {key === "reservas" && pending > 0 ? ` (${pending})` : ""}
            </button>
          ))}
        </div>

        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-adm-border bg-adm-panel px-6 shadow-[0_1px_2px_rgba(51,37,30,0.04)]">
          <h1 className="font-display text-lg tracking-[-0.01em] text-adm-sidebar">
            {TITLES[tab]}
          </h1>
          <button
            type="button"
            onClick={onSignOut}
            className="rounded-md border border-adm-border bg-adm-bg px-3 py-2 text-xs font-medium text-adm-muted transition-colors hover:bg-adm-border/50 hover:text-adm-ink"
          >
            Cerrar sesión
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-5 rounded-lg border border-dashed border-adm-border px-3.5 py-2.5 text-[0.8rem] text-adm-faint">
            Maqueta — no hay backend. Los cambios se pierden al recargar.
          </div>

          {tab === "reservas" ? (
            <ReservationsPanel
              reservations={reservations}
              onChange={setReservations}
            />
          ) : tab === "carta" ? (
            <MenuManager />
          ) : (
            <ConfigPanel />
          )}
        </main>
      </div>
    </div>
  );
}
