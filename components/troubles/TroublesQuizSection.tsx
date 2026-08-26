"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, HeartHandshake, RotateCcw, Sprout } from "lucide-react";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { MorphButton } from "@/components/motion/MorphButton";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/common/Eyebrow";

gsap.registerPlugin(ScrollTrigger);

// Confettis du résultat : canvas + rAF, chargés dynamiquement — inutiles côté
// serveur et hors du bundle initial tant que le quiz n'est pas terminé.
const ConfettiParticles = dynamic(
  () => import("@/components/troubles/ConfettiParticles").then((m) => m.ConfettiParticles),
  { ssr: false },
);

type Question = { id: number; text: string };

const QUESTIONS: Question[] = [
  { id: 1, text: "Votre enfant a-t-il quitté l'école, ou s'y rend-il de plus en plus difficilement ?" },
  { id: 2, text: "Est-il sans code Massar, ou son niveau scolaire est-il en décalage avec son âge ?" },
  { id: 3, text: "Une école a-t-elle refusé de l'accueillir à cause de sa santé — diabète, épilepsie ?" },
];

type StepStatus = "done" | "current" | "todo";

const STEP_LABEL: Record<StepStatus, string> = {
  done: "répondue",
  current: "en cours",
  todo: "à venir",
};

const SPRING = { type: "spring", stiffness: 300, damping: 20 } as const;

