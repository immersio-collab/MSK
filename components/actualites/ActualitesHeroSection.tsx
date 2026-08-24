"use client";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { FadeUp } from "@/components/motion/FadeUp";
import { Eyebrow } from "@/components/common/Eyebrow";

/**
 * Hero des actualités — même grammaire que les autres pages (bande de couleur
 * inclinée, nuages, carte-titre blanche), mais en CORAL : chaque page garde sa
 * dominante (méthode = sun, galerie = blue, troubles = ciel blue-300), et
 * celle-ci n'était pas encore prise.
 *
 * Les entrées utilisent FadeUp en mode "mount" (animation au montage, sans
 * trigger de scroll) : au-dessus de la ligne de flottaison, rien ne doit
 * pouvoir rester bloqué invisible.
 */
export const ActualitesHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-msk-cream-100 pb-14 pt-28 md:pb-16 md:pt-36">
      {/* Bande coral inclinée. Elle s'arrête avant le bas : le raccord avec la
          section suivante reste en crème. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[76%] bg-msk-coral-400"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 92%)" }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl rounded-[1.75rem] bg-white px-8 py-10 text-center shadow-2xl md:px-12">
          <FadeUp mode="mount" y={10} duration={0.5}>
            <Eyebrow className="bg-msk-sun-300 text-msk-night-900">
              Actualités · Blog
            </Eyebrow>
          </FadeUp>

          <FadeUp mode="mount" y={20} duration={0.6} delay={0.1}>
            <h1 className="mt-5 font-display text-[2.25rem] font-bold uppercase leading-[0.92] text-msk-night-900 sm:text-5xl md:text-6xl">
              Ressources, conseils et <span className="text-msk-coral-600">vie du centre</span>
            </h1>
          </FadeUp>

          <FadeUp mode="mount" y={20} duration={0.6} delay={0.2}>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-msk-night-800 md:text-lg">
              Découvrez nos derniers articles éducatifs, les événements à venir, et nos conseils
              pour accompagner au mieux le développement de votre enfant.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
