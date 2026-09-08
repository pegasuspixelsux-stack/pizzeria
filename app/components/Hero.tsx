import Image from "next/image";
import { hero, img } from "../lib/content";
import { ChevronDown, Compass } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-dvh flex-col overflow-hidden bg-mist">
      <div className="absolute inset-0">
        <div className="absolute inset-0 motion-safe:animate-[hero-settle_2s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Image
            src={img.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 scrim-hero" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[84rem] flex-1 flex-col justify-end px-5 pb-24 pt-32 sm:px-8 sm:pb-28 lg:pb-32">
        <p
          className="label-track motion-safe:animate-[line-rise_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: "0.15s" }}
        >
          {hero.place}
        </p>

        <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.7rem,7.6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.022em] text-ink">
          {hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block motion-safe:animate-[line-rise_1s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ animationDelay: `${0.26 + i * 0.11}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="mt-7 max-w-[44ch] text-pretty text-[1.02rem] leading-relaxed text-ink-soft/85 motion-safe:animate-[line-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] sm:text-[1.1rem]"
          style={{ animationDelay: "0.6s" }}
        >
          {hero.subtitle}
        </p>

        <div
          className="mt-10 motion-safe:animate-[line-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: "0.76s" }}
        >
          <a
            href="#experiences"
            className="group inline-flex items-center gap-3 border-b border-ink/25 pb-1.5 text-[0.95rem] font-medium tracking-wide text-ink transition-colors duration-300 hover:border-gold"
          >
            <Compass className="h-[1.15rem] w-[1.15rem] text-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
            {hero.cta}
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <ChevronDown className="h-5 w-5 text-ink/50 motion-safe:animate-[cue-drift_2.4s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
