"use client";

import React from "react";
import { motion } from "framer-motion";

export const TroublesHeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FAF8F5] overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-msk-coral-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-msk-sun-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-msk-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-bold uppercase tracking-widest text-slate-600 mb-4 block"
        >
          Troubles Accompagnés
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-msk-night-900 mb-6 leading-tight"
        >
          Nous comprenons ce que <span className="text-transparent bg-clip-text bg-gradient-to-r from-msk-coral-500 to-msk-sun-500">traverse votre enfant.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-msk-night-700/80 max-w-3xl mx-auto leading-relaxed"
        >
          MSK accompagne les enfants et adolescents avec des difficultés d'apprentissage, de langage, de comportement et de développement. Un cadre bienveillant, une méthode adaptée et une équipe dévouée.
        </motion.p>
      </div>
    </section>
  );
};
