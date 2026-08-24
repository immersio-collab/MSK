"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";
import { PELLICULE } from "@/components/galerie/galerie-content";

/**
 * The centre's spaces, as an edge-to-edge marquee of the same polaroid cards
 * the gallery page uses in its filmstrip: a white frame, an organic corner
 * radius and a tilt that alternate by position, and the title captioned
 * underneath.
 *
 * Photos come from `PELLICULE` in `galerie-content.ts` — the gallery page's own
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
              <span className="inline-block rounded-[0.4rem] bg-msk-coral-300 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
                Nos espaces
              </span>
              <h2 className="mt-6 max-w-2xl font-display text-[1.75rem] font-bold uppercase leading-[1.05] text-white sm:text-[2.25rem] lg:text-[2.75rem]">
                Un lieu pensé pour eux
              </h2>
            </div>

            <Link
              href="/notre-centre/galerie"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-msk-night-950"
            >
              Voir la galerie
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
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
                <figure
                  className={`block w-[min(46vw,340px)] bg-white p-2 pb-3 shadow-xl ${
                    index % 2
                      ? "mt-6 rotate-2 rounded-[6px_20px_8px_18px]"
                      : "-rotate-2 rounded-[18px_6px_20px_8px]"
                  }`}
                >
                  <span className="relative block aspect-4/3 w-full overflow-hidden">
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
                  </span>
                  <figcaption className="mt-2 block text-center font-display text-xs font-semibold text-msk-night-800">
                    {photo.titre}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};
