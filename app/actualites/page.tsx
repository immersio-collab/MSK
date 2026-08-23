import type { Metadata } from "next";
import { ActualitesHeroSection } from "@/components/actualites/ActualitesHeroSection";
import { ActualitesListSection } from "@/components/actualites/ActualitesListSection";
import { ActualitesCtaSection } from "@/components/actualites/ActualitesCtaSection";
import { FaqSection } from "@/components/common/FaqSection";
import { FAQ_ACTUALITES } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Actualités, Blog & Ressources | MSK Montessori School Casablanca",
  description: "Découvrez nos derniers articles éducatifs, les événements à venir, et nos conseils pour accompagner au mieux le développement de votre enfant.",
};

export default function ActualitesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ActualitesHeroSection />
      
      <ActualitesListSection />

      {/* Corail : la couleur déclarée de la page (bande du hero, sticker « À la
          une », « Lire l'article »). Bouton encre plutôt que corail — la CTA
          juste en dessous tire déjà un bouton corail, deux d'affilée se
          liraient comme un doublon. */}
      <FaqSection
        tone="coralLight"
        button="night"
        title="À propos de nos"
        titleAccent="articles"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_ACTUALITES}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      <ActualitesCtaSection />
    </div>
  );
}
