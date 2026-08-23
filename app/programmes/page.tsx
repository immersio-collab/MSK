import type { Metadata } from "next";
import { ProgrammesHeroSection } from "@/components/programmes/ProgrammesHeroSection";

import { ProgrammesSelectorSection } from "@/components/programmes/ProgrammesSelectorSection";
import { ProgrammesMediaBand } from "@/components/programmes/ProgrammesMediaBand";
import { ProgrammesStatementSection } from "@/components/programmes/ProgrammesStatementSection";
import { ProgrammesTableSection } from "@/components/programmes/ProgrammesTableSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_PROGRAMMES } from "@/lib/data/faq";

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

      {/* Questions de parents sur les deux programmes. Fond bleu : la page
          arrive ici après trois plages crème, et le bleu est déjà sa couleur
          (bande du hero, carte-titre, titre de la déclaration). */}
      <FaqSection
        tone="blueMid"
        title="Choisir le bon"
        titleAccent="programme"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_PROGRAMMES}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      {/* Hand-off vers la page Admissions */}
      <NextStepSection
        eyebrow="Prochaine étape"
        title="Contact"
        description="Prêt à faire le premier pas ? Contactez-nous pour échanger sur les besoins de votre enfant."
        buttonText="Nous contacter"
        buttonHref="/contact"
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

