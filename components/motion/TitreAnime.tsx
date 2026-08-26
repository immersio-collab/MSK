"use client";

import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { curtainActive, onCurtainOpen } from "@/lib/curtain";

/**
 * Titre qui se pose lettre par lettre, avec un léger dépassement.
 *
 * Né dans la galerie (`GalerieTitreAnime`), promu dans `motion/` quand
 * l'accueil en est devenu le deuxième consommateur (le mot « s'éveille » du
 * héros). C'est le mouvement « star » de la boîte : un seul titre phare par
 * page, pour qu'il reste spécial.
 *
 * En framer-motion et non en gsap, délibérément. La règle du projet réserve gsap
 * au scroll-driven et garde framer-motion pour les entrées ; surtout, elle
 * avertit qu'au-dessus de la ligne de flottaison un état de départ invisible n'a
 * aucun filet. Ici `initial`/`animate` part au montage sans dépendre d'un
 * trigger : rien ne peut laisser le titre bloqué hors champ.
 *
 * Le rebond vient de l'amortissement du ressort (damping bas pour une raideur
 * élevée), pas d'une courbe de Bézier : c'est ce dépassement qui donne le
 * caractère, une lettre monte au-delà de sa place avant d'y revenir.
 *
 * Le texte complet est porté par `aria-label` et chaque lettre masquée aux
 * technologies d'assistance, sinon le titre serait épelé caractère par
 * caractère.
 */

const CONTENEUR: Variants = {
  cache: {},
  visible: (retard: number) => ({
    transition: { staggerChildren: 0.026, delayChildren: retard },
  }),
};

const LETTRE: Variants = {
  cache: { y: 58, rotate: -7, opacity: 0 },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 330, damping: 15, mass: 0.9 },
  },
};

interface TitreAnimeProps {
  texte: string;
  className?: string;
  /** `chargement` démarre au montage ; `scroll` attend l'entrée dans le champ. */
  au?: "chargement" | "scroll";
  retard?: number;
  /** `span` sert à animer un titre dont le `h1` est déjà posé par PageHero. */
  as?: "h1" | "h2" | "span";
}

export const TitreAnime = ({
  texte,
  className,
  au = "chargement",
  retard = 0.15,
  as = "h2",
}: TitreAnimeProps) => {
  const Balise = as === "h1" ? motion.h1 : as === "span" ? motion.span : motion.h2;

  // Même poignée de main que Reveal : pendant une navigation, le titre attend
  // que le rideau de PageTransition s'ouvre avant de poser ses lettres — sinon
  // elles se posent sous le rideau et personne ne les voit. Filet : timeout.
  const [retenu, setRetenu] = useState(
    () => typeof window !== "undefined" && curtainActive(),
  );
  useEffect(() => {
    if (!retenu) return;
    const liberer = () => setRetenu(false);
    const off = onCurtainOpen(liberer);
    const filet = window.setTimeout(liberer, 4000);
    return () => {
      off();
      window.clearTimeout(filet);
    };
  }, [retenu]);

  const declencheur = retenu
    ? {}
    : au === "scroll"
      ? { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } }
      : { animate: "visible" as const };

  return (
    <Balise
      aria-label={texte}
      className={className}
      variants={CONTENEUR}
      custom={retard}
      initial="cache"
      {...declencheur}
    >
      {/* Chaque mot est un bloc insécable : les lettres sont des inline-block,
          et sans ce groupage un mot pouvait être coupé n'importe où en fin de
          ligne (« MOMENT / S »). L'espace entre les mots reste une espace
          ordinaire, donc la ligne se casse toujours entre deux mots.

          `split("")` et non `[...texte]` : la cible TS du projet est en ES5, où
          l'itération de chaîne est refusée. Tous les caractères en jeu sont dans
          le plan BMP, donc aucune paire de substitution à préserver. */}
      {texte.split(" ").map((mot, indexMot, mots) => (
        <Fragment key={`${mot}-${indexMot}`}>
          <span className="inline-block whitespace-nowrap">
            {mot.split("").map((caractere, index) => (
              <motion.span
                key={`${caractere}-${index}`}
                aria-hidden
                variants={LETTRE}
                className="inline-block will-change-transform"
              >
                {caractere}
              </motion.span>
            ))}
          </span>
          {/* L'espace vit ENTRE les blocs, hors nowrap : c'est elle qui offre
              le point de coupure de ligne. */}
          {indexMot < mots.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Balise>
  );
};
