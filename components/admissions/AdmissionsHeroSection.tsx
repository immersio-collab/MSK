"use client";

import { ChevronDown } from "lucide-react";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Same arrangement as the method hero — angled colour band, drifting clouds,
 * title card overlapping the band's lower edge — on a blue field rather than
 * sun, so the two pages read as siblings without looking identical.
 */
export const AdmissionsHeroSection = () => {
  return (
    <section className="relative w-full bg-msk-cream-100 pb-24 pt-36 md:pb-32 md:pt-44">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[58%] bg-msk-blue-300"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 72%, 0 100%)" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <MethodeCloud
          motion="float"
          shape="a"
          speed={54}
          phase={0.2}
          className="absolute left-0 top-[50%] w-40 text-white md:w-56"
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
          phase={0.85}
          className="absolute left-0 top-[8%] hidden w-32 text-msk-cream-50 lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <MethodeAssetSlot
          label="Illustration héro — admissions"
          hint="Scène vectorielle plate — accueil, dossier, famille · ~900×420"
          tone="bg-msk-blue-200/70 text-msk-night-900"
          className="mx-auto h-56 w-full max-w-3xl md:h-72"
        />

        <FadeUp delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl rounded-[1.75rem] bg-msk-night-950 px-8 py-10 text-center shadow-2xl md:px-12">
            <h1 className="font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-msk-sun-400 sm:text-5xl md:text-6xl">
              Admissions &amp; Inscriptions
            </h1>

            <span className="mt-6 inline-block rounded-full bg-white px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-900">
              4 étapes
            </span>

            <p className="mx-auto mt-6 max-w-md text-base font-medium leading-snug text-msk-cream-100 md:text-lg">
              Du premier appel à la première journée : un parcours clair, un
              bilan gratuit, et un accompagnement même sans code Massar.
            </p>

            <a
              href="#etapes"
              aria-label="Aller aux quatre étapes"
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
