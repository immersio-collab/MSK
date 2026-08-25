interface NavItem {
  label: string;
  href: string;
  children?: {
    title: string;
    description?: string;
    href: string;
  }[];
}

export const NAV_LINKS: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Notre centre",
    href: "/notre-centre/troubles-accompagnes",
    children: [
      {
        // L'URL reste `troubles-accompagnes` : la renommer casserait les liens
        // déjà partagés. Seul le libellé suit la liste corrigée par la cliente.
        title: "Situations accueillies",
        href: "/notre-centre/troubles-accompagnes",
      },
      {
        title: "La Méthode MSK",
        href: "/notre-centre/la-methode",
      },
      {
        title: "La Fondatrice",
        href: "/notre-centre/la-fondatrice",
      },
      {
        title: "Nos Espaces (Visite Virtuelle)",
        href: "/notre-centre/galerie",
      },
    ],
  },
  { label: "Programmes", href: "/programmes" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const PARENT_CONCERNS_FAQ = [
  {
    question: "Mon enfant a été refusé ailleurs à cause de sa santé : comment est-il accueilli ici ?",
    answer: "Un diabète ou une épilepsie ne ferme aucune porte chez MSK. Sa journée est organisée autour de ce que sa santé impose — contrôles, collations, fatigue — selon les consignes écrites de son médecin que vous nous transmettez ; le centre n'est pas un lieu de soin et ne décide rien à sa place. Dans le groupe, il est un élève comme les autres.",
  },
  {
    question: "Mon enfant ne possède pas encore de code Massar : peut-il intégrer MSK ?",
    answer: "Absolument. Nous accueillons les enfants avec ou sans code Massar. Nous stabilisons les apprentissages et accompagnons les démarches administratives pour préparer son insertion sereine.",
  },
  {
    question: "Quelle est la différence entre une école classique et la méthode MSK ?",
    answer: "Dans une école classique, c'est l'enfant qui doit se plier à un cadre uniforme. Chez MSK, c'est le cadre qui s'adapte à l'enfant. Nous combinons la pédagogie Montessori avec la neuro-gym et des thérapies intégrées.",
  },
  {
    question: "À quel âge puis-je inscrire mon enfant ?",
    answer: "Nous accueillons les enfants dès 2 ans, en maternelle comme en primaire, et jusqu'à 11 ans. Au-delà, le centre n'accompagne ni adolescents ni adultes.",
  },
  {
    question: "Combien coûte l'accompagnement ? Y a-t-il des facilités de paiement ?",
    answer: "Chaque parcours étant entièrement sur-mesure (scolarité, thérapies, neuro-gym), les tarifs varient selon les besoins spécifiques de votre enfant. Nous proposons des facilités de paiement pour soutenir les familles dans cet accompagnement.",
  },
  {
    question: "Combien de temps l'accompagnement dure-t-il ?",
    answer: "Le temps qu'il faut pour que son école suffise à nouveau. Votre enfant garde sa scolarité et vient ici quelques jours par semaine ; notre méthode est conçue pour stabiliser les apprentissages, pallier les difficultés et restaurer la confiance. L'objectif est qu'il n'ait plus besoin de venir, pas qu'il reste.",
  },
  {
    question: "Proposez-vous un suivi pendant les vacances ?",
    answer: "Oui, nous organisons régulièrement des stages ludiques et des sessions de renforcement cognitif pendant les vacances scolaires pour maintenir les acquis et assurer une continuité sécurisante pour l'enfant.",
  },
  {
    question: "Y a-t-il un bilan d'évaluation avant l'inscription ?",
    answer: "Tout à fait. La première étape de notre méthode est \"L'observation bienveillante\". Un bilan initial avec notre fondatrice est indispensable pour comprendre finement le profil de l'enfant et concevoir son programme sur-mesure.",
  },
];

/**
 * Visite immersive du centre (Realsee / Matterport).
 *
 * ⚠️ COLLEZ VOTRE LIEN D'INTÉGRATION CI-DESSOUS. C'est le seul endroit à
 * modifier : la section Tour virtuel de la galerie le consomme.
 *
 * Prenez l'URL d'EMBED (celle du `src` de l'iframe fournie par Realsee ou
 * Matterport), pas l'URL de partage : beaucoup de visionneuses refusent d'être
 * embarquées depuis leur URL publique.
 *
 * Tant que la chaîne est vide, la section affiche une affiche cliquable inerte
 * accompagnée d'un avertissement visible, plutôt qu'une iframe cassée.
 */
export const VIRTUAL_TOUR = {
  embedUrl: "",
  provider: "Realsee",
  /** Photo affichée avant le clic. L'iframe n'est montée qu'ensuite. */
  poster: "/espace montesori.jpeg",
};

export const SCHOOL_INFO = {
  name: "MSK Montessori School",
  tagline: "Centre Scolaire Inclusif & Réadaptation",
  city: "Casablanca",
  country: "Maroc",
  postalCode: "20060",
  district: "Gauthier",
  phone: "+212 633-620016",
  phoneRaw: "+212633620016",
  whatsapp: "https://wa.me/212633620016",
  email: "contact@mskmontessori.com",
  address: "Rue Sabou, Gauthier, 20060 Casablanca, Maroc",
  streetAddress: "Rue Sabou, Gauthier",
  instagram: "https://www.instagram.com/mskschool.ma/",
  facebook: "https://web.facebook.com/p/MsK-Center-100091341511573/?_rdc=1&_rdr#",
  hours: "Du Lundi au Vendredi : 8h00 - 18h00",
  coreQuote: "MSK ne cherche pas à faire entrer tous les enfants dans le même cadre : c'est le cadre qui s'adapte à l'enfant.",
  baseline: "Observer. Comprendre. Adapter. Rééduquer. Accompagner. Insérer.",
};

