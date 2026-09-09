import { reviews, reviewsIntro } from "../lib/content";
import { Reveal } from "./Reveal";

export function Reviews() {
  return (
    <section
      id="opiniones"
      className="scroll-mt-24 border-t border-line bg-mist py-[var(--spacing-section)]"
    >
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <Reveal className="max-w-[44ch]">
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
            {reviewsIntro.title}
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-muted">
            {reviewsIntro.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev, i) => (
            <Reveal
              key={rev.author}
              as="figure"
              delay={(i % 3) * 0.06}
              className="flex h-full flex-col justify-between rounded-[14px] border border-line bg-canvas p-6 ring-1 ring-ink/[0.04]"
            >
              <div>
                <div
                  className="text-[0.95rem] tracking-[0.15em] text-gold"
                  aria-label={`${rev.rating} de 5`}
                >
                  <span aria-hidden>{"★".repeat(rev.rating)}</span>
                </div>
                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft/90">
                  «{rev.quote}»
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4 text-[0.8rem]">
                <span className="font-semibold tracking-wide text-gold">
                  {rev.author}
                </span>
                <span className="text-faint">{rev.meta}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
