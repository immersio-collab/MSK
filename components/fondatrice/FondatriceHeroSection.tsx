"use client";

import React, { useRef } from "react";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { PageHero } from "@/components/common/PageHero";
import { useHeroParallax } from "@/hooks/use-hero-parallax";

export const FondatriceHeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useHeroParallax(root, [{ ref: image, vars: { yPercent: 120 } }]);

  return (
    <PageHero
      rootRef={root}
      band="bg-msk-coral-300"
      card="bg-white"
      title={
        <>
          L&apos;expertise au service de{" "}
          <span className="text-msk-coral-500">votre enfant.</span>
        </>
      }
      titleClassName="text-msk-night-900"
      pill="La Fondatrice"
      pillClassName="bg-msk-coral-100 text-msk-coral-700"
      subtitle={
        <>
          Découvrez le parcours de notre fondatrice, dédiée à
          l&apos;épanouissement de chaque enfant par une approche inclusive.
        </>
      }
      subtitleClassName="text-msk-night-800"
      anchor={{
        href: "#suite",
        label: "Aller à la suite",
        className:
          "border-msk-night-900/20 text-msk-night-700 hover:bg-msk-night-900 hover:text-white",
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
            className="absolute left-0 top-[26%] w-48 text-msk-coral-100 md:w-72"
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
          ref={image}
          src="/children playing.svg"
          alt="Illustration enfants"
          className="mx-auto h-auto w-full max-w-3xl md:h-64 object-contain scale-[1.5] md:scale-[1.8] translate-y-20 md:translate-y-36 origin-bottom relative z-10 pointer-events-none"
        />
      }
    />
  );
};
