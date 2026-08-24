import type { Metadata } from "next";
import { ProgrammesHeroSection } from "@/components/programmes/ProgrammesHeroSection";

import { ProgrammesSelectorSection } from "@/components/programmes/ProgrammesSelectorSection";
import { MediaBand } from "@/components/common/MediaBand";
import { ProgrammesStatementSection } from "@/components/programmes/ProgrammesStatementSection";
import { ProgrammesTableSection } from "@/components/programmes/ProgrammesTableSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_PROGRAMMES } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Programmes & Classes",
  description: "Découvrez nos programmes adaptés de la Petite Enfance à l'âge adulte. Pédagogie Montessori, Neuro-Gym et accompagnement personnalisé.",
};

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Bande de couleur inclinée + nuages SVG flottants + carte-titre */}
      <ProgrammesHeroSection />

      {/* Onglets de sélection du programme (Maternelle / Primaire) */}
      <ProgrammesSelectorSection />

      {/* Photo pleine-largeur à bord incliné */}
      <MediaBand
        sectionBg="bg-msk-cream-200"
        src="/neuro-gym.jpg"
        alt="Séance Neuro-Gym en classe"
        overlay={
          <img
            src="/games icon.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-auto absolute bottom-4 right-2 w-40 md:bottom-8 md:right-10 md:w-56"
          />
        }
      />

      {/* Déclaration oversized + CTA circulaire + photo */}
      <ProgrammesStatementSection />

      {/* Tableau comparatif des programmes */}
      <ProgrammesTableSection />

      {/* Questions de parents sur les deux programmes. Fond bleu : la page
          arrive ici après trois plages crème, et le bleu est déjà sa couleur
          (bande du hero, carte-titre, titre de la déclaration). */}
      <FaqSection
        tone="blueMid"
        title="Choisir le bon"
        titleAccent="programme"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_PROGRAMMES}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      {/* Hand-off vers le contact */}
      <NextStepSection
        eyebrow="Prochaine étape"
        title="Contact"
        description="Prêt à faire le premier pas ? Contactez-nous pour échanger sur les besoins de votre enfant."
        buttonText="Nous contacter"
        buttonHref="/contact"
        bgColor="bg-msk-coral-700"
        cloudColor="text-msk-coral-900"
        textColor="text-msk-coral-100"
        buttonTextColor="text-msk-coral-800"
        eyebrowColor="text-msk-sun-300"
      />
    </div>
  );
}

