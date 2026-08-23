import type { Metadata } from "next";
import { EquipeHeroSection } from "@/components/equipe/EquipeHeroSection";
import { EquipeGridSection } from "@/components/equipe/EquipeGridSection";
import { EquipePhilosophieSection } from "@/components/equipe/EquipePhilosophieSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_FONDATRICE } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "La Fondatrice | MSK Montessori School Casablanca",
  description: "Découvrez le profil de Khadija Elabaya, fondatrice de MSK Thérapie et spécialiste en éducation inclusive.",
};

export default function EquipePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EquipeHeroSection />
      
      <EquipeGridSection />
      
      <EquipePhilosophieSection />

      {/* Fond jaune pâle : la section philosophie au-dessus est blanche, donc
          la couture se voit, et la page tient une histoire chaude de bout en
          bout (bande sun-400 du hero, filet sun-400 de la citation, CTA
          sun-500). */}
      <FaqSection
        tone="sunLight"
        title="Mieux connaître la"
        titleAccent="fondatrice"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_FONDATRICE}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      <NextStepSection
        eyebrow="Prochaine étape"
        title="Nos Espaces"
        description="Un environnement pensé et adapté pour le bien-être et le développement de chaque enfant."
        buttonText="Visite virtuelle"
        buttonHref="/notre-centre/galerie"
        svgSrc="/kid swing.svg"
        bgColor="bg-msk-sun-500"
        cloudColor="text-white/80"
        textColor="text-msk-sun-900"
        buttonTextColor="text-msk-sun-600"
        eyebrowColor="text-msk-sun-900"
      />
    </div>
  );
}



