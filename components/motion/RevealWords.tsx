"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { motion, type Variants } from "framer-motion";

/**
 * La « farandole de mots » : une phrase dont chaque mot se pose l'un après
 * l'autre, avec un léger rebond. Pour les grandes déclarations (bandeau jaune
 * de l'accueil, StatementSection) — les titres ordinaires prennent `Reveal
 * effect="drop"`, les titres phares `TitreAnime` (lettre par lettre).
 *
 * Accepte un ReactNode, pas seulement une chaîne : les déclarations portent
 * des `<span>` d'accent et des `&apos;`. Les chaînes sont éclatées en mots,
 * les éléments sont clonés et leurs enfants éclatés récursivement — la
 * propagation des variants de framer-motion traverse les éléments non-motion
 * intermédiaires, donc chaque mot répond bien au conteneur.
 *
 * Le texte complet est porté par `aria-label` et chaque mot masqué aux
 * lecteurs d'écran — même discipline que TitreAnime.
 */

const CONTENEUR: Variants = {
  cache: {},
  visible: (retard: number) => ({
    transition: { staggerChildren: 0.07, delayChildren: retard },
  }),
};

const MOT: Variants = {
  cache: { opacity: 0, y: "0.7em", rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
};

/** Aplatit le contenu en texte brut, pour l'aria-label du conteneur. */
function texteDe(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(texteDe).join("");
  if (isValidElement(node))
    return texteDe((node.props as { children?: ReactNode }).children);
  return "";
}

/**
 * Remplace chaque mot par un `motion.span` porteur du variant MOT. Les
 * espaces restent des chaînes ordinaires ENTRE les blocs, hors des spans
 * inline-block : c'est elles qui offrent les points de coupure de ligne
 * (même leçon que TitreAnime — « MOMENT / S »).
 */
function eclater(node: ReactNode, cle: { n: number }): ReactNode {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/(\s+)/)
      .map((part) =>
        part.trim() === "" ? (
          part
        ) : (
          <motion.span
            key={`mot-${cle.n++}`}
            aria-hidden
            variants={MOT}
            className="inline-block will-change-transform"
          >
            {part}
          </motion.span>
        ),
      );
  }
  if (Array.isArray(node)) return node.map((enfant) => eclater(enfant, cle));
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    // Un <br/> (ou tout élément vide) passe tel quel.
    if (element.props.children === undefined) return element;
    return cloneElement(
      element,
      { key: element.key ?? `el-${cle.n++}` },
      eclater(element.props.children, cle),
    );
  }
  return node;
}

interface RevealWordsProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** `chargement` démarre au montage ; `scroll` (défaut) attend l'entrée en vue. */
  au?: "chargement" | "scroll";
}

export function RevealWords({
  children,
  className,
  delay = 0,
  au = "scroll",
}: RevealWordsProps) {
  const declencheur =
    au === "scroll"
      ? {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-60px" },
        }
      : { animate: "visible" as const };

  const cle = { n: 0 };

  return (
    <motion.span
      aria-label={texteDe(children)}
      className={className}
      variants={CONTENEUR}
      custom={delay}
      initial="cache"
      {...declencheur}
    >
      {Children.map(children, (enfant) => eclater(enfant, cle))}
    </motion.span>
  );
}
