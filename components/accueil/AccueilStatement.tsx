"use client";

import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

import { AssetSlot } from "@/components/common/AssetSlot";
import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { SCHOOL_INFO } from "@/lib/data/site-content";

/**
 * An oversized statement on a flat colour field — the reference's way of
 * letting one line hold a whole screen.
 *
 * Used twice on the home page with different backgrounds, so the colour and the
 * optional CTA are props rather than baked in.
 */
interface AccueilStatementProps {
  quote: string;
  /** Tailwind background utility for the band, e.g. `bg-msk-blue-200`. */
  background: string;
  cta?: { href: string; label: string };
}

export const AccueilStatement = ({
  quote,
  background,
  cta,
}: AccueilStatementProps) => {
  return (
    <section className={`relative w-full py-20 text-center md:py-24 ${background}`}>
      {/* Gouttières latérales hors du bloc max-w-5xl — lg only, la bande reste
          courte : absolu, zéro hauteur ajoutée. */}
      <AssetSlot
        label="Étoile"
        tone="bg-white/70 text-msk-sun-800"
        className="pointer-events-none absolute left-[4%] top-1/2 hidden w-28 -translate-y-1/2 -rotate-6 lg:flex"
      />
      <AssetSlot
        label="Étoile"
        tone="bg-white/70 text-msk-sun-800"
        className="pointer-events-none absolute right-[4%] top-1/2 hidden w-28 -translate-y-1/2 rotate-6 lg:flex"
      />
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <FadeUp>
          <p className="font-display text-[1.75rem] font-bold uppercase leading-[1.1] text-msk-night-950 sm:text-[2.25rem] lg:text-[2.75rem]">
            {quote}
          </p>
        </FadeUp>

        {cta ? (
          <FadeUp delay={0.15}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MorphButton
                href={cta.href}
                className="text-sm font-semibold text-white"
                fillClassName="bg-msk-night-950"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </MorphButton>
              <MorphButton
                href={SCHOOL_INFO.whatsapp}
                className="text-sm font-semibold text-msk-night-900"
                fillClassName="bg-white shadow-sm"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden />
                WhatsApp
              </MorphButton>
            </div>
          </FadeUp>
        ) : null}
      </div>
    </section>
  );
};
