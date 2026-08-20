"use client";

import React from "react";
import Image from "next/image";

export const EquipeGridSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-msk-cream-200 flex flex-col md:flex-row">
          {/* Left: Photo */}
          <div className="md:w-2/5 relative h-[400px] md:h-auto">
            <Image 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Khadija Elabaya"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-msk-night-950/60 to-transparent md:hidden"></div>
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
                      <span className="text-msk-sun-500 text-lg mt-0.5">✅</span>
                      <span className="text-msk-night-800 font-medium">{specialty}</span>
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
