"use client";

import Link from "next/link";
import Image from "next/image";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Section déclaration oversized — calquée sur MethodeStatementSection.
 *
 * Gauche : citation engagée en font-display oversized.
 * Droite : corps de texte, CTA circulaire vers /admissions, photo arrondie.
 */
export const ProgrammesStatementSection = () => {
  return (
    <section className="w-full bg-msk-cream-200 py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <FadeUp>
          <h2 className="font-display text-[2.5rem] font-bold uppercase leading-[0.88] tracking-tight text-msk-blue-800 sm:text-6xl lg:text-7xl">
            Un programme conçu autour de chaque enfant, pas l&apos;inverse.
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-10">
          <FadeUp delay={0.1}>
            <p className="text-lg font-medium leading-relaxed text-msk-night-800">
              Chez MSK, le programme s&apos;adapte à l&apos;enfant — et non
              l&apos;inverse. Chaque parcours est construit sur mesure, révisé
              au fil des progrès, et porté par une équipe pluridisciplinaire qui
              connaît votre enfant par son prénom.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Link
              href="/admissions"
              className="flex h-36 w-36 items-center justify-center rounded-full bg-msk-coral-600 px-4 text-center font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-transform hover:scale-105"
            >
              Demander une inscription
            </Link>
          </FadeUp>

          <div className="relative h-56 w-full overflow-hidden rounded-3xl md:h-64">
            <Image
              src="/materrnelle.jpg"
              alt="Classe maternelle MSK"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
