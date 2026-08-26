"use client";

import React, { useRef } from "react";


import { CloudDrift } from "@/components/motion/CloudDrift";
import { PageHero } from "@/components/common/PageHero";
import { useHeroParallax } from "@/hooks/use-hero-parallax";

/**
 * Le héros de référence du site : c'est sur celui-ci que les autres pages ont
 * été alignées.
 */
export const MethodeHeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const kid = useRef<HTMLImageElement>(null);

  useHeroParallax(root, [{ ref: kid, vars: { yPercent: 120 } }]);

  return (
    <PageHero
      rootRef={root}
      band="bg-msk-coral-500"
      card="bg-white"
      title="Une méthode en 6 étapes, pensée pour votre enfant"
      titleClassName="text-msk-night-900"
      pill="Notre Approche"
      pillClassName="bg-msk-coral-100 text-msk-coral-700"
      subtitle={
        <>
          De la première observation au jour où son école lui suffit :
          un chemin structuré, humain et concret.
        </>
      }
      subtitleClassName="text-msk-night-800"
      anchor={{
        href: "#etapes",
        label: "Aller aux six étapes",
        className:
          "border-msk-night-900/20 text-msk-night-700 hover:bg-msk-night-900 hover:text-white",
      }}
      decor={
        // Clouds drift sideways forever, independent of scroll. Each is pinned
        // to left-0 and offset by the tween, so the off-screen wrap point works
        // out from the viewport width. Differing speeds keep them from moving
        // as a single block.
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
        </>
      }
      media={
        // Contrat des héros (2026-08-25) : le visuel REMPLIT la boîte média de
        // PageHero (h-full), sans scale/translate — le fichier est recadré à son
        // dessin (viewBox croppé), c'est lui qui a été corrigé, pas la mise en page.
        <img
          ref={kid}
          src="/kid swing.svg"
          alt=""
          aria-hidden
          className="pointer-events-none h-full w-auto object-contain"
        />
      }
    />
  );
};
