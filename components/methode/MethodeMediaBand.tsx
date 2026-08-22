"use client";

import Image from "next/image";

/**
 * Full-bleed photographic band with a slanted top edge, the way the reference
 * cuts from its kinetic word band into photography. Flat vector props sit over
 * the photo; those are asset slots for now.
 */
export const MethodeMediaBand = () => {
  return (
    <section className="relative w-full bg-msk-cream-100">
      <div
        className="relative min-h-[26rem] w-full overflow-hidden bg-msk-cream-300 md:min-h-[34rem]"
        style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }}
      >
        <Image
          src="/parcours.jpeg"
          alt="Enfant en séance, plein cadre"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* Decorative vector props layered over the photograph. */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-8 right-6 md:right-14">
            <Image
              src="/Bird pair love and flying sky.svg"
              alt="Props vectoriels"
              width={320}
              height={148}
              className="h-auto w-64 md:w-80 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
