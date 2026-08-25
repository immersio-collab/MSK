import type { Metadata } from "next";
import { FondatriceHeroSection } from "@/components/fondatrice/FondatriceHeroSection";
import { FondatriceGridSection } from "@/components/fondatrice/FondatriceGridSection";
import { FondatricePhilosophieSection } from "@/components/fondatrice/FondatricePhilosophieSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_FONDATRICE } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "La Fondatrice",
  description: "Découvrez le profil de Khadija Elabaya, fondatrice de MSK Thérapie et spécialiste en éducation inclusive.",
};

export default function FondatricePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <FondatriceHeroSection />
      
      <FondatriceGridSection />
      
      <FondatricePhilosophieSection />

      <FaqSection
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
      />
    </div>
  );
}



