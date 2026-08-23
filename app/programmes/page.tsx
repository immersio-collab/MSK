import type { Metadata } from "next";
import { ProgrammesHeroSection } from "@/components/programmes/ProgrammesHeroSection";

import { ProgrammesSelectorSection } from "@/components/programmes/ProgrammesSelectorSection";
import { ProgrammesMediaBand } from "@/components/programmes/ProgrammesMediaBand";
import { ProgrammesStatementSection } from "@/components/programmes/ProgrammesStatementSection";
import { ProgrammesTableSection } from "@/components/programmes/ProgrammesTableSection";
import { NextStepSection } from "@/components/common/NextStepSection";

export const metadata: Metadata = {
  title: "Programmes & Classes | MSK Montessori School Casablanca",
  description: "Découvrez nos programmes adaptés de la Petite Enfance à l'âge adulte. Pédagogie Montessori, Neuro-Gym et accompagnement personnalisé.",
};

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Bande de couleur inclinée + nuages SVG flottants + carte-titre */}
      <ProgrammesHeroSection />

      {/* Onglets de sélection du programme (Maternelle / Primaire) */}
      <ProgrammesSelectorSection />

      {/* Photo pleine-largeur à bord incliné */}
      <ProgrammesMediaBand />

      {/* Déclaration oversized + CTA circulaire + photo */}
      <ProgrammesStatementSection />

      {/* Tableau comparatif des programmes */}
      <ProgrammesTableSection />

      {/* Hand-off vers la page Admissions */}
      <NextStepSection
        eyebrow="Prochaine étape"
        title="Admissions"
        description="Découvrez le processus d'admission en 3 étapes : premier échange, bilan d'évaluation, programme sur-mesure."
        buttonText="Voir les admissions"
        buttonHref="/admissions"
        svgSrc="/Children holding letters.svg"
        bgColor="bg-msk-coral-700"
        cloudColor="text-msk-coral-900"
        textColor="text-msk-coral-100"
        buttonTextColor="text-msk-coral-800"
        eyebrowColor="text-msk-sun-300"
      />
    </div>
  );
}

