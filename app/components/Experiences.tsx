"use client";

import { useState } from "react";
import Image from "next/image";
import { experiences } from "../lib/content";
import { Reveal } from "./Reveal";
import { ArrowRight, ChevronDown } from "./icons";

export function Experiences() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="experiences"
      className="scroll-mt-24 bg-mist pb-[var(--spacing-section)]"
    >
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <Reveal className="pt-[var(--spacing-section)]">
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
            Three services, one room
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 sm:mt-16 sm:gap-20">
          {experiences.map((exp, i) => {
            const flip = i % 2 === 1;
            const isOpen = openId === exp.id;
            const panelId = `${exp.id}-panel`;

            return (
              <article
                key={exp.id}
                id={exp.id === "the-cocktail-bar" ? "cocktail-bar" : undefined}
                className="group grid scroll-mt-24 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  as="figure"
                  className={[
                    "relative aspect-square overflow-hidden rounded-[14px] bg-shell ring-1 ring-ink/[0.06]",
                    flip ? "lg:order-2" : "",
                  ].join(" ")}
                >
                  <Image
                    src={exp.image}
                    alt={exp.alt}
                    fill
                    sizes="(min-width: 1024px) 42rem, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 scrim-soft" />
                </Reveal>

                <Reveal
                  delay={0.08}
                  className={flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}
                >
                  <p className="font-sans text-[0.76rem] font-semibold tracking-[0.24em] text-gold">
                    {exp.kicker}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                    {exp.title}
                  </h3>
                  <p className="mt-5 max-w-[42ch] text-[1rem] leading-relaxed text-muted">
                    {exp.body}
                  </p>

                  {/* Accordion */}
                  <div className="mt-7 max-w-[40ch] border-t border-shell pt-5">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : exp.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group/acc flex w-full items-center justify-between gap-4 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-ink-soft transition-colors duration-300 hover:text-gold"
                    >
                      {exp.detail.trigger}
                      <ChevronDown
                        className={[
                          "h-4 w-4 shrink-0 text-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isOpen ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      className={[
                        "overflow-hidden transition-all duration-500 ease-in-out",
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                      ].join(" ")}
                    >
                      <div className="pt-4">
                        <p className="text-[0.92rem] leading-relaxed text-muted">
                          {exp.detail.lead}
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {exp.detail.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-[0.92rem] leading-snug text-ink-soft/90"
                            >
                              <span
                                aria-hidden
                                className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gold"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#reserve"
                    className="mt-7 inline-flex items-center gap-2.5 text-[0.9rem] font-medium tracking-wide text-ocean"
                  >
                    <span className="relative">
                      {exp.link}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ocean/25 transition-colors duration-300 group-hover:bg-ocean/60" />
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </a>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
