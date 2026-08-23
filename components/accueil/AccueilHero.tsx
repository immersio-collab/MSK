"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Hero in the reference's arrangement: an oversized condensed headline stacked
 * over a smaller condensed subhead, body copy and two pill CTAs on the left,
 * with the illustration sitting on a flat colour panel to the right. Three
 * check strips run underneath.
 *
 * The reference's layout and type, MSK's palette — its forest/mint/pink maps to
 * night/blue/coral so the page still belongs to the rest of the site.
 *
 * Copy is unchanged from the previous hero.
 */
const PROMISES = [
  "Nous parlons votre langue",
  "Une équipe pluridisciplinaire",
  "Un cadre qui s'adapte à l'enfant",
];

export const AccueilHero = () => {
  return (
    <section className="w-full bg-msk-cream-50 pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* ---------- Left: type ---------- */}
          <div>
            <FadeUp>
              <h1 className="font-condensed text-[3rem] uppercase leading-[0.86] tracking-[-0.01em] text-msk-night-950 sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                L&apos;école où chaque enfant s&apos;éveille
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="mt-5 font-condensed text-[1.35rem] uppercase leading-[1.05] text-msk-coral-600 sm:text-[1.75rem] lg:text-[2rem]">
                +200 familles · 15 ans d&apos;expérience · Casablanca
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-msk-night-800 md:text-lg">
                Le seul centre thérapeutique et éducatif Montessori au Maroc.
                Accompagnement sur-mesure pour enfants avec difficultés
                d&apos;apprentissage, de langage ou de comportement.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-msk-night-950 px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:bg-msk-night-800"
                >
                  Prendre rendez-vous
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/programmes"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-msk-night-950 px-6 py-3 font-body text-sm font-semibold text-msk-night-950 transition-colors hover:bg-msk-night-950 hover:text-white"
                >
                  Voir les programmes
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* ---------- Right: illustration on a flat panel ---------- */}
          <FadeUp delay={0.15}>
            <div className="relative flex h-[22rem] items-end justify-center overflow-hidden rounded-[1.5rem] bg-msk-blue-200 sm:h-[26rem] lg:h-[30rem]">
              <Image
                src="/children playing.svg"
                alt="Enfants en activité au centre MSK"
                width={520}
                height={520}
                className="h-full w-full object-contain p-8"
                priority
              />
            </div>
          </FadeUp>
        </div>

        {/* ---------- Check strips ---------- */}
        <ul className="mt-14 grid grid-cols-1 gap-4 pb-20 md:grid-cols-3 md:pb-24">
          {PROMISES.map((promise, index) => (
            <li key={promise}>
              <FadeUp
                delay={0.08 * index}
                className="flex items-center gap-3 rounded-[0.75rem] bg-msk-coral-50 px-5 py-4"
              >
                <Check
                  className="h-5 w-5 shrink-0 text-msk-coral-600"
                  aria-hidden
                />
                <span className="font-condensed text-base uppercase leading-none tracking-wide text-msk-night-950 sm:text-lg">
                  {promise}
                </span>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
