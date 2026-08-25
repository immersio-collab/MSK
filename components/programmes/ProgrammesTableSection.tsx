"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Check,
  HeartHandshake,
  MessageCircle,
  School,
  Shapes,
  type LucideIcon,
} from "lucide-react";

import { AssetSlot } from "@/components/common/AssetSlot";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PROGRAMMES } from "@/lib/data/programmes";

gsap.registerPlugin(ScrollTrigger);

/**
 * Comparatif des programmes — deux fiches au lieu d'un tableau.
 *
 * Chaque programme est une carte polaroid inclinée à bandeau teinté (coral
 * Maternelle, sun Primaire). Un critère = une ligne icône + coche pleine ou
 * pastille texte ; « — » est devenu « Pas encore ». L'âge vit dans le bandeau,
 * plus besoin d'une ligne dédiée. Sur mobile les fiches s'empilent : plus
 * aucun défilement horizontal.
 */

/** Un critère : coche (true), pastille texte, ou « Pas encore » (false). */
interface Critere {
  label: string;
  icon: LucideIcon;
  maternelle: boolean | string;
  primaire: boolean | string;
}

const CRITERES: Critere[] = [
  { label: "Pédagogie Montessori", icon: Shapes, maternelle: true, primaire: true },
  { label: "Séances Neuro-Gym", icon: Brain, maternelle: true, primaire: true },
  { label: "Orthophonie", icon: MessageCircle, maternelle: true, primaire: true },
  { label: "Intégration scolaire", icon: School, maternelle: false, primaire: true },
  { label: "Soutien psychologique", icon: HeartHandshake, maternelle: "Parents", primaire: "Enfant & parents" },
];

/** Habillage par programme — classes complètes, jamais concaténées. */
interface FicheTeinte {
  bandeau: string;
  bandeauTitre: string;
  bandeauAge: string;
  iconeDisque: string;
  coche: string;
  pastille: string;
}

/**
 * Titres et âges viennent de PROGRAMMES ; ici seulement l'habillage.
 *
 * L'inclinaison est dans le vocabulaire des stickers du site (STICKER_TILTS va
 * de 1.5 à 2.5°). Elle était à 1°, invisible à l'œil sur des fiches aussi
 * larges — les deux paraissaient parfaitement droites.
 */
const HABILLAGES: { tilt: string; teinte: FicheTeinte }[] = [
  {
    tilt: "lg:rotate-[-2deg]",
    teinte: {
      bandeau: "bg-msk-coral-500",
      bandeauTitre: "text-white",
      bandeauAge: "bg-white text-msk-coral-700",
      iconeDisque: "bg-msk-coral-50 text-msk-coral-600",
      coche: "bg-msk-coral-500 text-white",
      pastille: "bg-msk-coral-50 text-msk-coral-800",
    },
  },
  {
    tilt: "lg:rotate-[2deg]",
    teinte: {
      bandeau: "bg-msk-sun-400",
      bandeauTitre: "text-msk-night-900",
      bandeauAge: "bg-white text-msk-sun-800",
      iconeDisque: "bg-msk-sun-50 text-msk-sun-700",
      coche: "bg-msk-sun-400 text-msk-night-900",
      pastille: "bg-msk-sun-50 text-msk-sun-900",
    },
  },
];

const FICHES = PROGRAMMES.map((programme, index) => ({
  id: programme.id,
  titre: programme.title,
  age: programme.age,
  ...HABILLAGES[index],
}));

