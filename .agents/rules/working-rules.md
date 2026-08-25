---
trigger: always_on
---

# MSK Montessori School — working rules

**Single source: read `CLAUDE.md` at the repo root.** This file used to be a
full copy of it; the two drifted, so it is now a pointer plus the always-on
essentials.

- The palette is CLOSED: only `msk-coral`/`msk-sun`/`msk-blue` (50–900),
  `msk-cream` (50–300), `msk-night` (700–950). A wrong class silently emits no
  CSS.
- Typecheck with `npx tsc --noEmit --incremental false`. Do NOT run `npm run build` after every change — only run a build when strictly necessary or explicitly requested. The dev server (`npm run dev`) handles hot reload during development.
- Reuse the shared primitives (Eyebrow, MorphButton, FadeUp, NextStepSection,
  MediaBand, StatementSection, PolaroidCard, useHeroParallax, lib/motion)
  before writing new markup; facts live once in `lib/data/`.
- A new route = page + `NAV_LINKS` + `app/sitemap.ts` + `ROUTE_PALETTES`.
- Scroll-driven sections follow `scroll-page-composition.md` in this folder.
- If a clearly right change contradicts a rule, make the change and update the
  rule in the same commit.
