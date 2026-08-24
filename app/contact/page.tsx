import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactMainSection } from "@/components/contact/ContactMainSection";
import { ContactMapSection } from "@/components/contact/ContactMapSection";
import { FaqSection } from "@/components/common/FaqSection";
import { FAQ_CONTACT } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Contact & Accès",
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

      {/* Cette page n'a pas de section CTA : la FAQ est le dernier bloc avant
          le pied de page. Fond crème — chaud et deux crans plus clair que le
          menthe #cff2f1 de la page, donc la couture se voit, là où un bleu très
          pâle s'y serait fondu. Le bouton renvoie au formulaire plus haut, pas
          à /contact. */}
      <FaqSection
        tone="creamLight"
        title="Avant de nous"
        titleAccent="écrire"
        description="Les questions que l'on nous pose le plus souvent avant un premier contact."
        items={FAQ_CONTACT}
        ctaLabel="Aller au formulaire"
        ctaHref="#formulaire"
      />
    </div>
  );
}
