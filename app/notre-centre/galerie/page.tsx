import type { Metadata } from "next";

import { GalerieHeroSection } from "@/components/galerie/GalerieHeroSection";
import { GalerieAlbumSection } from "@/components/galerie/GalerieAlbumSection";
import { GalerieTourSection } from "@/components/galerie/GalerieTourSection";
import { GaleriePelliculeSection } from "@/components/galerie/GaleriePelliculeSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_GALERIE } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Nos Espaces (Visite Virtuelle)",
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

      <FaqSection
        title="Avant de visiter nos"
        titleAccent="espaces"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_GALERIE}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      <NextStepSection
        eyebrow="Prochaine étape"
        title="La Méthode"
        description="Une approche en 6 étapes pour observer, comprendre et accompagner votre enfant."
        buttonText="Découvrir"
        buttonHref="/notre-centre/la-methode"
      />
    </div>
  );
}



