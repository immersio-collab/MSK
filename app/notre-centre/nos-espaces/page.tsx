import type { Metadata } from "next";

import { GalerieHeroSection } from "@/components/galerie/GalerieHeroSection";
import { GalerieAlbumSection } from "@/components/galerie/GalerieAlbumSection";
import { GalerieTourSection } from "@/components/galerie/GalerieTourSection";
import { GaleriePelliculeSection } from "@/components/galerie/GaleriePelliculeSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_GALERIE } from "@/lib/data/faq";
import { VISITE_VIRTUELLE_EN_LIGNE } from "@/lib/data/site-content";

const ESPACES = "Découvrez en images les espaces du centre MSK à Casablanca : salle sensorielle, espace Montessori, Neuro-Gym, parc extérieur.";

export const metadata: Metadata = {
  title: "Nos espaces",
  // La mention 360° ne part dans Google que quand la visite est réellement en
  // ligne : une méta-description est indexée, et l'on ne retire pas d'un index
  // une phrase aussi vite qu'on l'y met.
  description: VISITE_VIRTUELLE_EN_LIGNE
    ? `${ESPACES} Visite virtuelle 360° incluse.`
    : ESPACES,
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
        ctaLabel="Poser la vôtre"
        ctaHref="/contact"
      />

      <NextStepSection
        eyebrow="Prochaine étape"
        title="La Méthode"
        description="Une approche en 6 étapes pour observer, comprendre et accompagner votre enfant."
        buttonText="Découvrir"
        buttonHref="/notre-centre/notre-methode"
      />
    </div>
  );
}



