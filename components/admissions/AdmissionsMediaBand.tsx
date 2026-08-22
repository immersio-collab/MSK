"use client";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";

/**
 * Full-bleed band with a slanted top edge, matching the method page.
 *
 * Left as a placeholder: nothing in public/ reads as an admissions photograph.
 * Swap the slot for an <Image> when one exists — nothing else here depends on
 * it.
 */
export const AdmissionsMediaBand = () => {
  return (
    <section className="relative w-full bg-msk-cream-100">
      <div
        className="relative min-h-[26rem] w-full overflow-hidden bg-msk-cream-300 md:min-h-[34rem]"
        style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }}
      >
        <MethodeAssetSlot
          label="Photo pleine largeur — première visite"
          hint="Famille accueillie au centre, plein cadre — bord supérieur incliné · ~1600×760"
          tone="bg-msk-cream-300 text-msk-night-800"
          className="absolute inset-0 rounded-none border-0"
        />
      </div>
    </section>
  );
};
