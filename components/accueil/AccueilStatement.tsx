"use client";

import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { RevealWords } from "@/components/motion/RevealWords";
import { SCHOOL_INFO } from "@/lib/data/site-content";

/**
 * An oversized statement on a flat colour field — the reference's way of
 * letting one line hold a whole screen.
 *
 * Used with Birds.svg animated background silhouettes against the sun-300 midday sky.
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
    <section className={`relative w-full overflow-hidden py-20 text-center md:py-24 ${background}`}>
      {/* Arrière-plan animé : silhouettes d'oiseaux en plein vol (Birds.svg) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <img
          src="/Birds.svg"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
        {/* Farandole de mots : la déclaration se pose mot par mot, au lieu de
            monter d'un bloc — c'est le beat « déclaration », il mérite mieux
            qu'une montée standard. */}
        <p className="font-display text-[1.75rem] font-bold uppercase leading-[1.1] text-msk-night-950 sm:text-[2.25rem] lg:text-[2.75rem]">
          <RevealWords>{quote}</RevealWords>
        </p>

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
