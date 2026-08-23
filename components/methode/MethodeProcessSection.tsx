"use client";

import { MorphButton } from "@/components/motion/MorphButton";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The reference's "Get started" beat: a white panel with the invitation and a
 * button on the left, and the numbered path to a first appointment on the right.
 *
 * NOTE — draft copy. The site has no written admissions sequence yet
 * (`app/admissions/page.tsx` is still a section skeleton, and its "Les 4 Étapes
 * de l'Admission" block is empty). These three steps are a plausible reading of
 * that flow, written to be replaced once the real wording exists.
 */
const PROCESS = [
  {
    id: "1",
    title: "Prenez rendez-vous",
    description:
      "Un premier échange, sans engagement, pour comprendre votre situation et répondre à vos questions.",
  },
  {
    id: "2",
    title: "Le bilan d'évaluation",
    description:
      "Notre équipe pluridisciplinaire observe votre enfant et croise ses constats avec votre témoignage de parent.",
  },
  {
    id: "3",
    title: "Un programme sur-mesure",
    description:
      "Nous construisons le parcours avec vous, puis l'ajustons au fil des progrès de votre enfant.",
  },
];

export const MethodeProcessSection = () => {
  return (
    <section className="w-full bg-msk-cream-200 pb-24 md:pb-32">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 rounded-[2rem] bg-white px-8 py-14 md:px-14 md:py-20 lg:grid-cols-2 lg:gap-20">
          <FadeUp className="flex h-full flex-col justify-center">
            <div>
              <h2 className="max-w-md font-display text-3xl font-bold leading-[1.1] text-msk-night-900 md:text-4xl">
                Nous savons que c&apos;est un grand pas. Nous l&apos;avons rendu
                aussi simple que possible.
              </h2>
              <MorphButton
                href="/contact"
                size="sm"
                className="mt-8 px-7 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
                fillClassName="bg-msk-blue-700 group-hover:bg-msk-blue-800"
              >
                Commencer
              </MorphButton>
            </div>
          </FadeUp>

          <ol className="flex flex-col gap-10">
            {PROCESS.map((step, index) => (
              <FadeUp key={step.id} delay={0.1 + index * 0.1}>
                <li className="flex items-start gap-5">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-msk-sun-300 font-display text-xl font-bold text-msk-coral-700"
                  >
                    {step.id}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-msk-night-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-snug text-msk-night-700">
                      {step.description}
                    </p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
