import type { Metadata } from "next";
import { TroublesHeroSection } from "@/components/troubles/TroublesHeroSection";
import { TroublesGridSection } from "@/components/troubles/TroublesGridSection";
import { TroublesQuizSection } from "@/components/troubles/TroublesQuizSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_TROUBLES } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Situations accueillies",
  description:
    "Décrochage et refus scolaires, enfant sans code Massar, retard scolaire, diabète, épilepsie : le centre MSK accompagne ces situations à Casablanca, quelques jours par semaine, en complément de la scolarité de l'enfant.",
};

export default function TroublesAccompagnesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TroublesHeroSection />
      
      <TroublesGridSection />
      
      <TroublesQuizSection />

      <FaqSection
        title="Comprendre les"
        titleAccent="troubles"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_TROUBLES}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      <NextStepSection
        eyebrow="Prochaine étape"
        title="La Méthode MSK"
        description="Découvrez notre approche sur-mesure combinant pédagogie Montessori, neuro-gym et thérapies intégrées."
        buttonText="Découvrir"
        buttonHref="/notre-centre/la-methode"
      />
    </div>
  );
}



