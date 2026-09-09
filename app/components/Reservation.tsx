"use client";

import { useId, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { contact, reservation } from "../lib/content";
import { ChevronDown } from "./icons";

const fieldBase =
  "peer w-full appearance-none border-0 border-b border-line bg-transparent px-0 py-3 text-[0.98rem] text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-ocean";

const labelBase =
  "block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted";

export function Reservation() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: "",
    seating: reservation.seatings[0],
    name: "",
  });
  const [sent, setSent] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const ready =
    form.date !== "" &&
    form.time !== "" &&
    form.guests !== "" &&
    form.name.trim() !== "";

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSent(false);
  };

  return (
    <section
      id="reserve"
      className="scroll-mt-24 border-t border-line bg-sand py-[var(--spacing-section)]"
    >
      <div className="mx-auto grid max-w-[84rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1fr] lg:gap-20">
        <div className="max-w-[34ch]">
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
            {reservation.title}
          </h2>
          <p className="mt-6 text-[1rem] leading-relaxed text-muted">
            {reservation.lede}
          </p>
          <p className="mt-8 border-l-2 border-gold/50 pl-4 text-[0.85rem] leading-relaxed text-faint">
            {reservation.note}
          </p>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
              O llamá al salón
            </p>
            <a
              href={contact.phoneHref}
              className="mt-2 inline-block font-display text-2xl tracking-[-0.01em] text-ink transition-colors duration-300 hover:text-ocean"
            >
              {contact.phoneLabel}
            </a>
            <p className="mt-1 text-[0.85rem] text-muted">
              Península · Maldonado · Solanas
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (ready) setSent(true);
          }}
          className="rounded-[16px] border border-line bg-canvas p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.28)] sm:p-9"
        >
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            <div>
              <label className={labelBase} htmlFor={`${uid}-date`}>
                Fecha
              </label>
              <input
                id={`${uid}-date`}
                type="date"
                min={today}
                value={form.date}
                onChange={(e) => set("date")(e.target.value)}
                className={fieldBase}
                required
              />
            </div>

            <SelectField
              id={`${uid}-time`}
              label="Hora"
              value={form.time}
              placeholder="Elegí un horario"
              options={reservation.times}
              onChange={set("time")}
            />

            <SelectField
              id={`${uid}-guests`}
              label="Personas"
              value={form.guests}
              placeholder="¿Cuántos?"
              options={reservation.guests}
              onChange={set("guests")}
            />

            <div>
              <span className={labelBase}>Ubicación</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {reservation.seatings.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("seating")(s)}
                    aria-pressed={form.seating === s}
                    className={[
                      "rounded-full border px-3.5 py-1.5 text-[0.8rem] transition-colors duration-300",
                      form.seating === s
                        ? "border-ocean bg-ocean/[0.07] text-ocean"
                        : "border-line text-muted hover:border-ink/30 hover:text-ink",
                    ].join(" ")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={labelBase} htmlFor={`${uid}-name`}>
                Nombre
              </label>
              <input
                id={`${uid}-name`}
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="El nombre para la mesa"
                className={fieldBase}
                required
              />
            </div>
          </div>

          <div className="mt-9 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="min-h-[1.25rem] text-[0.85rem] text-muted"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {sent && (
                  <motion.span
                    key="ack"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 text-ocean"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Anotado, {form.name.trim().split(" ")[0]} — la maqueta
                    termina acá.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={!ready}
              className="rounded-full bg-ink px-7 py-3 text-[0.85rem] font-semibold tracking-wide text-canvas transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] enabled:hover:-translate-y-0.5 enabled:hover:bg-ink-soft enabled:hover:shadow-[0_16px_36px_-16px_rgba(15,23,42,0.5)] disabled:cursor-not-allowed disabled:bg-shell disabled:text-muted"
            >
              Pedir esta mesa
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function SelectField({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label className={labelBase} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className={`${fieldBase} pr-7 ${value === "" ? "text-faint" : ""}`}
      >
        <option value="" disabled className="bg-[#2b1710] text-faint">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#2b1710] text-[#fdfbf7]">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 top-[2.6rem] h-4 w-4 text-muted peer-focus:text-ocean" />
    </div>
  );
}
