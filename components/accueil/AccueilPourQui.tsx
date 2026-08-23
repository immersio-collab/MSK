"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The two profiles MSK accueille, as the reference's tilted cards: each sits at
 * a slight angle and straightens on hover.
 *
 * Only Maternelle and Primaire — the same two `/programmes` offers. Do not add
 * an older bracket here without a programme to send it to.
 */
const PROFILES = [
  {
    id: "maternelle",
    title: "Maternelle",
    age: "2-5 ans",
    quote: "« Mon enfant ne parle pas encore comme les autres »",
    description:
      "Retard de langage, difficultés de socialisation, éveil sensoriel. Nous l'accueillons avec douceur.",
    image: "/maternelle1.jpg",
    card: "bg-msk-coral-100",
    tilt: "-rotate-3",
  },
  {
    id: "primaire",
    title: "Primaire",
    age: "6-11 ans",
    quote: "« L'école classique ne lui convient plus »",
    description:
      "TDAH, dyslexie, dyscalculie, rejet scolaire. Nous reconstruisons sa confiance pas à pas.",
    image: "/primaire1.webp",
    card: "bg-msk-blue-200",
    tilt: "rotate-2",
  },
];

export const AccueilPourQui = () => {
  return (
    <section id="programmes" className="w-full bg-msk-blue-50 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <FadeUp>
          <span className="inline-block rounded-[0.4rem] bg-msk-coral-200 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
            Maternelle &amp; Primaire
          </span>
          <h2 className="mt-6 max-w-3xl font-display text-[1.875rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2.5rem] lg:text-[3rem]">
            Nos programmes
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-msk-night-800 md:text-lg">
            Deux parcours, un même principe : le cadre s&apos;adapte à
            l&apos;enfant, jamais l&apos;inverse. Chacun avance à son rythme,
            avec les thérapies dont il a besoin intégrées à sa journée.
          </p>
        </FadeUp>

        <ul className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          {PROFILES.map((profile, index) => (
            <li key={profile.id}>
              <FadeUp delay={0.12 * index}>
                <Link
                  href="/programmes"
                  className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] transition-[rotate,box-shadow] duration-300 hover:rotate-0 hover:shadow-xl ${profile.tilt} ${profile.card}`}
                >
                  <div className="relative h-[16rem] w-full sm:h-[20rem]">
                    <Image
                      src={profile.image}
                      alt={`Programme ${profile.title}`}
                      fill
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-[1.5rem] font-bold uppercase leading-tight text-msk-night-950">
                        {profile.title}
                      </h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-msk-night-800">
                        {profile.age}
                      </span>
                    </div>

                    <p className="mt-4 font-display text-base font-semibold uppercase leading-snug text-msk-coral-700">
                      {profile.quote}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-msk-night-800">
                      {profile.description}
                    </p>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-msk-night-950">
                      Découvrir le programme
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
