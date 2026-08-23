import type { Metadata } from "next";
import { TroublesHeroSection } from "@/components/troubles/TroublesHeroSection";
import { TroublesGridSection } from "@/components/troubles/TroublesGridSection";
import { TroublesQuizSection } from "@/components/troubles/TroublesQuizSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_TROUBLES } from "@/lib/data/faq";

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

      {/* Fond jaune : le ciel du quiz au-dessus descend jusqu'au bord bas en
          bleu-300 et la CTA en dessous est bleu-800 — un fond bleu ferait trois
          bandes bleues d'affilée. Le jaune est déjà la couleur de la bande
          oblique derrière les huit cartes. */}
      <FaqSection
        tone="sunLight"
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
        svgSrc="/Enjoying the fun time.svg"
        bgColor="bg-msk-blue-800"
        cloudColor="text-white/50"
        textColor="text-msk-blue-50"
        buttonTextColor="text-msk-blue-900"
      />
    </div>
  );
}



