"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


import { FadeUp } from "@/components/motion/FadeUp";
import { Reveal } from "@/components/motion/Reveal";
import { PROGRAMMES } from "@/lib/data/programmes";

/**
 * The two profiles MSK accueille, as the reference's tilted cards: each sits at
 * a slight angle and straightens on hover.
 *
 * Identity (title, age, image) comes from PROGRAMMES — the same two
 * `/programmes` offers. Do not add an older bracket here without a programme
 * to send it to. Quotes, copy and card looks are this surface's own.
 */
const EXTRAS = [
  {
    quote: "« Aucune école n'a voulu l'inscrire »",
    description:
      "Sans code Massar, diabète, épilepsie : nous l'accueillons sans condition, avec douceur.",
    card: "bg-msk-coral-100",
    tilt: "-rotate-3",
  },
  {
    quote: "« Il ne veut plus y retourner »",
    description:
      "Décrochage, refus de l'école, retard accumulé. Nous reconstruisons sa confiance pas à pas.",
    card: "bg-msk-blue-200",
    tilt: "rotate-2",
  },
];

const PROFILES = PROGRAMMES.map((programme, index) => ({
  ...programme,
  ...EXTRAS[index],
}));

export const AccueilPourQui = () => {
  return (
    <section
      id="programmes"
      // `lg:screen-section` : une fenêtre pile. La section mesurait 1106px, dont
      // 256px de marge et 320px pour la seule photo de chaque carte. Marge,
      // rythme et photo suivent maintenant la fenêtre.
      className="relative w-full bg-msk-blue-50 py-[clamp(1.25rem,3svh,4rem)] lg:screen-section"
    >
      {/* Moitié droite de l'en-tête (titre calé à gauche) — section pincée à
          l'écran : absolu strict, et à distance des cartes inclinées (~12px de
          débord de transform). */}
      <Reveal effect="pop" className="pointer-events-none absolute right-[6%] top-[17%] hidden lg:block">
        <img src="/abc-blocks.webp" alt="" aria-hidden="true" width={288} height={288} loading="lazy" className="w-36 rotate-2" />
      </Reveal>
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/* La grammaire de la boîte : badge en pop, titre en plongeon, texte
            en montée — trois éléments, trois mouvements, jamais le même. */}
        <Reveal effect="pop" as="span">
          <span className="inline-block rounded-[0.4rem] bg-msk-sun-200 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
            Maternelle &amp; Primaire
          </span>
        </Reveal>
        <Reveal effect="drop" delay={0.08}>
          <h2 className="mt-[clamp(0.75rem,3svh,1.5rem)] max-w-3xl font-display text-[1.875rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2.5rem] lg:text-[3rem]">
            Nos programmes
          </h2>
        </Reveal>
        <FadeUp delay={0.16}>
          <p className="mt-[clamp(0.75rem,3svh,1.5rem)] max-w-xl text-base leading-relaxed text-msk-night-800 md:text-lg">
            Deux parcours, un même principe : le cadre s&apos;adapte à
            l&apos;enfant, jamais l&apos;inverse. Chacun avance à son rythme,
            avec les thérapies dont il a besoin intégrées à sa journée.
          </p>
        </FadeUp>

        <ul className="mt-[clamp(1.25rem,4svh,4rem)] grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {PROFILES.map((profile, index) => (
            <li key={profile.id}>
              {/* Glissade opposée : la carte de gauche entre par la gauche,
                  celle de droite par la droite — elles se rejoignent au milieu. */}
              <Reveal
                effect={index === 0 ? "slide-left" : "slide-right"}
                delay={0.1 * index}
              >
                <Link
                  href="/programmes"
                  className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] transition-[rotate,box-shadow] duration-300 hover:rotate-0 hover:shadow-xl ${profile.tilt} ${profile.card}`}
                >
                  <div className="relative h-[16rem] w-full sm:h-[clamp(10rem,24svh,20rem)]">
                    <Image
                      src={profile.image}
                      alt={`Programme ${profile.title}`}
                      fill
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-[clamp(1.25rem,3.5svh,2rem)]">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-[1.5rem] font-bold uppercase leading-tight text-msk-night-950">
                        {profile.title}
                      </h3>{" "}
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-msk-night-800">
                        {profile.age}
                      </span>
                    </div>

                    <p className="mt-[clamp(0.5rem,2svh,1rem)] font-display text-base font-semibold uppercase leading-snug text-msk-coral-700">
                      {profile.quote}
                    </p>
                    <p className="mt-[clamp(0.5rem,2svh,1rem)] text-base leading-relaxed text-msk-night-800">
                      {profile.description}
                    </p>

                    <span className="mt-[clamp(1rem,3svh,2rem)] inline-flex items-center gap-2 text-sm font-semibold text-msk-night-950">
                      Découvrir le programme
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
