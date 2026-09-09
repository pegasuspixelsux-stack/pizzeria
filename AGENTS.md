<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Localization & Language Guidelines

- **Target Language:** Spanish (Uruguay) / español rioplatense. `<html lang="es">`.
- **Grammar:** Use **voseo** ("hacé", "pedí", "disfrutá", "reservá", "contanos")
  — never tuteo ("haz", "pide", "reserva") — in every CTA and direct address.
- **Terminology:** Local vocabulary — "muzzarella" (con doble z), "porción"
  (not "rebanada"), "refrescos" (not "gaseosa"/"soda"), "entradas"/"minutas"
  for appetizers, "para retirar" for takeaway.
- Site copy lives in `app/lib/content.ts`; a few strings are inline in
  `app/components/*` (header CTA, section headings, form labels, image `alt`).
