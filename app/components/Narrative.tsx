import { narrative } from "../lib/content";
import { Reveal } from "./Reveal";

export function Narrative() {
  const [head, tail] = narrative.split(", ");

  return (
    <section className="bg-canvas py-[var(--spacing-section-tight)]">
      <div className="mx-auto max-w-[68rem] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[46ch] text-center">
          <p className="font-display text-[clamp(1.8rem,3.8vw,2.85rem)] font-medium leading-[1.2] tracking-[-0.02em] text-pretty text-ink">
            {head}, <span className="italic text-muted">{tail}</span>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-10 w-16">
          <div className="hairline" />
        </Reveal>
      </div>
    </section>
  );
}
