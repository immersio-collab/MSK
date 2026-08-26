"use client";

import React from "react";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { PageHero } from "@/components/common/PageHero";

/**
 * Hero à ciel ouvert : bandeau bleu coupé en diagonale, nuages qui dérivent.
 *
 * Une couture pivotant au scroll tenait auparavant lieu d'arête basse ; elle a
 * été remplacée par la diagonale commune à tous les héros. Le canard de bain et
 * le bébé qui flottaient dans le ciel ont été retirés en 2026-08-26 : le héros
 * ne porte que des motifs de CIEL ou liés au contenu de la page.
 */
export const TroublesHeroSection: React.FC = () => {

  return (
    <PageHero
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
        </>
      }
      media={
        // Contrat des héros : un visuel unique dans la boîte commune. Le canard
        // et le bébé qui flottaient dans le ciel ont été retirés — un canard de
        // bain n'a de rapport ni avec le ciel ni avec le contenu de la page.
        <img
          src="/fun-time.svg"
          alt=""
          aria-hidden
          className="pointer-events-none h-full w-auto object-contain"
        />
      }
    />
  );
};
