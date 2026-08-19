"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Brain,
  Sliders,
  Zap,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { METHOD_STEPS, SCHOOL_INFO } from "@/lib/data/site-content";

const iconComponentMap: Record<string, React.ReactNode> = {
  Eye: <Eye className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
  Sliders: <Sliders className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
};

export const MethodSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden" id="methode">
      {/* Background Subtle Shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-msk-forest-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-msk-amber-100/40 blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-msk-forest-100 px-4 py-1 text-xs font-bold text-msk-forest-800">
            <Sparkles className="h-3.5 w-3.5 text-msk-terracotta-500" />
            <span>La Démarche Pédagogique MSK</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950 tracking-tight">
            Une méthode progressive en <span className="text-msk-forest-700">6 étapes clés</span>
          </h2>
          
          <p className="text-base md:text-lg text-msk-slate-600">
            Notre protocole d&apos;accompagnement assure une transition fluide et sécurisée depuis l&apos;observation fine des besoins jusqu&apos;à l&apos;insertion scolaire et sociale réussie.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-bold text-msk-forest-800">
            {METHOD_STEPS.map((s, idx) => (
              <React.Fragment key={s.step}>
                <span className={`px-2.5 py-1 rounded-lg transition-colors ${activeStep === idx ? 'bg-msk-forest-700 text-white' : 'bg-white text-msk-forest-800'}`}>
                  {s.step}
                </span>
                {idx < METHOD_STEPS.length - 1 && (
                  <span className="text-msk-terracotta-400 font-normal">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Interactive Desktop / Tablet Stepper Selector */}
        <div className="hidden md:grid md:grid-cols-6 gap-3 mb-10">
          {METHOD_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 text-left border ${
                  isActive
                    ? "bg-white shadow-lg border-msk-forest-300 ring-2 ring-msk-forest-500/20 -translate-y-1"
                    : "bg-white/60 hover:bg-white border-msk-forest-100 text-msk-slate-600 hover:border-msk-forest-200"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-extrabold text-sm mb-3 transition-colors ${
                    isActive
                      ? "bg-msk-forest-700 text-white"
                      : "bg-msk-sand-100 text-msk-forest-700"
                  }`}
                >
                  {step.number}
                </div>
                <span className={`text-sm font-bold tracking-tight text-center ${isActive ? 'text-msk-forest-900' : 'text-msk-slate-700'}`}>
                  {step.step}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-msk-forest-700"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Card */}
        <div className="rounded-3xl bg-white p-8 md:p-12 shadow-xl border border-msk-forest-100 ring-1 ring-black/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-msk-forest-100 text-msk-forest-800 font-extrabold text-lg">
                    {METHOD_STEPS[activeStep].number}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-msk-terracotta-600">
                      Étape {METHOD_STEPS[activeStep].number} du Protocole
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-msk-forest-950">
                      {METHOD_STEPS[activeStep].step} : {METHOD_STEPS[activeStep].title}
                    </h3>
                  </div>
                </div>

                <p className="text-base md:text-lg text-msk-slate-700 leading-relaxed">
                  {METHOD_STEPS[activeStep].description}
                </p>

                {/* Practical Takeaways */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-msk-sand-50 border border-msk-forest-100">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs text-msk-slate-700 font-medium">
                      Suivi continu avec bilan formalisé partagé avec les parents
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-msk-sand-50 border border-msk-forest-100">
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs text-msk-slate-700 font-medium">
                      Coordination étroite entre éducateurs & rééducateurs
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/notre-approche/la-methode"
                    className="inline-flex items-center gap-2 text-sm font-bold text-msk-forest-800 hover:text-msk-forest-950 hover:underline"
                  >
                    <span>En savoir plus sur cette étape</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-msk-slate-500">
                    <span>Navigation :</span>
                    <button
                      onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : METHOD_STEPS.length - 1))}
                      className="px-2.5 py-1 rounded bg-msk-sand-100 hover:bg-msk-forest-100 text-msk-forest-800 font-bold"
                    >
                      ← Précédent
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => (prev < METHOD_STEPS.length - 1 ? prev + 1 : 0))}
                      className="px-2.5 py-1 rounded bg-msk-forest-700 hover:bg-msk-forest-800 text-white font-bold"
                    >
                      Suivant →
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Visual Badge */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-msk-forest-50 to-msk-sand-100 border border-msk-forest-200/70 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md text-msk-forest-700 mb-4">
                  {iconComponentMap[METHOD_STEPS[activeStep].icon]}
                </div>
                <h4 className="text-lg font-bold text-msk-forest-900 mb-1">
                  Objectif de l&apos;Étape {METHOD_STEPS[activeStep].number}
                </h4>
                <p className="text-xs text-msk-slate-600 leading-relaxed">
                  Garantir une adaptation personnalisée sans pression ni stigmatisation de l&apos;enfant.
                </p>
                <div className="mt-6 w-full pt-4 border-t border-msk-forest-200/60 flex items-center justify-between text-xs font-semibold text-msk-forest-800">
                  <span>Méthode MSK</span>
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
