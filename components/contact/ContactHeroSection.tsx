"use client";

import {
  ContactBackdrop,
  ContactForeground,
} from "@/components/contact/ContactScene";
import { MethodeLottie } from "@/components/methode/MethodeLottie";

/**
 * Contact scene, laid out as in the reference: a fixed-height band on a mint
 * field, with four stacked layers.
 *
 * Order matters and is the whole trick — the animated figure sits *between* two
 * vector layers, so the hill and tree overlap it while the big cloud stays
 * behind. Percentages and z-indices are transcribed rather than eyeballed.
 *
 * The band's own height is what crops the hill flat along the bottom; the form
 * panel below then overlaps that edge.
 */
export const ContactHeroSection: React.FC = () => {
  // Top padding below `lg` only — on desktop the scene runs to the very top and
  // the fixed navbar floats over it, as in the reference. Applying the padding
  // at every width is what pushed the whole scene down and left a band of empty
  // mint above it.
  return (
    <section className="w-full overflow-hidden bg-[#cff2f1] max-lg:pt-[4.0625rem]">
      <div className="w-full lg:h-[35.5625rem]">
        <div className="relative h-auto w-full overflow-hidden lg:h-full lg:w-auto">
          {/* 1 — cloud behind the figure */}
          <ContactBackdrop className="absolute z-10 h-auto w-full lg:h-full lg:w-auto" />

          {/* 2 — the figure */}
          <div className="absolute top-0 left-[-4.5%] z-10 h-auto w-[113%]">
            <MethodeLottie
              src="/contact.json"
              className="h-full w-full"
              fit={false}
            />
          </div>

          {/* 3 — clouds, tree and striped hill, over the figure */}
          <ContactForeground className="relative z-12 h-auto w-full lg:h-full lg:w-auto" />

          {/* 4 — plant, nearest the viewer */}
          <div className="absolute top-[21%] left-[-13%] z-[14] h-auto w-[44%]">
            <MethodeLottie
              src="/plant.json"
              className="h-full w-full"
              fit={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
