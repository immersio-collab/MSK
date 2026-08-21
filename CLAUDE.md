# MSK Montessori School — working rules

French-language marketing site for an inclusive Montessori therapy/education centre
in Casablanca. Next.js 14 App Router · React 18 · TypeScript (strict) · Tailwind v4.

Every rule below exists because its absence caused a real, shipped defect. The
common thread: **Tailwind and Next fail silently.** A wrong class name is not an
error — it emits no CSS and the page renders unstyled. Assume nothing compiles
until you have seen it in the output.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build — the only real correctness gate
npm run lint     # next lint
npx tsc --noEmit --incremental false   # typecheck without writing tsbuildinfo
```

## Definition of done

Do not report work complete until all four pass:

1. `npm run build` succeeds.
2. `npx tsc --noEmit --incremental false` is clean.
3. Every Tailwind class you wrote appears in the built CSS (see below).
4. No file you added is unreachable from a route.

`npm run dev` succeeding proves almost nothing — dead classes and dead files
are invisible in dev. Before this cleanup `next build` had never been run
in this repo — only `next dev`, which hid every one of these defects.

## Design tokens — the palette is CLOSED

There are exactly five brand families. **Never invent a family, and never use a
shade outside these ranges.** Doing so produces no CSS and the element silently
inherits its parent's colour.

| Family       | Shades available   | Role                                  |
| ------------ | ------------------ | ------------------------------------- |
| `msk-coral`  | 50–900             | primary accent, CTAs, eyebrows        |
| `msk-sun`    | 50–900             | warm secondary accent                 |
| `msk-blue`   | 50–900             | calm accent                           |
| `msk-cream`  | 50, 100, 200, 300  | light neutrals: backgrounds, borders  |
| `msk-night`  | 700, 800, 900, 950 | dark neutrals: headings, body, dark bg|

`msk-cream` has no shade above 300; `msk-night` has none below 700. If you need
a mid-tone neutral, use Tailwind's own `slate-*`, which this codebase already
uses for muted body text.

Names that do **not** exist — never reintroduce them: `msk-forest`, `msk-amber`,
`msk-terracotta`, `msk-slate`, `msk-sand`, `msk-gold`, `msk-dark`, `msk-sage`,
`msk-rose`, `msk-sky`. Hundreds of occurrences across 35 files were removed; none of
them had ever rendered.

Conventions in use: headings `text-msk-night-900`, body `text-msk-night-700` or
`text-slate-600`, eyebrows `text-msk-coral-600`, card borders `border-msk-cream-200`.

## Verifying a class actually compiles

After adding unfamiliar utilities:

```bash
npm run build
grep -rF 'your-class-name' .next/static/css/
```

Beware when grepping built CSS: it is minified to one line (so `grep -c`
returns 1, not a real count) and selectors are escaped — `hover:bg-primary/90`
appears as `.hover\:bg-primary\/90`, and `=` inside arbitrary variants is
escaped as `\=`. Prefer `grep -F` on a distinctive substring.

## Tailwind v4

- **CSS-first. There is no `tailwind.config.ts`** — do not create one. Theme
  tokens live in `@theme` in `app/globals.css`.
- Custom utilities use `@utility name { ... }`, not `@layer utilities`.
- Opacity modifiers work natively on theme tokens; do not hand-roll `color-mix`.
- v4 renamed things: `bg-gradient-to-*` → `bg-linear-to-*`, `outline-none` →
  `outline-hidden`, and the `shadow`/`blur`/`rounded` scales shifted by one step.
- Do not add `autoprefixer`; v4 prefixes internally.

## File placement

```
app/                    routes (App Router)
components/
  ui/                   RESERVED for `shadcn add` output — do not hand-write here
  animate-ui/           RESERVED for the @animate-ui registry — do not hand-edit
  layout/               Navbar, Footer — used by app/layout.tsx
  common/               small cross-route pieces (BrandLogo, ScrollProgressBar)
  motion/               reusable animation/effect primitives
  <route>/              sections for one route: home, contact, programmes, …
lib/                    utils, get-strict-context
lib/data/site-content.ts  shared site copy
hooks/                  shared hooks
```

Rules:

- **`components/ui/` and `components/animate-ui/` are registry-owned.** Anything
  you hand-write there risks being overwritten by `shadcn add`. Hand-written
  components go in `motion/`, `common/`, or a route folder.
- A component used by exactly one route belongs in that route's folder.
  Promote to `motion/` or `common/` only on the second consumer.
- **PascalCase filenames matching the exported component** (`FadeUp.tsx` exports
  `FadeUp`). Registry folders keep their own convention.
- Never name a folder after the library you copied code from. `lightswind/` and
  `magicui/` were removed for this reason; a filename like `skiper52.tsx` that
  exports `MethodHoverExpand` tells a reader nothing.

## Dead code

**Do not create a component without wiring it into a route in the same change.**
1,719 lines across 14 files — roughly a quarter of the codebase — were
unreachable and had to be deleted, several duplicating a live section (`HeroSection` vs the hero inlined
in `app/page.tsx`).

Before finishing, confirm every file you touched is reachable from a route, and
remove imports you stopped using.

## Content and data

`lib/data/site-content.ts` is the source of truth for `NAV_LINKS`,
`PARENT_CONCERNS_FAQ`, and `SCHOOL_INFO`.

**Never redeclare a local constant that shadows one of its exports.**
`MethodSection` and `TestimonialsSection` each defined a local `METHOD_STEPS` /
`TESTIMONIALS`, so edits to the shared file silently changed nothing. Either
import it or don't — never both.

## Routing

Adding a route means updating **three** places, or the page is orphaned:

1. `app/<path>/page.tsx`
2. `NAV_LINKS` in `lib/data/site-content.ts`
3. `app/sitemap.ts`

`/admissions` was live but absent from the nav (unreachable); `/actualites` was
in the nav but absent from the sitemap.

## Fonts

Fonts load via `next/font/google` in `app/layout.tsx` only: DM Sans
(`--font-dm-sans`), Inter (`--font-inter`), Plus Jakarta Sans (`--font-jakarta`).

**Never redeclare a `--font-*` variable in CSS.** `next/font` generates a hashed
family name; a literal `'Plus Jakarta Sans'` in `:root` shadows it and silently
bypasses the self-hosted font. Every heading on the site rendered in the browser
default for exactly this reason.

To add a font: load it in `layout.tsx`, add its `.variable` to the `<html>`
className, and reference the variable — never a literal family name.

## Dependencies

Check for an existing equivalent before adding one. This project shipped both
`framer-motion` and `motion` (the same library, two majors apart) and carried
`gsap` with zero imports.

`framer-motion` remains the default for component-level animation — it has ~27
consumers and every entrance, fade and layout transition on the site uses it.

**`gsap` + `ScrollTrigger` were deliberately reintroduced** (2026-08-21) for
`/notre-centre/la-methode`, where the design calls for scrubbed scroll
timelines and `elastic.out` easing that framer-motion does not express directly.
This is a considered exception, not the earlier accident — unlike then, it has
real consumers. Keep it to scroll-driven work; do not port existing
framer-motion components to it piecemeal, or the codebase ends up with two
half-migrated animation layers.

`lottie-web` renders the JSON marks in `public/methode/lottie`. Import it
dynamically — it is ~250KB and belongs nowhere near the initial bundle.

Removing the last consumer of a package means removing the package.
