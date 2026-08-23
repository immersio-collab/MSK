import type { Metadata } from "next";
import { TroublesHeroSection } from "@/components/troubles/TroublesHeroSection";
import { TroublesGridSection } from "@/components/troubles/TroublesGridSection";
import { TroublesQuizSection } from "@/components/troubles/TroublesQuizSection";
import { NextStepSection } from "@/components/common/NextStepSection";

export const metadata: Metadata = {
  title: "Troubles Accompagnés | MSK Montessori School Casablanca",
  description: "Accompagnement des troubles d'apprentissage, du langage, du comportement (TDAH, DYS, TSA...) à Casablanca.",
};

export default function TroublesAccompagnesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TroublesHeroSection />
      
      <TroublesGridSection />
      
      <TroublesQuizSection />

      <NextStepSection
        eyebrow="Prochaine étape"
        title="La Méthode MSK"
        description="Découvrez notre approche sur-mesure combinant pédagogie Montessori, neuro-gym et thérapies intégrées."
        buttonText="Découvrir"
        buttonHref="/notre-centre/la-methode"
        svgSrc="/Enjoying the fun time.svg"
        bgColor="bg-msk-blue-800"
        cloudColor="text-white/50"
        textColor="text-msk-blue-50"
        buttonTextColor="text-msk-blue-900"
      />
    </div>
  );
}



