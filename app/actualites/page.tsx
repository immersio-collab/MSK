import type { Metadata } from "next";
import { ActualitesHeroSection } from "@/components/actualites/ActualitesHeroSection";
import { ActualitesListSection } from "@/components/actualites/ActualitesListSection";
import { ActualitesNewsletterSection } from "@/components/actualites/ActualitesNewsletterSection";

export const metadata: Metadata = {
  title: "Actualités, Blog & Ressources | MSK Montessori School Casablanca",
  description: "Découvrez nos derniers articles éducatifs, les événements à venir, et nos conseils pour accompagner au mieux le développement de votre enfant.",
};

export default function ActualitesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ActualitesHeroSection />
      
      <ActualitesListSection />
      
      <ActualitesNewsletterSection />
    </div>
  );
}
