"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, PhoneCall, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/site-content";

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-msk-forest-800 via-msk-forest-700 to-msk-forest-900 text-white p-8 md:p-14 shadow-2xl border border-msk-forest-600/40"
        >
          {/* Ambient shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-msk-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-msk-terracotta-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6 text-center mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-msk-amber-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Inscriptions & Bilans Ouverts • Casablanca</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Offrez à votre enfant un cadre éducatif qui le comprend et le valorise.
            </h2>

            <p className="text-base md:text-lg text-msk-forest-200 leading-relaxed">
              Venez nous rencontrer pour un premier échange bienveillant. Nous évaluerons ensemble les besoins de votre enfant et concevrons son parcours personnalisé.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-msk-forest-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-msk-amber-400" />
                <span>Accueil sans étiquette</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-msk-amber-400" />
                <span>Avec ou sans code Massar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-msk-amber-400" />
                <span>Équipe pluridisciplinaire dédiée</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-msk-amber-400 hover:bg-msk-amber-500 text-msk-forest-950 font-extrabold px-8 py-4 text-sm md:text-base shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Calendar className="h-4 w-4 text-msk-forest-900" />
                <span>Prendre Rendez-vous / Bilan</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 text-sm md:text-base border border-white/20 transition-all"
              >
                <PhoneCall className="h-4 w-4 text-msk-amber-300" />
                <span>Nous contacter : {SCHOOL_INFO.phone}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
