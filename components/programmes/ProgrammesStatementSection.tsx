"use client";

import { StatementSection } from "@/components/common/StatementSection";

/**
 * La déclaration de /programmes, sur la StatementSection partagée — même mise
 * en scène que /la-methode, seules les couleurs restent celles de la page :
 * titre blue-800, bouton coral-600.
 */
export const ProgrammesStatementSection = () => {
  return (
    <StatementSection
      heading={<>Un programme conçu autour de chaque enfant, pas l&apos;inverse.</>}
      headingClassName="text-5xl text-msk-blue-800 sm:text-6xl lg:text-[clamp(3.5rem,5vw,6rem)]"
      paragraph={
        <>
          Chez MSK, le programme s&apos;adapte à l&apos;enfant — et non
          l&apos;inverse. Chaque parcours est construit sur mesure, révisé au
          fil des progrès, et porté par une équipe pluridisciplinaire qui
          connaît votre enfant par son prénom.
        </>
      }
      button={{
        href: "/contact",
        label: "Demander une inscription",
        fillClassName: "bg-msk-coral-600",
      }}
      image={{ src: "/materrnelle.jpg", alt: "Classe maternelle MSK" }}
    />
  );
};
