import type { Metadata } from "next";
import { MethodeHeroSection } from "@/components/methode/MethodeHeroSection";
import { MethodeTimelineSection } from "@/components/methode/MethodeTimelineSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

export const metadata: Metadata = {
  title: "La Méthode MSK | MSK Montessori School Casablanca",
  description: "La méthode en 6 étapes : Observer, Comprendre, Adapter, Rééduquer, Accompagner, Insérer.",
};

export default function LaMethodePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <MethodeHeroSection />

      {/* Signature Vertical Timeline */}
      <MethodeTimelineSection />

      {/* Reused CTA with custom content */}
      <CtaFinalSection 
        title="Prêts à franchir la première étape ?"
        subtitle="Vous souhaitez en savoir plus ? Réservez un bilan d'évaluation gratuit et sans engagement."
        buttonText="Réserver mon bilan"
      />
    </div>
  );
}
