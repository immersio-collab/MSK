"use client";

import Link from "next/link";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { FadeUp } from "@/components/motion/FadeUp";
import { SCHOOL_INFO } from "@/lib/data/site-content";

/**
 * The reference's "THE FIRST YEARS MATTER MOST" beat: an oversized display
 * statement filling the left half, with supporting copy, a round link and a
 * photograph stacked down the right.
 *
 * The statement is SCHOOL_INFO.coreQuote — the line the whole method rests on —
 * rather than anything newly written.
 */
export const MethodeStatementSection = () => {
  return (
    <section className="w-full bg-msk-cream-200 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <FadeUp>
          <h2 className="font-display text-[2.5rem] font-bold uppercase leading-[0.88] tracking-tight text-msk-coral-600 sm:text-6xl lg:text-7xl">
            {SCHOOL_INFO.coreQuote}
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-10">
          <FadeUp delay={0.1}>
            <p className="text-lg font-medium leading-relaxed text-msk-night-800">
              Notre méthode ne corrige pas l&apos;enfant : elle ajuste ce qui
              l&apos;entoure. Chaque étape — de la première observation à
              l&apos;insertion — est menée par une équipe pluridisciplinaire et
              recalibrée aussi souvent que nécessaire, au rythme de votre enfant.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Link
              href="/notre-centre/troubles-accompagnes"
              className="flex h-36 w-36 items-center justify-center rounded-full bg-msk-blue-700 px-4 text-center font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-105"
            >
              Troubles accompagnés
            </Link>
          </FadeUp>

          <MethodeAssetSlot
            label="Photo — séance d'accompagnement"
            hint="Photographie réelle, coins arrondis · ~640×420"
            tone="bg-msk-cream-100 text-msk-night-700"
            className="h-56 w-full md:h-64"
          />
        </div>
      </div>
    </section>
  );
};
