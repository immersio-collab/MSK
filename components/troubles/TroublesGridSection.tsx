"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TroubleItem {
  title: string;
  icon: string;
  description: string;
  solution: string;
}

const troubles: TroubleItem[] = [
  {
    title: "TDAH",
    icon: "🧠",
    description: "Difficulté d'attention, hyperactivité, impulsivité.",
    solution: "Neuro-Gym + environnement structuré + rythme adapté."
  },
  {
    title: "Dyslexie",
    icon: "📖",
    description: "Difficulté de lecture et d'écriture.",
    solution: "Matériel Montessori sensoriel + remédiation phonologique."
  },
  {
    title: "Dyspraxie",
    icon: "✋",
    description: "Coordination motrice altérée.",
    solution: "Psychomotricité + exercices neuro-moteurs ciblés."
  },
  {
    title: "Dyscalculie",
    icon: "🔢",
    description: "Difficulté avec les nombres et le calcul.",
    solution: "Manipulation concrète Montessori + raisonnement logique."
  },
  {
    title: "TSA (Autisme)",
    icon: "🌈",
    description: "Spectre autistique, difficultés sociales.",
    solution: "Environnement prévisible + supports visuels + socialisation progressive."
  },
  {
    title: "Troubles du langage",
    icon: "💬",
    description: "Retard ou trouble du langage oral.",
    solution: "Orthophonie intégrée + stimulation langagière quotidienne."
  },
  {
    title: "Troubles du comportement",
    icon: "⚡",
    description: "Opposition, colères, anxiété.",
    solution: "Régulation émotionnelle + cadre bienveillant + Neuro-Gym."
  },
  {
    title: "Difficultés scolaires",
    icon: "📉",
    description: "Échec scolaire, décrochage, phobie scolaire.",
    solution: "Remédiation + restauration de la confiance + insertion progressive."
  }
];

export const TroublesGridSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Un seul ScrollTrigger pour toute la section, le stagger fait la
      // séquence — plutôt qu'un trigger par carte.
      //
      // `from` avec immediateRender:false, jamais `fromTo` : l'état de départ
      // n'est écrit qu'au déclenchement. Si gsap ne se charge pas, si une erreur
      // JS survient avant, ou si l'onglet est gelé, les cartes restent
      // simplement visibles et droites au lieu d'être bloquées à opacity 0.
      gsap.from(".troubles-card", {
        y: 56,
        rotate: (i: number) => (i % 2 ? 4.5 : -4.5),
        scale: 0.92,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.07,
        immediateRender: false,
        scrollTrigger: { trigger: ".troubles-grid", start: "top 82%" },
      });

      gsap.from(".troubles-heading > *", {
        y: 28,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: ".troubles-heading", start: "top 88%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="py-20 bg-white" id="troubles">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="troubles-heading text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-msk-night-900 mb-4">
            Les troubles que nous accompagnons
          </h2>
          <p className="text-lg text-msk-night-700/80 max-w-2xl mx-auto">
            Survolez chaque carte pour découvrir comment l&apos;approche MSK apporte une solution concrète à chaque difficulté.
          </p>
        </div>

        <div className="troubles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {troubles.map((item, idx) => (
            // Wrapper neutre : c'est LUI que gsap anime. Le motion.div en
            // dessous possède déjà son `transform` (le flip rotateY de
            // framer-motion) et la règle du projet interdit d'animer un même
            // élément avec les deux bibliothèques.
            <div key={idx} className="troubles-card">
            <motion.div
              className="relative h-72 w-full cursor-pointer"
              style={{ perspective: 1200 }}
              initial="initial"
              whileHover="hover"
              animate="initial"
            >
              <motion.div 
                className="w-full h-full relative shadow-md hover:shadow-xl rounded-2xl transition-shadow duration-300"
                style={{ transformStyle: "preserve-3d" }}
                variants={{
                  initial: { rotateY: 0 },
                  hover: { rotateY: 180 }
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Front Face */}
                <div 
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-[#FAF8F5] border border-msk-cream-200 rounded-2xl text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-5xl mb-4">{item.icon}</span>
                  <h3 className="text-xl font-bold text-msk-night-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-msk-night-700/80">{item.description}</p>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-linear-to-br from-msk-coral-500 to-msk-sun-500 rounded-2xl text-center text-white"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)" 
                  }}
                >
                  <span className="text-3xl mb-3 opacity-90">✨ MSK :</span>
                  <p className="text-base font-medium leading-relaxed">{item.solution}</p>
                </div>
              </motion.div>
            </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
