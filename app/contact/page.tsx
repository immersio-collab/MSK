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
  // Le bleu-100 porte toute la page, comme la référence le fait sur <main> : le
  // panneau du formulaire remonte par-dessus la scène et doit rester
  // transparent, donc le champ derrière lui vient d'ici. Même valeur que le
  // héros au-dessus — la page est d'un seul tenant, sans couture.
  return (
    <div className="flex min-h-screen flex-col bg-msk-blue-100">
      <ContactHeroSection />
      
      <ContactMainSection />
      
      <ContactMapSection />

      {/* Cette page n'a pas de section CTA : la FAQ est le dernier bloc avant
          le pied de page. Son fond crème est fixé pour tout le site et tranche
          ici sur le bleu de la page. Le bouton renvoie au formulaire plus haut,
          pas à /contact. */}
      <FaqSection
        title="Avant de nous"
        titleAccent="écrire"
        description="Les questions que l'on nous pose le plus souvent avant un premier contact."
        items={FAQ_CONTACT}
        ctaLabel="Le formulaire"
        ctaHref="#formulaire"
      />
    </div>
  );
}
