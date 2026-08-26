import type { Metadata } from "next";
import { MethodeHeroSection } from "@/components/methode/MethodeHeroSection";
import { MethodeKineticBanner } from "@/components/methode/MethodeKineticBanner";
import { MethodeStepsSection } from "@/components/methode/MethodeStepsSection";
import { MediaBand } from "@/components/common/MediaBand";
import { Reveal } from "@/components/motion/Reveal";
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
            {/* Le joystick a pris la place des oiseaux, partis animer « Nos
                niveaux » sur /programmes. Halo clair : lisibilité sur photo. */}
            <Reveal effect="pop" delay={0.3} className="absolute bottom-6 right-4 md:bottom-8 md:right-14">
              <img
                src="/Joystick.svg"
                alt=""
                aria-hidden="true"
                className="h-auto w-36 object-contain drop-shadow-[0_0_16px_rgba(253,251,247,0.6)] sm:w-44 md:w-52"
              />
            </Reveal>
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



