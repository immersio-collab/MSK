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

      {/* Jaune sun : les CTA des autres pages sont en night-800 / blue-800, la
          palette de fin de page reste donc variée. Le lead qui compte est le
          rendez-vous de bilan, pas la newsletter. */}
      <NextStepSection
        eyebrow="Un doute ? Une question ?"
        title="Parlons de votre enfant"
        description="Nos articles ne remplacent pas un avis professionnel. Le bilan initial avec notre fondatrice est le vrai premier pas."
        buttonText="Prendre RDV pour un bilan gratuit"
        buttonHref="/contact"
        bgColor="bg-msk-sun-300"
        cloudColor="text-white/60"
        textColor="text-msk-sun-900"
        buttonTextColor="text-white"
        eyebrowColor="text-msk-coral-700"
        titleColor="text-msk-night-900"
        buttonBgColor="bg-msk-coral-600 shadow-lg shadow-msk-coral-700/30 group-hover:bg-msk-coral-700"
      />
    </div>
  );
}
