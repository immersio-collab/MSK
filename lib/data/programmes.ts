/**
 * Les deux programmes MSK — les faits canoniques partagés par toutes les
 * surfaces (accueil, sélecteur et comparatif de /programmes). Chaque surface
 * garde sa présentation (teintes, inclinaisons, objectifs, citations) ; seuls
 * les faits vivent ici, pour qu'un âge ou un profil ne se corrige qu'à un
 * seul endroit. La FAQ (lib/data/faq.ts) reprend ces faits en prose — la
 * garder cohérente avec ce fichier.
 */

export interface Programme {
  id: "maternelle" | "primaire";
  title: string;
  age: string;
  /** Profils accompagnés (troubles). */
  profils: string[];
  matin: string;
  apresMidi: string;
  image: string;
}

export const PROGRAMMES: Programme[] = [
  {
    id: "maternelle",
    title: "Maternelle",
    age: "2–5 ans",
    profils: ["Retard de langage", "TSA léger", "Hyperactivité précoce"],
    matin: "Montessori structuré",
    apresMidi: "Sieste et jeux libres",
    image: "/maternelle1.jpg",
  },
  {
    id: "primaire",
    title: "Primaire",
    age: "6–11 ans",
    profils: ["TDAH", "Dyslexie, dysorthographie", "Dyspraxie", "Dyscalculie"],
    matin: "Apprentissages cognitifs",
    apresMidi: "Ateliers thérapeutiques et créatifs",
    image: "/primaire1.webp",
  },
];
