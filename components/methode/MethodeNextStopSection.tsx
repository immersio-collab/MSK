"use client";

import Link from "next/link";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The reference closes each programme page by handing the reader the next one.
 * Here that is the troubles page, which is the natural follow-on from the
 * method itself.
 */
export const MethodeNextStopSection = () => {
  // blue-800, not blue-700: the sun-300 eyebrow is 14px, so it needs 4.5:1 and
  // only reaches 3.46 against the lighter blue.
  return (
    <section className="w-full overflow-hidden bg-msk-blue-800 py-24 text-center md:py-32">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <FadeUp>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-sun-300">
            Prochaine étape
          </span>

          <h2 className="mt-6 font-display text-[2.5rem] font-bold uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl">
            Troubles accompagnés
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-snug text-msk-blue-50">
            TDAH, dyslexie, dyspraxie, troubles du langage : comment nous
            adaptons le cadre à chaque profil.
          </p>

          <Link
            href="/notre-centre/troubles-accompagnes"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-msk-blue-900 transition-transform hover:scale-105"
          >
            Découvrir
          </Link>
        </FadeUp>

        <MethodeAssetSlot
          label="Illustration — prochaine étape"
          hint="Personnage vectoriel plat, aligné bas de section · ~420×260"
          tone="bg-msk-blue-900 text-msk-blue-50"
          className="mx-auto mt-14 h-40 w-full max-w-md"
        />
      </div>
    </section>
  );
};
