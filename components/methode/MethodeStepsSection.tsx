"use client";

import Script from "next/script";

import { MethodeCardLottie } from "@/components/methode/MethodeCardLottie";
import { MethodeCardMotif } from "@/components/methode/MethodeCardMotif";
import { useScrollStepIndex } from "@/hooks/use-scroll-step-index";

interface Step {
  id: string;
  title: string;
  description: string;
  /** Card fill, its title colour, and its body colour — all brand tokens. */
  card: string;
  titleTone: string;
  bodyTone: string;
  /** Fill of the section behind the deck while this card is in front. */
  stage: string;
  /** When set, this card's mark is a Lottie instead of the inline SVG motif. */
  lottie?: string;
}

/** Loaded once for the whole section, not per card. */
const DOTLOTTIE_PLAYER =
  "https://unpkg.com/@lottiefiles/dotlottie-wc@0.7.1/dist/dotlottie-wc.js";

/**
 * Copy is unchanged from the previous timeline; only the presentation differs.
 * Each card pairs a bold fill with a contrasting title, the way the reference
 * alternates its service cards.
 */
const STEPS: Step[] = [
  {
    id: "01",
    title: "Observer",
    description:
      "Avant toute chose, nous observons. Pas de tests standardisés froids. Nos éducateurs passent du temps avec votre enfant dans un environnement naturel pour identifier ses forces, ses sensibilités sensorielles et son style d'apprentissage unique.",
    // Dark fill on purpose. This card's mark is the Lottie, whose colours are
    // baked into the JSON (#fdcb40 / #fff9dd); on the sun-400 fill this card
    // used to have, the yellow measured 1.07:1 against the background — the
    // animation was invisible. A near-black card lets it read.
    card: "bg-msk-night-950",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-cream-100",
    lottie:
      "https://maximatherapy.com/assets/lottie/0Program2/0Program2-icons/01.json",
  },
  {
    id: "02",
    title: "Comprendre",
    description:
      "Notre équipe pluridisciplinaire — éducateurs Montessori, psychomotriciens, orthophonistes — croise ses observations avec votre témoignage de parent. Ensemble, nous construisons un portrait complet et bienveillant de votre enfant.",
    card: "bg-msk-blue-700",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-white",
    stage: "bg-msk-blue-50",
  },
  {
    id: "03",
    title: "Adapter",
    description:
      "L'environnement, le matériel, le rythme : tout est ajusté. Le matériel sensoriel Montessori est personnalisé, les séances sont calibrées, les supports pédagogiques sont conçus sur-mesure.",
    card: "bg-white",
    titleTone: "text-msk-coral-600",
    bodyTone: "text-msk-night-700",
    stage: "bg-msk-cream-200",
  },
  {
    id: "04",
    title: "Rééduquer",
    description:
      "Grâce à la Neuro-Gym et à la rééducation ciblée, nous stimulons les connexions neuro-motrices, régulons l'attention et libérons le potentiel cognitif. Des exercices concrets, mesurables, qui changent la vie.",
    card: "bg-msk-coral-600",
    titleTone: "text-msk-sun-200",
    bodyTone: "text-white",
    stage: "bg-msk-coral-50",
  },
  {
    id: "05",
    title: "Accompagner",
    description:
      "Vous n'êtes jamais seuls. Des bilans réguliers, un dialogue transparent, une équipe disponible. Nous co-construisons chaque progrès avec vous, au quotidien.",
    card: "bg-msk-night-900",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-cream-100",
  },
  {
    id: "06",
    title: "Insérer",
    description:
      "L'objectif final : l'autonomie. Que ce soit l'intégration dans une école classique, une formation professionnelle ou simplement la confiance en soi — nous préparons votre enfant à voler de ses propres ailes.",
    card: "bg-msk-cream-200",
    titleTone: "text-msk-blue-800",
    bodyTone: "text-msk-night-800",
    stage: "bg-msk-sun-50",
  },
];

/** Scroll distance, in vh, that each card holds the stage. */
const STEP_VH = 62;

/**
 * Resting tilt by position in the stack. Index 0 is the front card and stays at
 * 0° so its copy reads straight; the rest fan out alternately so their corners
 * show past the card in front.
 */
const FAN_ANGLES = [0, 7, -6, 10, -9, 4];

