import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { ContactMapSection } from "@/components/contact/ContactMapSection";

export const metadata: Metadata = {
  title: "Contact & Accès | MSK Montessori School Casablanca",
  description: "Contactez-nous pour toute question ou demande de bilan. Coordonnées, formulaire et plan d'accès de MSK.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-msk-cream-50">
      <ContactHeroSection />
      
      <ContactMainSection />
      
      <ContactMapSection />
    </div>
  );
}
