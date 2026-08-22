---
trigger: always_on
---

# Scroll-driven page composition

Patterns established building `/notre-centre/la-methode`. Apply them to any page
with pinned sections, scrubbed sequences, Lottie marks or decorative motion.

Like `working-rules.md`, every rule here exists because its absence produced a
real defect on that page. The recurring theme is different from the Tailwind one:
**motion code fails by leaving things invisible.** An animation that never runs
does not fall back to "unanimated" — it falls back to whatever start state you
stamped on, which is usually `opacity: 0` or `scale: 0`.

## Which library

`gsap` + `ScrollTrigger` for scroll-driven work: scrubbed timelines, pinned
sequences, `elastic.out` easing. `framer-motion` for component-level entrances,
fades and layout transitions — it has ~28 consumers and stays the default.

Do not animate the same element with both. Register plugins once per module
(`gsap.registerPlugin(ScrollTrigger)` at module scope) and wrap every effect in
`gsap.context(...)`, reverting it in the `useEffect` cleanup. Without the context
the triggers survive navigation and stack up.

## Never park the resting state out of sight

The single most repeated bug on that page. Three separate times, an element was
left permanently invisible because its animation could not finish.

`gsap.fromTo(...)` and `gsap.set(...)` apply their start value **at mount**. If
anything then stops the tween — gsap failing to load, an earlier JS error, a
throttled tab — the element is stranded there.

```tsx
// Wrong: stamps scale 0 on immediately. No tween, no cloud.
gsap.fromTo(el, { scale: 0 }, { scale: 1, duration: 1.2 });

// Right: the shrunk state is only applied once the trigger fires.
gsap.from(el, {
  scale: 0,
  duration: 1.2,
  ease: "elastic.out(1, 1)",
  immediateRender: false,
  scrollTrigger: { trigger: el, start: "top bottom" },
});
```

Two corollaries:

- **Above the fold, `immediateRender: false` is not enough.** The trigger fires
  at once, stamps the start value, and still needs the render loop to recover.
  If an element is visible at load and its entrance is decorative, drop the
  entrance rather than risk it.
- **Elements that animate in from off-screen should not also pop.** A cloud
  drifting in from the left edge does not need a scale-up as well; the extra
  tween only adds a way to fail.

The test: **stop the render loop and confirm everything still has a non-zero
box.** `getBoundingClientRect().width > 0` on every animated element, with no
frames having run, is the acceptance criterion.

## Scrubbed sequences

One `ScrollTrigger` per section drives a single `progress`; each item derives its
own local progress from it. Do not give every item its own trigger.

```ts
const local = clamp01((p - i / n) / ((i + WINDOW) / n - i / n));
```

- **Overlap the windows.** `WINDOW = 1.5` slots means consecutive items are
  always mid-handover. At `1.0` the windows butt together and the sequence steps
  item by item instead of flowing.
- **Damp, don't write.** Use `gsap.to(el, { ..., duration: 1, overwrite: "auto" })`
  inside `onUpdate` rather than `gsap.set`. The lag is what makes it feel sprung
  instead of welded to the scrollbar.
- **Measure travel distances, don't copy them.** An exit of `-100%` looked right
  in the reference and left our card visible mid-frame, because the card starts
  centred in a viewport-tall frame and has to clear half the frame *plus* half
  itself. Ours needed `-170%`. Compute it against your own geometry.

## Looping and wrapping motion

- **The wrap seam must be off-screen on both sides.** Sample the element's
  position at the moment local progress crosses 1→0 and assert it is fully
  outside the frame before and after.
- **Leave margin.** Frame + 2× element height put our extremes at *1px* of
  clearance — nothing left for a base offset that is slightly off-centre. Add an
  explicit margin (~120px).
- **Phase, not delay,** to offset parallel loops. A delay stalls the element
  off-screen before its first pass; `tween.progress(phase)` starts it
  mid-crossing. Check the phase actually puts it on screen at load.
- **Recompute spans on resize**, or the wrap distance stops matching the viewport
  and the element starts jumping mid-screen.

## Lottie

Rendered through `lottie-web` — see `MethodeLottie`.

- **Import it dynamically.** ~250KB; it belongs nowhere near the initial bundle.
- **Gate playback on an IntersectionObserver.** Off-screen animations pause
  instead of burning frames. With six on a page this is not optional.
- **Crop the viewBox to the artwork.** Exported canvases are inconsistent — one
  of ours filled 40% of a 2018px canvas while another filled 93% of a 1080px one,
  so at identical box sizes some marks rendered half-size. Sample bounds across
  ~12 frames and union them; a single-frame crop clips whatever moves later.
- **Colours are baked into the JSON.** Unlike inline SVG they will not inherit
  `currentColor`, so the *container* has to be chosen around the art.

## Choosing fills behind baked-colour art

The palette stays closed (see `working-rules.md`). Within it, pick the fill from
what the art is actually painted from:

1. Measure painted area per fill colour, not per path count.
2. **Discard any path whose bounding box exceeds the visible artwork.** Lottie
   exports carry invisible backdrop and mask paths. One measured 4,072,324 px²
   against a visible artwork of 810×604 — weighting it as paint classified a
   yellow-and-red mark as black-dominant and put it on the worst possible fill.
3. Black-dominant art needs a light card; yellow, cream and red need a deep one.
4. Target ≥3:1 area-weighted contrast between mark and card.

## Verifying

Measure, don't eyeball — and make the measurement itself trustworthy.

- **Guard the audit.** If the page did not render, a contrast sweep finds zero
  elements and reports zero failures. That false pass happened here. Assert a
  non-zero section count before reporting anything.
- **Resolve colours through a canvas.** Tailwind v4 emits opacity modifiers as
  `oklab(...)`; a regex expecting `rgb()` parses those as near-black and invents
  failures. Paint the colour into a 1×1 canvas and read the pixel.
- **Composite backgrounds properly** up the ancestor chain, and skip elements
  under `sr-only` or over a gradient — `backgroundColor` is `transparent` for
  `bg-linear-*`, so those measure against white and report nonsense.
- **Console errors survive Fast Refresh.** An error from a half-finished edit
  persists in the buffer and reads as current. Log a marker, reload, and only
  trust what appears after it.
- **Sample per element, not once.** Phase-offset items wrap at different scroll
  positions; testing one item's boundaries against all of them checks nothing.

Note the in-app browser pane on this machine does not run `requestAnimationFrame`,
so no animation can be observed there. Geometry, computed styles and `getBBox`
are reliable; motion is not. Say plainly when behaviour was not observed.

## Responsive

Pinned, scroll-jacked sections are desktop-only. Below `lg` render the same
content as a plain stack and set the pinned column to `display: none` — a
six-card deck is ~370vh of hijacked scrolling, which is hostile on a phone.
Verify the deck is actually `display: none` rather than merely off-screen.

## Outstanding assets

Use `MethodeAssetSlot` for artwork that has not arrived, rather than leaving
gaps. Each slot names what belongs there and its rough size, so the page reads
as intentional and `grep -rn MethodeAssetSlot` lists what is still owed.
