import type { Metadata } from "next";
import { AdmissionsHeroSection } from "@/components/admissions/AdmissionsHeroSection";
import { AdmissionsStepsSection } from "@/components/admissions/AdmissionsStepsSection";
import { AdmissionsMediaBand } from "@/components/admissions/AdmissionsMediaBand";
import { AdmissionsMassarSection } from "@/components/admissions/AdmissionsMassarSection";
import { AdmissionsDocumentsSection } from "@/components/admissions/AdmissionsDocumentsSection";
import { AdmissionsNextStopSection } from "@/components/admissions/AdmissionsNextStopSection";
import { MethodeKineticBanner } from "@/components/methode/MethodeKineticBanner";

export const metadata: Metadata = {
  title: "Admissions & Inscriptions | MSK Casablanca",
  description: "Processus d'admission, pièces requises et accompagnement sans code Massar.",
};

export default function AdmissionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Colour band + title card */}
      <AdmissionsHeroSection />

      {/* Kinetic slogan band */}
      <MethodeKineticBanner text="Contacter. Évaluer. Proposer. Inscrire." />

      {/* The 4 admission steps as a scroll-pinned fanned deck */}
      <AdmissionsStepsSection />

      {/* Full-bleed photography, slanted top edge */}
      <AdmissionsMediaBand />

      {/* Sans code Massar — the page's key reassurance */}
      <AdmissionsMassarSection />

      {/* Documents à fournir */}
      <AdmissionsDocumentsSection />

      {/* Hand-off to the method */}
      <AdmissionsNextStopSection />
    </div>
  );
}

