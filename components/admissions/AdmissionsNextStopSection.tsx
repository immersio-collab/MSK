"use client";

import Link from "next/link";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Hands the reader on to the method, which is the natural next question once
 * the admissions process is clear: what actually happens with my child.
 */
export const AdmissionsNextStopSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-msk-coral-700 py-24 text-center md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <MethodeCloud
          shape="a"
          weight={0.4}
          offset={-0.1}
          className="absolute left-[5%] top-[14%] w-44 text-msk-coral-800 xl:w-60"
        />
        <MethodeCloud
          shape="b"
          weight={0.25}
          offset={0.18}
          delay={0.2}
          className="absolute right-[6%] bottom-[18%] w-48 text-msk-coral-800 xl:w-64"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
        <FadeUp>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-sun-300">
            Prochaine étape
          </span>

          <h2 className="mt-6 font-display text-[2.5rem] font-bold uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl">
            La Méthode MSK
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-snug text-msk-cream-100">
            Observer, comprendre, adapter, rééduquer, accompagner, insérer :
            ce qui se passe une fois votre enfant accueilli.
          </p>

          <Link
            href="/notre-centre/la-methode"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-msk-coral-700 transition-transform hover:scale-105"
          >
            Découvrir
          </Link>
        </FadeUp>

        <MethodeAssetSlot
          label="Illustration — prochaine étape"
          hint="Personnage vectoriel plat, aligné bas de section · ~420×260"
          tone="bg-msk-coral-800 text-msk-cream-100"
          className="mx-auto mt-14 h-40 w-full max-w-md"
        />
      </div>
    </section>
  );
};
