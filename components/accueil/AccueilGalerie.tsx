"use client";

import { ArrowRight } from "lucide-react";
import { MorphButton } from "@/components/motion/MorphButton";
import { FadeUp } from "@/components/motion/FadeUp";
import { GaleriePelliculeSection } from "@/components/galerie/GaleriePelliculeSection";

export const AccueilGalerie = () => {
  const header = (
    <FadeUp>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-block rounded-[0.4rem] bg-msk-sun-300 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
            Nos espaces
          </span>
          <h2 className="mt-6 max-w-2xl font-display text-[1.75rem] font-bold uppercase leading-[1.05] text-white sm:text-[2.25rem] lg:text-[2.75rem]">
            Un lieu pensé pour eux
          </h2>
        </div>

        <MorphButton
          href="/notre-centre/galerie"
          size="sm"
          className="text-sm font-semibold text-white"
          fillClassName="border-2 border-white/70 bg-transparent"
        >
          Voir la galerie
          <ArrowRight className="h-4 w-4" aria-hidden />
        </MorphButton>
      </div>
    </FadeUp>
  );

  return <GaleriePelliculeSection variant="home" header={header} />;
};
