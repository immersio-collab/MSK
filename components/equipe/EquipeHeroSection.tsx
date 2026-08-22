"use client";

import React from "react";
import { motion } from "framer-motion";

export const EquipeHeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-[#FAF8F5] text-msk-night-900 overflow-hidden">
      {/* Decorative patterns */}
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
          className="mb-6 inline-block rounded-full bg-msk-coral-100 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-coral-700"
        >
          La Fondatrice
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-5xl md:text-6xl"
        >
          L'expertise et la bienveillance au service de <span className="text-msk-coral-500">votre enfant.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl text-base font-medium leading-snug text-msk-night-800 md:text-lg"
        >
          Découvrez le parcours de notre fondatrice, une spécialiste passionnée et dévouée à l'épanouissement de chaque enfant à travers une approche globale et inclusive.
        </motion.p>
      </div>
    </section>
  );
};
