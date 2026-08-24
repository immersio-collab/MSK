import {
  BookOpen,
  Brain,
  GraduationCap,
  HeartPulse,
  Palette,
  Smile,
  Sparkles,
  Trees,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Contenu de la galerie photo.
 *
 * Les `width` / `height` sont les dimensions INTRINSÈQUES réelles de chaque
 * fichier de `public/`, relevées sur les fichiers eux-mêmes. next/image en a
 * besoin pour réserver la place avant chargement ; une valeur approximative
 * produirait un décalage de mise en page au moment où l'image arrive, et le
 * ratio des colonnes du mur serait faux.
 */

export type GalerieCategorie = "educatif" | "moteur" | "loisirs";

interface GaleriePhoto {
  src: string;
  titre: string;
  alt: string;
  categorie: GalerieCategorie;
  width: number;
  height: number;
  icon: LucideIcon;
}

export const CATEGORIES: { cle: GalerieCategorie | "tous"; label: string }[] = [
  { cle: "tous", label: "Tous" },
  { cle: "educatif", label: "Éducatif" },
  { cle: "moteur", label: "Sensoriel & Moteur" },
  { cle: "loisirs", label: "Loisirs & Créativité" },
];

export const CATEGORIE_LABEL: Record<GalerieCategorie, string> = {
  educatif: "Éducatif",
  moteur: "Sensoriel & Moteur",
  loisirs: "Loisirs & Créativité",
};

/** Teinte de la pastille d'icône, par famille — palette fermée uniquement. */
export const CATEGORIE_TON: Record<GalerieCategorie, string> = {
  educatif: "bg-msk-coral-100 text-msk-coral-600",
  moteur: "bg-msk-blue-100 text-msk-blue-700",
  loisirs: "bg-msk-sun-100 text-msk-sun-700",
};

/** Couleur du libellé de catégorie posé sur blanc (≥ 4,5:1 sur #fff). */
export const CATEGORIE_TEXTE: Record<GalerieCategorie, string> = {
  educatif: "text-msk-coral-700",
  moteur: "text-msk-blue-700",
  loisirs: "text-msk-sun-800",
};

export const GALERIE_PHOTOS: GaleriePhoto[] = [
  {
    src: "/espace montesori.jpeg",
    titre: "Espace Montessori",
    alt: "Matériel pédagogique Montessori disposé à hauteur d'enfant",
    categorie: "educatif",
    width: 1024,
    height: 683,
    icon: Smile,
  },
  {
    src: "/salel sensorielle.jpg",
    titre: "Salle sensorielle",
    alt: "Salle sensorielle avec colonnes à bulles et lumières douces",
    categorie: "moteur",
    width: 679,
    height: 451,
    icon: Sparkles,
  },
  {
    src: "/neuro-gym.jpg",
    titre: "Neuro-Gym",
    alt: "Séance de Neuro-Gym : parcours moteur et coordination",
    categorie: "moteur",
    width: 1024,
    height: 1024,
    icon: Brain,
  },
  {
    src: "/maternelle1.jpg",
    titre: "Classe maternelle",
    alt: "Classe maternelle avec coin lecture et tables basses",
    categorie: "educatif",
    width: 2561,
    height: 1707,
    icon: BookOpen,
  },
  {
    src: "/park exterieur.jpg",
    titre: "Le parc extérieur",
    alt: "Parc extérieur sécurisé avec jeux de plein air",
    categorie: "loisirs",
    width: 640,
    height: 480,
    icon: Trees,
  },
  {
    src: "/espace motricité.png",
    titre: "Espace motricité",
    alt: "Espace de motricité avec modules en mousse et tapis",
    categorie: "moteur",
    width: 1200,
    height: 1600,
    icon: HeartPulse,
  },
  {
    src: "/brain exercises.webp",
    titre: "Salle d'étude",
    alt: "Salle d'étude calme dédiée à la concentration",
    categorie: "educatif",
    width: 1000,
    height: 667,
    icon: GraduationCap,
  },
  {
    src: "/atelier creatif.jpg",
    titre: "Atelier créatif",
    alt: "Atelier créatif : peinture et travaux manuels",
    categorie: "loisirs",
    width: 547,
    height: 365,
    icon: Palette,
  },
  {
    src: "/salle de réeducation.jpg",
    titre: "Salle de rééducation",
    alt: "Salle de rééducation pour les séances individuelles",
    categorie: "moteur",
    width: 640,
    height: 480,
    icon: HeartPulse,
  },
  {
    src: "/primaire1.webp",
    titre: "Classe primaire",
    alt: "Classe primaire : travail en petits groupes",
    categorie: "educatif",
    width: 1408,
    height: 768,
    icon: BookOpen,
  },
];

/** Les trois photos de l'éventail du hero. */
export const HERO_POLAROIDS = [
  { src: "/atelier creatif.jpg", titre: "Atelier créatif", width: 547, height: 365 },
  { src: "/espace montesori.jpeg", titre: "Espace Montessori", width: 1024, height: 683 },
  { src: "/park exterieur.jpg", titre: "Le parc extérieur", width: 640, height: 480 },
];

/** La pellicule défilante, sous le tour virtuel. */
export const PELLICULE = [
  { src: "/parcours.jpeg", titre: "Parcours moteur", width: 1448, height: 923 },
  { src: "/neuro-gym.jpg", titre: "Neuro-Gym", width: 1024, height: 1024 },
  { src: "/maternelle1.jpg", titre: "Coin lecture", width: 2561, height: 1707 },
  { src: "/salel sensorielle.jpg", titre: "Éveil sensoriel", width: 679, height: 451 },
  { src: "/atelier creatif.jpg", titre: "Petites mains", width: 547, height: 365 },
  { src: "/park exterieur.jpg", titre: "Grand air", width: 640, height: 480 },
  { src: "/espace motricité.png", titre: "Motricité libre", width: 1200, height: 1600 },
];
