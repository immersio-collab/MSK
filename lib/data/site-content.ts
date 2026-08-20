export interface NavItem {
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
    href: "/notre-centre",
    children: [
      {
        title: "La Méthode MSK",
        href: "/notre-centre/la-methode",
      },
      {
        title: "Troubles accompagnés",
        href: "/notre-centre/troubles-accompagnes",
      },
      {
        title: "L'Équipe pluridisciplinaire",
        href: "/notre-centre/equipe",
      },
      {
        title: "Nos Espaces (Tour Virtuel)",
        href: "/notre-centre/nos-espaces",
      },
    ],
  },
  { label: "Programmes", href: "/programmes" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const METHOD_STEPS = [
  {
    number: "01",
    step: "Observer",
    title: "L'observation bienveillante",
    description: "Identifier avec précision les forces, les sensibilités sensorielles, le style d'apprentissage et les blocages sans jugement ni étiquette hâtive.",
    icon: "Eye",
  },
  {
    number: "02",
    step: "Comprendre",
    title: "L'analyse globale pluridisciplinaire",
    description: "Croiser les regards de l'éducateur, du psychomotricien, de l'orthophoniste et des parents pour saisir le fonctionnement unique de l'enfant.",
    icon: "Brain",
  },
  {
    number: "03",
    step: "Adapter",
    title: "La personnalisation de l'environnement",
    description: "Ajuster le matériel Montessori, l'espace de travail, le rythme des séances et les supports pédagogiques aux besoins réels.",
    icon: "Sliders",
  },
  {
    number: "04",
    step: "Rééduquer",
    title: "La Neuro-Gym & la rééducation ciblée",
    description: "Stimuler les connexions neuro-motrices, réguler l'attention, renforcer la motricité fine et libérer le potentiel cognitif.",
    icon: "Zap",
  },
  {
    number: "05",
    step: "Accompagner",
    title: "Le suivi continu & le lien avec la famille",
    description: "Un point d'étape régulier, un dialogue transparent et une équipe à l'écoute pour co-construire chaque progrès au quotidien.",
    icon: "Users",
  },
  {
    number: "06",
    step: "Insérer",
    title: "L'insertion scolaire et sociale réussie",
    description: "Préparer l'autonomie, la confiance en soi et l'intégration sereine dans le cursus scolaire classique ou professionnel.",
    icon: "GraduationCap",
  },
];

export const PROGRAMS = [
  {
    id: "petite-enfance",
    title: "Petite Enfance",
    age: "2 à 5 ans",
    subtitle: "Éveil sensoriel, autonomie & socialisation",
    description: "Un cocon pensé pour développer le langage, la coordination motrice et l'autonomie selon la pédagogie Montessori.",
    features: ["Langage & communication bienveillante", "Vie pratique & sensorielle", "Éveil neuro-moteur"],
    href: "/programmes/petite-enfance",
    badgeBg: "bg-amber-100 text-amber-800",
  },
  {
    id: "primaire",
    title: "Cycle Primaire",
    age: "6 à 11 ans",
    subtitle: "Savoirs fondamentaux, remédiation & confiance",
    description: "Consolidation des savoirs fondamentaux avec adaptations concrètes pour les enfants avec troubles des apprentissages.",
    features: ["Pédagogie active & manipulation", "Remédiation cognitive", "Insertion progressive"],
    href: "/programmes/primaire",
    badgeBg: "bg-msk-forest-100 text-msk-forest-800",
  },
  {
    id: "adolescents",
    title: "Adolescents",
    age: "12 ans et +",
    subtitle: "Méthodologie, autonomie & projet d'avenir",
    description: "Un accompagnement axé sur l'estime de soi, les stratégies d'apprentissage efficaces et la neuro-gym.",
    features: ["Coaching méthodologique", "Fonctions exécutives", "Soutien rééducatif"],
    href: "/programmes/adolescents",
    badgeBg: "bg-msk-terracotta-100 text-msk-terracotta-800",
  },
  {
    id: "adultes",
    title: "Adultes",
    age: "Séances ciblées",
    subtitle: "Neuro-gym & réadaptation cognitive",
    description: "Séances individuelles et ateliers pour adultes souhaitant améliorer leurs fonctions exécutives ou réguler la surcharge.",
    features: ["Neuro-Gym ciblée", "Stratégies d'organisation", "Gestion du stress"],
    href: "/programmes/adultes",
    badgeBg: "bg-teal-100 text-teal-800",
  },
];

export const PARENT_CONCERNS_FAQ = [
  {
    question: "Mon enfant a un trouble (TDAH, DYS) : comment est-il accueilli sans être stigmatisé ?",
    answer: "Chez MSK, aucun enfant n'est réduit à un diagnostic. Nous partons de ses forces. Nos éducateurs et thérapeutes adaptent les supports au sein du groupe, favorisant l'entraide et préservant l'estime de soi.",
  },
  {
    question: "Mon enfant ne possède pas encore de code Massar : peut-il intégrer MSK ?",
    answer: "Absolument. Nous accueillons les enfants avec ou sans code Massar. Nous stabilisons les apprentissages et accompagnons les démarches administratives pour préparer son insertion sereine.",
  },
  {
    question: "Quelle est la différence entre une école classique et la méthode MSK ?",
    answer: "Dans une école classique, c'est l'enfant qui doit se plier à un cadre uniforme. Chez MSK, c'est le cadre qui s'adapte à l'enfant. Nous combinons la pédagogie Montessori avec la neuro-gym et des thérapies intégrées.",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Salma B.",
    role: "Maman de Ryan (7 ans, TDAH)",
    content: "En 6 mois chez MSK, il a retrouvé le sourire, son attention s'est stabilisée grâce à la neuro-gym et aux éducateurs bienveillants.",
    rating: 5,
    tag: "Primaire & TDAH",
  },
  {
    id: 2,
    name: "Karim & Yasmine T.",
    role: "Parents de Lina (4 ans)",
    content: "L'approche Montessori combinée à l'accueil inclusif est une merveille. Lina va à l'école avec un réel enthousiasme.",
    rating: 5,
    tag: "Petite Enfance",
  },
];

export const STATS = [
  { value: "100%", label: "Accompagnement individualisé", sublabel: "Adapté au rythme de chaque apprenant" },
  { value: "2 à 20+", label: "Années d'âge accompagnées", sublabel: "De la petite enfance à l'âge adulte" },
  { value: "6 Étapes", label: "Méthode éprouvée", sublabel: "De l'observation à l'insertion réussie" },
  { value: "Casablanca", label: "Centre Inclusif", sublabel: "Équipe pluridisciplinaire" },
];

export const SCHOOL_INFO = {
  name: "MSK Montessori School",
  tagline: "Centre Scolaire Inclusif & Réadaptation",
  city: "Casablanca",
  country: "Maroc",
  phone: "+212 5 22 00 00 00",
  email: "contact@mskmontessori.ma",
  address: "Quartier Oasis / Val Fleuri, Casablanca, Maroc",
  hours: "Du Lundi au Vendredi : 8h00 - 18h00",
  coreQuote: "MSK ne cherche pas à faire entrer tous les enfants dans le même cadre : c'est le cadre qui s'adapte à l'enfant.",
  baseline: "Observer. Comprendre. Adapter. Rééduquer. Accompagner. Insérer.",
};
