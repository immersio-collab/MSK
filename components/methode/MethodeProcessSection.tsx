"use client";

import { MorphButton } from "@/components/motion/MorphButton";

import { FadeUp } from "@/components/motion/FadeUp";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The reference's "Get started" beat: a white panel with the invitation and a
 * button on the left, and the numbered path to a first appointment on the right.
 *
 * NOTE — draft copy. The site has no written admissions sequence (there is no
 * /admissions route; admissions CTAs point to /contact). These three steps are
 * a plausible reading of that flow, written to be replaced once the real
 * wording exists.
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
  // coral-50, pas blanc ni crème : le panneau intérieur est blanc et a besoin
  // d'un fond teinté pour se détacher — et le corail est la signature de la page.
  return (
    // `lg:screen-section` : une fenêtre pile, panneau centré dedans. La section
    // ne portait qu'une marge BASSE — le panneau collait donc au haut de l'écran
    // et la section ne faisait que 608px. Les marges sont maintenant symétriques
    // et suivent la fenêtre, et c'est le centrage de l'utilitaire qui répartit
    // le reste.
    <section className="w-full bg-msk-coral-50 py-[clamp(2rem,5svh,4rem)] lg:screen-section">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="relative grid grid-cols-1 gap-12 rounded-[2rem] bg-white px-8 py-[clamp(2rem,6svh,3.5rem)] md:px-14 md:py-[clamp(2.5rem,8svh,5rem)] lg:grid-cols-2 lg:gap-20">
          {/* Sticker à cheval sur l'angle du panneau. -top-7 (28px) reste sous le
              padding minimal de la section (py clamp ≥ 32px) : sans overflow-hidden
              ici, un débord plus haut fuirait sur la Statement au-dessus. lg only —
              sous lg le panneau colle aux bords et le débord droit créerait un
              scroll horizontal. */}
          <Reveal effect="pop" className="pointer-events-none absolute -right-6 -top-7 hidden select-none lg:block">
            <img src="/methode/class-board.svg" alt="" aria-hidden="true" className="w-36 rotate-3 xl:w-40" />
          </Reveal>
          <div className="flex h-full flex-col justify-center">
            <div>
              {/* Titre en plongeon, bouton en pop. */}
              <Reveal effect="drop">
                <h2 className="max-w-md font-display text-3xl font-bold leading-[1.1] text-msk-night-900 md:text-4xl">
                  Nous savons que c&apos;est un grand pas. Nous l&apos;avons rendu
                  aussi simple que possible.
                </h2>
              </Reveal>
              <Reveal effect="pop" as="span" delay={0.15} className="mt-8">
                <MorphButton
                  href="/contact"
                  size="sm"
                  className="px-7 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
                  fillClassName="bg-msk-coral-600"
                >
                  Commencer
                </MorphButton>
              </Reveal>
            </div>
          </div>

          <ol className="flex flex-col gap-10">
            {PROCESS.map((step, index) => (
              // Farandole : la rangée monte, sa pastille numérotée gonfle en
              // pop juste après — deux mouvements emboîtés, un temps par étape.
              <FadeUp key={step.id} delay={0.1 + index * 0.12}>
                <li className="flex items-start gap-5">
                  <Reveal
                    effect="pop"
                    as="span"
                    delay={0.2 + index * 0.12}
                    className="shrink-0"
                  >
                    <span
                      aria-hidden
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-msk-sun-300 font-display text-xl font-bold text-msk-coral-700"
                    >
                      {step.id}
                    </span>
                  </Reveal>
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
