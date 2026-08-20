"use client";

import React from "react";
import { motion } from "framer-motion";

export const EspacesHeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#FAF8F5] text-msk-night-900 overflow-hidden min-h-[70vh] flex items-center">
      {/* Decorative patterns instead of dark image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-msk-coral-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-msk-sun-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-msk-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-bold uppercase tracking-widest text-msk-coral-500 mb-6 block"
        >
          Nos Espaces & Installations
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-8 leading-tight text-msk-night-900"
        >
          Un environnement pensé pour <span className="text-transparent bg-clip-text bg-linear-to-r from-msk-coral-500 to-msk-sun-500">l'épanouissement</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-msk-night-700 max-w-3xl mx-auto leading-relaxed"
        >
          Classes Montessori lumineuses, salle Neuro-Gym équipée, espaces sensoriels apaisants... Plongez au cœur de notre école et découvrez où votre enfant grandira chaque jour.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center gap-4 flex-col sm:flex-row"
        >
          <a href="#tour-virtuel" className="px-8 py-4 bg-msk-coral-500 hover:bg-msk-coral-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Lancer le Tour 360°
          </a>
          <a href="#galerie" className="px-8 py-4 bg-white hover:bg-gray-50 text-msk-night-900 border border-msk-cream-300 font-bold rounded-full transition-all shadow-xs hover:shadow-sm">
            Voir la Galerie
          </a>
        </motion.div>
      </div>
    </section>
  );
};
