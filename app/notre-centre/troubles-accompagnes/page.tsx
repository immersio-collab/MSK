import React from "react";
import type { Metadata } from "next";
import { TroublesHeroSection } from "@/components/troubles/TroublesHeroSection";
import { TroublesGridSection } from "@/components/troubles/TroublesGridSection";
import { TroublesQuizSection } from "@/components/troubles/TroublesQuizSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

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
      
      <CtaFinalSection 
        title="La première étape est d'en parler."
        subtitle="Réservez un bilan d'évaluation gratuit et sans engagement."
        buttonText="Prendre rendez-vous"
      />
    </div>
  );
}
