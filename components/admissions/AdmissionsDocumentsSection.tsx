"use client";

import Link from "next/link";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * "Documents à fournir" — the admissions counterpart to the method page's
 * "how to begin" panel: same white card on the cream field, invitation and
 * button on the left, the list on the right.
 *
 * NOTE — draft copy. The page carried only the heading "Documents à Fournir"
 * with no list behind it, so these items are a plausible set for a Casablanca
 * centre rather than supplied text. Confirm before publishing: the exact
 * paperwork is the kind of detail parents act on.
 */
const DOCUMENTS = [
  {
    id: "1",
    title: "Pièces d'identité",
    description:
      "Copie de la CIN des parents ou tuteurs, et acte de naissance de l'enfant.",
  },
  {
    id: "2",
    title: "Dossier scolaire",
    description:
      "Bulletins ou attestation de scolarité de l'année précédente, si l'enfant était déjà scolarisé. Le code Massar n'est pas exigé.",
  },
  {
    id: "3",
    title: "Éléments médicaux",
    description:
      "Comptes rendus de bilans déjà réalisés (orthophonie, psychomotricité, neuropédiatrie) et carnet de santé, s'ils existent.",
  },
  {
    id: "4",
    title: "Photos d'identité",
    description: "Deux photos récentes pour le dossier d'inscription.",
  },
];

export const AdmissionsDocumentsSection = () => {
  return (
    <section className="w-full bg-msk-cream-200 pb-24 md:pb-32">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 rounded-[2rem] bg-white px-8 py-14 md:px-14 md:py-20 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <div>
              <h2 className="max-w-md font-display text-3xl font-bold leading-[1.1] text-msk-night-900 md:text-4xl">
                Documents à fournir
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-msk-night-700">
                Rien de tout cela n&apos;est bloquant. Si une pièce vous manque,
                nous commençons quand même et nous vous aidons à la réunir.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-msk-blue-700 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-msk-blue-800"
              >
                Demander la liste
              </Link>
            </div>
          </FadeUp>

          <ol className="flex flex-col gap-10">
            {DOCUMENTS.map((doc, index) => (
              <FadeUp key={doc.id} delay={0.1 + index * 0.1}>
                <li className="flex items-start gap-5">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-msk-sun-300 font-display text-xl font-bold text-msk-coral-700"
                  >
                    {doc.id}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-msk-night-900">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-base leading-snug text-msk-night-700">
                      {doc.description}
                    </p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
