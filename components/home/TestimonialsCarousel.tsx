"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/site-content";

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Autoplay with pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="temoignages">
      <div className="container relative mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-msk-terracotta-50 px-4 py-1 text-xs font-bold text-msk-terracotta-700">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Témoignages & Retours d&apos;expérience</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950 tracking-tight">
            Ce que disent les <span className="text-msk-forest-700">familles accompagnées</span>
          </h2>

          <p className="text-base md:text-lg text-msk-slate-600">
            La plus belle récompense de notre équipe est de voir chaque enfant s&apos;épanouir et retrouver le plaisir d&apos;apprendre.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-msk-forest-50/80 via-[#FAF8F5] to-msk-sand-100/60 p-8 md:p-14 border border-msk-forest-100 shadow-xl">
          <div className="absolute top-8 right-8 text-msk-forest-200">
            <Quote className="h-16 w-16 opacity-50" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6 relative z-10"
            >
              {/* Stars & Tag */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-msk-forest-800 border border-msk-forest-100 shadow-xs">
                  {current.tag}
                </span>
              </div>

              {/* Quote Content */}
              <blockquote className="text-lg md:text-2xl font-medium text-msk-forest-950 leading-relaxed italic">
                &laquo;&nbsp;{current.content}&nbsp;&raquo;
              </blockquote>

              {/* Author */}
              <div className="pt-4 border-t border-msk-forest-100/80 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-msk-forest-900 text-base">
                    {current.name}
                  </div>
                  <div className="text-xs font-medium text-msk-slate-500">
                    {current.role} • Casablanca
                  </div>
                </div>

                <div className="text-xs font-bold text-msk-forest-700 bg-white px-3 py-1.5 rounded-xl border border-msk-forest-100">
                  {currentIndex + 1} / {TESTIMONIALS.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-msk-forest-100/60">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-msk-forest-700"
                      : "w-2.5 bg-msk-forest-200 hover:bg-msk-forest-400"
                  }`}
                  aria-label={`Aller au témoignage ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white hover:bg-msk-forest-50 text-msk-forest-900 border border-msk-forest-200 shadow-sm transition-all active:scale-95"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-msk-forest-700 hover:bg-msk-forest-800 text-white shadow-md transition-all active:scale-95"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
