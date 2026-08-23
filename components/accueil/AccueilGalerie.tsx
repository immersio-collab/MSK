"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The centre's spaces, as an edge-to-edge marquee rather than a grid — the
 * reference's habit of letting one band run past the viewport edge.
 *
 * The track renders PHOTOS twice; the `marquee` keyframe in globals.css
 * translates -50%, which lands exactly on the seam between the two copies.
 * The duplicate copy is aria-hidden so the list is announced once.
 */
const PHOTOS = [
  { src: "/park exterieur.jpg", alt: "Le parc extérieur du centre" },
  { src: "/salel sensorielle.jpg", alt: "La salle sensorielle" },
  { src: "/brain exercises.webp", alt: "Un atelier de neuro-gym" },
  { src: "/espace montesori.jpeg", alt: "L'espace Montessori" },
  { src: "/espace détente.avif", alt: "L'espace détente" },
  { src: "/salle de réeducation.jpg", alt: "La salle de rééducation" },
  { src: "/atelier creatif.jpg", alt: "L'atelier créatif" },
];

export const AccueilGalerie = () => {
  return (
    <section className="w-full overflow-hidden bg-msk-night-950 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-block rounded-[0.4rem] bg-msk-coral-300 px-3 py-1.5 font-condensed text-sm uppercase tracking-wide text-msk-night-950">
                Nos espaces
              </span>
              <h2 className="mt-6 max-w-2xl font-condensed text-[2.5rem] uppercase leading-[0.88] text-white sm:text-[3.5rem] lg:text-[4rem]">
                Un lieu pensé pour eux
              </h2>
            </div>

            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-white hover:text-msk-night-950"
            >
              Voir la galerie
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeUp>
      </div>

      <div className="mt-14 flex w-full overflow-hidden">
        <ul className="flex shrink-0 animate-marquee gap-5 pr-5">
          {PHOTOS.map((photo) => (
            <li
              key={photo.src}
              className="relative h-[15rem] w-[20rem] shrink-0 overflow-hidden rounded-[1rem] sm:h-[19rem] sm:w-[26rem]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="26rem"
                className="object-cover"
              />
            </li>
          ))}
          {PHOTOS.map((photo) => (
            <li
              key={`${photo.src}-duplicate`}
              aria-hidden
              className="relative h-[15rem] w-[20rem] shrink-0 overflow-hidden rounded-[1rem] sm:h-[19rem] sm:w-[26rem]"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="26rem"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
