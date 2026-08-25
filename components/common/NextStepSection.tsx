"use client";

import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

import { LottieMark } from "@/components/motion/LottieMark";
import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { SCHOOL_INFO } from "@/lib/data/site-content";

interface NextStepSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

/**
 * La CTA qui clôt chaque page en tendant la suivante — toujours la DERNIÈRE
 * section avant le footer.
 *
 * Habillage fixe (système de couleurs 2026-08-25) : bande night-800, titre
 * blanc, corps cream-100, eyebrow sun-300, étoiles dorées animées, bouton principal
 * blanc. Avec la FAQ cream-100 au-dessus et le footer night-900 en dessous,
 * chaque page se termine par la même séquence — c'est le repère de cohérence
 * le plus fort du site.
 */
export const NextStepSection = ({
  eyebrow,
  title,
  description,
  buttonText,
  buttonHref,
}: NextStepSectionProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-msk-night-800 pt-24 pb-40 text-center md:pt-32 md:pb-56">
      {/* Decorative sparkling animated stars (soft & discreet shimmer) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <LottieMark
          src="/stars-sparkle.json"
          fit={false}
          className="absolute -top-4 left-[6%] w-36 sm:w-44 md:w-56 opacity-45 pointer-events-none"
        />
        <LottieMark
          src="/stars-sparkle.json"
          fit={false}
          className="absolute top-[14%] right-[8%] w-32 sm:w-40 md:w-52 opacity-40 pointer-events-none -scale-x-100"
        />
        <LottieMark
          src="/stars-sparkle.json"
          fit={false}
          className="absolute bottom-[6%] left-[10%] w-28 sm:w-36 md:w-44 opacity-35 pointer-events-none"
        />
        <LottieMark
          src="/stars-sparkle.json"
          fit={false}
          className="absolute -bottom-4 right-[12%] w-36 sm:w-48 md:w-56 opacity-45 pointer-events-none"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 sm:px-10">
        <FadeUp className="relative z-20">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-sun-300">
            {eyebrow}
          </span>

          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.9] text-white sm:text-5xl md:text-6xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-snug text-msk-cream-100">
            {description}
          </p>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MorphButton
                href={buttonHref}
                className={
                  buttonHref === "/contact"
                    ? "text-sm font-semibold uppercase tracking-[0.14em] text-white"
                    : "text-sm font-semibold uppercase tracking-[0.14em] text-msk-night-900"
                }
                fillClassName={
                  buttonHref === "/contact"
                    ? "bg-msk-coral-600 shadow-md"
                    : "bg-white shadow-md"
                }
              >
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </MorphButton>
              {buttonHref !== "/contact" ? (
                <MorphButton
                  href="/contact"
                  className="text-sm font-semibold uppercase tracking-[0.14em] text-white"
                  fillClassName="bg-msk-coral-600 shadow-md"
                >
                  Nous contacter
                </MorphButton>
              ) : (
                <MorphButton
                  href={SCHOOL_INFO.whatsapp}
                  className="text-sm font-semibold uppercase tracking-[0.14em] text-msk-night-900"
                  fillClassName="bg-white shadow-md"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </MorphButton>
              )}
            </div>
          </FadeUp>
        </FadeUp>
      </div>
    </section>
  );
};
