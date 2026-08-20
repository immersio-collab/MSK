"use client";

import React from "react";
import { motion } from "framer-motion";

export const ActualitesHeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAF8F5] text-msk-night-900 overflow-hidden">
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
          className="text-sm font-bold uppercase tracking-widest text-msk-coral-500 mb-6 block"
        >
          Actualités & Blog
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-8 leading-tight text-msk-night-900"
        >
          Ressources, conseils et <span className="text-transparent bg-clip-text bg-linear-to-r from-msk-coral-500 to-msk-sun-500">vie du centre.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-msk-night-700 max-w-3xl mx-auto leading-relaxed"
        >
          Découvrez nos derniers articles éducatifs, les événements à venir, et nos conseils pour accompagner au mieux le développement de votre enfant.
        </motion.p>
      </div>
    </section>
  );
};
