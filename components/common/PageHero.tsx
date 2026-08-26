"use client";

import type { ReactNode, Ref } from "react";
import { ChevronDown } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";

/**
 * La coupe des héros : sommet droit, base en diagonale. UNE seule définition
 * pour tout le site — six héros la recopiaient à l'identique, et les pages qui
 * en avaient dévié s'en écartaient d'autant. Le héros de l'article la réutilise
 * directement, sa carte-titre ayant une géométrie trop différente pour passer
 * par ce composant.
 */
export const HERO_BAND_CLIP = "polygon(0 0, 100% 0, 100% 72%, 0 100%)";

interface PageHeroProps {
  /** Racine de la section : sert d'ancre au scrub de `useHeroParallax`. */
  rootRef?: Ref<HTMLElement>;
  /** Fond de la bande inclinée, ex. `bg-msk-sun-400`. */
  band: string;
  /** Fond de la section, visible sous la diagonale. */
  background?: string;
  /** Fond de la carte-titre, ex. `bg-msk-coral-600`. */
  card: string;

  /**
   * Décor de la bande : nuages, illustrations. Placé dans un calque plein cadre
   * en `overflow-hidden` — chaque page positionne ses éléments elle-même, les
   * visuels n'étant volontairement pas calés au même endroit d'un héros à
   * l'autre.
   */
  decor?: ReactNode;
  /** Visuel posé au-dessus de la carte, dans le flux du contenu. */
  media?: ReactNode;

  title: ReactNode;
  /** Couleur du titre uniquement — la typographie est fixée ici. */
  titleClassName: string;
  pill: ReactNode;
  /** Fond et texte de la pastille. */
  pillClassName: string;
  subtitle: ReactNode;
  /** Couleur du sous-titre uniquement. */
  subtitleClassName: string;
  /** Bouton de défilement. `className` ne porte que les couleurs. */
  anchor: { href: string; label: string; className: string };
}

/**
 * Le héros commun à toutes les pages intérieures : bande de couleur coupée en
 * diagonale, décor flottant, et carte-titre chevauchant l'arête basse.
 *
 * La carte est VOLONTAIREMENT fermée : titre, pastille, sous-titre et bouton de
 * défilement, dans cet ordre, aux mêmes tailles et aux mêmes espacements
 * partout. Chaque page n'apporte que ses couleurs et ses visuels. Le modèle est
 * /notre-centre/la-methode. Auparavant chaque héros avait sa hauteur, l'ordre de
 * ses éléments et ses tailles de titre, et le site paraissait dépareillé de page
 * en page.
 *
 * L'accueil et le contact gardent leur propre héros : le premier est une scène
 * plein écran sans bande, le second une illustration vectorielle en calques.
 */
export const PageHero = ({
  rootRef,
  band,
  background = "bg-msk-cream-100",
  card,
  decor,
  media,
  title,
  titleClassName,
  pill,
  pillClassName,
  subtitle,
  subtitleClassName,
  anchor,
}: PageHeroProps) => {
  return (
    <section
      ref={rootRef}
      className={cn(
        // `min-h` et non `h` : le héros doit REMPLIR l'écran sans jamais le
        // dépasser, et c'est le contenu élastique en dessous qui garantit le
        // second point. Si un jour une traduction plus longue le dépassait
        // quand même, la section grandit — elle ne rogne pas le titre.
        // `svh` et non `dvh` : la valeur stable, celle qui tient aussi quand la
        // barre du navigateur mobile est visible.
        "relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-[clamp(3rem,6svh,5rem)]",
        background,
      )}
    >
      <div
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-[75%]", band)}
        style={{ clipPath: HERO_BAND_CLIP }}
      />

      {decor ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {decor}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        {/*
          Emplacement du visuel, toujours rendu même vide : c'est lui qui garantit
          que la carte tombe au même endroit sur les six pages. Mesuré avant, les
          visuels occupaient de 0 à 461 px selon la page et décalaient la carte de
          210 px d'une page à l'autre. Les illustrations gardent leur taille propre
          et débordent vers le haut sur la bande — `items-end` les cale par le bas,
          au plus près de la carte.

          La hauteur est la MÊME sur toutes les pages mais suit la fenêtre
          (17svh, bornée 6–12rem) au lieu des 10/12rem figés : à 160/192 px fixes,
          le héros totalisait 752 px et débordait de tout écran plus court —
          c'était le cas de tous les portables 1366×768.
        */}
        <div className="relative z-20 -mb-6 flex h-[clamp(8rem,23svh,16rem)] items-end justify-center">
          {media}
        </div>

        {/* `mount` et non `view` : la carte est au-dessus de la ligne de
            flottaison, où un déclencheur au scroll n'a aucun filet — l'élément
            resterait invisible s'il ne se déclenchait pas. */}
        <FadeUp mode="mount" delay={0.1}>
          <div
            className={cn(
              // Hauteur minimale commune : elle égalise les six cartes, dont la
              // plus haute (la-methode, titre sur 3 lignes) occupe 381px à
              // 1280px de large. 25rem la couvrait avec ~19px de marge, mais en
              // valeur figée elle poussait le héros à 752px — plus haut que
              // l'écran d'un portable courant. Elle suit donc la fenêtre
              // (44svh, bornée 17–25rem) : le plafond garde l'aspect d'origine
              // sur grand écran, le plancher garde les six cartes alignées.
              // `justify-center` ici répartit le contenu plus court au lieu de
              // le laisser coller en haut.
              "mx-auto flex min-h-[clamp(17rem,44svh,25rem)] max-w-2xl flex-col justify-center rounded-[1.75rem] px-8 py-8 text-center shadow-2xl md:px-12",
              card,
            )}
          >
            <h1
              className={cn(
                "font-display text-[1.75rem] font-bold uppercase leading-[0.95] sm:text-4xl md:text-5xl",
                titleClassName,
              )}
            >
              {title}
            </h1>

            {/* Enveloppé : en enfant direct de la colonne flex, la pastille
                s'étirerait sur toute la largeur et perdrait sa forme. */}
            <div>
              <Eyebrow className={cn("mt-5", pillClassName)}>{pill}</Eyebrow>
            </div>

            <p
              className={cn(
                "mx-auto mt-5 max-w-md text-base font-medium leading-snug",
                subtitleClassName,
              )}
            >
              {subtitle}
            </p>

            <a
              href={anchor.href}
              aria-label={anchor.label}
              className={cn(
                "mx-auto mt-6 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors",
                anchor.className,
              )}
            >
              <ChevronDown className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
