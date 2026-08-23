"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The Neuro-Gym beat. Previously a scroll-scrubbed expanding image; here it is
 * a static full-bleed photograph with the copy over a dark scrim, which keeps
 * the text legible at every width and removes a second scroll-driven mechanism
 * from a page that already alternates bands.
 */
export const AccueilNeuroGym = () => {
  return (
    <section id="neuro-gym" className="w-full bg-msk-night-950 py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[1.5rem]">
            <Image
              src="/neuro-gym.jpg"
              alt="Séance de Neuro-Gym au centre MSK"
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="h-[26rem] w-full object-cover sm:h-[32rem]"
            />

            {/* Scrim: the photograph is light on the left, where the type sits. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-msk-night-950/65"
            />

            <div className="absolute inset-0 flex items-end p-8 sm:p-12 lg:p-16">
              <div className="max-w-2xl">
                <span className="inline-block rounded-[0.4rem] bg-msk-sun-300 px-3 py-1.5 font-condensed text-sm uppercase tracking-wide text-msk-night-950">
                  Unique au Maroc
                </span>
                <h2 className="mt-5 font-condensed text-[2.25rem] uppercase leading-[0.9] text-white sm:text-[3rem] lg:text-[3.75rem]">
                  La Neuro-Gym : quand le corps libère l&apos;esprit
                </h2>
                <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/90 md:text-lg">
                  Des exercices ciblés de coordination neuro-motrice qui
                  améliorent l&apos;attention, la mémoire et la régulation
                  émotionnelle.
                </p>
                <Link
                  href="/notre-centre/la-methode"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-body text-sm font-semibold text-msk-night-950 transition-colors hover:bg-msk-cream-200"
                >
                  Voir la méthode
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
