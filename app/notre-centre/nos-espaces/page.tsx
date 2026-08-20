import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Espaces & Tour Virtuel | MSK Montessori School Casablanca",
  description: "Visitez nos locaux à Casablanca : classes Montessori adaptées, salle Neuro-Gym, espaces de motricité.",
};

export default function NosEspacesPage() {
  const sections = [
    { id: "hero", title: "Nos Espaces — Introduction" },
    { id: "tour-virtuel", title: "Visite Virtuelle 360°" },
    { id: "galerie", title: "Galerie Photos des Installations" },
    { id: "journee-type", title: "Une Journée Type chez MSK" },
    { id: "cta", title: "Planifier une Visite Physique" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-msk-forest-600">
            Page
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950">
            Nos Espaces & Installations
          </h1>
        </div>

        {/* Virtual 3D Tour */}
        <section id="tour-virtuel" className="relative z-10 w-full flex flex-col py-16 md:py-24">
          <div className="w-full flex flex-col h-full flex-1">
            {/* Section Title */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-msk-night-900 tracking-tight">
                Visitez notre école à distance
              </h2>
              <p className="text-slate-600 font-medium mt-4 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Découvrez l&apos;intérieur de nos classes et installations. <br className="hidden sm:block" />
                Cliquez sur les cercles au sol pour vous déplacer dans l&apos;école.
              </p>
            </div>
            
            {/* Virtual Tour Container with Gradient Border */}
            <div className="flex-1 w-full flex flex-col rounded-[2rem] p-1.5 bg-gradient-to-tr from-msk-coral-400 via-msk-sun-400 to-msk-blue-400 shadow-2xl shadow-msk-sun-500/15 min-h-[500px]">
              <div className="flex-1 w-full relative rounded-[1.6rem] overflow-hidden bg-[#FDFBF7] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-msk-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-msk-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-msk-night-900 mb-2">Tour Virtuel</h3>
                  <p className="text-slate-500">Temporairement désactivé pour optimiser le chargement pendant le développement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {sections.filter(s => s.id !== "tour-virtuel").map((section, idx) => (
          <div
            key={section.id}
            id={section.id}
            className="rounded-2xl border-2 border-dashed border-msk-forest-200/80 p-12 text-center bg-white"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-msk-forest-600 block mb-2">
              Section {idx + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-msk-forest-950">
              {section.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
