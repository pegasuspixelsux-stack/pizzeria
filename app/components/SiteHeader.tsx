"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav } from "../lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
          solid
            ? "border-b border-line/70 bg-canvas/80 backdrop-blur-md shadow-[0_1px_20px_-12px_rgba(15,23,42,0.25)]"
            : "border-b border-transparent bg-transparent backdrop-blur-0",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[84rem] items-center justify-between px-5 sm:px-8 lg:h-20">
          <a
            href="#top"
            className={[
              "font-display text-[1.35rem] leading-none tracking-[-0.01em] transition-colors duration-500 lg:text-[1.5rem]",
              solid ? "text-ink" : "text-ink",
            ].join(" ")}
          >
            Trattoria<span className="text-gold">.</span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-1 text-[0.82rem] font-medium tracking-wide text-ink-soft/80 transition-colors duration-300 hover:text-ink"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#reserve"
              className="hidden rounded-full border border-ink/20 px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide text-ink transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink hover:bg-ink hover:text-canvas sm:inline-block"
            >
              Reserve a Table
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={[
                    "absolute left-0 block h-px w-full bg-ink transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-1.5 block h-px w-full bg-ink transition-all duration-300",
                    open ? "-rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 block h-px w-full bg-ink transition-all duration-300",
                    open ? "top-1.5 opacity-0" : "top-3",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-canvas/95 backdrop-blur-md md:hidden"
          >
            <nav className="mx-auto flex max-w-[84rem] flex-col px-5 py-4 sm:px-8">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-display text-xl text-ink last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#reserve"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold tracking-wide text-canvas"
              >
                Reserve a Table
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
