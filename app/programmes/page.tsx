import type { Metadata } from "next";
import { ProgrammesHeroSection } from "@/components/programmes/ProgrammesHeroSection";
import { ProgrammesSelectorSection } from "@/components/programmes/ProgrammesSelectorSection";
import { ProgrammesTableSection } from "@/components/programmes/ProgrammesTableSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

export const metadata: Metadata = {
  title: "Programmes & Classes | MSK Montessori School Casablanca",
  description: "Découvrez nos programmes adaptés de la Petite Enfance à l'âge adulte. Pédagogie Montessori, Neuro-Gym et accompagnement personnalisé.",
};

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProgrammesHeroSection />
      
      <ProgrammesSelectorSection />
      
      <ProgrammesTableSection />
      
      <CtaFinalSection 
        title="Pas sûr du programme adapté ?"
        subtitle="Nos experts sont là pour vous guider. Réservez un bilan d'orientation gratuit et sans engagement."
        buttonText="Réserver un bilan gratuit"
      />
    </div>
  );
}
