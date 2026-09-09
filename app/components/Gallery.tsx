import Image from "next/image";
import { gallery, galleryIntro } from "../lib/content";
import { Reveal } from "./Reveal";

const SPAN: Record<(typeof gallery)[number]["size"], string> = {
  hero: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-2",
  wide: "col-span-2 row-span-1",
  square: "col-span-1 row-span-1",
};

export function Gallery() {
  return (
    <section
      id="galeria"
      className="scroll-mt-24 border-t border-line bg-canvas py-[var(--spacing-section)]"
    >
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[44ch] text-center">
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
            {galleryIntro.title}
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-muted">
            {galleryIntro.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[42vw] grid-cols-2 gap-3 sm:mt-16 sm:auto-rows-[13rem] md:auto-rows-[12rem] md:grid-cols-4 md:gap-4 md:[grid-auto-flow:dense]">
          {gallery.map((item, i) => (
            <Reveal
              key={item.src}
              as="figure"
              delay={(i % 3) * 0.06}
              className={`group relative overflow-hidden rounded-[14px] bg-shell ring-1 ring-ink/[0.06] ${SPAN[item.size]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 42rem, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[0.82rem] font-semibold tracking-wide text-[#fdfbf7]">
                  {item.alt}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
