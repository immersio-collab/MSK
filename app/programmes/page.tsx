import type { Metadata } from "next";
import { ProgrammesHeroSection } from "@/components/programmes/ProgrammesHeroSection";

import { ProgrammesSelectorSection } from "@/components/programmes/ProgrammesSelectorSection";
import { ProgrammesMediaBand } from "@/components/programmes/ProgrammesMediaBand";
import { ProgrammesStatementSection } from "@/components/programmes/ProgrammesStatementSection";
import { ProgrammesTableSection } from "@/components/programmes/ProgrammesTableSection";
import { ProgrammesNextStopSection } from "@/components/programmes/ProgrammesNextStopSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

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
      <ProgrammesNextStopSection />

      {/* CTA final partagé */}
      <CtaFinalSection
        title="Pas sûr du programme adapté ?"
        subtitle="Nos experts sont là pour vous guider. Réservez un bilan d'orientation gratuit et sans engagement."
        buttonText="Réserver un bilan gratuit"
      />
    </div>
  );
}
