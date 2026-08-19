import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil | MSK Montessori School Casablanca",
  description: "MSK Montessori School - Centre Scolaire Inclusif & Réadaptation à Casablanca.",
};

export default function HomePage() {
  const sections = [
    { id: "hero", title: "Hero — Accueil & Présentation", color: "text-msk-coral-600 border-msk-coral-200 bg-msk-coral-50/30" },
    { id: "chiffres-cles", title: "Chiffres Clés & Indicateurs", color: "text-msk-sun-600 border-msk-sun-200 bg-msk-sun-50/30" },
    { id: "methode", title: "La Méthode en 6 Étapes (Observer • Comprendre • Adapter • Rééduquer • Accompagner • Insérer)", color: "text-msk-blue-600 border-msk-blue-200 bg-msk-blue-50/30" },
    { id: "programmes", title: "Programmes & Classes (Petite Enfance, Primaire, Adolescents, Adultes)", color: "text-msk-coral-600 border-msk-coral-200 bg-msk-coral-50/30" },
    { id: "neuro-gym", title: "Pôle Neuro-Gym & Réadaptation Motrice", color: "text-msk-sun-600 border-msk-sun-200 bg-msk-sun-50/30" },
    { id: "faq-parents", title: "Réponses aux Hésitations des Parents (FAQ)", color: "text-msk-blue-600 border-msk-blue-200 bg-msk-blue-50/30" },
    { id: "temoignages", title: "Témoignages des Familles", color: "text-msk-coral-600 border-msk-coral-200 bg-msk-coral-50/30" },
    { id: "galerie", title: "Galerie & Vie au Centre", color: "text-msk-sun-600 border-msk-sun-200 bg-msk-sun-50/30" },
    { id: "cta-contact", title: "Inscriptions & Contact", color: "text-msk-blue-600 border-msk-blue-200 bg-msk-blue-50/30" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-16 md:py-20 border-b border-msk-cream-200 ${
            idx % 2 === 0 ? "bg-[#FDFBF7]" : "bg-white"
          }`}
        >
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className={`rounded-3xl border-2 border-dashed p-12 text-center transition-all ${section.color}`}>
              <span className="text-xs font-bold uppercase tracking-widest block mb-2 opacity-80">
                Section {idx + 1}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-msk-night-900">
                {section.title}
              </h2>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
