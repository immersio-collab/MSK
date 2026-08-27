"use client";

import React from "react";
import Image from "next/image";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { TitreAnime } from "@/components/motion/TitreAnime";
import { PageHero } from "@/components/common/PageHero";
import { HERO_POLAROIDS } from "@/lib/data/galerie";
import { VISITE_VIRTUELLE_EN_LIGNE } from "@/lib/data/site-content";

/**
 * À la place de l'illustration vectorielle des autres pages, un éventail de
 * trois photos réelles : c'est une galerie, elle s'annonce par ses images.
 *
 * L'éventail est en `rotate` CSS statique, pas en animation : au-dessus de la
 * ligne de flottaison, une entrée décorative n'a pas de filet de sécurité (voir
 * .agents/rules/scroll-page-composition.md).
 */

const POLAROID_POSE = [
  "-rotate-6 -translate-x-[58%] sm:-translate-x-[104%] rounded-[18px_6px_20px_8px] z-10",
  "rotate-2 rounded-[8px_22px_10px_24px] z-30 w-40 sm:w-52 md:w-64",
  "rotate-[7deg] translate-x-[58%] sm:translate-x-[104%] rounded-[22px_8px_18px_10px] z-20",
];

export const GalerieHeroSection = () => {
  // Les deux pieuvres en parallaxe ont été retirées (audit décor 2026-08-26) :
  // thème marin en plein ciel — l'océan du site vit au footer — et le héros
  // était saturé (2 pieuvres + 3 polaroids + 3 nuages). Avec elles est parti
  // le scrub useHeroParallax, qui n'animait qu'elles.
  return (
    <PageHero
      band="bg-msk-blue-400"
      card="bg-msk-night-900"
      // Le `h1` et sa typographie viennent de PageHero ; ce composant n'anime
      // que les lettres, en `span`, pour ne pas imbriquer deux titres.
      title={<TitreAnime as="span" au="chargement" retard={0.25} texte="Nos espaces" />}
      titleClassName="text-white"
      // La pastille annonce la visite dès que son lien existe ; tant qu'il est
      // vide, elle dit ce que la page montre vraiment — des photographies.
      pill={VISITE_VIRTUELLE_EN_LIGNE ? "Visite virtuelle" : "En images"}
      pillClassName="bg-white text-msk-night-900"
      subtitle={
        <>
          Nos espaces, nos ateliers et nos petites victoires du quotidien —
          photographiés là où ils se vivent.
        </>
      }
      subtitleClassName="text-msk-blue-100"
      anchor={{
        href: "#galerie",
        label: "Aller à la galerie",
        className: "border-white/70 text-white hover:bg-white hover:text-msk-night-900",
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
        // Éventail de polaroids. Chaque photo est décorative : le titre lui
        // sert de légende visible, donc l'alt reste vide pour ne pas la
        // répéter aux lecteurs d'écran.
        <div className="relative mb-[-2rem] flex h-56 items-end justify-center sm:h-72 md:h-80">
          {HERO_POLAROIDS.map((photo, index) => (
            <figure
              key={photo.src}
              className={`absolute bottom-0 w-32 bg-white p-2.5 shadow-2xl sm:w-40 md:w-52 ${POLAROID_POSE[index]}`}
            >
              <Image
                src={photo.src}
                alt=""
                width={photo.width}
                height={photo.height}
                className="aspect-4/3 w-full object-cover"
                sizes="(max-width: 640px) 40vw, 220px"
                priority={index === 1}
              />
            </figure>
          ))}
        </div>
      }
    />
  );
};
