"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEMO_CREDENTIALS } from "../../lib/admin-demo";

const BG =
  "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=1600&q=80&auto=format&fit=crop";

const field =
  "mt-2 w-full rounded-[10px] border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-white/35 focus:border-gold-soft";
const label =
  "block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted/80";

export function AdminLogin({ onSignIn }: { onSignIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [hint, setHint] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password;
    if (ok) onSignIn();
    else setError(true);
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-canvas">
      <Image src={BG} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2a140d]/55 via-[#2a140d]/55 to-[#2a140d]/85" />

      <div className="relative z-10 ml-auto flex min-h-dvh w-full flex-col justify-center bg-[#1f0f0a]/70 px-6 py-16 backdrop-blur-md sm:px-10 md:w-[48%] md:max-w-[36rem] md:bg-[#1f0f0a]/80 md:px-14">
        <Link
          href="/"
          className="text-[0.82rem] text-muted/70 transition-colors hover:text-ink"
        >
          ← Volver al sitio
        </Link>

        <div className="mt-10">
          <p className="font-display text-2xl tracking-[-0.01em] text-ink">
            Pizzeria<span className="text-gold">.</span>
          </p>
          <h1 className="mt-5 font-display text-[2rem] font-medium leading-tight tracking-[-0.02em] text-ink">
            Panel de gestión
          </h1>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-muted/85">
            Carta y reservas. Maqueta para la propuesta — sin backend, los
            cambios no se guardan.
          </p>
        </div>

        <form onSubmit={submit} className="mt-8">
          <label className={label} htmlFor="admin-email">
            Correo
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            className={field}
            placeholder="admin@pizzeria.uy"
            required
          />

          <label className={`${label} mt-5`} htmlFor="admin-pass">
            Contraseña
          </label>
          <input
            id="admin-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={field}
            placeholder="••••••••"
            required
          />

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setHint((v) => !v)}
              className="text-[0.8rem] text-muted/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-ink"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {hint ? (
            <p className="mt-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3.5 py-3 text-[0.8rem] leading-relaxed text-muted/85">
              En la versión final, la recuperación es por correo. En esta maqueta
              usá el acceso de muestra de abajo.
            </p>
          ) : null}

          <div
            className="mt-3 min-h-[1.1rem] text-[0.82rem] text-[#f0a789]"
            aria-live="polite"
          >
            {error ? "Correo o contraseña incorrectos." : ""}
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-ink px-5 py-3 text-[0.85rem] font-semibold tracking-wide text-[#2a140d] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 rounded-[10px] border border-dashed border-white/15 px-3.5 py-3 text-[0.8rem] leading-relaxed text-muted/60">
          Acceso de muestra —{" "}
          <span className="text-muted">{DEMO_CREDENTIALS.email}</span> /{" "}
          <span className="text-muted">{DEMO_CREDENTIALS.password}</span>
        </p>
      </div>
    </main>
  );
}
