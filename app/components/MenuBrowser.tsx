"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MENU_DATA,
  categoryLabels,
  categoryOrder,
  formatPrice,
  sectionLabels,
  sectionOrder,
  type MenuItem,
} from "../lib/menu";
import { ChevronDown } from "./icons";

type Section = MenuItem["tags"][number];

function groupsFor(tag: Section) {
  const list = MENU_DATA.filter(
    (m) => m.published !== false && m.tags.includes(tag),
  );
  return categoryOrder
    .map((cat) => ({ cat, items: list.filter((m) => m.category === cat) }))
    .filter((g) => g.items.length > 0);
}

export function MenuBrowser() {
  const [open, setOpen] = useState<Section | null>("lunch");

  return (
    <div className="border-y border-line">
      {sectionOrder.map((tag) => {
        const groups = groupsFor(tag);
        const count = groups.reduce((n, g) => n + g.items.length, 0);
        const isOpen = open === tag;
        const panelId = `menu-${tag}`;

        return (
          <section
            key={tag}
            className="border-b border-line last:border-0"
          >
            <h2>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : tag)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-300 hover:text-gold"
              >
                <span className="font-display text-[clamp(1.5rem,3.6vw,2.1rem)] font-medium tracking-[-0.02em] text-ink">
                  {sectionLabels[tag]}
                </span>
                <span className="flex items-center gap-4">
                  <span className="text-[0.72rem] font-semibold tracking-[0.2em] text-gold">
                    {count} {count === 1 ? "PLATO" : "PLATOS"}
                  </span>
                  <ChevronDown
                    className={[
                      "h-5 w-5 shrink-0 text-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </span>
              </button>
            </h2>

            <div
              id={panelId}
              role="region"
              className={[
                "overflow-hidden transition-all duration-500 ease-in-out",
                isOpen ? "max-h-[600rem] opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
            >
              <div className="space-y-10 pb-12">
                {groups.map((g) => (
                  <div key={g.cat}>
                    <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold">
                      {categoryLabels[g.cat]}
                    </h3>
                    <ul className="mt-4 divide-y divide-line/60">
                      {g.items.map((item) => (
                        <li key={item.id} className="flex gap-4 py-4">
                          {item.image ? (
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-shell ring-1 ring-ink/[0.06] sm:h-20 sm:w-20">
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>
                          ) : null}
                          <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                            <div className="max-w-[52ch]">
                              <p className="font-medium text-ink">
                                {item.name}
                                {item.unit ? (
                                  <span className="ml-2 text-[0.82rem] text-faint">
                                    {item.unit}
                                  </span>
                                ) : null}
                              </p>
                              {item.description ? (
                                <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                                  {item.description}
                                </p>
                              ) : null}
                            </div>
                            <p className="shrink-0 tabular-nums text-ink-soft">
                              {formatPrice(item.price)}
                              {item.priceSecondary ? (
                                <span className="text-muted">
                                  {" / "}
                                  {formatPrice(item.priceSecondary)}
                                </span>
                              ) : null}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
