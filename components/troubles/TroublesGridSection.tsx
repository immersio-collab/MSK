"use client";

import React from "react";

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
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-msk-forest-950 mb-4">
            Les troubles que nous accompagnons
          </h2>
          <p className="text-lg text-msk-forest-700/80 max-w-2xl mx-auto">
            Survolez chaque carte pour découvrir comment l'approche MSK apporte une solution concrète à chaque difficulté.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {troubles.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative h-72 w-full cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div 
                className="w-full h-full transition-transform duration-700 relative shadow-md rounded-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Il faut ajouter le survol via group-hover en CSS ou inline style 
                    Mais Tailwind n'a pas group-hover:rotateY(180deg) par défaut de base sans plugin.
                    On va utiliser un style conditionnel ou juste une classe custom. 
                    Comme on ne peut pas facilement ajouter des classes custom dans le CSS global sans le voir,
                    On va l'ajouter dans l'attribut style avec une astuce CSS ou utiliser Framer Motion pour que ce soit sûr.
                */}
                <div 
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-[#FAF8F5] border border-msk-forest-100 rounded-2xl text-center [backface-visibility:hidden]"
                >
                  <span className="text-5xl mb-4">{item.icon}</span>
                  <h3 className="text-xl font-bold text-msk-forest-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-msk-forest-700/80">{item.description}</p>
                </div>

                <div 
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-msk-coral-500 to-msk-sun-500 rounded-2xl text-center text-white [backface-visibility:hidden]"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="text-3xl mb-3 opacity-90">✨ Ce que MSK fait :</span>
                  <p className="text-base font-medium leading-relaxed">{item.solution}</p>
                </div>
              </div>
              
              {/* Injecting CSS specifically for the hover effect using group-hover */}
              <style jsx>{`
                .group:hover > div {
                  transform: rotateY(180deg);
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
