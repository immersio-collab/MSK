"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayer {
  ref: RefObject<Element | null>;
  /** Le tween du calque (yPercent, rotate…) — ease "none" et scrub ajoutés ici. */
  vars: gsap.TweenVars;
}

/**
 * Le scaffold gsap commun des héros : un scrub lié à la section (top top →
 * bottom top) qui fait dériver chaque calque à sa propre vitesse au scroll.
 *
 * `gsap.to` depuis la position naturelle, jamais `fromTo` : si le tween ne
 * part pas, chaque calque reste simplement à sa place — aucun état de départ
 * invisible n'est posé au montage (cf. .agents/rules/scroll-page-composition.md).
 * Avant ce hook, cinq héros recopiaient ce useEffect à l'octet près.
 */
export function useHeroParallax(
  root: RefObject<HTMLElement | null>,
  layers: ParallaxLayer[]
) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scrub = {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      } as const;

      for (const { ref, vars } of layers) {
        if (ref.current) {
          gsap.to(ref.current, { ...vars, ease: "none", scrollTrigger: scrub });
        }
      }
    }, el);

    return () => ctx.revert();
    // Monté une seule fois, comme les useEffect qu'il remplace : les refs sont
    // stables et les vars des littéraux.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
