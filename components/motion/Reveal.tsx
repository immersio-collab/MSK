"use client";

import { motion, type Target, type TargetAndTransition, type Transition } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { curtainActive, onCurtainOpen } from "@/lib/curtain";
import { cn } from "@/lib/utils";

/**
 * La boîte à mouvements du site — l'unique primitive d'APPARITION.
 *
 * Chaque type d'élément a son mouvement, toujours le même à travers le site :
 *
 * - `rise`        les textes montent doucement du bas (l'ancien FadeUp) ;
 * - `slide-left`  une carte/photo entre par la gauche ;
 * - `slide-right` …ou par la droite (colonnes en vis-à-vis : une de chaque) ;
 * - `pop`         badges, boutons, petites illustrations : gonflent et
 *                 rebondissent comme un ballon ;
 * - `drop`        les grands titres tombent du haut et rebondissent en se
 *                 posant, comme une enseigne qu'on accroche ;
 * - `stamp`       polaroïds et fiches : arrivent un peu trop grands et
 *                 légèrement penchés, puis se collent à plat.
 *
 * La « farandole » n'est pas un effet mais une règle : les éléments d'une
 * liste reçoivent chacun un `delay` croissant au site d'appel.
 *
 * `view` (défaut) joue à l'entrée dans le viewport, une seule fois. `mount`
 * joue au montage — obligatoire au-dessus de la ligne de flottaison, où un
 * trigger de scroll n'a aucun filet (cf. scroll-page-composition.md).
 *
 * Reduced motion : la transition passe à durée nulle — l'élément apparaît
 * sans mouvement. Le flag est posé après montage via matchMedia, comme
 * `useTilt`, pour que rendu serveur et rendu client coïncident.
 */

export type RevealEffect =
  | "rise"
  | "slide-left"
  | "slide-right"
  | "pop"
  | "drop"
  | "stamp";

/** Sortie douce commune aux glissades — même courbe que la maquette validée. */
const EASE_GLISSE = [0.2, 0.7, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  effect?: RevealEffect;
  delay?: number;
  /** `rise` uniquement : distance de montée en px. */
  y?: number;
  /** `rise` uniquement : durée en secondes. */
  duration?: number;
  mode?: "view" | "mount";
  /** `span` pour envelopper un élément inline (bouton, badge) sans casser le flux. */
  as?: "div" | "span";
}

interface EffectDef {
  hidden: Target;
  visible: TargetAndTransition;
  transition: (delay: number) => Transition;
}

/**
 * L'opacité reçoit partout sa propre transition courte : sur un ressort qui
 * dépasse (pop, drop, stamp), la laisser suivre le ressort la ferait passer
 * au-dessus de 1 — invalide — et l'élément resterait laiteux trop longtemps.
 */
const EFFECTS: Record<Exclude<RevealEffect, "rise">, EffectDef> = {
  "slide-left": {
    hidden: { opacity: 0, x: -56, rotate: -2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
    transition: (delay) => ({ duration: 0.6, ease: EASE_GLISSE, delay }),
  },
  "slide-right": {
    hidden: { opacity: 0, x: 56, rotate: 2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
    transition: (delay) => ({ duration: 0.6, ease: EASE_GLISSE, delay }),
  },
  pop: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1 },
    transition: (delay) => ({
      type: "spring",
      stiffness: 320,
      damping: 16,
      delay,
      opacity: { duration: 0.25, delay },
    }),
  },
  drop: {
    hidden: { opacity: 0, y: -48 },
    visible: { opacity: 1, y: 0 },
    transition: (delay) => ({
      type: "spring",
      stiffness: 380,
      damping: 16,
      delay,
      opacity: { duration: 0.25, delay },
    }),
  },
  stamp: {
    hidden: { opacity: 0, scale: 1.5, rotate: -7 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    transition: (delay) => ({
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay,
      opacity: { duration: 0.3, delay },
    }),
  },
};

export function Reveal({
  children,
  className,
  effect = "rise",
  delay = 0,
  y = 40,
  duration = 0.5,
  mode = "view",
  as = "div",
}: RevealProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /*
    Poignée de main avec le rideau de PageTransition : pendant une navigation,
    la page monte SOUS le rideau — une animation qui part au montage est finie
    avant que l'écran ne se découvre, et le visiteur n'en voit rien. Tant que
    le rideau couvre, l'élément reste à son état de départ ; il part quand le
    rideau s'ouvre. Lu dans l'initialiseur : pendant une navigation client il
    n'y a pas de SSR, et au premier chargement le drapeau est toujours baissé —
    aucun mismatch d'hydratation possible.

    Filet : si l'ouverture n'arrivait jamais (démontage du rideau, bug), un
    timeout libère l'animation — une page invisible est le seul échec interdit.
  */
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

  let hidden: Target;
  let visible: TargetAndTransition;
  let transition: Transition;

  if (effect === "rise") {
    hidden = { opacity: 0, y };
    visible = { opacity: 1, y: 0 };
    transition = { duration, delay, ease: "easeOut" };
  } else {
    const def = EFFECTS[effect];
    hidden = def.hidden;
    visible = def.visible;
    transition = def.transition(delay);
  }

  if (reduceMotion) transition = { duration: 0 };

  // Cast vers un seul type : l'union motion.span | motion.div fait exploser
  // l'inférence TS (TS2590) alors que les props utilisées sont identiques.
  const Tag = (as === "span" ? motion.span : motion.div) as typeof motion.div;

  // Rideau encore fermé : l'élément attend à son état de départ, sans
  // animate/whileInView — le déclencheur ne s'arme qu'à l'ouverture.
  if (retenu) {
    return (
      <Tag
        initial={hidden}
        className={cn(as === "span" && "inline-block", className)}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      initial={hidden}
      animate={mode === "mount" ? visible : undefined}
      whileInView={mode === "view" ? visible : undefined}
      viewport={mode === "view" ? { once: true, margin: "-50px" } : undefined}
      transition={transition}
      // inline-block : sans lui, les transforms d'un span inline sont ignorés.
      className={cn(as === "span" && "inline-block", className)}
    >
      {children}
    </Tag>
  );
}
