"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TiltedDuo } from "@/components/motion/TiltedDuo";
import { FadeUp } from "@/components/motion/FadeUp";
import { Reveal } from "@/components/motion/Reveal";
import { RevealWords } from "@/components/motion/RevealWords";
import { MorphButton } from "@/components/motion/MorphButton";

interface StatementSectionProps {
  /** La phrase oversized. */
  heading: ReactNode;
  /** Taille + couleur du titre — le reste de la typo est porté par la section. */
  headingClassName: string;
  paragraph: ReactNode;
  button: { href: string; label: string; fillClassName: string };
  image: { src: string; alt: string };
}

/**
 * Le beat « déclaration » du site : une phrase oversized sur la moitié gauche,
 * copy d'appui + bouton + duo de photos inclinées à droite, stickers SVG
 * auto-animés derrière le titre. Une seule mise en scène — /la-methode et
 * /programmes en déclaraient chacune une copie ligne à ligne.
 */
export const StatementSection = ({
  heading,
  headingClassName,
  paragraph,
  button,
  image,
}: StatementSectionProps) => {
  // `overflow-x-clip`, not `overflow-hidden`: the cat is wider than the column
  // it is anchored in and would otherwise push a horizontal scrollbar onto the
  // whole page on narrow screens. `clip` trims it without making this section a
  // scroll container, which `hidden` would — and a scroll container here would
  // break the sticky and scroll-triggered work elsewhere on the page.
  return (
    // `min-h`, not `h`: the section must fill the screen without exceeding it,
    // and it is the elastic photo cap below that enforces the second half. If
    // content ever outgrew it anyway, the section grows rather than clipping.
    // Padding follows the window instead of a flat 64/80px — at a fixed 80px
    // the section measured 791-820px and overflowed every 720px viewport.
    <section className="flex min-h-[100svh] w-full items-center overflow-x-clip bg-msk-cream-200 py-[clamp(2.5rem,5svh,5rem)]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="flex h-full flex-col justify-center">
          <div className="relative">
            {/* Farandole de mots : la déclaration se pose mot par mot — c'est le
                beat le plus théâtral du site, il porte le mouvement le plus
                théâtral de la boîte. Les stickers SMIL restent statiques : ils
                s'animent déjà tout seuls. */}
            <h2
              className={cn(
                "relative z-20 text-balance font-display font-bold leading-[1.25] tracking-[-0.02em]",
                headingClassName
              )}
            >
              <RevealWords>{heading}</RevealWords>
            </h2>

            {/*
              Decorative marks. Both SVGs animate themselves through SMIL, which
              keeps playing in an `img` and costs no JavaScript — so they stay
              plain `img` rather than `next/image`, whose optimiser would
              flatten the animation out. They sit *behind* the statement (`z-0`
              against the heading's `z-20`) and are anchored outside the text
              block: in front they would land mid-sentence, and the sun in
              particular ate a word whole.
            */}
            <Reveal
              effect="pop"
              delay={0.25}
              className="pointer-events-none absolute -right-10 -top-20 z-0 lg:-right-24 lg:-top-36"
            >
              <img
                src="/methode/sun-cloud.svg"
                alt=""
                aria-hidden
                loading="lazy"
                className="w-40 sm:w-52 lg:w-64"
              />
            </Reveal>
            {/* Bridé sur mobile : à 26rem le chat (416px) débordait d'un écran
                de 375px et pouvait glisser sous le paragraphe suivant en
                empilement 1 colonne. */}
            <Reveal
              effect="pop"
              delay={0.35}
              className="pointer-events-none absolute -bottom-24 -left-16 z-0 sm:-bottom-36 sm:-left-32 lg:-bottom-60 lg:-left-56"
            >
              <img
                src="/methode/running-cat.svg"
                alt=""
                aria-hidden
                loading="lazy"
                className="w-64 sm:w-[34rem] lg:w-[44rem]"
              />
            </Reveal>
          </div>
        </div>

        <div className="flex h-full flex-col justify-center gap-[clamp(1.5rem,3svh,2.5rem)]">
          <FadeUp delay={0.1}>
            <p className="text-lg font-medium leading-relaxed text-msk-night-800">
              {paragraph}
            </p>
          </FadeUp>

          <Reveal effect="pop" delay={0.2} className="w-full sm:w-fit">
            <MorphButton
              href={button.href}
              className="w-full sm:w-fit font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
              fillClassName={button.fillClassName}
            >
              {button.label}
            </MorphButton>
          </Reveal>

          {/*
            Capped, because the duo is the section's height driver: it is a
            10/7 box, so its height tracks the column width and at full width it
            pushed the section past the viewport.

            The cap now tracks the WINDOW, not a flat 34rem. At 34rem the duo
            stood 381px tall whatever the screen, and the section measured
            791-820px — one full screen plus 70-100px on any 720px viewport.
            58svh keeps the original size on a tall monitor and shrinks the
            photos, rather than the copy, on a short laptop.
          */}
          {/* Tampon sur le WRAPPER, jamais sur les cadres : gsap scrubbe déjà
              la rotation des cadres à l'intérieur — deux bibliothèques sur le
              même élément est interdit. Wrapper framer + enfants gsap, chacun
              son élément. */}
          <Reveal
            effect="stamp"
            delay={0.15}
            className="mx-auto mt-4 w-full max-w-[clamp(20rem,58svh,34rem)]"
          >
            <TiltedDuo src={image.src} alt={image.alt} className="w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
