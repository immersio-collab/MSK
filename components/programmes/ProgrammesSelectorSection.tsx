"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MoonStar, Sunrise } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PROGRAMMES } from "@/lib/data/programmes";

/**
 * Sélecteur Maternelle / Primaire — version allégée.
 *
 * La carte est un grand polaroid blanc légèrement incliné (il se redresse au
 * survol), au vocabulaire du site : titre Fredoka, vignettes d'objectifs 2×2,
 * profils en pastilles teintées, rythme sur une ligne Matin / Après-midi.
 * Chaque programme garde sa teinte (coral / sun) via des classes COMPLÈTES,
 * jamais concaténées.
 */

type ProgramId = "maternelle" | "primaire";

/** Habillage d'un programme : toutes les classes en toutes lettres. */
interface Teinte {
  /** Onglet actif. */
  tab: string;
  /** Pastille d'âge de l'onglet actif. */
  tabAge: string;
  /** Pastille d'âge à côté du titre. */
  age: string;
  /** Fond des vignettes d'objectifs. */
  vignette: string;
  /** Disque de la coche. */
  coche: string;
  /** Intertitre « Profils accompagnés ». */
  label: string;
  /** Pastilles de profils. */
  profil: string;
}

const TEINTES: Record<ProgramId, Teinte> = {
  maternelle: {
    tab: "bg-msk-coral-500",
    tabAge: "bg-white/25 text-white",
    age: "bg-msk-coral-100 text-msk-coral-700",
    vignette: "bg-msk-coral-50",
    coche: "bg-msk-coral-500 text-white",
    label: "text-msk-coral-700",
    profil: "bg-msk-coral-100 text-msk-coral-800",
  },
  primaire: {
    tab: "bg-msk-sun-500",
    tabAge: "bg-white/25 text-white",
    age: "bg-msk-sun-100 text-msk-sun-800",
    vignette: "bg-msk-sun-50",
    coche: "bg-msk-sun-500 text-white",
    label: "text-msk-sun-800",
    profil: "bg-msk-sun-100 text-msk-sun-900",
  },
};

/**
 * Les faits (âges, profils, rythme, photos) viennent de PROGRAMMES ; cette
 * surface n'ajoute que sa description, ses objectifs et ses légendes.
 */
const EXTRAS = [
  {
    description:
      "Un environnement préparé pour l'éveil sensoriel, le langage et l'autonomie — au rythme de chaque enfant.",
    objectives: [
      "Motricité fine et globale",
      "Éveil sensoriel",
      "Langage oral",
      "Émotions et socialisation",
    ],
    legende: "La classe des 2–5 ans",
  },
  {
    description:
      "Les fondamentaux — lecture, écriture, calcul — dans un cadre inclusif, avec les séances thérapeutiques intégrées.",
    objectives: [
      "Lecture et écriture",
      "Raisonnement logique",
      "Estime de soi",
      "Inclusion en milieu ordinaire",
    ],
    legende: "La classe des 6–11 ans",
  },
];

const programs = PROGRAMMES.map((programme, index) => ({
  ...programme,
  ...EXTRAS[index],
  conditions: programme.profils,
}));

export const ProgrammesSelectorSection = () => {
  const [activeTab, setActiveTab] = useState<ProgramId>("maternelle");

  const prog = programs.find((p) => p.id === activeTab)!;
  const teinte = TEINTES[prog.id];

  return (
    <section id="programmes" className="overflow-hidden bg-msk-cream-200 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <FadeUp>
          <div className="mb-10 text-center">
            <Eyebrow className="bg-white text-msk-coral-700 shadow-sm">
              Nos niveaux
            </Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[0.95] text-msk-night-900 md:text-4xl">
              Choisissez le programme de votre enfant
            </h2>
          </div>
        </FadeUp>

        {/*
          Onglets — la seule place qui garde son propre bouton plutôt que
          MorphButton : l'indicateur actif est un motion.div en shared layout
          qui glisse d'un onglet à l'autre, et il vit en absolu DANS le bouton.
          Le remplissage absolu de MorphButton se battrait avec lui.
        */}
        <div className="mb-10 flex flex-col justify-center gap-2 md:flex-row">
          {programs.map((p) => {
            const actif = activeTab === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={actif}
                onClick={() => setActiveTab(p.id)}
                className={cn(
                  "relative flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300",
                  actif ? "text-white" : "bg-white text-msk-night-800 hover:text-msk-coral-700",
                )}
              >
                {actif ? (
                  <motion.span
                    layoutId="active-program-tab"
                    aria-hidden
                    className={cn("absolute inset-0 rounded-full shadow-md", TEINTES[p.id].tab)}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{p.title}</span>
                <span
                  className={cn(
                    "relative rounded-full px-2 py-0.5 text-xs normal-case tracking-normal",
                    actif ? TEINTES[p.id].tabAge : "bg-msk-cream-200 text-msk-night-700",
                  )}
                >
                  {p.age}
                </span>
              </button>
            );
          })}
        </div>

        {/* La carte : polaroid blanc, légèrement incliné, qui se redresse au survol. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={prog.id}
            initial={{ opacity: 0, y: 16, rotate: -0.6 }}
            animate={{ opacity: 1, y: 0, rotate: -0.6 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
            whileHover={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{ borderRadius: 28 }}
            className="grid gap-3 bg-white p-3 shadow-2xl shadow-msk-night-900/15 lg:grid-cols-[1.05fr_0.95fr]"
          >
            {/* Texte */}
            <div className="flex flex-col justify-center px-5 py-6 md:px-8 md:py-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-3xl font-bold uppercase leading-none text-msk-night-900">
                  {prog.title}
                </h3>
                <span className={cn("rounded-full px-3 py-1 text-sm font-semibold", teinte.age)}>
                  {prog.age}
                </span>
              </div>

              <p className="mt-4 max-w-md text-base leading-relaxed text-msk-night-700">
                {prog.description}
              </p>

              {/* Objectifs : quatre vignettes compactes, deux par deux. */}
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {prog.objectives.map((objectif, idx) => (
                  <motion.li
                    key={objectif}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06 }}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-msk-night-900",
                      teinte.vignette,
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                        teinte.coche,
                      )}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {objectif}
                  </motion.li>
                ))}
              </ul>

              <p className={cn("mt-6 font-display text-xs font-semibold uppercase tracking-[0.16em]", teinte.label)}>
                Profils accompagnés
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {prog.conditions.map((condition) => (
                  <span
                    key={condition}
                    className={cn("rounded-full px-3 py-1.5 text-sm font-medium", teinte.profil)}
                  >
                    {condition}
                  </span>
                ))}
              </div>

              {/* Rythme : une ligne Matin / Après-midi, icônes à l'appui. */}
              <div className="mt-6 flex flex-col gap-2.5 text-sm text-msk-night-800 sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-2">
                  <Sunrise className="h-5 w-5 text-msk-sun-600" aria-hidden />
                  <span>
                    <strong className="font-semibold">Matin</strong> · {prog.matin}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MoonStar className="h-5 w-5 text-msk-blue-700" aria-hidden />
                  <span>
                    <strong className="font-semibold">Après-midi</strong> · {prog.apresMidi}
                  </span>
                </span>
              </div>
            </div>

            {/* Photo : dans le cadre, coins arrondis, sans voile de couleur. */}
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.25rem] bg-msk-cream-200 lg:min-h-[420px]">
              <Image
                src={prog.image}
                alt={`Programme ${prog.title}`}
                fill
                sizes="(max-width: 1024px) 92vw, 540px"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-msk-coral-700 shadow-sm">
                {prog.legende}
              </span>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
};
