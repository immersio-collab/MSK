import type { Metadata } from "next";
import { AssetSlot } from "@/components/common/AssetSlot";
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
  description: "Découvrez nos programmes adaptés, de la maternelle au primaire (2 à 11 ans). Pédagogie Montessori, Neuro-Gym et accompagnement personnalisé en groupes de cinq.",
};

export default function ProgrammesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Bande de couleur inclinée + nuages SVG flottants + carte-titre */}
      <ProgrammesHeroSection />

      {/* Onglets de sélection du programme (Maternelle / Primaire) */}
      <ProgrammesSelectorSection />

      {/* Photo pleine-largeur à bord incliné. `sectionBg` reprend le fond du
          sélecteur juste au-dessus : c'est ce fond que montre le triangle
          laissé par la coupe. En cream-50 il se lisait comme un coin blanc. */}
      <MediaBand
        sectionBg="bg-msk-cream-200"
        src="/neuro-gym.jpg"
        alt="Séance Neuro-Gym en classe"
        overlay={
          // Remplace l'ancien games icon.svg : 1,66 Mo pour une icône générique
          // posée nue sur la photo — verdict « remplacer » de l'audit décor.
          <AssetSlot
            label="Jeu"
            hint="SVG animé léger"
            tone="bg-white/80 text-msk-blue-800"
            className="absolute bottom-4 right-2 w-36 rotate-2 md:bottom-8 md:right-10 md:w-44"
          />
        }
      />

      {/* Déclaration oversized + CTA circulaire + photo */}
      <ProgrammesStatementSection />

      {/* Tableau comparatif des programmes */}
      <ProgrammesTableSection />

      <FaqSection
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
      />
    </div>
  );
}

