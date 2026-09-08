import Image from "next/image";
import { atmosphere, img } from "../lib/content";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./icons";

export function Atmosphere() {
  return (
    <section
      id="atmosphere"
      className="scroll-mt-24 border-t border-line bg-canvas"
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <Reveal
          as="figure"
          className="relative min-h-[64vw] overflow-hidden bg-shell sm:min-h-[46vw] lg:min-h-[40rem]"
        >
          <Image
            src={img.atmosphere}
            alt="Morning light over a calm shoreline, gulls low over the water."
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-canvas/85 lg:to-canvas" />
        </Reveal>

        <div className="flex items-center px-5 py-[var(--spacing-section)] sm:px-8 lg:px-16">
          <Reveal className="max-w-[44ch]">
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
              {atmosphere.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div className="mt-8 space-y-5">
              {atmosphere.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="text-[1rem] leading-relaxed text-muted"
                >
                  {p}
                </p>
              ))}
            </div>
            <a
              href="#reserve"
              className="group mt-10 inline-flex items-center gap-2.5 border-b border-ink/25 pb-1.5 text-[0.92rem] font-medium tracking-wide text-ink transition-colors duration-300 hover:border-gold"
            >
              {atmosphere.cta}
              <ArrowRight className="h-4 w-4 text-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
