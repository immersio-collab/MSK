import type { Metadata } from "next";

import { GalerieHeroSection } from "@/components/galerie/GalerieHeroSection";
import { GalerieGridSection } from "@/components/galerie/GalerieGridSection";
import { GalerieTourSection } from "@/components/galerie/GalerieTourSection";
import { GaleriePelliculeSection } from "@/components/galerie/GaleriePelliculeSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

export const metadata: Metadata = {
  title: "Nos Espaces (Visite Virtuelle) | MSK Montessori School Casablanca",
  description:
    "Découvrez en images les espaces du centre MSK à Casablanca : salle sensorielle, espace Montessori, Neuro-Gym, parc extérieur. Visite virtuelle 360° incluse.",
};

export default function GaleriePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <GalerieHeroSection />

      <GalerieGridSection />

      <GalerieTourSection />

      <GaleriePelliculeSection />

      <CtaFinalSection
        title="Venez le voir de vos propres yeux."
        subtitle="Une visite du centre vaut mieux que mille photos. Réservez un créneau, on vous fait tout découvrir."
        buttonText="Réserver une visite"
      />
    </div>
  );
}