export function TroublesQuizSection() {
  const root = useRef<HTMLElement>(null);
  const sun = useRef<HTMLImageElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // La carte elle-même n'est animée par personne d'autre : ses enfants
      // framer-motion (badges, panneaux AnimatePresence) sont des éléments
      // distincts, donc aucun conflit de bibliothèque.
      //
      // `from` + immediateRender:false : si le tween ne part jamais, la carte
      // reste droite et pleine taille plutôt que bloquée à scale 0.94 / opacity 0.
      gsap.from(".quiz-card", {
        y: 48,
        rotate: -2.2,
        scale: 0.94,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        immediateRender: false,
        scrollTrigger: { trigger: ".quiz-card", start: "top 85%" },
      });

      gsap.from(".quiz-heading > *", {
        y: 26,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: ".quiz-heading", start: "top 88%" },
      });

      // Parallaxe du soleil : `to` depuis sa position naturelle, donc rien
      // n'est déplacé tant que le scroll ne commence pas. Ses rayons tournent
      // déjà d'eux-mêmes (SMIL dans le SVG).
      if (sun.current) {
        gsap.to(sun.current, {
          yPercent: 55,
          xPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const answer = (value: boolean) => {
    setAnswers((previous) => [...previous, value]);
    setCurrentStep((step) => step + 1);
  };

  const reset = () => {
    setAnswers([]);
    setCurrentStep(0);
  };

  const isFinished = currentStep >= QUESTIONS.length;
  const question = QUESTIONS[currentStep];
  const positive = answers.some(Boolean);

  return (
    <section
      ref={root}
      // Même bleu que le ciel du hero : la page n'a qu'un seul ciel.
      //
      // `lg:screen-section` : une fenêtre pile. La section mesurait 865px, dont
      // 272px de marge haut/bas — la marge la plus large du site, et à elle
      // seule le dépassement. Elle suit maintenant la fenêtre.
      className="relative overflow-hidden bg-msk-blue-300 py-[clamp(2.5rem,7svh,4.5rem)] lg:screen-section"
    >
      {/* Soleil + nuages. Le soleil est un SVG auto-animé (plain <img> : next/image
          l'aplatirait), poussé par le scroll ; les nuages dérivent en continu. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          ref={sun}
          src="/methode/sun-cloud.svg"
          alt=""
          className="absolute -right-6 top-[10%] w-28 sm:right-[2%] sm:w-44 lg:right-[3%] lg:w-64"
        />
        <CloudDrift
          motion="float"
          shape="b"
          speed={48}
          phase={0.15}
          className="absolute left-0 top-[26%] w-40 text-white md:w-60"
        />
        <CloudDrift
          motion="float"
          shape="a"
          speed={62}
          phase={0.6}
          className="absolute left-0 top-[62%] hidden w-32 text-white lg:block"
        />
      </div>

      <div className="container relative mx-auto max-w-3xl px-4">
        <div className="quiz-heading mx-auto mb-[clamp(1.25rem,3.5svh,2.5rem)] max-w-2xl text-center">
          <Eyebrow className="bg-white text-msk-blue-700 shadow-sm">
            Petit test · 3 questions
          </Eyebrow>
          <h2 className="mt-5 font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-5xl md:text-6xl">
            {/* coral-800 et non 700 : ce titre est posé sur le ciel, pas sur
                le crème — 5:1 au lieu de 3.9:1. */}
            Mon enfant a-t-il besoin de <span className="text-msk-coral-800">MSK</span> ?
          </h2>
          <p className="mt-5 text-base text-msk-night-800 md:text-lg">
            Trois questions rapides pour savoir si notre approche peut aider votre enfant.
          </p>
        </div>

        <div className="relative">
          <div className="quiz-card relative overflow-hidden rounded-[1.75rem] bg-white px-6 py-8 shadow-2xl shadow-msk-night-900/15 md:px-12 md:py-10">
            {isFinished ? <ConfettiParticles count={28} className="opacity-90" /> : null}

            <div className="relative">
              {/* Badges d'étapes : coral = en cours, sun + coche = répondue, crème = à venir. */}
              <ol className="flex items-center justify-center" aria-label="Progression du test">
                {QUESTIONS.map((q, i) => {
                  const status: StepStatus = i < currentStep ? "done" : i === currentStep ? "current" : "todo";
                  return (
                    <li key={q.id} className="flex items-center">
                      {i > 0 ? (
                        <span
                          aria-hidden
                          className={cn(
                            "mx-2.5 w-8 border-t-2 border-dashed sm:mx-3 sm:w-12",
                            i <= currentStep ? "border-msk-sun-400" : "border-msk-cream-300",
                          )}
                        />
                      ) : null}
                      <motion.span
                        aria-current={status === "current" ? "step" : undefined}
                        initial={false}
                        animate={{ scale: status === "current" ? 1.15 : 1 }}
                        transition={SPRING}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold",
                          status === "current" && "bg-msk-coral-600 text-white shadow-lg shadow-msk-coral-600/30",
                          status === "done" && "bg-msk-sun-300 text-msk-coral-700",
                          status === "todo" && "bg-msk-cream-200 text-msk-night-700",
                        )}
                      >
                        {status === "done" ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : i + 1}
                        <span className="sr-only">
                          {" "}
                          Question {i + 1}, {STEP_LABEL[status]}
                        </span>
                      </motion.span>
                    </li>
                  );
                })}
              </ol>

              {/* Région live persistante : le résultat est annoncé aux lecteurs
                  d'écran sans que la région elle-même ait à apparaître. */}
              <div aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                {!isFinished && question ? (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-8 text-center"
                  >
                    <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-coral-700">
                      Question {currentStep + 1} / {QUESTIONS.length}
                    </span>
                    <h3 className="mx-auto mt-3 max-w-xl font-display text-2xl font-semibold leading-[1.2] text-balance text-msk-night-900 md:text-[2rem]">
                      {question.text}
                    </h3>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                      <MorphButton
                        onClick={() => answer(true)}
                        maxDiameter="13rem"
                        className="font-semibold text-white"
                        fillClassName="bg-msk-coral-600 shadow-lg shadow-msk-coral-600/25"
                      >
                        Oui, tout à fait
                      </MorphButton>
                      <MorphButton
                        onClick={() => answer(false)}
                        maxDiameter="13rem"
                        className="font-semibold text-msk-night-900"
                        fillClassName="border-2 border-msk-cream-300 bg-msk-cream-100"
                      >
                        Non / Pas vraiment
                      </MorphButton>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="mt-8 text-center"
                  >
                    {/* Sticker de résultat : arrive en tournant, se pose légèrement penché. */}
                    <motion.span
                      aria-hidden
                      initial={{ rotate: -30, scale: 0.6 }}
                      animate={{ rotate: -6, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                      className={cn(
                        "mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-lg",
                        positive
                          ? "bg-msk-sun-300 text-msk-coral-700 shadow-msk-sun-500/30"
                          : "bg-msk-blue-100 text-msk-blue-700 shadow-msk-blue-500/20",
                      )}
                    >
                      {positive ? (
                        <Sprout className="h-10 w-10" strokeWidth={2.2} />
                      ) : (
                        <HeartHandshake className="h-10 w-10" strokeWidth={2.2} />
                      )}
                    </motion.span>

                    <h3 className="mx-auto mt-5 max-w-xl font-display text-[1.75rem] font-bold uppercase leading-[0.95] text-msk-night-900 md:text-4xl">
                      {positive ? (
                        <>
                          Votre enfant pourrait bénéficier de{" "}
                          <span className="text-msk-coral-700">MSK</span>
                        </>
                      ) : (
                        <>
                          Chaque enfant est <span className="text-msk-coral-700">unique</span>
                        </>
                      )}
                    </h3>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-msk-night-700">
                      {positive
                        ? "Les difficultés que vous observez sont exactement celles que nous accompagnons au quotidien. Ne restez pas seul(e) face à cette situation."
                        : "Si vous avez le moindre doute, parlons-en : même si ces signes ne sont pas évidents, une évaluation professionnelle peut parfois révéler des besoins spécifiques."}
                    </p>

                    <div className="mt-7 flex justify-center">
                      <MorphButton
                        href="/contact"
                        className="font-semibold text-white"
                        fillClassName="bg-msk-coral-600 shadow-lg shadow-msk-coral-600/25"
                      >
                        Bilan gratuit
                        <ArrowRight className="h-4 w-4" />
                      </MorphButton>
                    </div>
                    <button
                      type="button"
                      onClick={reset}
                      className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-msk-night-700 underline-offset-4 transition-colors hover:text-msk-coral-700 hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-msk-coral-400"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden />
                      Refaire le test
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Emplacement du SVG décoratif (parent & enfant), collé sur le coin
              bas-gauche de la carte. Remplacez le slot par votre <img>, même taille. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -left-3 w-28 sm:-left-8 sm:w-36 md:-bottom-10 md:w-44"
          >
            <img
              src="/parent-enfant.svg"
              alt=""
              className="aspect-square w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
