import React from "react";
import type { Metadata } from "next";
import { EquipeHeroSection } from "@/components/equipe/EquipeHeroSection";
import { EquipeGridSection } from "@/components/equipe/EquipeGridSection";
import { EquipePhilosophieSection } from "@/components/equipe/EquipePhilosophieSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

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
      
      <CtaFinalSection 
        title="Venez rencontrer Khadija."
        subtitle="Nous vous accueillons avec plaisir pour discuter de l'avenir de votre enfant."
        buttonText="Réserver une visite"
      />
    </div>
  );
}
