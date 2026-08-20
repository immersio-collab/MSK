"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Sparkles,
  ArrowRight,
  Target,
  Smile,
  Shield,
  Layers,
} from "lucide-react";

export const NeuroGymSection: React.FC = () => {
  const pillars = [
    {
      icon: <Brain className="h-5 w-5 text-msk-forest-700" />,
      title: "Connexion Corps-Cerveau",
      desc: "Des mouvements ciblés pour activer les deux hémisphères cérébraux et libérer les blocages d'apprentissage.",
    },
    {
      icon: <Target className="h-5 w-5 text-amber-600" />,
      title: "Régulation de l'Attention",
      desc: "Aider les enfants avec TDAH ou agitation à canaliser leur énergie motrice vers la concentration.",
    },
    {
      icon: <Smile className="h-5 w-5 text-msk-terracotta-500" />,
      title: "Gestion des Émotions",
      desc: "Apaisement sensoriel et diminution du stress face aux tâches scolaires complexes.",
    },
    {
      icon: <Layers className="h-5 w-5 text-teal-600" />,
      title: "Motricité Fine & Graphisme",
      desc: "Développement de la tenue du stylo, de l'orientation spatiale et de la coordination œil-main.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-msk-forest-900 via-msk-forest-800 to-msk-forest-950 text-white relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-msk-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-msk-amber-300 backdrop-blur-md">
              <Activity className="h-3.5 w-3.5" />
              <span>Spécialité Exclusive MSK</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              La <span className="text-msk-amber-400">Neuro-Gym</span> : réactiver le potentiel par le mouvement
            </h2>

            <p className="text-base md:text-lg text-msk-forest-200 leading-relaxed">
              L&apos;apprentissage ne passe pas uniquement par l&apos;esprit : il est intimement lié à la maturité motrice et à l&apos;intégration sensorielle. Notre pôle Neuro-Gym propose des protocoles dynamiques pour rééduquer en douceur et ancrer durablement les compétences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/15 transition-colors"
                >
                  <div className="p-2 rounded-xl bg-white w-fit">
                    {pillar.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-msk-forest-200 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/notre-centre/la-methode"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-msk-amber-400 hover:bg-msk-amber-500 text-msk-forest-950 font-bold px-7 py-3.5 text-sm shadow-lg transition-all"
              >
                <span>Découvrir le Pôle Neuro-Gym</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/notre-centre/troubles-accompagnes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3.5 text-sm transition-all"
              >
                <span>Troubles accompagnés (TDAH, DYS)</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Key Takeaway Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-8 md:p-10 text-msk-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-msk-forest-100 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-bold">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-msk-forest-900 text-lg">
                    Pourquoi ça fonctionne ?
                  </h3>
                  <p className="text-xs text-msk-slate-500">
                    Approche neuro-scientifique validée
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs md:text-sm text-msk-slate-600 leading-relaxed">
                <p>
                  En intégrant les réflexes archaïques et en stimulant la proprioception, l&apos;enfant ne lutte plus contre son corps.
                </p>
                <p className="p-3.5 rounded-xl bg-msk-sand-50 border border-msk-forest-100 font-medium text-msk-forest-900 italic">
                  &laquo;&nbsp;Quand le corps est posé et coordonné, le cerveau devient pleinement disponible pour lire, calculer, mémoriser et interagir.&nbsp;&raquo;
                </p>
                <p>
                  Séances animées par des éducateurs et thérapeutes certifiés au sein même des locaux MSK à Casablanca.
                </p>
              </div>

              <div className="pt-2 border-t border-msk-forest-100 flex items-center justify-between text-xs text-msk-slate-500 font-semibold">
                <span>Séances enfants & adultes</span>
                <span className="text-emerald-700">Sur évaluation préalable</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
