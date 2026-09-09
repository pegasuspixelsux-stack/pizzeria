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
const ORDER: Tab[] = ["reservas", "carta", "config"];

export function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("reservas");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reservations, setReservations] =
    useState<ReservationRequest[]>(SEED_RESERVATIONS);

  const pending = useMemo(
    () => reservations.filter((r) => r.status === "pendiente").length,
    [reservations],
  );

  const go = (t: Tab) => {
    setTab(t);
    setMobileOpen(false);
  };

  const navButtons = (variant: "sidebar" | "sheet") =>
    ORDER.map((key) => (
      <button
        key={key}
        type="button"
        onClick={() => go(key)}
        className={[
          "flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
          tab === key
            ? "bg-adm-sidebar-deep text-ink"
            : "text-muted/80 hover:bg-adm-sidebar-deep/60 hover:text-ink",
          variant === "sidebar" && key === "config" ? "mt-auto" : "",
        ].join(" ")}
      >
        <span>{TITLES[key]}</span>
        {key === "reservas" && pending > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.7rem] font-bold text-adm-sidebar-deep">
            {pending}
          </span>
        ) : null}
      </button>
    ));

  const footer = (
    <div className="shrink-0 space-y-3 border-t border-white/10 p-4">
      <p className="text-xs text-muted/70">
        Sesión activa como{" "}
        <span className="block font-semibold text-gold">Gerente</span>
      </p>
      <Link
        href="/"
        className="block text-xs text-muted/70 transition-colors hover:text-ink"
      >
        Ver sitio →
      </Link>
      <button
        type="button"
        onClick={onSignOut}
        className="w-full rounded-md border border-white/20 bg-adm-sidebar-deep px-3 py-2 text-center text-xs font-medium text-muted transition-colors hover:border-gold hover:text-gold"
      >
        Cerrar sesión
      </button>
    </div>
  );

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-adm-bg text-adm-ink md:flex-row">
      {/* Mobile header with burger */}
      <div className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-adm-sidebar px-4 text-ink md:hidden">
        <div>
          <p className="font-display text-base text-gold">Pizzería · Panel</p>
          <p className="text-[0.65rem] text-muted/70">{TITLES[tab]}</p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          className="p-2 text-ink transition-colors hover:text-gold"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile slide-over menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-adm-sidebar text-ink md:hidden">
          <nav className="flex flex-1 flex-col gap-1 p-4">
            {navButtons("sheet")}
          </nav>
          {footer}
        </div>
      ) : null}

      {/* Desktop terracotta sidebar */}
      <aside className="hidden h-full w-64 shrink-0 flex-col bg-adm-sidebar text-ink md:flex">
        <div className="shrink-0 border-b border-white/10 p-6">
          <p className="font-display text-xl tracking-[-0.01em] text-gold">
            Pizzería · Panel
          </p>
          <p className="mt-1 text-xs text-muted/70">Gestión — maqueta</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navButtons("sidebar")}
        </nav>
        {footer}
      </aside>

      {/* Main */}
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <header className="hidden h-16 shrink-0 items-center border-b border-adm-border bg-adm-panel px-6 shadow-[0_1px_2px_rgba(51,37,30,0.04)] md:flex">
          <h1 className="font-display text-lg tracking-[-0.01em] text-adm-sidebar">
            {TITLES[tab]}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
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
