/**
 * Traduction des CLÉS de `lib/data/troubles.ts` en présentation :
 * `icon` → composant lucide, `tone` → classes Tailwind.
 *
 * Extrait de `TroublesGridSection` le jour où la page d'accueil a eu besoin des
 * mêmes cartes (`components/accueil/AccueilTroubles.tsx`). Les deux lisent
 * désormais cette table : la carte « Décrochage scolaire » est corail avec une
 * porte partout, et un changement de ton ne peut plus n'atteindre qu'une des
 * deux pages.
 *
 * Les classes sont écrites en toutes lettres, jamais construites
 * dynamiquement — Tailwind n'émet que ce qu'il lit tel quel.
 */

import {
  Activity,
  DoorOpen,
  Droplet,
  HeartCrack,
  Hourglass,
  IdCard,
  type LucideIcon,
} from "lucide-react";

import type { TroubleIcon, TroubleTone } from "@/lib/data/troubles";

import type { TroubleLook } from "./TroubleDetailDialog";

/** Clé d'icône (données) → composant lucide. Remplaçable par vos propres SVG. */
export const ICONS: Record<TroubleIcon, LucideIcon> = {
  door: DoorOpen,
  heart: HeartCrack,
  id: IdCard,
  drop: Droplet,
  pulse: Activity,
  hourglass: Hourglass,
};

/**
 * Les six tons des stickers, un par situation. Classes complètes, jamais
 * construites dynamiquement — Tailwind n'émet que ce qu'il lit tel quel.
 *
 * Contrastes du texte courant vérifiés ≥ 4.5:1 sur chaque fond :
 * blanc/coral-600, night-900/sun-300, night-900/blue-500, cream-200/night-800,
 * night-900/coral-400, night-900/sun-400.
 *
 * `label` est posé sur la pastille BLANCHE « En savoir plus », pas sur la
 * carte : il se calcule donc contre du blanc, d'où des nuances plus foncées
 * que celles du titre.
 */
export const LOOKS: Record<TroubleTone, TroubleLook> = {
  coral: {
    card: "bg-msk-coral-600 text-white",
    title: "text-white",
    body: "text-msk-coral-50",
    icon: "text-msk-coral-600",
    label: "text-msk-coral-700",
    slot: "bg-msk-coral-50 text-msk-coral-800",
    ring: "has-[:focus-visible]:ring-msk-coral-400",
  },
  sun: {
    card: "bg-msk-sun-300 text-msk-night-900",
    title: "text-msk-night-900",
    body: "text-msk-night-800",
    icon: "text-msk-sun-600",
    label: "text-msk-sun-800",
    slot: "bg-msk-sun-50 text-msk-sun-800",
    ring: "has-[:focus-visible]:ring-msk-sun-500",
  },
  blue: {
    card: "bg-msk-blue-500 text-msk-night-900",
    title: "text-msk-night-900",
    body: "text-msk-night-800",
    icon: "text-msk-blue-600",
    label: "text-msk-blue-700",
    slot: "bg-msk-blue-50 text-msk-blue-800",
    ring: "has-[:focus-visible]:ring-msk-blue-500",
  },
  night: {
    card: "bg-msk-night-800 text-msk-cream-100",
    title: "text-msk-sun-300",
    body: "text-msk-cream-200",
    icon: "text-msk-night-800",
    label: "text-msk-night-800",
    slot: "bg-msk-cream-200 text-msk-night-700",
    ring: "has-[:focus-visible]:ring-msk-night-700",
  },
  coralLight: {
    card: "bg-msk-coral-400 text-msk-night-900",
    title: "text-msk-night-900",
    body: "text-msk-night-800",
    icon: "text-msk-coral-600",
    label: "text-msk-coral-700",
    slot: "bg-msk-coral-50 text-msk-coral-800",
    ring: "has-[:focus-visible]:ring-msk-coral-700",
  },
  sunDeep: {
    card: "bg-msk-sun-400 text-msk-night-900",
    title: "text-msk-night-900",
    body: "text-msk-night-800",
    icon: "text-msk-sun-700",
    label: "text-msk-sun-800",
    slot: "bg-msk-sun-50 text-msk-sun-900",
    ring: "has-[:focus-visible]:ring-msk-sun-700",
  },
};
