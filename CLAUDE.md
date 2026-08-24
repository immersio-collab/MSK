# MSK Montessori School — working rules

French-language marketing site for an inclusive Montessori therapy/education
centre in Casablanca. Next.js 14 App Router · React 18 · TypeScript (strict) ·
Tailwind v4.

Rewritten 2026-08-24 after a full audit + refactor (dead code removed, assets
quarantined, shared primitives extracted). The founding lesson stands:
**Tailwind and Next fail silently.** A wrong class name is not an error — it
emits no CSS and the element silently inherits its parent's colour. Assume
nothing compiles until you have seen it in the output.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build — the only real correctness gate
npm run lint     # ESLint (config: .eslintrc.json, next/core-web-vitals)
npx tsc --noEmit --incremental false   # typecheck without writing tsbuildinfo
```

Run `npm run build` and the typecheck freely to verify work — the owner has
explicitly authorized automatic builds. If the dev server is running, expect a
transient `ENOENT` while `.next/` is rewritten; restart the dev server after.

**Rules serve the work, not the reverse** (owner's instruction): when a change
is clearly right but contradicts a rule in this file, make the change AND
update the rule in the same commit — don't stop to ask.

## Definition of done

1. `npm run build` succeeds.
2. `npx tsc --noEmit --incremental false` is clean.
3. Every Tailwind class you wrote appears in the built CSS (see below).
4. No file you added is unreachable from a route.

`npm run dev` succeeding proves almost nothing — dead classes and dead files
are invisible in dev.

## Design tokens — the palette is CLOSED

Exactly five brand families, defined in `@theme` in `app/globals.css`.
**Never invent a family, never use a shade outside these ranges** — the class
silently emits no CSS.

| Family       | Shades available   | Role                                  |
| ------------ | ------------------ | ------------------------------------- |
| `msk-coral`  | 50–900             | primary accent, CTAs, eyebrows        |
| `msk-sun`    | 50–900             | warm secondary accent                 |
| `msk-blue`   | 50–900             | calm accent                           |
| `msk-cream`  | 50, 100, 200, 300  | light neutrals: backgrounds, borders  |
| `msk-night`  | 700, 800, 900, 950 | dark neutrals: headings, body, dark bg|

`msk-cream` has no shade above 300; `msk-night` none below 700 (a
`border-msk-night-200` shipped once — it rendered nothing). Mid-tone neutrals:
Tailwind's own `slate-*`.

Names that do **not** exist — never reintroduce: `msk-forest`, `msk-amber`,
`msk-terracotta`, `msk-slate`, `msk-sand`, `msk-gold`, `msk-dark`, `msk-sage`,
`msk-rose`, `msk-sky`.

Conventions: headings `text-msk-night-900`, body `text-msk-night-700` or
`text-slate-600`, eyebrows via the `Eyebrow` component, card borders
`border-msk-cream-200`.

## Verifying a class actually compiles

```bash
npm run build
grep -rF 'your-class-name' .next/static/css/
```

Built CSS is minified to one line (`grep -c` returns 1, not a count) and
selectors are escaped (`hover:bg-x/90` → `.hover\:bg-x\/90`). Prefer `grep -F`
on a distinctive substring.

## Tailwind v4

- **CSS-first. There is no `tailwind.config.ts`** — do not create one. Tokens
  live in `@theme` in `app/globals.css`; custom utilities use `@utility`.
- Opacity modifiers work natively on theme tokens; no hand-rolled `color-mix`.
- v4 renames: `bg-gradient-to-*` → `bg-linear-to-*`, `outline-none` →
  `outline-hidden`; the `shadow`/`blur`/`rounded` scales shifted one step.
- Do not add `autoprefixer`.

## File placement

```
app/                    routes (App Router) + icon.svg + opengraph-image.jpg
components/
  ui/                   RESERVED for `shadcn add` output (currently empty)
  animate-ui/           RESERVED for the @animate-ui registry (currently empty)
  layout/               Navbar, Footer
  common/               shared UI: Eyebrow, MediaBand, StatementSection,
                        PolaroidCard, AssetSlot, FaqSection, NextStepSection,
                        BrandLogo, PageTransition, ScrollProgressBar,
                        WhatsAppFloatingButton
  motion/               animation primitives: FadeUp, MorphButton, CloudDrift,
                        LottieMark, TiltedDuo
  <route>/              sections for ONE route: accueil, actualites, contact,
                        fondatrice (→ /notre-centre/la-fondatrice), galerie,
                        methode, programmes, troubles
hooks/                  use-hero-parallax
lib/                    utils, motion (sticker tilt/spring kit)
lib/data/               site-content, faq, troubles, actualites, galerie,
                        methode-steps, programmes
