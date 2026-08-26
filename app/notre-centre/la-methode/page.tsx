import type { Metadata } from "next";
import { MethodeHeroSection } from "@/components/methode/MethodeHeroSection";
import { MethodeKineticBanner } from "@/components/methode/MethodeKineticBanner";
import { MethodeStepsSection } from "@/components/methode/MethodeStepsSection";
import { MediaBand } from "@/components/common/MediaBand";
import { MethodeStatementSection } from "@/components/methode/MethodeStatementSection";
import { MethodeProcessSection } from "@/components/methode/MethodeProcessSection";
import { FaqSection } from "@/components/common/FaqSection";
import { NextStepSection } from "@/components/common/NextStepSection";
import { FAQ_METHODE } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "La Méthode MSK",
  description: "La méthode en 6 étapes : Observer, Comprendre, Adapter, Rééduquer, Accompagner, Insérer.",
};

export default function LaMethodePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Colour band + title card */}
      <MethodeHeroSection />

      {/* Kinetic slogan band */}
      <MethodeKineticBanner />

      {/* The 6 steps as a scroll-pinned fanned deck */}
      <MethodeStepsSection />

      {/* Full-bleed photography, slanted top edge. `sectionBg` reprend le fond
          du deck des 6 étapes juste au-dessus : c'est ce fond que montre le
          triangle laissé par la coupe. En cream-50 il se lisait comme un coin
          blanc. */}
      <MediaBand
        sectionBg="bg-msk-cream-100"
        src="/parcours.jpeg"
        alt="Enfant en séance, plein cadre"
        priority
        overlay={
          <>
            {/* w-40 mobile : à w-64 les oiseaux couvraient 2/3 d'un écran de
                375px. */}
            <img
              src="/Bird pair love and flying sky.svg"
              alt=""
              aria-hidden="true"
              className="absolute bottom-6 right-4 h-auto w-40 object-contain sm:w-56 md:bottom-8 md:right-14 md:w-80"
            />
            {/* Le Sunny en pendant a été retiré (retour client : doublon de
                décor sur une même photo, et 4e occurrence du soleil sur le
                site). Les oiseaux — recolorés charte — suffisent. */}
          </>
        }
      />

      {/* Oversized statement + supporting copy */}
      <MethodeStatementSection />

      {/* How to begin */}
      <MethodeProcessSection />

      <FaqSection
        title="Comprendre la"
        titleAccent="méthode"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_METHODE}
        ctaLabel="Poser la vôtre"
        ctaHref="/contact"
      />

      {/* Hand-off to the next page */}
      <NextStepSection
        eyebrow="Prochaine étape"
        title="La Fondatrice"
        description="Découvrez Khadija Elabaya et son parcours dédié aux enfants que l'école seule ne suffit pas à porter."
        buttonText="Rencontrer"
        buttonHref="/notre-centre/la-fondatrice"
      />
    </div>
  );
}



