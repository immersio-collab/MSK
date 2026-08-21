"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MethodeLottie } from "@/components/methode/MethodeLottie";

gsap.registerPlugin(ScrollTrigger);

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
  /** Animated mark for this card, from public/methode/lottie. */
  lottie: string;
}

/**
 * Copy is unchanged from the previous timeline; only the presentation differs.
 *
 * Card fills are chosen from what each Lottie mark actually contains, measured
 * by painted area: marks built mainly from black (03, 06) need a light card or
 * they disappear; marks built from yellow, cream and red (01, 02, 04, 05) need
 * a dark one. Getting this backwards is what put card 06's red at 1.28:1.
 */
const STEPS: Step[] = [
  {
    id: "01",
    title: "Observer",
    description:
      "Avant toute chose, nous observons. Pas de tests standardisés froids. Nos éducateurs passent du temps avec votre enfant dans un environnement naturel pour identifier ses forces, ses sensibilités sensorielles et son style d'apprentissage unique.",
    card: "bg-msk-night-950",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-cream-100",
    lottie: "/methode/lottie/card1.json",
  },
  {
    id: "02",
    title: "Comprendre",
    description:
      "Notre équipe pluridisciplinaire — éducateurs Montessori, psychomotriciens, orthophonistes — croise ses observations avec votre témoignage de parent. Ensemble, nous construisons un portrait complet et bienveillant de votre enfant.",
    card: "bg-msk-blue-900",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-white",
    stage: "bg-msk-blue-50",
    lottie: "/methode/lottie/card2.json",
  },
  {
    id: "03",
    title: "Adapter",
    description:
      "L'environnement, le matériel, le rythme : tout est ajusté. Le matériel sensoriel Montessori est personnalisé, les séances sont calibrées, les supports pédagogiques sont conçus sur-mesure.",
    // Light: this mark is 4M px² of black.
    card: "bg-msk-cream-100",
    titleTone: "text-msk-coral-700",
    bodyTone: "text-msk-night-800",
    stage: "bg-msk-cream-200",
    lottie: "/methode/lottie/card3.json",
  },
  {
    id: "04",
    title: "Rééduquer",
    description:
      "Grâce à la Neuro-Gym et à la rééducation ciblée, nous stimulons les connexions neuro-motrices, régulons l'attention et libérons le potentiel cognitif. Des exercices concrets, mesurables, qui changent la vie.",
    card: "bg-msk-coral-900",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-coral-50",
    lottie: "/methode/lottie/card4.json",
  },
  {
    id: "05",
    title: "Accompagner",
    description:
      "Vous n'êtes jamais seuls. Des bilans réguliers, un dialogue transparent, une équipe disponible. Nous co-construisons chaque progrès avec vous, au quotidien.",
    card: "bg-msk-night-800",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-cream-100",
    lottie: "/methode/lottie/card5.json",
  },
  {
    id: "06",
    title: "Insérer",
    description:
      "L'objectif final : l'autonomie. Que ce soit l'intégration dans une école classique, une formation professionnelle ou simplement la confiance en soi — nous préparons votre enfant à voler de ses propres ailes.",
    // Light: this mark is black-dominant too.
    card: "bg-msk-cream-200",
    titleTone: "text-msk-blue-800",
    bodyTone: "text-msk-night-800",
    stage: "bg-msk-sun-50",
    lottie: "/methode/lottie/card6.json",
  },
];

/** Scroll distance, in vh, that each card holds the stage. */
const STEP_VH = 62;

/**
 * Resting tilt per card. Kept small: the reference fans harder, but these cards
 * carry four to six lines of French copy and tilted body text at that length is
 * markedly harder to read.
 */
const FAN_ANGLES = [0, 6, -5, 7, -6, 4];

/** Direction each card tips as it leaves, alternating so exits do not all lean the same way. */
const EXIT_SIGN = [1, -1, 1, -1, 1, -1];

/**
 * How wide each card's exit window is, measured in slots.
 *
 * At 1 the windows would butt up against each other and the deck would step
 * card-by-card. At 1.5 consecutive exits overlap by half a slot, so one card is
 * always beginning to leave before the last has finished — which is what makes
 * the sequence read as continuous rather than as six discrete swaps.
 */
const EXIT_WINDOW = 1.5;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const MethodeStepsSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tiltRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // The deck fans open when it arrives rather than sitting pre-fanned.
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { rotate: 0 },
          {
            rotate: FAN_ANGLES[index] ?? 0,
            delay: 0.5,
            duration: 1.2,
            ease: "elastic.out(2, 0.8)",
            scrollTrigger: { trigger: root, start: "top 80%" },
          },
        );
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const n = STEPS.length;

          STEPS.forEach((_, index) => {
            const from = index / n;
            const to = (index + EXIT_WINDOW) / n;
            const local = clamp01((p - from) / (to - from));

            // gsap.to on every update, rather than writing the value straight
            // in, so each card *damps toward* the scrub position. That lag is
            // where the springiness comes from — setting it directly would feel
            // rigidly welded to the scrollbar.
            gsap.to(cardRefs.current[index], {
              yPercent: -local * 170,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              overwrite: "auto",
            });
            gsap.to(tiltRefs.current[index], {
              rotate: local * 40 * (EXIT_SIGN[index] ?? 1),
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              overwrite: "auto",
            });
          });

          setActive(Math.min(n - 1, Math.floor(p * n)));
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="etapes" className="relative w-full bg-msk-cream-100">
      {/* ---------- Scrubbed deck (lg and up) ---------- */}
      <div
        ref={scrollRef}
        className="relative hidden lg:block"
        style={{ height: `${STEPS.length * STEP_VH}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-night-700">
            <span className="block text-6xl leading-none text-msk-night-900">
              {STEPS[active].id}
            </span>
            <span className="mt-2 block">/ {STEPS.length} étapes</span>
          </div>

          <div className="relative h-[30rem] w-[27rem]">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="absolute inset-0"
                style={{ zIndex: STEPS.length - index }}
              >
                <article
                  ref={(node) => {
                    tiltRefs.current[index] = node;
                  }}
                  className={`flex h-full w-full flex-col items-center justify-between rounded-[1.75rem] p-9 text-center shadow-2xl ${step.card}`}
                >
                  <div>
                    {/* Body tone, not titleTone: at 14px this is normal-size
                        text and needs 4.5:1, which the title colours miss on
                        the lighter fills. */}
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

                  <MethodeLottie src={step.lottie} className="h-24 w-24" />

                  <p
                    className={`text-[0.95rem] font-medium leading-snug ${step.bodyTone}`}
                  >
                    {step.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Plain stack (below lg) ---------- */}
      <div className="mx-auto max-w-md px-6 py-20 sm:px-10 lg:hidden">
        <ul className="flex flex-col gap-6">
          {STEPS.map((step) => (
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

              <MethodeLottie src={step.lottie} className="h-24 w-24" />

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
