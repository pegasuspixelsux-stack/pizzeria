# Trattoria — Design system

Ground truth for the homepage as built (`app/`). Light, airy coastal editorial —
one bright room at Punta del Este seen through the three lights of a day.

## Tokens

Defined in `app/globals.css` under `@theme`. Use the Tailwind utilities they
generate (`bg-canvas`, `text-ink`, `text-muted`, `border-line`, …).

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#ffffff` | Page + card surface |
| `mist` | `#f7f9fc` | Alternating section background (Experiences, Footer) |
| `sand` | `#eff3f8` | Reservation section background |
| `shell` | `#e6ecf3` | Image placeholder, disabled control fill |
| `ink` | `#0f172a` | Headings, primary text, solid buttons |
| `ink-soft` | `#1e293b` | Secondary headings, list copy |
| `muted` | `#64748b` | Body / supporting text |
| `faint` | `#94a3b8` | Placeholders, fine print |
| `line` | `#e2e8f0` | Hairline borders, dividers |
| `gold` | `#c29b38` | Fine accent — brand dot, datelines, chevrons, hairlines, focus fallback |
| `gold-soft` | `#d8b866` | Gold hover / lighter accent |
| `ocean` | `#0e5a76` | Text links, active form controls, focus ring |
| `ocean-deep` | `#0b475e` | Link hover |

Spacing rhythm: `--spacing-section` (`clamp(4.5rem, 10vw, 8.5rem)`) between
major sections; `--spacing-section-tight` for the narrative interlude.
Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)` (exponential out).

## Type

- **Display** — Playfair Display (`font-display`), variable, medium (500).
  Tracking `-0.022em` at hero scale, `-0.02em` elsewhere. Hero clamps to
  `5.5rem`; section headings to ~`3.1rem`.
- **Body / UI** — Plus Jakarta Sans (`font-sans`). Body `1rem`/relaxed,
  `muted`. Small-caps markers: `0.7–0.76rem`, weight 600, tracking `0.18–0.3em`,
  uppercase — used only for datelines and time ranges that carry real
  information, never as decorative kickers above a heading.
- Both self-hosted via `next/font/google` in `app/layout.tsx`.

## Surfaces & motion

- **Nav** (`SiteHeader`) — fixed; transparent over the hero, transitioning to
  `bg-canvas/80 backdrop-blur-md` with a `border-line` hairline and a faint
  shadow past 24px scroll. Ink text, gold brand dot, outline Reserve pill.
- **Photography** — full-bleed, under pale daylight gradients (`.scrim-hero`,
  `.scrim-soft`), never dark vignettes. Experience images: rounded `14px`,
  `ring-1 ring-ink/[0.06]`, `bg-shell` placeholder, hover `scale-[1.04]`.
- **Hero entrance** — CSS keyframes only (`hero-settle`, `line-rise`): image
  settles from `scale(1.08)`, headline lines rise in stagger. Visible without
  JS; disabled under `prefers-reduced-motion`.
- **Scroll reveal** (`Reveal`) — IntersectionObserver, content visible by
  default, only below-the-fold elements ease up 16px once. No layout dependency
  on JS.
- **Accordions** (`Experiences`) — one open at a time, `max-h` transition
  (`max-h-0` → `max-h-96`, 500ms), chevron rotates 180°.
- Browser surfaces (selection, scrollbar, focus ring) themed from the palette
  in `app/globals.css`.

## Layout

`app/page.tsx` composes: `SiteHeader` · `Hero` (full viewport) · `Narrative`
(centred interlude) · `Experiences` (alternating image/text rows + accordions) ·
`Atmosphere` (split image/text) · `Reservation` (static form, white card on
sand) · `SiteFooter` (multi-column + hours). Max content width `84rem`; nav
links smooth-scroll to section ids.

## Notes

- All content is static; the reservation form does not submit (see
  `app/lib/content.ts`).
- Contact details, hours and menu items are plausible placeholders for Punta
  del Este — replace before production.
- Imagery is Unsplash; photo IDs and the swap list are documented at the top of
  `app/lib/content.ts`.
