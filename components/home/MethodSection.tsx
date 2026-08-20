"use client";

import React from "react";
import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import { MethodHoverExpand, MethodStep } from "@/components/home/MethodHoverExpand";
import { MagneticButton } from "@/components/motion/MagneticButton";

const METHOD_STEPS: MethodStep[] = [
  {
    number: "01",
    step: "Observer",
    title: "L'observation bienveillante",
    description:
      "Identifier avec précision les forces, le profil sensoriel et le style d'apprentissage sans jugement ni étiquette.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "02",
    step: "Comprendre",
    title: "L'analyse pluridisciplinaire",
    description:
      "Croiser les regards des éducateurs, psychomotriciens, orthophonistes et de la famille pour cibler les besoins.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "03",
    step: "Adapter",
    title: "L'environnement sur-mesure",
    description:
      "Ajuster le matériel sensoriel Montessori, les rythmes et les supports pédagogiques au profil unique de l'enfant.",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "04",
    step: "Rééduquer",
    title: "La Neuro-Gym & la remédiation",
    description:
      "Stimuler les connexions neuro-motrices, réguler l'attention et libérer le potentiel cognitif de l'apprenant.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "05",
    step: "Accompagner",
    title: "Le lien continu avec la famille",
    description:
      "Un dialogue transparent et des bilans réguliers pour co-construire chaque progrès au quotidien.",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "06",
    step: "Insérer",
    title: "L'insertion scolaire et sociale",
    description:
      "Développer l'autonomie et la confiance en soi pour une intégration sereine et pérenne.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
];

export const MethodSection: React.FC = () => {
  return (
    <section id="methode" className="py-20 md:py-28 relative z-10 bg-[#FAF8F5]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
              Notre pédagogie
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              La méthode en 6 étapes
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Un cheminement structuré pour accompagner l&apos;enfant de ses premiers blocages jusqu&apos;à son autonomie.
            </p>
          </FadeUp>
        </div>

        {/* Skiper52 Hover Expand */}
        <FadeUp delay={0.25} duration={0.5}>
          <MethodHoverExpand steps={METHOD_STEPS} />
        </FadeUp>

        {/* CTA Button */}
        <FadeUp delay={0.4} duration={0.5}>
          <div className="mt-12 md:mt-16 flex justify-center">
            <Link href="/notre-centre/la-methode">
              <MagneticButton
                className="bg-msk-night-900 hover:bg-msk-night-800 text-white font-bold text-sm tracking-wider uppercase rounded-2xl shadow-lg shadow-msk-night-900/20 border-0 px-8 py-4"
                size="lg"
              >
                En savoir plus sur notre méthode
              </MagneticButton>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