public/                 live assets only
public/_unused/         quarantined assets referenced by nothing — check here
                        before adding a new asset; move files back out to use
                        them, and move newly-orphaned files in
```

Rules:

- **`components/ui/` and `components/animate-ui/` are registry-owned.**
  Hand-written components go in `common/`, `motion/`, or a route folder.
- One consumer → the route's folder. Promote to `common/`/`motion/` on the
  SECOND consumer — and do promote: four `Methode*` primitives once accreted
  15, 8, 2 and 2 cross-route consumers before being moved.
- Route folder names mirror the route's last segment; `fondatrice/` serves
  `/notre-centre/la-fondatrice`.
- **PascalCase filenames matching the exported component.** A file must export
  a component of its own name.

## Reuse the shared primitives — do not re-create them

The audit found the same blocks re-implemented per page. These now exist once;
reach for them before writing new markup:

- **`Eyebrow`** — every section label/pill (was hand-written ~40 times).
- **`MorphButton`** — every CTA button/pill. No raw `Link + rounded-full`.
- **`FadeUp`** — entrances; `mode="mount"` for above-the-fold heroes.
- **`NextStepSection`** — the closing CTA band of every page.
- **`MediaBand`** — full-width slanted photo band.
- **`StatementSection`** — oversized statement + copy + TiltedDuo.
- **`PolaroidCard`** — white-framed tilted photo card (figure or button).
- **`useHeroParallax`** — the gsap scrub scaffold of every hero.
- **`lib/motion`** — `STICKER_TILTS`, `SPRING`, `useTilt`.

Facts live in `lib/data/`, once: programme ages/profils (`programmes.ts`), the
six method steps (`methode-steps.ts`), school identity incl. the WhatsApp link
(`site-content.ts` → `SCHOOL_INFO.whatsapp` — still a placeholder number).
**Never redeclare a local constant that shadows a `lib/data` export.**
Surface-specific presentation (colours, tilts, per-page copy) stays local.

## Content and data

`lib/data/site-content.ts` is the source of truth for `NAV_LINKS`,
`PARENT_CONCERNS_FAQ`, `VIRTUAL_TOUR`, `SCHOOL_INFO`. The FAQ file's header
lists claims the site must never make (placeholder phone, no form backend, no
tour embed) — read it before writing copy.

All images are local (`public/`); no hotlinked remote images —
`next.config.mjs` has no remotePatterns. Testimonial "videos" are deliberate
placeholders (`src: null` + a poster photo) until real footage exists.

## Routing

Adding a route means updating **three** places, or the page is orphaned:

1. `app/<path>/page.tsx`
2. `NAV_LINKS` in `lib/data/site-content.ts`
3. `app/sitemap.ts`

Plus: give the route its palette in `PageTransition`'s `ROUTE_PALETTES`.
There is deliberately no `/admissions` route — admissions links point to
`/contact`. If the page is ever built, its FAQ (`FAQ_ADMISSIONS`) and four
quarantined Lotties (`_unused/methode-lottie/{dialog,card7,card8,star}.json`)
are waiting.

## Fonts

Loaded via `next/font/google` in `app/layout.tsx` only: DM Sans, Inter,
Plus Jakarta Sans, Fredoka. **Never redeclare a `--font-*` variable in CSS** —
a literal family name shadows the hashed `next/font` family and silently
bypasses self-hosting. To add a font: load it in `layout.tsx`, add its
`.variable` to `<html>`, reference the variable.

## Scroll-driven pages

Pages with pinned sections, scrubbed sequences, Lottie marks or decorative
motion follow `.agents/rules/scroll-page-composition.md`. Read it before
touching that kind of section. Its comment discipline is deliberate: scroll
files carry dense why-comments (measured constants, contrast ratios, silent-
failure fallbacks). Keep those; what gets deleted on sight is decorative
separators, comments narrating the JSX, and history of removed code.

## Dependencies

Check for an existing equivalent before adding one. Current animation split:

- **framer-motion** — the default for component-level animation (~23 files).
- **gsap + ScrollTrigger** — scroll-scrubbed work across the heros and
  scroll-driven sections (13 files, 6 routes; mostly via `useHeroParallax`).
  This wider-than-la-methode scope is blessed as of 2026-08-24. Never animate
  the SAME element with both libraries.
- **lottie-web** — only ever loaded dynamically (see `LottieMark`); it is
  ~250KB and belongs nowhere near the initial bundle.

**Removing the last consumer of a package means removing the package** (this
cleanup dropped `radix-ui`, `react-countup`, `react-photo-album`).
