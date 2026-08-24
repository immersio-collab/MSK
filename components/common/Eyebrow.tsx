import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  /**
   * Couleurs et ajustements du site d'appel : fond + texte pour la pastille
   * (ex. `bg-msk-coral-100 text-msk-coral-700`), marges, `shadow-sm`.
   */
  className?: string;
  /** `pill` (défaut) : pastille arrondie. `bare` : label nu, sans fond. */
  variant?: "pill" | "bare";
}

/**
 * Le label de section du site (eyebrow). Une seule définition de la
 * typographie : avant ce composant, le même markup était recopié dans une
 * douzaine de fichiers et le style avait commencé à bifurquer.
 */
export function Eyebrow({ children, className, variant = "pill" }: EyebrowProps) {
  return (
    <span
      className={cn(
        variant === "pill"
          ? "inline-block rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em]"
          : "font-display text-sm font-semibold uppercase tracking-[0.2em]",
        className
      )}
    >
      {children}
    </span>
  );
}
