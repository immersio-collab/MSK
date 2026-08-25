"use client";

import Image from "next/image";
import { MorphButton } from "@/components/motion/MorphButton";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";
import { PolaroidCard } from "@/components/common/PolaroidCard";
import { PELLICULE } from "@/lib/data/galerie";

/**
 * The centre's spaces, as an edge-to-edge marquee of the same polaroid cards
 * the gallery page uses in its filmstrip: a white frame, an organic corner
 * radius and a tilt that alternate by position, and the title captioned
 * underneath.
 *
 * Photos come from `PELLICULE` in `lib/data/galerie.ts` — the shared
 * list, not a second copy of it. This file used to carry seven hardcoded paths.
 *
 * Unlike the gallery page's cards these are not buttons: there is no lightbox
 * on the home page, so they carry no zoom affordance and the section's single
 * link leads to the gallery instead.
 *
 * The track renders PELLICULE twice; the `marquee` keyframe in globals.css
 * translates -50%, which lands exactly on the seam between the two copies —
 * `pr-6` matches `gap-6` so the spacing across the seam stays even. The
 * duplicate copy is aria-hidden so the list is announced once.
 */
export const AccueilGalerie = () => {
  return (
    <section className="w-full overflow-hidden bg-msk-night-950 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
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
              className="text-sm font-semibold text-white transition-colors group-hover:text-msk-night-950"
              fillClassName="border-2 border-white/70 bg-transparent group-hover:bg-white"
            >
              Voir la galerie
              <ArrowRight className="h-4 w-4" aria-hidden />
            </MorphButton>
          </div>
        </FadeUp>
      </div>

      <div className="mt-14 flex w-full overflow-hidden pb-8">
        {[0, 1].map((copie) => (
          <ul
            key={copie}
            aria-hidden={copie > 0 || undefined}
            className="flex shrink-0 animate-marquee items-start gap-6 pr-6"
          >
            {PELLICULE.map((photo, index) => (
              <li key={`${copie}-${photo.src}`} className="shrink-0">
                <PolaroidCard
                  as="figure"
                  index={index}
                  caption={photo.titre}
                  media={
                    <Image
                      src={photo.src}
                      // Decorative: the visible caption below carries the name.
                      alt=""
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 640px) 46vw, 340px"
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  }
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};