export const ProgrammesTableSection = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Les fiches se posent comme des stickers. `from` + immediateRender:false :
      // si le tween ne part jamais, elles restent simplement visibles.
      gsap.from(".comparatif-fiche", {
        y: 48,
        rotate: (i: number) => (i % 2 ? 4 : -4),
        scale: 0.94,
        opacity: 0,
        duration: 0.75,
        ease: "back.out(1.6)",
        stagger: 0.12,
        immediateRender: false,
        scrollTrigger: { trigger: ".comparatif-grille", start: "top 82%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // blue-50 : la respiration signature de la page — les fiches blanches et
  // leurs bandeaux coral/sun se détachent mieux que sur crème.
  return (
    <section
      ref={root}
      // `lg:screen-section` : une fenêtre pile. Les deux fiches mesuraient 815px
      // avec 96px de marge haut/bas — une fenêtre de 720 plus 95px. Marge,
      // en-tête et interlignes du tableau suivent maintenant la fenêtre.
      className="relative overflow-hidden bg-msk-blue-50 py-[clamp(2rem,5svh,4rem)] lg:screen-section"
    >
      {/* Marges latérales hors du max-w-4xl — la meilleure zone vide de la
          page, mais elle n'existe qu'en très large : xl only. Fond blue-50 :
          jamais de blanc ici (invisible). */}
      <AssetSlot
        label="Crayon"
        tone="bg-white/80 text-msk-blue-800"
        className="pointer-events-none absolute left-[2%] top-[42%] hidden w-28 -rotate-6 xl:flex"
      />
      <AssetSlot
        label="Règle"
        tone="bg-white/80 text-msk-blue-800"
        className="pointer-events-none absolute right-[2%] top-[38%] hidden w-28 rotate-6 xl:flex"
      />
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <FadeUp>
          <div className="mb-[clamp(1.5rem,4svh,3rem)] text-center">
            <Eyebrow className="bg-white text-msk-blue-700 shadow-sm">
              Vue d&apos;ensemble
            </Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[0.95] text-msk-night-900 md:text-4xl">
              Comparatif des <span className="text-msk-coral-700">programmes</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-msk-night-700 md:text-lg">
              Un aperçu rapide de ce qui est inclus ou adapté selon l&apos;âge de l&apos;enfant.
            </p>
          </div>
        </FadeUp>

        <div className="comparatif-grille grid grid-cols-1 gap-7 lg:grid-cols-2">
          {FICHES.map((fiche) => (
            <article
              key={fiche.id}
              className={cn(
                "comparatif-fiche overflow-hidden rounded-[1.5rem] bg-white shadow-2xl shadow-msk-night-900/15 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1.5",
                fiche.tilt,
              )}
            >
              <header className={cn("flex items-center justify-between px-6 py-4", fiche.teinte.bandeau)}>
                <h3 className={cn("font-display text-xl font-bold uppercase leading-none", fiche.teinte.bandeauTitre)}>
                  {fiche.titre}
                </h3>
                <span className={cn("rounded-full px-3 py-1 text-sm font-semibold", fiche.teinte.bandeauAge)}>
                  {fiche.age}
                </span>
              </header>

              <ul className="px-5 pb-5 pt-2 sm:px-6">
                {CRITERES.map((critere, index) => {
                  const valeur = critere[fiche.id];
                  const Icone = critere.icon;
                  return (
                    <li
                      key={critere.label}
                      className={cn(
                        "flex items-center justify-between gap-4 py-[clamp(0.5rem,1.6svh,0.875rem)]",
                        index < CRITERES.length - 1 && "border-b-2 border-dashed border-msk-cream-200",
                      )}
                    >
                      <span className="flex items-center gap-3 text-[15px] font-medium text-msk-night-900">
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                            fiche.teinte.iconeDisque,
                          )}
                        >
                          <Icone className="h-4.5 w-4.5" />
                        </span>
                        {critere.label}
                      </span>

                      {valeur === true ? (
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                            fiche.teinte.coche,
                          )}
                          role="img"
                          aria-label="Inclus"
                        >
                          <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                        </span>
                      ) : valeur === false ? (
                        <span className="shrink-0 rounded-full bg-msk-cream-200 px-3 py-1.5 text-xs font-semibold text-msk-night-700">
                          Pas encore
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
                            fiche.teinte.pastille,
                          )}
                        >
                          {valeur}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
