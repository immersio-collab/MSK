import type { Metadata } from "next";

import { GalerieHeroSection } from "@/components/galerie/GalerieHeroSection";
import { GalerieAlbumSection } from "@/components/galerie/GalerieAlbumSection";
import { GalerieTourSection } from "@/components/galerie/GalerieTourSection";
import { GaleriePelliculeSection } from "@/components/galerie/GaleriePelliculeSection";
import { NextStepSection } from "@/components/common/NextStepSection";

export const metadata: Metadata = {
  title: "Nos Espaces (Visite Virtuelle) | MSK Montessori School Casablanca",
  description:
    "Découvrez en images les espaces du centre MSK à Casablanca : salle sensorielle, espace Montessori, Neuro-Gym, parc extérieur. Visite virtuelle 360° incluse.",
};

export default function GaleriePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <GalerieHeroSection />

      <GalerieTourSection />

      <GalerieAlbumSection />

      <GaleriePelliculeSection />

      <NextStepSection
        eyebrow="Prochaine étape"
        title="La Méthode"
        description="Une approche en 6 étapes pour observer, comprendre et accompagner votre enfant."
        buttonText="Découvrir"
        buttonHref="/notre-centre/la-methode"
        svgSrc="/Class Board.svg"
        bgColor="bg-msk-night-800"
        cloudColor="text-white/50"
        textColor="text-msk-cream-100"
        buttonTextColor="text-msk-night-900"
        eyebrowColor="text-msk-sun-300"
      />
    </div>
  );
}



