"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { FadeUp } from "@/components/motion/FadeUp";

type ProgramId = "maternelle" | "primaire";

interface ProgramData {
  id: ProgramId;
  title: string;
  age: string;
  color: string;
  description: string;
  objectives: string[];
  conditions: string[];
  schedule: string;
  image: string;
}

const programs: ProgramData[] = [
  {
    id: "maternelle",
    title: "Maternelle",
    age: "2-5 ans",
    color: "bg-msk-coral-500",
    description: "Un environnement préparé pour favoriser l'éveil sensoriel, le langage et l'autonomie des tout-petits. Nous respectons le rythme de chaque enfant pour construire des fondations solides.",
    objectives: [
      "Développement de la motricité fine et globale",
      "Éveil sensoriel et découverte du monde",
      "Acquisition du langage oral",
      "Socialisation et gestion des émotions"
    ],
    conditions: ["Retard de langage", "Troubles du spectre autistique (léger)", "Hyperactivité précoce"],
    schedule: "Matinées structurées (Montessori) / Après-midis sieste et jeux libres",
    image: "/maternelle1.jpg",
  },
  {
    id: "primaire",
    title: "Primaire",
    age: "6-11 ans",
    color: "bg-msk-sun-500",
    description: "Une approche pédagogique inclusive visant l'acquisition des fondamentaux (lecture, écriture, calcul) tout en intégrant des séances thérapeutiques spécifiques.",
    objectives: [
      "Acquisition de la lecture et de l'écriture",
      "Développement du raisonnement logique et mathématique",
      "Renforcement de l'estime de soi",
      "Préparation à l'inclusion en milieu scolaire ordinaire"
    ],
    conditions: ["TDAH", "Dyslexie, Dysorthographie", "Dyspraxie", "Dyscalculie"],
    schedule: "Apprentissages cognitifs (matin) / Ateliers thérapeutiques et créatifs (après-midi)",
    image: "/primaire1.webp",
  }
];

export const ProgrammesSelectorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProgramId>("maternelle");

  const activeProgram = programs.find(p => p.id === activeTab)!;

  return (
    <section id="programmes" className="bg-msk-cream-200 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">

        {/* Eyebrow + titre de section */}
        <FadeUp>
          <div className="mb-12 text-center">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-msk-coral-600">
              Nos niveaux
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] text-msk-night-900 md:text-4xl">
              Choisissez le programme de votre enfant
            </h2>
          </div>
        </FadeUp>

        {/*
          Selector Tabs — the one place that deliberately keeps its own button
          instead of `MorphButton`. The active tab is marked by a shared-layout
          `motion.div` that slides between tabs, and it is absolutely positioned
          inside the button: MorphButton's own absolute fill would sit under a
          rectangle that never morphs, so the two indicators fight. Tabs are a
          selection, not an action, and the slide reads better here.
        */}
        <div className="flex flex-col justify-center gap-2 md:flex-row mb-12">
          {programs.map((prog) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(prog.id)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl px-6 py-4 text-base font-bold transition-all md:flex-row md:gap-2 md:rounded-full md:py-3 ${
                activeTab === prog.id
                  ? "text-white shadow-md"
                  : "bg-msk-cream-100 text-msk-night-700 hover:bg-msk-cream-200"
              }`}
            >
              {activeTab === prog.id && (
                <motion.div
                  layoutId="active-program-tab"
                  className={`absolute inset-0 rounded-2xl md:rounded-full ${prog.color}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{prog.title}</span>
              <span className={`relative z-10 rounded-full px-2 py-0.5 text-xs ${activeTab === prog.id ? "bg-white/20" : "bg-msk-cream-300 text-msk-night-700"}`}>
                {prog.age}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[500px] overflow-hidden rounded-3xl border border-msk-cream-300 bg-msk-cream-50 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgram.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col lg:flex-row"
            >
              {/* Left: Text Content */}
              <div className="flex flex-col justify-between p-8 md:p-12 lg:w-1/2">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${activeProgram.color}`} />
                    <h3 className="text-3xl font-bold text-msk-night-900">{activeProgram.title}</h3>
                    <span className="rounded-full border border-msk-cream-300 bg-white px-3 py-1 text-sm font-bold text-slate-600 shadow-xs">
                      {activeProgram.age}
                    </span>
                  </div>

                  <p className="mb-8 text-lg leading-relaxed text-msk-night-700">
                    {activeProgram.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">
                      Objectifs Principaux
                    </h4>
                    <ul className="space-y-3">
                      {activeProgram.objectives.map((obj, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${activeProgram.color.replace("bg-", "text-")}`} />
                          <span className="font-medium text-msk-night-800">{obj}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8 grid grid-cols-1 gap-6 rounded-2xl border border-msk-cream-300 bg-white p-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-xs font-bold uppercase text-slate-500">Profils accompagnés</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProgram.conditions.map((cond, idx) => (
                          <span key={idx} className="rounded-md bg-msk-cream-100 px-2 py-1 text-xs font-medium text-msk-night-700">
                            {cond}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-xs font-bold uppercase text-slate-500">Rythme</h4>
                      <p className="text-sm font-medium leading-tight text-msk-night-800">
                        {activeProgram.schedule}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative min-h-[300px] lg:min-h-full lg:w-1/2">
                <Image
                  src={activeProgram.image}
                  alt={`Programme ${activeProgram.title}`}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${activeProgram.color}`} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
