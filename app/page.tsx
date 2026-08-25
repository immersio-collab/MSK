import type { Metadata } from "next";

import { AccueilHero } from "@/components/accueil/AccueilHero";
import { AccueilStatement } from "@/components/accueil/AccueilStatement";
import { AccueilPourQui } from "@/components/accueil/AccueilPourQui";
import { AccueilTroubles } from "@/components/accueil/AccueilTroubles";
import { AccueilSteps } from "@/components/accueil/AccueilSteps";
import { AccueilTemoignages } from "@/components/accueil/AccueilTemoignages";
import { AccueilGalerie } from "@/components/accueil/AccueilGalerie";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_ACCUEIL } from "@/lib/data/faq";
import { SCHOOL_INFO } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "Accueil",
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

      {/* Jaune plein, seule bande saturée de la moitié haute : c'est le
          contrepoint chaud du ciel bleu juste au-dessus, et l'accroche de la
          page. Les pages intérieures gardent, elles, des fonds discrets. */}
      <AccueilStatement
        quote="Chaque enfant a son rythme. Nous lui créons son chemin."
        background="bg-msk-sun-300"
      />

      <AccueilPourQui />

      <AccueilTroubles />

      <AccueilSteps />

      <AccueilTemoignages />

      <FaqSection
        title="Ce que les parents nous"
        titleAccent="demandent"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_ACCUEIL}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      {/* La galerie sombre passe AVANT la CTA : NextStepSection est la
          dernière section de chaque page du site, l'accueil compris. */}
      <AccueilGalerie />

      <NextStepSection
        eyebrow="Le centre"
        title="Parlons de votre enfant"
        description={SCHOOL_INFO.coreQuote}
        buttonText="Nous contacter"
        buttonHref="/contact"
      />
    </div>
  );
}
