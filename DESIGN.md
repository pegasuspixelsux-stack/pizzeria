# Pizzeria — Design system

Ground truth for the homepage as built (`app/`). Warm brick editorial — one
room at Punta del Este built around a wood-fired oven, in the oven's own
tones, seen through the three services of a day. Copy is Spanish (Uruguay).

## Tokens

Defined in `app/globals.css` under `@theme`. Use the Tailwind utilities they
generate (`bg-canvas`, `text-ink`, `text-muted`, `border-line`, …).

Surfaces layer terracotta > brick > rust > deep rust, back to front.

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#8b3a2b` | Primary surface — body, cards, nav |
| `mist` | `#7c2d12` | Deeper section tint (Hero, Experiences, Footer) |
| `sand` | `#6b2410` | Reservation section — the form card floats on it |
| `shell` | `#a04735` | Terracotta — image placeholder, disabled control fill |
| `ink` | `#fdfbf7` | Cream — headings, primary text, solid buttons |
| `ink-soft` | `#f0e6da` | Secondary headings, list copy |
| `muted` | `#e5d5c5` | Tan — body / supporting text |
| `faint` | `#d9c6b2` | Dim tan — placeholders, fine print |
| `line` | `#9e5140` | Warm hairline borders, dividers |
| `gold` | `#f5c542` | Accent — brand dot, datelines, chevrons, hairlines, focus |
| `gold-soft` | `#ffd166` | Sunburst — gold hover / lighter accent |
| `ocean` | `#ffd166` | Interactive — text links, active form controls, focus ring |
| `ocean-deep` | `#f5c542` | Link / control hover |

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
(centred interlude) · `Experiences` (el mediodía / la cena / el bar as
alternating image/text rows + accordions) · `Atmosphere` (split image/text) ·
`Reviews` (3-col quote cards on mist) · `Reservation` (static form, card on
sand) · `SiteFooter` (multi-column + hours). Max content width `84rem`; nav
links smooth-scroll to section ids.

## Notes

- All content is static; the reservation form does not submit (see
  `app/lib/content.ts`).
- Contact details, hours and menu items are plausible placeholders for a
  Neapolitan pizzeria in Punta del Este — replace before production.
- Imagery is Unsplash; photo IDs and the swap list are documented at the top of
  `app/lib/content.ts`.
