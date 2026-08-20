"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Brain,
  CheckCircle2,
  Users,
  Compass,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/data/site-content";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-36 bg-gradient-to-b from-msk-forest-50/60 via-msk-sand-50/70 to-[#FAF8F5]">
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-msk-sage-200/40 via-msk-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-msk-terracotta-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-msk-forest-200/80 px-4 py-1.5 text-xs font-semibold text-msk-forest-800 shadow-xs backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-msk-forest-500 animate-ping" />
              <span className="flex h-2 w-2 -ml-3 rounded-full bg-msk-forest-600" />
              <span>Centre Scolaire Inclusif • Casablanca (2 ans à adulte)</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-[#18202F] tracking-tight leading-[1.1] max-w-2xl"
            >
              L&apos;école où chaque<br />
              enfant{" "}
              <span className="relative inline-block text-[#BB546C]">
                s&apos;éveille
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-full h-2 text-[#F2D086]"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0,5 Q50,4 100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              à<br />
              son propre rythme.
            </motion.h1>

            {/* Core Motto Callout Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-5 md:p-6 rounded-2xl bg-white/80 border border-msk-forest-100 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-msk-amber-100 text-msk-amber-600 shrink-0 mt-0.5">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base md:text-lg font-bold text-msk-forest-950 italic leading-snug">
                    &laquo;&nbsp;{SCHOOL_INFO.coreQuote}&nbsp;&raquo;
                  </p>
                  <p className="text-xs md:text-sm text-msk-forest-700 font-semibold mt-1">
                    {SCHOOL_INFO.baseline}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description Body */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-msk-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              À Casablanca, MSK allie la <strong>pédagogie Montessori</strong>, la <strong>Neuro-Gym</strong> et un accompagnement pluridisciplinaire sur-mesure pour réadapter, libérer le potentiel et réussir l&apos;insertion scolaire des enfants avec ou sans troubles des apprentissages (TDA/TDAH, DYS, motricité).
            </motion.p>

            {/* CTAs and Reassurance */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-msk-forest-700 hover:bg-msk-forest-800 px-7 py-4 text-sm md:text-base font-bold text-white shadow-lg shadow-msk-forest-900/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Prendre rendez-vous / Bilan</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/notre-centre/la-methode"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-msk-forest-200 hover:border-msk-forest-400 bg-white/80 px-6 py-3.5 text-sm md:text-base font-bold text-msk-forest-800 transition-all hover:bg-msk-forest-50"
              >
                <Compass className="h-4 w-4 text-msk-forest-600" />
                <span>Découvrir la Méthode MSK</span>
              </Link>
            </motion.div>

            {/* 3 Key Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-2 md:gap-4 pt-4 border-t border-msk-forest-100"
            >
              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-msk-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Sans stigmatisation</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-msk-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Avec ou sans Code Massar</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-msk-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Insertion progressive</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Composite Card & Floating Stats (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-msk-forest-800 to-msk-forest-950 text-white p-8 md:p-10">
                {/* Decorative background circle */}
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-msk-forest-600/30 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-msk-amber-500/20 blur-2xl pointer-events-none" />

                {/* Card Content */}
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-msk-amber-300 backdrop-blur-md">
                    <Brain className="h-4 w-4 text-msk-amber-400" />
                    <span>L&apos;Accompagnement Singulier MSK</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">
                      Une passerelle bienveillante vers l&apos;autonomie
                    </h3>
                    <p className="text-sm text-msk-forest-200 leading-relaxed">
                      Chaque enfant dispose d&apos;un projet pédagogique personnalisé (PPP) coordonné par nos éducateurs spécialisés et nos thérapeutes.
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-white block">Équipe pluridisciplinaire</span>
                        <span className="text-msk-forest-200">Éducateurs, psychomotriciens, orthophonie</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
                      <div className="p-2 rounded-lg bg-msk-terracotta-500/20 text-msk-terracotta-300">
                        <Heart className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-white block">Cadre sécurisant & sensoriel</span>
                        <span className="text-msk-forest-200">Matériel Montessori adapté & respect du rythme</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-white block">Neuro-Gym & Motricité</span>
                        <span className="text-msk-forest-200">Régulation de l&apos;attention et coordination motrice</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats on the card */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-center">
                    <div>
                      <div className="text-2xl font-extrabold text-msk-amber-400">100%</div>
                      <div className="text-[11px] text-msk-forest-200 font-medium">Suivi sur mesure</div>
                    </div>
                    <div className="h-8 w-px bg-white/15" />
                    <div>
                      <div className="text-2xl font-extrabold text-emerald-300">2 à 20+</div>
                      <div className="text-[11px] text-msk-forest-200 font-medium">Tranches d&apos;âge</div>
                    </div>
                    <div className="h-8 w-px bg-white/15" />
                    <div>
                      <div className="text-2xl font-extrabold text-white">Casablanca</div>
                      <div className="text-[11px] text-msk-forest-200 font-medium">Établissement</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Badge Bottom Left */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xl border border-msk-forest-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-msk-forest-900">Environnement Inclusif</div>
                  <div className="text-[10px] text-msk-slate-500">Validation pédagogique continue</div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
