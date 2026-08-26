"use client";

import React, { useRef } from "react";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { PageHero } from "@/components/common/PageHero";
import { useHeroParallax } from "@/hooks/use-hero-parallax";

/** Signature blue de la page : bande blue-400, carte blue-800 par-dessus. */
export const ProgrammesHeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const kid = useRef<HTMLImageElement>(null);

  useHeroParallax(root, [{ ref: kid, vars: { yPercent: 120 } }]);

  return (
    <PageHero
      rootRef={root}
      band="bg-msk-blue-400"
      card="bg-white"
      title="Un programme pour chaque âge"
      titleClassName="text-msk-night-900"
      pill="Programmes & Classes"
      pillClassName="bg-msk-blue-100 text-msk-blue-700"
      subtitle={<>De 2 à 11 ans, un apprentissage sur-mesure en groupes de cinq.</>}
      subtitleClassName="text-msk-night-800"
      anchor={{
        href: "#programmes",
        label: "Aller aux programmes",
        className:
          "border-msk-night-900/20 text-msk-night-700 hover:bg-msk-night-900 hover:text-white",
      }}
      decor={
        <>
          <CloudDrift
            motion="float"
            shape="a"
            speed={54}
            phase={0.15}
            className="absolute left-0 top-[50%] w-40 text-msk-blue-50 md:w-56"
          />
          <CloudDrift
            motion="float"
            shape="b"
            speed={40}
            phase={0.55}
            className="absolute left-0 top-[24%] w-48 text-white md:w-72"
          />
          <CloudDrift
            motion="float"
            shape="a"
            speed={66}
            phase={0.8}
            className="absolute left-0 top-[10%] hidden w-32 text-msk-blue-200 lg:block"
          />
        </>
      }
      media={
        // Contrat des héros : h-full dans la boîte média commune, zéro hack.
        <img
          ref={kid}
          src="/kids playing - kidcare.svg"
          alt=""
          aria-hidden
          className="pointer-events-none h-full w-auto object-contain"
        />
      }
    />
  );
};
