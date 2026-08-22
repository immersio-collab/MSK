import type { Metadata } from "next";
import { MethodeHeroSection } from "@/components/methode/MethodeHeroSection";
import { MethodeKineticBanner } from "@/components/methode/MethodeKineticBanner";
import { MethodeStepsSection } from "@/components/methode/MethodeStepsSection";
import { MethodeMediaBand } from "@/components/methode/MethodeMediaBand";
import { MethodeStatementSection } from "@/components/methode/MethodeStatementSection";
import { MethodeProcessSection } from "@/components/methode/MethodeProcessSection";
import { NextStepSection } from "@/components/common/NextStepSection";

export const metadata: Metadata = {
  title: "La Méthode MSK | MSK Montessori School Casablanca",
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

      {/* Full-bleed photography, slanted top edge */}
      <MethodeMediaBand />

      {/* Oversized statement + supporting copy */}
      <MethodeStatementSection />

      {/* How to begin */}
      <MethodeProcessSection />

      {/* Hand-off to the next page */}
      <NextStepSection
        eyebrow="Prochaine étape"
        title="Troubles accompagnés"
        description="TDAH, dyslexie, dyspraxie, troubles du langage : comment nous adaptons le cadre à chaque profil."
        buttonText="Découvrir"
        buttonHref="/notre-centre/troubles-accompagnes"
        svgSrc="/Enjoying the fun time.svg"
        bgColor="bg-msk-blue-800"
        cloudColor="text-white/50"
        textColor="text-msk-blue-50"
        buttonTextColor="text-msk-blue-900"
      />
    </div>
  );
}



