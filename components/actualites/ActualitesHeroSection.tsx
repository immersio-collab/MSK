"use client";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { PageHero } from "@/components/common/PageHero";

/**
 * Hero des actualités, en CORAL : chaque page garde sa dominante (méthode =
 * sun, galerie = blue-400, programmes = blue-700), et celle-ci n'était pas
 * encore prise.
 */
export const ActualitesHeroSection = () => {
  return (
    <PageHero
      band="bg-msk-coral-400"
      card="bg-white"
      title={
        <>
          Ressources, conseils et{" "}
          <span className="text-msk-coral-600">vie du centre</span>
        </>
      }
      titleClassName="text-msk-night-900"
      pill="Actualités · Blog"
      pillClassName="bg-msk-sun-300 text-msk-night-900"
      subtitle={
        <>
          Découvrez nos derniers articles éducatifs, les événements à venir, et
          nos conseils pour accompagner au mieux le développement de votre enfant.
        </>
      }
      subtitleClassName="text-msk-night-800"
      anchor={{
        href: "#articles",
        label: "Aller aux articles",
        className:
          "border-msk-night-900/20 text-msk-night-700 hover:bg-msk-night-900 hover:text-white",
      }}
      decor={
        <>
          {/* Soleil auto-animé (SMIL) — plain <img>, next/image l'aplatirait. */}
          <img
            src="/Sunny.svg"
            alt=""
            className="absolute right-[4%] top-8 w-24 sm:w-32 lg:right-[7%] lg:w-40"
          />
          <CloudDrift
            motion="float"
            shape="a"
            speed={52}
            phase={0.25}
            className="absolute left-0 top-[8%] w-40 text-white md:w-56"
          />
          <CloudDrift
            motion="float"
            shape="b"
            speed={40}
            phase={0.7}
            className="absolute left-0 top-[30%] hidden w-36 text-white lg:block"
          />
        </>
      }
    />
  );
};
