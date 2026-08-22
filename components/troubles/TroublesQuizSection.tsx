"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/motion/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: "Votre enfant a-t-il des difficultés à se concentrer plus de 10 minutes ou à rester en place ?" },
  { id: 2, text: "Avez-vous remarqué des difficultés d'apprentissage (lecture, écriture, calcul) ou un retard de langage ?" },
  { id: 3, text: "Rencontre-t-il des difficultés d'intégration scolaire, de sociabilisation, ou a-t-il été réorienté ?" },
];

export const TroublesQuizSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // La carte elle-même n'est animée par personne d'autre : ses enfants
      // framer-motion (barre de progression, panneaux AnimatePresence) sont des
      // éléments distincts, donc aucun conflit de bibliothèque.
      //
      // `from` + immediateRender:false : si le tween ne part jamais, la carte
      // reste droite et pleine taille plutôt que bloquée à scale 0.9 / opacity 0.
      gsap.from(".quiz-card", {
        y: 48,
        rotate: -2.2,
        scale: 0.94,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
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
    }, el);

    return () => ctx.revert();
  }, []);

  const handleAnswer = (answer: boolean) => {
    setAnswers([...answers, answer]);
    setCurrentStep(currentStep + 1);
  };

  const progress = (currentStep / questions.length) * 100;
  const isFinished = currentStep === questions.length;

  const hasPositiveAnswers = answers.some((a) => a === true);

  return (
    <section ref={root} className="py-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="quiz-heading text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-msk-night-900 mb-4">
            Mon enfant a-t-il besoin de MSK ?
          </h2>
          <p className="text-lg text-msk-night-700/80">
            Faites ce petit test rapide de 3 questions pour savoir si notre approche pourrait aider votre enfant.
          </p>
        </div>

        <div className="quiz-card bg-white rounded-3xl p-8 md:p-12 shadow-xs border border-msk-cream-200 relative overflow-hidden min-h-[350px] flex flex-col justify-center">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
            <motion.div 
              className="h-full bg-linear-to-r from-msk-coral-500 to-msk-sun-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <span className="text-sm font-bold text-slate-600 mb-4 block">
                  Question {currentStep + 1} / {questions.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-msk-night-900 mb-10">
                  {questions[currentStep].text}
                </h3>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="px-8 py-4 rounded-xl bg-[#FAF8F5] border-2 border-msk-cream-300 hover:border-msk-coral-400 hover:bg-msk-coral-50 text-msk-night-900 font-bold transition-all text-lg"
                  >
                    Oui, tout à fait
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="px-8 py-4 rounded-xl bg-[#FAF8F5] border-2 border-msk-cream-300 hover:border-msk-cream-300 hover:bg-gray-50 text-msk-night-900 font-bold transition-all text-lg"
                  >
                    Non / Pas vraiment
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-msk-sun-100 text-msk-sun-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  {hasPositiveAnswers ? "🌱" : "✨"}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-msk-night-900 mb-4">
                  {hasPositiveAnswers 
                    ? "Votre enfant pourrait bénéficier d'un accompagnement MSK."
                    : "Chaque enfant est unique. Si vous avez le moindre doute, parlons-en."}
                </h3>
                <p className="text-lg text-msk-night-700/80 mb-8 max-w-2xl mx-auto">
                  {hasPositiveAnswers 
                    ? "Les difficultés que vous observez sont exactement celles que nous accompagnons au quotidien. Ne restez pas seul(e) face à cette situation."
                    : "Même si ces signes ne sont pas évidents, une évaluation professionnelle peut parfois révéler des besoins spécifiques."}
                </p>
                <div className="flex justify-center">
                  <Link href="/contact">
                    <MagneticButton className="bg-msk-night-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-msk-night-800 transition-colors">
                      Prendre RDV pour un bilan gratuit
                    </MagneticButton>
                  </Link>
                </div>
                <button 
                  onClick={() => {
                    setCurrentStep(0);
                    setAnswers([]);
                  }}
                  className="mt-6 text-sm text-slate-600 hover:text-msk-coral-500 underline"
                >
                  Refaire le quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
