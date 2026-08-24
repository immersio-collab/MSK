import type { Metadata } from "next";

import { AccueilHero } from "@/components/accueil/AccueilHero";
import { AccueilStatement } from "@/components/accueil/AccueilStatement";
import { AccueilPourQui } from "@/components/accueil/AccueilPourQui";
import { AccueilTroubles } from "@/components/accueil/AccueilTroubles";
import { AccueilSteps } from "@/components/accueil/AccueilSteps";
import { AccueilTemoignages } from "@/components/accueil/AccueilTemoignages";
import { AccueilGalerie } from "@/components/accueil/AccueilGalerie";
import { FaqSection } from "@/components/common/FaqSection";
import { FAQ_ACCUEIL } from "@/lib/data/faq";
import { SCHOOL_INFO } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "Accueil | MSK Montessori School Casablanca",
  description:
    "MSK Montessori School - École Inclusive & Réadaptation à Casablanca.",
};

export default function HomePage() {
  // Bands run edge to edge and each owns its own background, so the page itself
  // sets no colour. `overflow-x-clip` contains the tilted cards in
  // AccueilPourQui and the gallery marquee without becoming a scrollport —
  // `overflow-hidden` would create one on both axes.
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <AccueilHero />

      <AccueilStatement
        quote="Chaque enfant a son rythme. Nous lui créons son chemin."
        background="bg-msk-coral-50"
      />

      <AccueilPourQui />

      <AccueilTroubles />

      <AccueilSteps />

      <AccueilTemoignages />

      <FaqSection
        tone="blueLight"
        title="Ce que les parents nous"
        titleAccent="demandent"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_ACCUEIL}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      <AccueilStatement
        quote={SCHOOL_INFO.coreQuote}
        background="bg-msk-blue-200"
        cta={{ href: "/contact", label: "Réserver un bilan gratuit" }}
      />

      <AccueilGalerie />
    </div>
  );
}
