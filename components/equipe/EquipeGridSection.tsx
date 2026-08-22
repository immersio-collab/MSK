"use client";

import React from "react";
import Image from "next/image";

export const EquipeGridSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Decorative SVGs */}
        <img 
          src="/Graduation.svg" 
          alt="" 
          aria-hidden="true" 
          className="absolute -top-10 -right-6 md:-right-12 w-28 md:w-40 lg:w-48 pointer-events-none z-20" 
        />

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-msk-cream-200 flex flex-col md:flex-row relative z-10">
          {/* Left: Photo */}
          <div className="md:w-2/5 relative h-[400px] md:h-auto">
            <Image 
              src="/fondatrice.webp"
              alt="Khadija Elabaya"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-msk-night-950/60 to-transparent md:hidden"></div>
            <div className="absolute bottom-6 left-6 md:hidden">
              <h3 className="text-3xl font-bold text-white">Khadija Elabaya</h3>
              <p className="text-msk-sun-400 font-medium">Fondatrice & Directrice</p>
            </div>
          </div>

          {/* Right: Info */}
          <div className="md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="hidden md:block mb-8">
              <h3 className="text-4xl font-bold text-msk-night-900 mb-2">Khadija Elabaya</h3>
              <p className="text-lg text-msk-coral-500 font-bold uppercase tracking-wider">
                Fondatrice du centre MSK Thérapie
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-msk-night-700/90 leading-relaxed">
                Forte d'une expertise pluridisciplinaire, Khadija Elabaya dédie sa carrière à l'accompagnement des enfants neuro-atypiques et à leur épanouissement global.
              </p>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-600 mb-4 border-b border-msk-cream-200 pb-2">
                  Ses Domaines d'Expertise
                </h4>
                <ul className="space-y-3">
                  {[
                    "Thérapeute spécialisée en réadaptation du comportement",
                    "Spécialiste en intégration scolaire",
                    "Directrice pédagogique",
                    "Neuro-thérapeute",
                    "Spécialisée en éducation inclusive",
                    "Formatrice en psycho-neuro-éducation"
                  ].map((specialty, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] bg-msk-coral-500 text-white shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-msk-night-800 font-medium text-lg leading-snug">{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
