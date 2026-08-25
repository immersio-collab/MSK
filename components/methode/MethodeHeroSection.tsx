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
      band="bg-msk-coral-400"
      card="bg-msk-coral-600"
      title="Une méthode en 6 étapes, pensée pour votre enfant"
      titleClassName="text-msk-sun-200"
      pill="Notre Approche"
      pillClassName="bg-white text-msk-coral-700"
      subtitle={
        <>
          De la première observation au jour où son école lui suffit :
          un chemin structuré, humain et concret.
        </>
      }
      subtitleClassName="text-white"
      anchor={{
        href: "#etapes",
        label: "Aller aux six étapes",
        className: "border-white/70 text-white hover:bg-white hover:text-msk-coral-700",
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
        <img
          ref={kid}
          src="/kid swing.svg"
          alt="Illustration méthode"
          className="mx-auto h-auto w-full max-w-2xl md:h-64 object-contain scale-[1.3] md:scale-[1.6] translate-y-12 md:translate-y-24 origin-bottom relative z-10 pointer-events-none"
        />
      }
    />
  );
};
