"use client";

import { ChevronDown } from "lucide-react";

import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";
import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";

/**
 * Hero de la page Programmes — même grammaire visuelle que MethodeHeroSection :
 * bande de couleur inclinée en haut, nuages SVG flottants, carte-titre overlapping.
 *
 * Différences intentionnelles par rapport à la méthode :
 * - Bande de fond : msk-blue-700 (vs msk-sun-400) pour distinguer les deux pages
 * - Carte-titre : bg-msk-coral-600 → bg-msk-blue-800
 * - Eyebrow pill : "Programmes & Classes"
 */
export const ProgrammesHeroSection = () => {
  return (
    <section className="relative w-full bg-msk-cream-100 pb-24 pt-24 md:pb-32">
      {/* Colour band inclinée — même clip-path que la méthode. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[58%] bg-msk-blue-700"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 72%, 0 100%)" }}
      />

      {/* Nuages flottants — même composant que la méthode, teintes différentes. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <MethodeCloud
          motion="float"
          shape="a"
          speed={54}
          phase={0.15}
          className="absolute left-0 top-[50%] w-40 text-msk-blue-50 md:w-56"
        />
        <MethodeCloud
          motion="float"
          shape="b"
          speed={40}
          phase={0.55}
          className="absolute left-0 top-[24%] w-48 text-white md:w-72"
        />
        <MethodeCloud
          motion="float"
          shape="a"
          speed={66}
          phase={0.8}
          className="absolute left-0 top-[10%] hidden w-32 text-msk-blue-200 lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <MethodeAssetSlot
          label="Illustration héro"
          hint="Scène vectorielle plate pour programmes · ~900×420"
          tone="bg-msk-blue-800/60 text-white"
          className="mx-auto h-56 w-full max-w-3xl md:h-72"
        />

        {/* Carte-titre overlapping la bande inférieure. */}
        <FadeUp delay={0.1}>
          <div className="mx-auto mt-16 max-w-2xl rounded-[1.75rem] bg-msk-blue-800 px-8 py-10 text-center shadow-2xl md:px-12">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-sun-300">
              Programmes &amp; Classes
            </span>

            <h1 className="mt-6 font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-white sm:text-5xl md:text-6xl">
              Un programme adapté à chaque âge, à chaque besoin
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base font-medium leading-snug text-msk-blue-100 md:text-lg">
              De 2 ans à l&apos;âge adulte, une pédagogie sur-mesure et
              bienveillante pour chaque étape du développement.
            </p>

            <a
              href="#programmes"
              aria-label="Aller aux programmes"
              className="mx-auto mt-8 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 text-white transition-colors hover:bg-white hover:text-msk-blue-800"
            >
              <ChevronDown className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
