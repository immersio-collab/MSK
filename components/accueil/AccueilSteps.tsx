"use client";

import Image from "next/image";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The method, in the reference's step arrangement: full-bleed bands that
 * alternate background, each pairing a step badge, an oversized condensed
 * headline and a condensed sub-line on the left with an illustration on a flat
 * colour panel on the right.
 *
 * Bands alternate cream / pale-blue, so the boundary between steps is the
 * colour change itself and needs no rule or gap.
 *
 * Numbers, verbs, titles and descriptions are the six steps the home page
 * already carried; only the presentation changed. Illustrations replace the
 * remote Unsplash photographs the previous version hot-linked.
 */
const STEPS = [
  {
    number: "01",
    verb: "Observer",
    title: "L'observation bienveillante",
    description:
      "Identifier avec précision les forces, le profil sensoriel et le style d'apprentissage sans jugement ni étiquette.",
    image: "/Cute baby Peek a boo.svg",
    band: "bg-msk-cream-50",
    panel: "bg-msk-coral-100",
  },
  {
    number: "02",
    verb: "Comprendre",
    title: "L'analyse pluridisciplinaire",
    description:
      "Croiser les regards des éducateurs, psychomotriciens, orthophonistes et de la famille pour cibler les besoins.",
    image: "/Parenting.svg",
    band: "bg-msk-blue-50",
    panel: "bg-msk-blue-200",
  },
  {
    number: "03",
    verb: "Adapter",
    title: "L'environnement sur-mesure",
    description:
      "Ajuster le matériel sensoriel Montessori, les rythmes et les supports pédagogiques au profil unique de l'enfant.",
    image: "/Colorful abacus with wooden frame.svg",
    band: "bg-msk-cream-50",
    panel: "bg-msk-sun-200",
  },
  {
    number: "04",
    verb: "Rééduquer",
    title: "La Neuro-Gym & la remédiation",
    description:
      "Stimuler les connexions neuro-motrices, réguler l'attention et libérer le potentiel cognitif de l'apprenant.",
    image: "/kid swing.svg",
    band: "bg-msk-blue-50",
    panel: "bg-msk-coral-200",
  },
  {
    number: "05",
    verb: "Accompagner",
    title: "Le lien continu avec la famille",
    description:
      "Un dialogue transparent et des bilans réguliers pour co-construire chaque progrès au quotidien.",
    image: "/kids playing - kidcare.svg",
    band: "bg-msk-cream-50",
    panel: "bg-msk-blue-100",
  },
  {
    number: "06",
    verb: "Insérer",
    title: "L'insertion scolaire et sociale",
    description:
      "Développer l'autonomie et la confiance en soi pour une intégration sereine et pérenne.",
    image: "/Graduation.svg",
    band: "bg-msk-blue-50",
    panel: "bg-msk-sun-100",
  },
];

export const AccueilSteps = () => {
  return (
    <div id="methode">
      {/* Intro band, on the same cream as the first step so the two read as one run. */}
      <section className="w-full bg-msk-cream-50 pt-24 md:pt-32">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <FadeUp>
            <span className="inline-block rounded-[0.4rem] bg-msk-sun-200 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
              Notre pédagogie
            </span>
            <h2 className="mt-6 max-w-3xl font-display text-[1.875rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2.5rem] lg:text-[3rem]">
              La méthode en 6 étapes
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-msk-night-800 md:text-lg">
              Un cheminement structuré pour accompagner l&apos;enfant de ses
              premiers blocages jusqu&apos;à son autonomie.
            </p>
          </FadeUp>
        </div>
      </section>

      {/*
        The steps stack rather than scroll past: every band is `sticky top-0`
        inside this one container, so each pins at the top of the viewport and
        the next slides up and covers it. Later siblings paint over earlier
        ones, which is what makes the covering work — no z-index needed, and no
        JavaScript at all.

        Two things this depends on:
        - each band must be viewport-tall, or the next one starts covering
          before the current is fully read;
        - each band must have an OPAQUE background. A transparent one would let
          the pinned band underneath show through.

        It also needs no ancestor to be a scroll container: `overflow: hidden`
        anywhere above would silently kill the sticky. `app/page.tsx` uses
        `overflow-x-clip` precisely because `clip` does not create one.
      */}
      {STEPS.map((step) => (
        <section
          key={step.number}
          className={`sticky top-0 w-full ${step.band}`}
        >
          <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
            <div className="grid min-h-screen grid-cols-1 items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
              <FadeUp>
                <div>
                  <span className="inline-block rounded-[0.4rem] bg-white px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950 shadow-sm">
                    Étape {step.number} · {step.verb}
                  </span>
                  <h3 className="mt-5 max-w-xl font-display text-[1.625rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2rem] lg:text-[2.25rem]">
                    {step.title}
                  </h3>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-msk-night-800 md:text-lg">
                    {step.description}
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.12}>
                <div
                  className={`relative flex h-[18rem] items-center justify-center overflow-hidden rounded-[1.25rem] md:h-[22rem] ${step.panel}`}
                >
                  <Image
                    src={step.image}
                    alt=""
                    aria-hidden
                    width={420}
                    height={420}
                    className="h-full w-full object-contain p-10"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
