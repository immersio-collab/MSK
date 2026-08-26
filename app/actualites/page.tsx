import type { Metadata } from "next";
import { ActualitesHeroSection } from "@/components/actualites/ActualitesHeroSection";
import { ActualitesListSection } from "@/components/actualites/ActualitesListSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FaqSection } from "@/components/common/FaqSection";
import { FAQ_ACTUALITES } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Actualités, Blog & Ressources",
  description: "Découvrez nos derniers articles éducatifs, les événements à venir, et nos conseils pour accompagner au mieux le développement de votre enfant.",
};

export default function ActualitesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ActualitesHeroSection />
      
      <ActualitesListSection />

      <FaqSection
        title="À propos de nos"
        titleAccent="articles"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_ACTUALITES}
        ctaLabel="Poser la vôtre"
        ctaHref="/contact"
      />

      <NextStepSection
        eyebrow="Un doute ? Une question ?"
        title="Parlons de votre enfant"
        description="Nos articles ne remplacent pas un avis professionnel. Le bilan initial avec notre fondatrice est le vrai premier pas."
        buttonText="Nous contacter"
        buttonHref="/contact"
      />
    </div>
  );
}
