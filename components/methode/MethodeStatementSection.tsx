"use client";

import { StatementSection } from "@/components/common/StatementSection";
import { SCHOOL_INFO } from "@/lib/data/site-content";

/**
 * The reference's "THE FIRST YEARS MATTER MOST" beat, on the shared
 * StatementSection. The statement is SCHOOL_INFO.coreQuote — the line the
 * whole method rests on — rather than anything newly written.
 *
 * Poster treatment, with one concession to the sentence itself: sentence case,
 * not all-caps — this is a 24-word sentence, and capitals flatten the word
 * shapes readers scan by. Weight, scale and colour carry the poster feel.
 */
export const MethodeStatementSection = () => {
  return (
    <StatementSection
      heading={SCHOOL_INFO.coreQuote}
      headingClassName="text-4xl text-msk-coral-600 sm:text-5xl lg:text-[clamp(3rem,4.2vw,5rem)]"
      paragraph={
        <>
          Notre méthode ne corrige pas l&apos;enfant : elle ajuste ce qui
          l&apos;entoure. Chaque étape — de la première observation à
          l&apos;insertion — est menée par une équipe pluridisciplinaire et
          recalibrée aussi souvent que nécessaire, au rythme de votre enfant.
        </>
      }
      button={{
        href: "/notre-centre/enfants-accueillis",
        label: "Les situations",
        fillClassName: "bg-msk-coral-600",
      }}
      image={{ src: "/accompagnement.jpeg", alt: "Séance d'accompagnement" }}
    />
  );
};
