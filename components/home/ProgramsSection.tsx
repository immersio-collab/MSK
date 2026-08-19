"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Baby,
  BookOpen,
  GraduationCap,
  Activity,
} from "lucide-react";
import { PROGRAMS } from "@/lib/data/site-content";

const programIcons: Record<string, React.ReactNode> = {
  "petite-enfance": <Baby className="h-6 w-6 text-amber-600" />,
  "primaire": <BookOpen className="h-6 w-6 text-msk-forest-700" />,
  "adolescents": <GraduationCap className="h-6 w-6 text-msk-terracotta-600" />,
  "adultes": <Activity className="h-6 w-6 text-teal-600" />,
};

export const ProgramsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="programmes">
      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-msk-forest-100 px-4 py-1 text-xs font-bold text-msk-forest-800">
              <Sparkles className="h-3.5 w-3.5 text-msk-terracotta-500" />
              <span>Cycles & Accompagnements</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950 tracking-tight">
              Des programmes adaptés à <span className="text-msk-forest-700">chaque étape de vie</span>
            </h2>
            <p className="text-base md:text-lg text-msk-slate-600">
              De l&apos;éveil sensoriel de la petite enfance aux apprentissages scolaires et aux séances ciblées pour adultes, notre structure répond à chaque besoin avec bienveillance.
            </p>
          </div>

          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 rounded-full border-2 border-msk-forest-700 px-6 py-3 text-sm font-bold text-msk-forest-800 hover:bg-msk-forest-700 hover:text-white transition-all shrink-0"
          >
            <span>Voir tous les cycles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group flex flex-col justify-between rounded-3xl bg-[#FAF8F5] p-7 border border-msk-forest-100 shadow-sm hover:shadow-xl hover:border-msk-forest-300 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white shadow-xs">
                    {programIcons[prog.id]}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${prog.badgeBg}`}>
                    {prog.age}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-msk-forest-950 group-hover:text-msk-forest-700 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs font-semibold text-msk-terracotta-600 mt-1">
                    {prog.subtitle}
                  </p>
                </div>

                <p className="text-xs text-msk-slate-600 leading-relaxed">
                  {prog.description}
                </p>

                <div className="pt-2 border-t border-msk-forest-100/70 space-y-2">
                  {prog.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-msk-slate-700">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4">
                <Link
                  href={prog.href}
                  className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-white group-hover:bg-msk-forest-700 group-hover:text-white text-xs font-bold text-msk-forest-900 border border-msk-forest-100 transition-all shadow-xs"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
