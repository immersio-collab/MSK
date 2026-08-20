"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/magicui/fade-up";
import { WordPullUp } from "@/components/magicui/word-pull-up";

export const MethodeHeroSection = () => {
  return (
    <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#FDFBF7]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-msk-blue-50/50 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center text-center">
        <FadeUp>
          <span className="inline-block py-1.5 px-4 mb-6 rounded-full bg-msk-blue-100 text-msk-blue-700 font-bold text-sm tracking-widest uppercase">
            Notre Approche
          </span>
        </FadeUp>

        <WordPullUp
          text="Une méthode en 6 étapes, pensée pour votre enfant"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-msk-night-900 tracking-tight leading-tight mb-8 max-w-5xl"
        />

        <FadeUp delay={0.2}>
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            De l&apos;observation initiale à l&apos;insertion scolaire réussie : un chemin structuré, humain et scientifique.
          </p>
        </FadeUp>

        {/* Animated SVG Path with 6 Glowing Points */}
        <FadeUp delay={0.4} className="w-full max-w-4xl mx-auto mt-20 relative h-[150px] sm:h-[200px] hidden sm:block">
          <svg viewBox="0 0 1000 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Background path (faint) */}
            <path
              d="M 50,100 C 250,-50 400,250 600,100 C 750,0 850,200 950,100"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Animated path */}
            <motion.path
              d="M 50,100 C 250,-50 400,250 600,100 C 750,0 850,200 950,100"
              fill="none"
              stroke="url(#gradient-path)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Definitions for gradient */}
            <defs>
              <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" /> {/* msk-blue */}
                <stop offset="50%" stopColor="#F43F5E" /> {/* msk-coral */}
                <stop offset="100%" stopColor="#F59E0B" /> {/* msk-sun */}
              </linearGradient>
            </defs>

            {/* 6 Glowing Points */}
            {[
              { cx: 50, cy: 100, delay: 0.5, label: "Observer" },
              { cx: 215, cy: 45, delay: 0.9, label: "Comprendre" },
              { cx: 405, cy: 145, delay: 1.3, label: "Adapter" },
              { cx: 595, cy: 100, delay: 1.7, label: "Rééduquer" },
              { cx: 775, cy: 95, delay: 2.1, label: "Accompagner" },
              { cx: 950, cy: 100, delay: 2.5, label: "Insérer" },
            ].map((point, index) => (
              <g key={index}>
                <motion.circle
                  cx={point.cx}
                  cy={point.cy}
                  r="8"
                  fill="#FFF"
                  stroke={index < 2 ? "#3B82F6" : index < 4 ? "#F43F5E" : "#F59E0B"}
                  strokeWidth="4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: point.delay, type: "spring" }}
                />
                <motion.circle
                  cx={point.cx}
                  cy={point.cy}
                  r="16"
                  fill="none"
                  stroke={index < 2 ? "#3B82F6" : index < 4 ? "#F43F5E" : "#F59E0B"}
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: point.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.text
                  x={point.cx}
                  y={point.cy + 30}
                  textAnchor="middle"
                  fill="#475569"
                  className="text-xs font-bold uppercase tracking-wider"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: point.delay + 0.2 }}
                >
                  {point.label}
                </motion.text>
              </g>
            ))}
          </svg>
        </FadeUp>
      </div>
    </section>
  );
};
