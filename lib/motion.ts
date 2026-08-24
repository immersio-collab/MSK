"use client";

import { useEffect, useState } from "react";

/**
 * Le kit « sticker » partagé : inclinaisons au repos, ressort et hook
 * reduced-motion. Avant ce fichier, chaque section (témoignages de l'accueil,
 * grille des troubles) redéclarait les mêmes constantes à l'octet près.
 */

/** Inclinaison au repos de chaque sticker, alternée pour l'effet « collé à la main ». */
export const STICKER_TILTS = [-2.5, 1.5, -1.5, 2.5, 2, -1.5, 2.5, -2];

/** Le ressort commun des stickers (survol, retour au repos). */
export const SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;

/**
 * Inclinaison d'une carte par son index, annulée si l'utilisateur préfère
 * réduire les animations.
 *
 * Posé après montage via matchMedia, pas `useReducedMotion` : celui-ci change
 * de valeur dès l'hydratation et créerait un mismatch serveur/client sur le
 * transform de la carte.
 */
export function useTilt(index: number, tilts: readonly number[] = STICKER_TILTS) {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduceMotion ? 0 : (tilts[index % tilts.length] ?? 0);
}
