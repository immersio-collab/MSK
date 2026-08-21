"use client";

import { ChevronDown } from "lucide-react";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Bold colour band with the scene artwork, and the page's title card overlapping
 * its lower edge — the reference's hero arrangement. The band is cut on a slant
 * so the card sits on a diagonal rather than a straight horizon.
 */
export const MethodeHeroSection = () => {
  return (
    <section className="relative w-full bg-msk-cream-100 pb-24 pt-24 md:pb-32">
      {/* Colour band. `clip-path` gives the angled base; it is decorative only. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[58%] bg-msk-sun-400"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 72%, 0 100%)" }}
      />

      {/* Soft cloud shapes, as in the reference. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[46%] h-16 w-40 rounded-full bg-white/80 blur-[1px]" />
        <div className="absolute right-[8%] top-[30%] h-20 w-52 rounded-full bg-white/70 blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <MethodeAssetSlot
          label="Illustration héro"
          hint="Scène vectorielle plate — enfant, formes, nuages · ~900×420"
          tone="bg-msk-sun-300/60 text-msk-night-900"
          className="mx-auto h-56 w-full max-w-3xl md:h-72"
        />

        {/* Title card, overlapping the band's lower edge. */}
        <FadeUp delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl rounded-[1.75rem] bg-msk-coral-600 px-8 py-10 text-center shadow-2xl md:px-12">
            <h1 className="font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-msk-sun-200 sm:text-5xl md:text-6xl">
              Une méthode en 6 étapes, pensée pour votre enfant
            </h1>

            <span className="mt-6 inline-block rounded-full bg-white px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-coral-700">
              Notre Approche
            </span>

            <p className="mx-auto mt-6 max-w-md text-base font-medium leading-snug text-white md:text-lg">
              De l&apos;observation initiale à l&apos;insertion scolaire réussie :
              un chemin structuré, humain et scientifique.
            </p>

            <a
              href="#etapes"
              aria-label="Aller aux six étapes"
              className="mx-auto mt-8 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 text-white transition-colors hover:bg-white hover:text-msk-coral-700"
            >
              <ChevronDown className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
