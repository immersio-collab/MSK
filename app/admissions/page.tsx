import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions & Inscriptions | MSK Casablanca",
  description: "Processus d'admission, pièces requises et accompagnement sans code Massar.",
};

export default function AdmissionsPage() {
  const sections = [
    { id: "hero", title: "Admissions & Inscriptions — Introduction" },
    { id: "massar", title: "Cas Spécifique : Accueil sans Code Massar" },
    { id: "process", title: "Les 4 Étapes de l'Admission" },
    { id: "documents", title: "Documents à Fournir" },
    { id: "cta", title: "Prise de Rendez-vous & Bilan" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-msk-forest-600">
            Page
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950">
            Admissions & Inscriptions
          </h1>
        </div>

        {sections.map((section, idx) => (
          <div
            key={section.id}
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
