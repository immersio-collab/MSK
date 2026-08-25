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
  /**
   * Situations accueillies. Répartition par âge À CONFIRMER avec la cliente :
   * elle a donné une liste pour le centre entier, pas programme par programme.
   */
  profils: string[];
  matin: string;
  apresMidi: string;
  image: string;
}

/**
 * Comment les enfants sont regroupés — confirmé par la cliente le 2026-08-25.
 *
 * Les groupes de travail ne suivent NI l'âge réel NI la classe d'origine : ils
 * sont formés par taille et par niveau de développement, à cinq, et tournent
 * d'une salle à l'autre au cours de la journée (pendant qu'un groupe est en
 * salle sensorielle, un autre est en espace Montessori, un autre en Neuro-Gym).
 *
 * Maternelle et Primaire restent les deux tranches d'âge accueillies — il n'y a
 * ni adolescents ni adultes — mais elles décrivent la population du centre, pas
 * la composition des groupes.
 *
 * QUESTION OUVERTE, à trancher avant d'écrire quoi que ce soit autour.
 * La cliente dit aussi que les enfants sont scolarisés dans une école publique
 * ou privée ordinaire et ne viennent au centre que quelques jours par semaine.
 * Si c'est le cas, `matin` / `apresMidi` décrivent une journée de présence et
 * non une semaine complète, et surtout le site entier — titres, méta, hero,
 * FAQ « réintégrer une école classique après MSK » — est rédigé comme si MSK
 * ÉTAIT l'école de l'enfant. Rien n'a été changé sur ce point : c'est un choix
 * de positionnement, pas une correction de texte. Reste aussi à savoir ce que
 * deviennent, dans ce modèle, les enfants déscolarisés et sans code Massar,
 * qui par définition ne sont inscrits nulle part.
 */
export const ORGANISATION = {
  tailleGroupe: 5,
  critere: "par taille et niveau de développement, jamais par âge",
  rotation: "sensorielle, Montessori, Neuro-Gym…",
};

export const PROGRAMMES: Programme[] = [
  {
    id: "maternelle",
    title: "Maternelle",
    age: "2–5 ans",
    profils: ["Sans code Massar", "Refus de l'école", "Diabète, épilepsie"],
    matin: "Montessori structuré",
    apresMidi: "Sieste et jeux libres",
    image: "/maternelle1.jpg",
  },
  {
    id: "primaire",
    title: "Primaire",
    age: "6–11 ans",
    profils: ["Décrochage scolaire", "Retard scolaire", "Sans code Massar", "Diabète, épilepsie"],
    matin: "Apprentissages cognitifs",
    apresMidi: "Ateliers thérapeutiques et créatifs",
    image: "/primaire1.webp",
  },
];
