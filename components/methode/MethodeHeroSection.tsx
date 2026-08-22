"use client";

import { ChevronDown } from "lucide-react";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Bold colour band with the scene artwork, and the page's title card overlapping
 * its lower edge — the reference's hero arrangement. The band is cut on a slant
 * so the card sits on a diagonal rather than a straight horizon.
 */
export const MethodeHeroSection = () => {
  return (
    <section className="relative w-full bg-msk-cream-100 pb-16 pt-16 md:pb-20">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[75%] bg-msk-sun-400"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 72%, 0 100%)" }}
      />

      {/* Clouds drift sideways forever, independent of scroll. Each is pinned
          to left-0 and offset by the tween, so the off-screen wrap point works
          out from the viewport width. Differing speeds keep them from moving
          as a single block. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <MethodeCloud
          motion="float"
          shape="a"
          speed={52}
          phase={0.2}
          className="absolute left-0 top-[52%] w-40 text-white md:w-56"
        />
        <MethodeCloud
          motion="float"
          shape="b"
          speed={38}
          phase={0.5}
          className="absolute left-0 top-[26%] w-48 text-white md:w-72"
        />
        <MethodeCloud
          motion="float"
          shape="a"
          speed={64}
          phase={0.8}
          className="absolute left-0 top-[8%] hidden w-32 text-msk-cream-50 lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <img
          src="/kid swing.svg"
          alt="Illustration méthode"
          className="mx-auto h-auto w-full max-w-2xl md:h-64 object-contain scale-[1.3] md:scale-[1.6] translate-y-12 md:translate-y-24 origin-bottom relative z-10 pointer-events-none"
        />

        {/* Title card, overlapping the band's lower edge. */}
        <FadeUp delay={0.1}>
          <div className="mx-auto mt-4 max-w-2xl rounded-[1.75rem] bg-msk-coral-600 px-8 py-10 text-center shadow-2xl md:px-12">
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
