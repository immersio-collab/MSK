"use client";

import React from "react";
import Image from "next/image";


export const FondatriceGridSection: React.FC = () => {
  return (
    // `lg:screen-section` : une fenêtre pile. La fiche mesurait 794px avec ses
    // 80px de marge haut/bas ; la marge suit désormais la fenêtre, et le
    // rembourrage interne de la colonne droite se resserre en même temps (voir
    // plus bas) — c'est lui, pas le texte, qui portait le surplus.
    <section id="suite" className="bg-msk-cream-50 py-[clamp(2.5rem,6svh,5rem)] lg:screen-section">
      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Remplace l'ancien Graduation.svg : couleurs hors charte (turquoise,
            bleus génériques) + débord viewport mobile de ~24px (la section n'a
            pas d'overflow-hidden). Le principe du sticker débordant du coin est
            gardé ; `right-0` sur mobile pour ne plus créer de scroll horizontal. */}
        <img
          src="/_unused/Diploma Certificate Animation Icon.svg"
          alt=""
          className="absolute -top-8 right-2 z-20 w-28 rotate-3 pointer-events-none md:-right-10 md:w-36"
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
          <div className="flex flex-col justify-center p-8 md:p-12 lg:px-16 lg:py-[clamp(2rem,5svh,4rem)] md:w-3/5">
            <div className="hidden md:block mb-[clamp(1rem,3svh,2rem)]">
              <h3 className="text-4xl font-bold text-msk-night-900 mb-2">Khadija Elabaya</h3>
              <p className="text-lg text-msk-coral-500 font-bold uppercase tracking-wider">
                Fondatrice du centre MSK Thérapie
              </p>
            </div>

            <div className="space-y-[clamp(1rem,3svh,1.5rem)]">
              <p className="text-lg text-msk-night-700/90 leading-relaxed">
                Forte d&apos;une expertise pluridisciplinaire, Khadija Elabaya dédie sa carrière aux enfants que l&apos;école seule ne suffit pas à porter, et à leur épanouissement global.
              </p>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-600 mb-4 border-b border-msk-cream-200 pb-2">
                  Ses Domaines d&apos;Expertise
                </h4>
                <ul className="space-y-[clamp(0.5rem,1.5svh,0.75rem)]">
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
