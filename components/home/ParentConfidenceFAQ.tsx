"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import {
  ChevronDown,
  HelpCircle,
  MessageCircleQuestion,
  PhoneCall,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PARENT_CONCERNS_FAQ, SCHOOL_INFO } from "@/lib/data/site-content";

export const ParentConfidenceFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden" id="faq-parents">
      <div className="container relative mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-msk-forest-100 px-4 py-1 text-xs font-bold text-msk-forest-800">
            <MessageCircleQuestion className="h-3.5 w-3.5 text-msk-terracotta-500" />
            <span>Réassurance & Transparence</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950 tracking-tight">
            Les réponses aux <span className="text-msk-forest-700">questions des parents</span>
          </h2>

          <p className="text-base md:text-lg text-msk-slate-600">
            Chaque famille arrive avec son histoire et ses inquiétudes. Voici comment MSK sécurise et accompagne le parcours de votre enfant.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {PARENT_CONCERNS_FAQ.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white shadow-md border-msk-forest-300"
                    : "bg-white/70 hover:bg-white border-msk-forest-100"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm md:text-base text-msk-forest-950 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-msk-sand-100 text-msk-forest-800 text-xs font-extrabold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-msk-forest-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 md:px-6 pb-6 pt-1 border-t border-msk-forest-50"
                    >
                      <p className="text-sm md:text-base text-msk-slate-600 leading-relaxed pl-10">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 p-6 md:p-8 rounded-3xl bg-msk-forest-50 border border-msk-forest-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base md:text-lg font-bold text-msk-forest-950">
              Vous avez une situation particulière à nous exposer ?
            </h3>
            <p className="text-xs md:text-sm text-msk-slate-600">
              Notre équipe pédagogique et nos spécialistes sont à votre écoute pour une première consultation sans engagement.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <MagneticButton 
              className="bg-msk-forest-700 hover:bg-msk-forest-800 text-white font-bold text-xs md:text-sm shadow-md"
            >
              <PhoneCall className="h-4 w-4 text-msk-amber-400" />
              <span>Contacter notre équipe</span>
            </MagneticButton>
          </Link>
        </div>

      </div>
    </section>
  );
};
