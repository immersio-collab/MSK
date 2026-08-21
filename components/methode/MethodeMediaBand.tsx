"use client";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";

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
        <MethodeAssetSlot
          label="Photo pleine largeur"
          hint="Enfant en séance, plein cadre — bord supérieur incliné · ~1600×760"
          tone="bg-msk-cream-300 text-msk-night-800"
          className="absolute inset-0 rounded-none border-0"
        />

        {/* Decorative vector props layered over the photograph. */}
        <div className="pointer-events-none absolute inset-0">
          <MethodeAssetSlot
            label="Props vectoriels"
            hint="Nuages, soleil, formes — superposés"
            tone="bg-white/70 text-msk-night-800"
            className="absolute bottom-8 right-6 h-24 w-52 md:right-14"
          />
        </div>
      </div>
    </section>
  );
};
