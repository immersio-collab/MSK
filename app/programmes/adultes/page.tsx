import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Séances Adultes | MSK Casablanca",
  description: "Séances ciblées Neuro-Gym et optimisation cognitive pour adultes.",
};

export default function AdultesPage() {
  const sections = [
    { id: "hero", title: "Séances Adultes — Introduction" },
    { id: "ateliers", title: "Neuro-Gym, Régulation Attentionnelle & Cognition" },
    { id: "cta", title: "Réservation d'un Créneau Adulte" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-msk-night-700">
            Page
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-msk-night-900">
            Séances Adultes
          </h1>
        </div>

        {sections.map((section, idx) => (
          <div
            key={section.id}
            className="rounded-2xl border-2 border-dashed border-msk-cream-300/80 p-12 text-center bg-white"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-msk-night-700 block mb-2">
              Section {idx + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-msk-night-900">
              {section.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
