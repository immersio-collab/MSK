"use client";

import Image from "next/image";
import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";

/**
 * Bande photographique pleine-largeur calquée sur MethodeMediaBand.
 * Même clip-path pour la coupe en haut, image différente adaptée aux programmes.
 */
export const ProgrammesMediaBand = () => {
  return (
    <section className="relative w-full bg-msk-cream-200">
      <div
        className="relative min-h-[26rem] w-full overflow-hidden bg-msk-cream-300 md:min-h-[34rem]"
        style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }}
      >
        <Image
          src="/neuro-gym.jpg"
          alt="Séance Neuro-Gym en classe"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />

        {/* Decorative vector props layered over the photograph. */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/games icon.svg"
            alt=""
            aria-hidden="true"
            className="absolute bottom-4 right-2 w-40 md:bottom-8 md:right-10 md:w-56 pointer-events-auto"
          />
        </div>
      </div>
    </section>
  );
};