export const MethodeStepsSection = () => {
  const { ref, active } = useScrollStepIndex<HTMLDivElement>();

  return (
    <section
      id="etapes"
      className={`relative w-full transition-colors duration-700 ${STEPS[active].stage}`}
    >
      {/* Registers <dotlottie-wc>. Only cards with a `lottie` use it, and the
          deck and the mobile stack share this one load. */}
      {STEPS.some((step) => step.lottie) && (
        <Script
          src={DOTLOTTIE_PLAYER}
          type="module"
          strategy="afterInteractive"
          // A cross-origin module is always fetched in CORS mode, so without
          // this the emitted <link rel="preload"> mismatches and is thrown
          // away — the browser then downloads the script a second time.
          crossOrigin="anonymous"
        />
      )}

      {/* ---------- Sticky flip deck (lg and up) ---------- */}
      <div
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `${STEPS.length * STEP_VH}vh` }}
      >
        {/* Sentinel bands: contiguous, one per card. Geometry only, no paint. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              data-step-index={index}
              className="absolute inset-x-0"
              style={{ top: `${index * STEP_VH}vh`, height: `${STEP_VH}vh` }}
            />
          ))}
        </div>

        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* Step counter, mirroring the reference's fixed corner label. */}
          {/* Full-strength night-700, not /60: at 14px this needs 4.5:1 and the
              60% tint only reaches 3.51 against the pale stage fills. */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-night-700">
            <span className="block text-6xl leading-none text-msk-night-900">
              {STEPS[active].id}
            </span>
            <span className="mt-2 block">/ {STEPS.length} étapes</span>
          </div>

          <div className="relative h-[30rem] w-[27rem]">
            {STEPS.map((step, index) => {
              const offset = index - active;
              const done = offset < 0;

              // The front card sits square-on so its copy stays readable; the
              // ones still to come fan out behind it by stack position, not by
              // card, so the arrangement holds as the deck advances. Spent
              // cards tumble up out of the sticky frame.
              // -170%, not -135%: the card starts centred in a viewport-tall
              // frame, so it has to travel its own half-height plus half the
              // frame — and the tilt adds a little more — before its lowest
              // corner clears the top edge. Anything less fades out in view.
              const transform = done
                ? `translateY(-170%) rotate(-14deg)`
                : `rotate(${FAN_ANGLES[offset % FAN_ANGLES.length]}deg)`;

              return (
                <article
                  key={step.id}
                  aria-hidden={offset !== 0}
                  className={`absolute inset-0 flex flex-col items-center justify-between rounded-[1.75rem] p-9 text-center shadow-2xl transition-all duration-700 ease-out ${step.card}`}
                  style={{
                    transform,
                    opacity: done ? 0 : 1,
                    zIndex: STEPS.length - offset,
                  }}
                >
                  <div>
                    {/* Body tone, not titleTone: at 14px this is normal-size
                        text and needs 4.5:1, which the title colours miss on
                        the blue and coral fills. */}
                    <span
                      className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${step.bodyTone}`}
                    >
                      Étape {step.id}
                    </span>
                    <h3
                      className={`mt-2 font-display text-[1.75rem] font-bold leading-[1.15] ${step.titleTone}`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {step.lottie ? (
                    <MethodeCardLottie src={step.lottie} className="h-24 w-24" />
                  ) : (
                    <MethodeCardMotif
                      delay={`${index * -4}s`}
                      className={`h-24 w-24 ${step.titleTone}`}
                    />
                  )}

                  <p
                    className={`text-[0.95rem] font-medium leading-snug ${step.bodyTone}`}
                  >
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Plain stack (below lg) ---------- */}
      <div className="mx-auto max-w-md px-6 py-20 sm:px-10 lg:hidden">
        <ul className="flex flex-col gap-6">
          {STEPS.map((step, index) => (
            <li
              key={step.id}
              className={`flex flex-col items-center gap-6 rounded-[1.75rem] p-8 text-center shadow-lg ${step.card}`}
            >
              <div>
                <span
                  className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${step.bodyTone}`}
                >
                  Étape {step.id}
                </span>
                <h3
                  className={`mt-2 font-display text-[1.75rem] font-bold leading-[1.15] ${step.titleTone}`}
                >
                  {step.title}
                </h3>
              </div>

              {step.lottie ? (
                <MethodeCardLottie src={step.lottie} className="h-24 w-24" />
              ) : (
                <MethodeCardMotif
                  delay={`${index * -4}s`}
                  className={`h-24 w-24 ${step.titleTone}`}
                />
              )}

              <p
                className={`text-[0.95rem] font-medium leading-snug ${step.bodyTone}`}
              >
                {step.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
