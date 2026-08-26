"use client";

import { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /**
   * `view` (défaut) : anime quand l'élément entre dans le viewport.
   * `mount` : anime dès le montage — pour l'au-dessus-du-pli (héros), où un
   * trigger de scroll ne se déclencherait jamais ou laisserait l'élément caché.
   */
  mode?: "view" | "mount";
}

/**
 * Alias historique de `Reveal effect="rise"` — la montée douce des textes.
 * L'implémentation vit dans la boîte à mouvements (`Reveal`) ; ce fichier ne
 * subsiste que pour les ~29 sites d'appel existants. Les nouveaux effets
 * (glissade, pop, plongeon, tampon) s'appellent directement via `Reveal`.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 40,
  mode = "view",
}: FadeUpProps) {
  return (
    <Reveal
      effect="rise"
      delay={delay}
      duration={duration}
      y={y}
      mode={mode}
      className={className}
    >
      {children}
    </Reveal>
  );
}
