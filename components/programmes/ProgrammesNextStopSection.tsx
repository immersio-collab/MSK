"use client";

import { MorphButton } from "@/components/motion/MorphButton";

import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";
import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";

/**
 * Hand-off vers la page Admissions — calqué sur MethodeNextStopSection.
 *
 * Fond coral-700 (vs blue-800 de la méthode) pour différencier les pages tout
 * en respectant la même structure : eyebrow, h2 oversized, paragraphe, CTA
 * rounded-full, et nuages décoratifs dans les angles.
 */
export const ProgrammesNextStopSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-msk-coral-700 py-24 text-center md:py-32">
      {/* Nuages décoratifs — coral-900 sur coral-700 pour les garder présents
          sans blanchir la section. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <MethodeCloud
          motion="float"
          shape="a"
          speed={48}
          phase={0.2}
          className="absolute left-[5%] top-[14%] w-44 text-msk-coral-900 xl:w-60"
        />
        <MethodeCloud
          motion="float"
          shape="b"
          speed={36}
          phase={0.6}
          className="absolute right-[6%] bottom-[18%] w-48 text-msk-coral-900 xl:w-64"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
        <FadeUp>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-sun-300">
            Prochaine étape
          </span>

          <h2 className="mt-6 font-display text-[2.5rem] font-bold uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl">
            Admissions
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-snug text-msk-coral-100">
            Découvrez le processus d&apos;admission en 3 étapes : premier
            échange, bilan d&apos;évaluation, programme sur-mesure.
          </p>

          <MorphButton
            href="/admissions"
            className="mt-10 font-display text-sm font-semibold uppercase tracking-[0.14em] text-msk-coral-800"
            fillClassName="bg-white"
          >
            Voir les admissions
          </MorphButton>
        </FadeUp>

        <img
          src="/Parenting.svg"
          alt="Illustration admissions"
          className="mx-auto mt-14 h-auto w-full max-w-md object-contain"
        />
      </div>
    </section>
  );
};
