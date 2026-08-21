import type { Metadata } from "next";
import { MethodeHeroSection } from "@/components/methode/MethodeHeroSection";
import { MethodeKineticBanner } from "@/components/methode/MethodeKineticBanner";
import { MethodeStepsSection } from "@/components/methode/MethodeStepsSection";
import { MethodeMediaBand } from "@/components/methode/MethodeMediaBand";
import { MethodeStatementSection } from "@/components/methode/MethodeStatementSection";
import { MethodeProcessSection } from "@/components/methode/MethodeProcessSection";
import { MethodeNextStopSection } from "@/components/methode/MethodeNextStopSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

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
      <MethodeNextStopSection />

      {/* Reused CTA with custom content */}
      <CtaFinalSection
        title="Prêts à franchir la première étape ?"
        subtitle="Vous souhaitez en savoir plus ? Réservez un bilan d'évaluation gratuit et sans engagement."
        buttonText="Réserver mon bilan"
      />
    </div>
  );
}
