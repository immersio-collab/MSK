import type { Metadata } from "next";
import { EquipeHeroSection } from "@/components/equipe/EquipeHeroSection";
import { EquipeGridSection } from "@/components/equipe/EquipeGridSection";
import { EquipePhilosophieSection } from "@/components/equipe/EquipePhilosophieSection";
import { NextStepSection } from "@/components/common/NextStepSection";

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



