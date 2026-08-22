import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { ContactMapSection } from "@/components/contact/ContactMapSection";

export const metadata: Metadata = {
  title: "Contact & Accès | MSK Montessori School Casablanca",
  description: "Contactez-nous pour toute question ou demande de bilan. Coordonnées, formulaire et plan d'accès de MSK.",
};

export default function ContactPage() {
  // Mint carries the whole page, as the reference does on <main>. The form panel
  // is pulled up over the scene and must stay transparent, so the field behind
  // it has to come from here.
  return (
    <div className="flex min-h-screen flex-col bg-[#cff2f1]">
      <ContactHeroSection />
      
      <ContactMainSection />
      
      <ContactMapSection />
    </div>
  );
}
