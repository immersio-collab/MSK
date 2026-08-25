"use client";

import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

import { CloudDrift } from "@/components/motion/CloudDrift";
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
 * blanc, corps cream-100, eyebrow sun-300, nuages white/50, bouton principal
 * blanc. Avec la FAQ cream-100 au-dessus et le footer night-900 en dessous,
 * chaque page se termine par la même séquence — c'est le repère de cohérence
 * le plus fort du site. Les anciennes props de couleur ont été retirées :
 * l'uniformité est la règle, pas un défaut à surcharger.
 */
export const NextStepSection = ({
  eyebrow,
  title,
  description,
  buttonText,
  buttonHref,
}: NextStepSectionProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-msk-night-800 py-20 text-center md:py-24">
      {/* Decorative clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <CloudDrift
          shape="a"
          motion="float"
          speed={120}
          phase={0.2}
          className="absolute top-[10%] w-44 text-white/50 xl:w-60"
        />
        <CloudDrift
          shape="b"
          motion="float"
          speed={160}
          phase={0.6}
          delay={0.2}
          className="absolute top-[40%] w-48 text-white/50 xl:w-64"
        />
        <CloudDrift
          shape="d"
          motion="float"
          speed={100}
          phase={0.9}
          className="absolute bottom-[10%] w-32 text-white/50 opacity-70 xl:w-48"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 sm:px-10">
        <FadeUp className="relative z-20">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-sun-300">
            {eyebrow}
          </span>

          <h2 className="mt-4 font-display text-[2.5rem] font-bold uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl">
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
