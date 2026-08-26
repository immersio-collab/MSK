"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MoonStar, Repeat, Sunrise, Users } from "lucide-react";


import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/common/Eyebrow";
import { ORGANISATION, PROGRAMMES } from "@/lib/data/programmes";

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
    <section
      id="programmes"
      // `lg:screen-section` : une fenêtre pile. La section mesurait 868px, dont
      // 420px pour la seule photo de la fiche — c'est elle, pas le texte, qui
      // portait le dépassement (voir plus bas).
      className="relative overflow-hidden bg-msk-cream-200 py-[clamp(1.5rem,3.75svh,4.5rem)] lg:screen-section"
    >
      {/* Flanc du titre centré — section pincée à l'écran : absolu strict.
          Les oiseaux viennent de la photo de /la-methode ; ils remplacent le
          crayon, parti à leur place sur la photo neuro-gym juste en dessous. */}
      <Reveal effect="pop" className="pointer-events-none absolute left-[4%] top-[22%] z-10 hidden lg:block">
        <img src="/Bird pair love and flying sky.svg" alt="" aria-hidden="true" className="w-44 -rotate-3" />
      </Reveal>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Badge en pop, titre en plongeon. */}
        <div className="mb-[clamp(1rem,2.75svh,2.5rem)] text-center">
          <Reveal effect="pop" as="span">
            <Eyebrow className="bg-white text-msk-blue-700 shadow-sm">
              Nos niveaux
            </Eyebrow>
          </Reveal>
          <Reveal effect="drop" delay={0.08}>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[0.95] text-msk-night-900 md:text-4xl">
              Choisissez le programme de votre enfant
            </h2>
          </Reveal>
        </div>

        {/*
          Onglets — la seule place qui garde son propre bouton plutôt que
          MorphButton : l'indicateur actif est un motion.div en shared layout
          qui glisse d'un onglet à l'autre, et il vit en absolu DANS le bouton.
          Le remplissage absolu de MorphButton se battrait avec lui.
        */}
        <div className="mb-[clamp(1rem,2.75svh,2.5rem)] flex flex-col justify-center gap-2 md:flex-row">
          {programs.map((p, indexOnglet) => {
            const actif = activeTab === p.id;
            return (
              // Pop l'un après l'autre — la farandole des onglets.
              <Reveal key={p.id} as="span" effect="pop" delay={0.1 * indexOnglet}>
              <button
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
                {/* Espace explicite : sans lui le nom accessible du bouton
                    concatène les deux spans — « Maternelle2–5 ans ». */}
                <span className="relative">{p.title}</span>{" "}
                <span
                  className={cn(
                    "relative rounded-full px-2 py-0.5 text-xs normal-case tracking-normal",
                    actif ? TEINTES[p.id].tabAge : "bg-msk-cream-200 text-msk-night-700",
                  )}
                >
                  {p.age}
                </span>
              </button>
              </Reveal>
            );
          })}
        </div>

        {/* La carte : polaroid blanc, légèrement incliné, qui se redresse au
            survol. La PREMIÈRE apparition est une glissade par la gauche (le
            wrapper Reveal) ; les changements d'onglet restent gérés par
            AnimatePresence à l'intérieur — deux étages, deux responsabilités. */}
        <Reveal effect="slide-left" delay={0.15}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={prog.id}
            initial={{ opacity: 0, y: 16, rotate: -0.6 }}
            animate={{ opacity: 1, y: 0, rotate: -0.6 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
            whileHover={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{ borderRadius: 28 }}
            className="grid gap-3 bg-white p-3 shadow-2xl shadow-msk-night-900/15 lg:grid-cols-[1.2fr_0.8fr]"
          >
            {/* Texte */}
            <div className="flex flex-col justify-center px-5 py-6 md:px-8 md:py-[clamp(0.75rem,2.5svh,2rem)]">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-3xl font-bold uppercase leading-none text-msk-night-900">
                  {prog.title}
                </h3>{" "}
                <span className={cn("rounded-full px-3 py-1 text-sm font-semibold", teinte.age)}>
                  {prog.age}
                </span>
              </div>

              <p className="mt-[clamp(0.5rem,2svh,1rem)] max-w-md text-base leading-relaxed text-msk-night-700">
                {prog.description}
              </p>

              {/* Objectifs : quatre vignettes compactes, deux par deux. */}
              <ul className="mt-[clamp(0.75rem,2.5svh,1.5rem)] grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {prog.objectives.map((objectif, idx) => (
                  <motion.li
                    key={objectif}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06 }}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3.5 py-[clamp(0.5rem,1.25svh,0.625rem)] text-sm font-medium text-msk-night-900",
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

              <p className={cn("mt-[clamp(0.75rem,2.5svh,1.5rem)] font-display text-xs font-semibold uppercase tracking-[0.16em]", teinte.label)}>
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
              <div className="mt-[clamp(0.75rem,2.5svh,1.5rem)] flex flex-col gap-2.5 text-sm text-msk-night-800 sm:flex-row sm:gap-6">
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

              {/* Le point qui distingue vraiment le centre : la composition des
                  groupes ne suit pas l'âge. Faits partagés, donc lus depuis
                  lib/data/programmes.ts et non réécrits ici. */}
              <div className="mt-[clamp(0.375rem,1.5svh,0.75rem)] flex flex-col gap-2.5 text-sm text-msk-night-800 sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-2">
                  <Users className="h-5 w-5 text-msk-coral-600" aria-hidden />
                  <span>
                    <strong className="font-semibold">Groupes de {ORGANISATION.tailleGroupe}</strong> ·{" "}
                    {ORGANISATION.critere}
                  </span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Repeat className="h-5 w-5 text-msk-blue-700" aria-hidden />
                  <span>
                    <strong className="font-semibold">Rotation des salles</strong> ·{" "}
                    {ORGANISATION.rotation}
                  </span>
                </span>
              </div>
            </div>

            {/* Photo : dans le cadre, coins arrondis, sans voile de couleur. */}
            {/* La photo est la plus haute chose de la fiche : à 420px figés elle
                poussait la section à 868px, une fenêtre de 720 plus 148px. Elle
                suit maintenant la fenêtre — 26rem sur grand écran, comme avant. */}
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.25rem] bg-msk-cream-200 lg:min-h-[clamp(16rem,42svh,26rem)]">
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
        </Reveal>
      </div>
    </section>
  );
};
