import type { Metadata } from "next";
import { TroublesHeroSection } from "@/components/troubles/TroublesHeroSection";
import { TroublesGridSection } from "@/components/troubles/TroublesGridSection";
import { TroublesQuizSection } from "@/components/troubles/TroublesQuizSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_TROUBLES } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Troubles Accompagnés",
  description: "Accompagnement des troubles d'apprentissage, du langage, du comportement (TDAH, DYS, TSA...) à Casablanca.",
};

export default function TroublesAccompagnesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TroublesHeroSection />
      
      <TroublesGridSection />
      
      <TroublesQuizSection />

      <FaqSection
        title="Comprendre les"
        titleAccent="troubles"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_TROUBLES}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      <NextStepSection
        eyebrow="Prochaine étape"
        title="La Méthode MSK"
        description="Découvrez notre approche sur-mesure combinant pédagogie Montessori, neuro-gym et thérapies intégrées."
        buttonText="Découvrir"
        buttonHref="/notre-centre/la-methode"
      />
    </div>
  );
}



