import type { Metadata } from "next";
import { EspacesHeroSection } from "@/components/espaces/EspacesHeroSection";
import { EspacesTourVirtuelSection } from "@/components/espaces/EspacesTourVirtuelSection";
import { EspacesGalerieSection } from "@/components/espaces/EspacesGalerieSection";
import { EspacesJourneeTypeSection } from "@/components/espaces/EspacesJourneeTypeSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

export const metadata: Metadata = {
  title: "Nos Espaces & Tour Virtuel | MSK Montessori School Casablanca",
  description: "Visitez nos locaux à Casablanca : classes Montessori adaptées, salle Neuro-Gym, espaces de motricité.",
};

export default function NosEspacesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EspacesHeroSection />
      
      <EspacesTourVirtuelSection />
      
      <EspacesGalerieSection />
      
      <EspacesJourneeTypeSection />
      
      <CtaFinalSection 
        title="Le mieux, c'est de le voir en vrai."
        subtitle="Nous vous ouvrons nos portes. Venez visiter le centre et rencontrer notre équipe."
        buttonText="Planifier une visite physique"
      />
    </div>
  );
}
