"use client";

import Image from "next/image";
import Link from "next/link";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { MethodeCloud } from "@/components/methode/MethodeCloud";
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
    <section className="relative w-full overflow-hidden bg-msk-blue-800 py-12 text-center md:py-16">
      {/* blue-900 on blue-800 keeps the clouds present without turning the
          section into a white field. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <MethodeCloud
          shape="a"
          weight={0.4}
          offset={-0.1}
          className="absolute left-[5%] top-[14%] w-44 text-msk-blue-900 xl:w-60"
        />
        <MethodeCloud
          shape="b"
          weight={0.25}
          offset={0.18}
          delay={0.2}
          className="absolute right-[6%] bottom-[18%] w-48 text-msk-blue-900 xl:w-64"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 sm:px-10">
        <FadeUp className="relative z-20">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-sun-300">
            Prochaine étape
          </span>

          <h2 className="mt-4 font-display text-[2.5rem] font-bold uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl">
            Troubles accompagnés
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-snug text-msk-blue-50">
            TDAH, dyslexie, dyspraxie, troubles du langage : comment nous
            adaptons le cadre à chaque profil.
          </p>

          <Link
            href="/notre-centre/troubles-accompagnes"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-msk-blue-900 transition-transform hover:scale-105"
          >
            Découvrir
          </Link>
        </FadeUp>

        <div className="relative z-10 mx-auto -mt-8 sm:-mt-12 md:-mt-20 flex w-full max-w-2xl justify-center pointer-events-none">
          <Image
            src="/Enjoying the fun time.svg"
            alt="Illustration"
            width={700}
            height={700}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};
