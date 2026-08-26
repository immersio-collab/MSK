"use client";

import React, { useRef } from "react";


import { CloudDrift } from "@/components/motion/CloudDrift";
import { PageHero } from "@/components/common/PageHero";
import { useHeroParallax } from "@/hooks/use-hero-parallax";

/**
 * Hero à ciel ouvert : bandeau bleu coupé en diagonale, nuages qui dérivent.
 *
 * Une couture pivotant au scroll tenait auparavant lieu d'arête basse ; elle a
 * été remplacée par la diagonale commune à tous les héros. Le canard et le bébé
 * gardent leur parallaxe, chacun à sa vitesse.
 */
export const TroublesHeroSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const duck = useRef<HTMLImageElement>(null);
  const baby = useRef<HTMLImageElement>(null);

  useHeroParallax(root, [
    { ref: duck, vars: { yPercent: 46 } },
    { ref: baby, vars: { yPercent: -22 } },
  ]);

  return (
    <PageHero
      rootRef={root}
      band="bg-msk-blue-300"
      card="bg-white"
      title={
        <>
          Ici, votre enfant a{" "}
          <span className="text-msk-coral-700">une place.</span>
        </>
      }
      titleClassName="text-msk-night-900"
      pill="Situations accueillies"
      pillClassName="bg-msk-night-900/10 text-msk-night-700"
      subtitle={
        <>
          Décrochage, refus de l&apos;école, absence de code Massar, diabète,
          épilepsie, retard : six situations que nous accompagnons quelques
          jours par semaine, en complément de sa scolarité.
        </>
      }
      subtitleClassName="text-msk-night-800"
      anchor={{
        href: "#troubles",
        label: "Aller aux situations accueillies",
        className:
          "border-msk-night-900/20 text-msk-night-800 hover:bg-msk-night-900 hover:text-white",
      }}
      decor={
        <>
          <CloudDrift
            motion="float"
            shape="a"
            speed={52}
            phase={0.2}
            className="absolute left-0 top-[52%] w-40 text-white md:w-56"
          />
          <CloudDrift
            motion="float"
            shape="b"
            speed={38}
            phase={0.5}
            className="absolute left-0 top-[26%] w-48 text-white md:w-72"
          />
          <CloudDrift
            motion="float"
            shape="a"
            speed={64}
            phase={0.8}
            className="absolute left-0 top-[8%] hidden w-32 text-msk-cream-50 lg:block"
          />

          {/* Le canard est un PNG encapsulé dans un .svg, pas un vecteur : son
              bitmap fait 619x644, donc il reste sous ~310px de large pour ne pas
              devenir flou. Il est posé sur le bleu — sur du jaune il serait
              invisible, et sur du crème il rendrait mou. */}
          <img
            ref={duck}
            src="/duck.svg"
            alt=""
            aria-hidden
            className="absolute right-[7%] top-[14%] w-32 max-w-[300px] md:w-44 lg:w-52"
          />

          {/* Le bébé n'a un contraste suffisant que sur du crème ou du blanc :
              il reste donc posé sous l'arête, jamais sur le bleu. */}
          <img
            ref={baby}
            src="/Cute baby Peek a boo.svg"
            alt=""
            aria-hidden
            className="absolute -bottom-16 left-[2%] w-56 md:w-72 lg:left-[6%] lg:w-80"
          />
        </>
      }
      media={
        // Contrat des héros : boîte média commune, jusqu'ici vide sur cette page.
        <img
          src="/Cute Bird Flapping Animation.svg"
          alt=""
          className="h-full w-44 rotate-2"
        />
      }
    />
  );
};
