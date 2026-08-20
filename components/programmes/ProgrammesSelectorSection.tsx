"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProgramId = "petite-enfance" | "primaire" | "adolescents" | "adultes";

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
  link: string;
}

const programs: ProgramData[] = [
  {
    id: "petite-enfance",
    title: "Petite Enfance",
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
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
    link: "/programmes/petite-enfance"
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
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
    link: "/programmes/primaire"
  },
  {
    id: "adolescents",
    title: "Adolescents",
    age: "12-17 ans",
    color: "bg-msk-blue-500",
    description: "Un accompagnement axé sur l'orientation, les méthodes de travail et le bien-être psychologique pour traverser sereinement les années collège et lycée.",
    objectives: [
      "Méthodologie d'apprentissage (apprendre à apprendre)",
      "Gestion du stress et de l'anxiété scolaire",
      "Accompagnement à l'orientation professionnelle",
      "Développement de l'autonomie et de la responsabilisation"
    ],
    conditions: ["TDAH", "Phobie scolaire", "Troubles de l'attention", "Haut Potentiel Intellectuel (HPI)"],
    schedule: "Soutien scolaire / Ateliers de méthodologie / Séances psy",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1000",
    link: "/programmes/adolescents"
  },
  {
    id: "adultes",
    title: "Adultes",
    age: "18+ ans",
    color: "bg-msk-night-700",
    description: "Des thérapies brèves, du coaching et des formations pour les adultes neuro-atypiques ou les parents souhaitant mieux accompagner leurs enfants.",
    objectives: [
      "Coaching professionnel pour profils atypiques",
      "Soutien psychologique et gestion émotionnelle",
      "Guidance parentale et ateliers éducatifs",
      "Bilan de compétences et réorientation"
    ],
    conditions: ["TDAH Adulte", "Burnout", "Difficultés relationnelles", "Parents d'enfants neuro-atypiques"],
    schedule: "Sur rendez-vous (Consultations individuelles ou groupes de parole)",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000",
    link: "/programmes/adultes"
  }
];

export const ProgrammesSelectorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProgramId>("petite-enfance");

  const activeProgram = programs.find(p => p.id === activeTab)!;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Selector Tabs */}
        <div className="flex flex-col md:flex-row justify-center gap-2 mb-12">
          {programs.map((prog) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(prog.id)}
              className={`relative px-6 py-4 md:py-3 rounded-2xl md:rounded-full text-base font-bold transition-all flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 ${
                activeTab === prog.id 
                  ? "text-white shadow-md" 
                  : "text-msk-night-700 hover:bg-msk-cream-100 bg-[#FAF8F5]"
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
              <span className={`relative z-10 text-xs px-2 py-0.5 rounded-full ${activeTab === prog.id ? 'bg-white/20' : 'bg-msk-cream-200 text-slate-600'}`}>
                {prog.age}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-xl border border-msk-cream-200 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProgram.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row h-full"
            >
              {/* Left: Text Content */}
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${activeProgram.color}`}></div>
                    <h2 className="text-3xl font-bold text-msk-night-900">{activeProgram.title}</h2>
                    <span className="text-sm font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-msk-cream-200 shadow-sm">
                      {activeProgram.age}
                    </span>
                  </div>
                  
                  <p className="text-lg text-msk-night-700 mb-8 leading-relaxed">
                    {activeProgram.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Objectifs Principaux</h3>
                    <ul className="space-y-3">
                      {activeProgram.objectives.map((obj, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (idx * 0.1) }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${activeProgram.color.replace('bg-', 'text-')}`} />
                          <span className="text-msk-night-800 font-medium">{obj}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-white rounded-2xl border border-msk-cream-200">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Profils accompagnés</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProgram.conditions.map((cond, idx) => (
                          <span key={idx} className="text-xs bg-msk-cream-100 text-msk-night-700 px-2 py-1 rounded-md font-medium">
                            {cond}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Rythme</h3>
                      <p className="text-sm font-medium text-msk-night-800 leading-tight">
                        {activeProgram.schedule}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Link 
                    href={activeProgram.link}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${activeProgram.color} text-white font-bold rounded-xl transition-transform hover:-translate-y-1 shadow-lg group`}
                  >
                    Découvrir ce programme
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right: Image */}
              <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
                <Image 
                  src={activeProgram.image}
                  alt={`Programme ${activeProgram.title}`}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 mix-blend-multiply opacity-20 ${activeProgram.color}`}></div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
