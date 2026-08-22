"use client";

import Link from "next/link";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { FadeUp } from "@/components/motion/FadeUp";
import { PARENT_CONCERNS_FAQ } from "@/lib/data/site-content";

/**
 * The statement beat, carrying the page's most reassuring message: that a
 * missing Massar code is not a barrier.
 *
 * The copy is not newly written — it is the answer already published in
 * PARENT_CONCERNS_FAQ, pulled from there rather than duplicated so the two
 * cannot drift apart.
 */
const MASSAR = PARENT_CONCERNS_FAQ.find((item) =>
  item.question.includes("Massar"),
);

export const AdmissionsMassarSection = () => {
  return (
    <section className="w-full bg-msk-cream-200 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <FadeUp>
          <h2 className="font-display text-[2.5rem] font-bold uppercase leading-[0.88] tracking-tight text-msk-blue-800 sm:text-6xl lg:text-7xl">
            Sans code Massar ? Votre enfant a quand même sa place.
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-10">
          <FadeUp delay={0.1}>
            <p className="text-lg font-medium leading-relaxed text-msk-night-800">
              {MASSAR?.answer}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Link
              href="/contact"
              className="flex h-36 w-36 items-center justify-center rounded-full bg-msk-coral-600 px-4 text-center font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-105"
            >
              Poser une question
            </Link>
          </FadeUp>

          <MethodeAssetSlot
            label="Photo — accueil des familles"
            hint="Photographie réelle, coins arrondis · ~640×420"
            tone="bg-msk-cream-100 text-msk-night-700"
            className="h-56 w-full md:h-64"
          />
        </div>
      </div>
    </section>
  );
};
