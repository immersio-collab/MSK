"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The ribbon threading behind the method section, drawn by scroll.
 *
 * Deliberately not `LottieMark`: that one loops on an IntersectionObserver,
 * which is right for the method cards' marks but wrong here — this ribbon has
 * to DRAW as the reader scrolls, so its frame is driven from scroll progress
 * instead of from a clock. It keeps LottieMark's two non-negotiables: lottie-web
 * is imported dynamically, so its ~250KB stays out of the initial bundle, and
 * the instance is destroyed on unmount.
 *
 * The animation is three staggered trim-path strands, so the ribbon builds in
 * layers rather than as a single line.
 *
 * Colours are baked into the JSON — a Lottie cannot inherit `currentColor` —
 * so the palette was rewritten in the file itself. The three strands are
 * msk-coral-400, msk-sun-400 and a msk-blue-500 → msk-blue-300 gradient, each
 * chosen so the section's own text still clears AA where the ribbon passes
 * behind it (coral-500 and darker would not have: 3.97:1 against body copy).
 *
 * If lottie-web never loads, nothing renders and the section simply has no
 * ribbon. That is the one acceptable version of "invisible" — the artwork is
 * decorative and carries no content.
 */
/**
 * The frame at which the ribbon is fully drawn.
 *
 * The composition is 320 frames, but it draws and then ERASES: the band reaches
 * its full length at frame 162 and is wiped back to nothing by frame 300.
 * Scrubbing across the whole timeline therefore left the reader at the end of
 * the section with no ribbon at all. Scroll maps onto the drawing half only, so
 * the last pixel lands exactly as the section finishes.
 *
 * One consequence, deliberate: the third strand's dash is timed to the erase
 * half in the source file, so it never comes into view under this mapping.
 * Retiming it would mean editing the animation, not just its colours.
 */
const DRAW_COMPLETE_FRAME = 162;

export const AccueilStepsRibbon = ({ className }: { className?: string }) => {
  const host = useRef<HTMLDivElement | null>(null);
  const [desktop, setDesktop] = useState(false);

  /*
    Le ruban n'est montré qu'à partir de `lg` — AccueilSteps pose `hidden
    lg:block`. Masquer en CSS ne suffit pas : le composant se monterait quand
    même et mobile paierait lottie-web (~250KB) plus ribbon.json pour un
    élément qu'il n'affiche jamais. Ce garde coupe le chargement à la source.

    `matchMedia` plutôt qu'une simple mesure : la valeur DOIT rester alignée
    sur le breakpoint `lg` de Tailwind (1024px), et l'écouteur rattrape le
    franchissement — rotation d'iPad, fenêtre de bureau redimensionnée — que
    la lecture unique manquerait.
  */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!desktop) return;

    const el = host.current;
    if (!el) return;

    const section = el.closest("section");
    if (!section) return;

    let cancelled = false;
    let anim: AnimationItem | null = null;
    let trigger: ScrollTrigger | null = null;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !host.current) return;

      anim = lottie.loadAnimation({
        container: host.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/accueil/ribbon.json",
        // The comp is a 375x812 portrait and the section is a wide block;
        // stretching is what lets one ribbon span it. The strands are abstract,
        // so the distortion that costs us reads as intended shape.
        rendererSettings: { preserveAspectRatio: "none" },
      });

      anim.addEventListener("DOMLoaded", () => {
        if (cancelled || !anim) return;

        anim.goToAndStop(0, true);
        trigger = ScrollTrigger.create({
          trigger: section,
          // The draw spans exactly the scroll THROUGH the section: nothing is
          // drawn until its top reaches the top of the viewport, and the last
          // frame lands as its bottom comes to rest at the bottom. Starting at
          // "top 75%" meant a quarter of the ribbon was already on screen
          // before the reader had arrived — it never appeared to start at zero.
          //
          // This is the same span the cards stack over, so the ribbon and the
          // deck advance together.
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            anim?.goToAndStop(self.progress * DRAW_COMPLETE_FRAME, true);
          },
        });
      });
    });

    return () => {
      cancelled = true;
      trigger?.kill();
      anim?.destroy();
      anim = null;
    };
  }, [desktop]);

  return <div ref={host} aria-hidden className={className} />;
};
