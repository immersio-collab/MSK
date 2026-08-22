"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";
import { HERO_POLAROIDS } from "@/components/galerie/galerie-content";

/**
 * Hero de la galerie — même grammaire que MethodeHeroSection et
 * ProgrammesHeroSection : bande de couleur inclinée par `clip-path`, nuages
 * flottants, carte-titre chevauchant l'arête basse.
 *
 * Différences intentionnelles, pour que chaque page garde son identité :
 * - Bande de fond : msk-coral-400 (la méthode a sun-400, programmes blue-700)
 * - À la place de l'illustration vectorielle des deux autres, un éventail de
 *   trois photos réelles : c'est une galerie, elle s'annonce par ses images.
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
  return (
    <section className="relative w-full overflow-hidden bg-msk-cream-100 pb-24 pt-28 md:pb-32 md:pt-36">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[58%] bg-msk-coral-400"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 72%, 0 100%)" }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <MethodeCloud
          motion="float"
          shape="d"
          speed={58}
          phase={0.12}
          className="absolute left-0 top-[9%] w-40 text-white md:w-60"
        />
        <MethodeCloud
          motion="float"
          shape="c"
          speed={41}
          phase={0.48}
          className="absolute left-0 top-[26%] w-32 text-msk-coral-100 md:w-48"
        />
        <MethodeCloud
          motion="float"
          shape="e"
          speed={70}
          phase={0.8}
          className="absolute left-0 top-[4%] hidden w-28 text-msk-cream-50 lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        {/* Éventail de polaroids. Chaque photo est décorative : le titre lui
            sert de légende visible, donc l'alt reste vide pour ne pas la
            répéter aux lecteurs d'écran. */}
        <div className="relative mb-[-3.5rem] flex h-56 items-end justify-center sm:h-72 md:h-80">
          {HERO_POLAROIDS.map((photo, index) => (
            <figure
              key={photo.src}
              className={`absolute bottom-0 w-32 bg-white p-2.5 pb-8 shadow-2xl sm:w-40 md:w-52 ${POLAROID_POSE[index]}`}
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
              <figcaption className="mt-2 text-center font-display text-[11px] font-semibold text-msk-night-800 sm:text-xs">
                {photo.titre}
              </figcaption>
            </figure>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mx-auto max-w-2xl rounded-[1.75rem] bg-msk-night-900 px-8 py-10 text-center shadow-2xl md:px-12">

            <GalerieTitreAnime
              as="h1"
              au="chargement"
              retard={0.25}
              texte="Nos Espaces (Visite Virtuelle)"
              className="mt-6 font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-white sm:text-5xl md:text-6xl"
            />

            <p className="mx-auto mt-6 max-w-md text-base font-medium leading-snug text-msk-blue-100 md:text-lg">
              Nos espaces, nos ateliers et nos petites victoires du quotidien —
              photographiés là où ils se vivent.
            </p>

            <a
              href="#galerie"
              aria-label="Aller à la galerie"
              className="mx-auto mt-8 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 text-white transition-colors hover:bg-white hover:text-msk-night-900"
            >
              <ChevronDown className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
