import type { Metadata } from "next";
import { Eyebrow } from "@/components/common/Eyebrow";

export const metadata: Metadata = {
  title: "Notre Centre",
  description: "Présentation de notre centre thérapeutique et éducatif MSK à Casablanca.",
};

export default function NotreCentrePage() {
  // Fond en nuance 50 pleine, pas de `bg-white` + teinte /40 : deux utilitaires
  // background sur le même élément laissent l'ordre de la feuille décider.
  const sections = [
    { id: "hero", title: "Présentation Générale — Notre Centre", color: "text-msk-coral-600 border-msk-coral-200 bg-msk-coral-50" },
    { id: "mission", title: "Notre Mission & Nos Valeurs", color: "text-msk-sun-600 border-msk-sun-200 bg-msk-sun-50" },
    { id: "cta", title: "Prendre Rendez-vous / Bilan", color: "text-msk-blue-600 border-msk-blue-200 bg-msk-blue-50" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-20 bg-msk-cream-50">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-10">
        <div className="text-center space-y-2">
          <Eyebrow variant="bare" className="text-msk-coral-600">
            Page
          </Eyebrow>
          <h1 className="text-3xl md:text-5xl font-extrabold text-msk-night-900">
            Notre Centre
          </h1>
        </div>

        {sections.map((section, idx) => (
          <div
            key={section.id}
            className={`rounded-3xl border-2 border-dashed p-12 text-center ${section.color}`}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-2 opacity-80">
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


