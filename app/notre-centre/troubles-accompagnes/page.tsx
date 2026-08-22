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
        title="La Fondatrice"
        description="Découvrez Khadija Elabaya et son parcours dédié à l'accompagnement des enfants neuro-atypiques."
        buttonText="Rencontrer"
        buttonHref="/notre-centre/la-fondatrice"
        svgSrc="/Islamic business woman with gestures up.svg"
        bgColor="bg-msk-night-800"
        cloudColor="text-white/50"
        textColor="text-msk-cream-100"
        buttonTextColor="text-msk-night-900"
        eyebrowColor="text-msk-sun-300"
      />
    </div>
  );
}



