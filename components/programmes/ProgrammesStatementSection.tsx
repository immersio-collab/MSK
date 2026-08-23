"use client";

import { MethodeTiltedDuo } from "@/components/methode/MethodeTiltedDuo";
import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";

/**
 * Section déclaration — même mise en scène que MethodeStatementSection
 * (typo, stickers SVG, duo de photos inclinées, MorphButton, tailles
 * identiques), seules les COULEURS restent celles de la page programmes :
 * titre blue-800, bouton coral-600.
 */
export const ProgrammesStatementSection = () => {
  // `overflow-x-clip`, pas `overflow-hidden` : le chat déborde de sa colonne
  // et pousserait sinon une barre de défilement horizontale sur petit écran.
  return (
    <section className="flex min-h-[100dvh] w-full items-center overflow-x-clip bg-msk-cream-200 py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <FadeUp className="flex h-full flex-col justify-center">
          <div className="relative">
            <h2 className="relative z-20 text-balance font-display text-5xl font-bold leading-[1.25] tracking-[-0.02em] text-msk-blue-800 sm:text-6xl lg:text-[clamp(3.5rem,5vw,6rem)]">
              Un programme conçu autour de chaque enfant, pas l&apos;inverse.
            </h2>

            {/* Stickers auto-animés (SMIL) — plain <img>, derrière le titre,
                mêmes positions et tailles que sur /la-methode. */}
            <img
              src="/methode/sun-cloud.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-16 z-0 w-40 sm:w-52 lg:-right-12 lg:-top-24 lg:w-64"
            />
            <img
              src="/methode/running-cat.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-24 z-0 w-[26rem] sm:w-[34rem] lg:-bottom-44 lg:-left-40 lg:w-[44rem]"
            />
          </div>
        </FadeUp>

        <div className="flex h-full flex-col justify-center gap-10">
          <FadeUp delay={0.1}>
            <p className="text-lg font-medium leading-relaxed text-msk-night-800">
              Chez MSK, le programme s&apos;adapte à l&apos;enfant — et non
              l&apos;inverse. Chaque parcours est construit sur mesure, révisé
              au fil des progrès, et porté par une équipe pluridisciplinaire qui
              connaît votre enfant par son prénom.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <MorphButton
              href="/contact"
              className="w-full sm:w-fit font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
              fillClassName="bg-msk-coral-600"
            >
              Demander une inscription
            </MorphButton>
          </FadeUp>

          {/* Même plafond que /la-methode : le duo pilote la hauteur de la
              section, 34rem la garde dans un viewport d'ordinateur portable. */}
          <MethodeTiltedDuo
            src="/materrnelle.jpg"
            alt="Classe maternelle MSK"
            className="mx-auto mt-4 w-full max-w-[34rem]"
          />
        </div>
      </div>
    </section>
  );
};
