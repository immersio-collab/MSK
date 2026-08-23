/**
 * Contenu de la section « Les troubles que nous accompagnons »
 * (/notre-centre/troubles-accompagnes).
 *
 * Seul endroit à modifier pour changer les textes des cartes et des fiches
 * détaillées. Les couleurs et icônes sont des CLÉS : la grille les traduit en
 * classes Tailwind et en composants lucide — ne mettez pas de classes ici.
 *
 * `methode` suit les verbes de SCHOOL_INFO.baseline (Observer · Adapter ·
 * Accompagner) pour que chaque fiche raconte la même démarche.
 *
 * `visuel` nomme le petit SVG décoratif attendu dans le coin de la fiche
 * (emplacement réservé par MethodeAssetSlot tant qu'il n'est pas fourni).
 */

export type TroubleTone = "coral" | "sun" | "blue" | "night";

export type TroubleIcon =
  | "brain"
  | "book"
  | "hand"
  | "calculator"
  | "rainbow"
  | "speech"
  | "zap"
  | "school";

export interface TroubleStep {
  verbe: string;
  texte: string;
}

export interface TroubleItem {
  slug: string;
  /** Titre court de la carte. */
  title: string;
  /** Nom complet, affiché sous le titre de la fiche. */
  subtitle: string;
  /** Description en une ligne, sur la carte. */
  short: string;
  tone: TroubleTone;
  icon: TroubleIcon;
  /** « Ce que vit l'enfant » — un paragraphe court. */
  intro: string;
  /** « Comment MSK l'accompagne » — trois étapes, une ligne chacune. */
  methode: [TroubleStep, TroubleStep, TroubleStep];
  /** Sujet du SVG décoratif attendu dans le coin de la fiche (1-2 mots). */
  visuel: string;
}

export const TROUBLES: TroubleItem[] = [
  {
    slug: "tdah",
    title: "TDAH",
    subtitle: "Trouble du déficit de l'attention avec ou sans hyperactivité",
    short: "Difficulté d'attention, hyperactivité, impulsivité.",
    tone: "coral",
    icon: "brain",
    intro:
      "Votre enfant a du mal à rester concentré, bouge beaucoup, agit avant de réfléchir. À l'école, les consignes s'oublient, les devoirs s'éternisent et la confiance s'effrite.",
    methode: [
      { verbe: "Observer", texte: "Bilan d'attention et de motricité pour comprendre son fonctionnement." },
      { verbe: "Adapter", texte: "Neuro-Gym quotidien, environnement Montessori structuré, rythme fractionné." },
      { verbe: "Accompagner", texte: "Suivi parents-école et insertion progressive en classe ordinaire." },
    ],
    visuel: "Énergie",
  },
  {
    slug: "dyslexie",
    title: "Dyslexie",
    subtitle: "Trouble spécifique de la lecture et de l'écriture",
    short: "Difficulté de lecture et d'écriture.",
    tone: "sun",
    icon: "book",
    intro:
      "Les lettres se mélangent, la lecture reste lente et fatigante, l'orthographe ne se fixe pas malgré les efforts. L'enfant comprend bien à l'oral mais décroche devant l'écrit.",
    methode: [
      { verbe: "Observer", texte: "Bilan de lecture et de conscience phonologique pour cibler les confusions." },
      { verbe: "Adapter", texte: "Lettres rugueuses, alphabet mobile Montessori et remédiation phonologique." },
      { verbe: "Accompagner", texte: "Aménagements en classe et outils pour redonner le plaisir de lire." },
    ],
    visuel: "Lettres",
  },
  {
    slug: "dyspraxie",
    title: "Dyspraxie",
    subtitle: "Trouble de la coordination et de la planification du geste",
    short: "Coordination motrice altérée.",
    tone: "blue",
    icon: "hand",
    intro:
      "Écrire, découper, lacer ses chaussures ou attraper un ballon demande un effort énorme. L'enfant est maladroit malgré sa bonne volonté et se fatigue vite.",
    methode: [
      { verbe: "Observer", texte: "Bilan psychomoteur pour repérer les gestes qui coûtent le plus." },
      { verbe: "Adapter", texte: "Psychomotricité, exercices neuro-moteurs ciblés, outils d'écriture adaptés." },
      { verbe: "Accompagner", texte: "Automatisation progressive des gestes du quotidien et de la classe." },
    ],
    visuel: "Main",
  },
  {
    slug: "dyscalculie",
    title: "Dyscalculie",
    subtitle: "Trouble spécifique des apprentissages numériques",
    short: "Difficulté avec les nombres et le calcul.",
    tone: "night",
    icon: "calculator",
    intro:
      "Compter, comparer des quantités, mémoriser les tables ou lire l'heure reste un casse-tête. Les nombres n'ont pas encore de sens concret pour l'enfant.",
    methode: [
      { verbe: "Observer", texte: "Bilan logico-mathématique pour situer la compréhension du nombre." },
      { verbe: "Adapter", texte: "Manipulation concrète Montessori (perles, barres numériques) avant l'abstraction." },
      { verbe: "Accompagner", texte: "Raisonnement logique pas à pas et transfert vers le calcul scolaire." },
    ],
    visuel: "Perles",
  },
  {
    slug: "tsa",
    title: "TSA (Autisme)",
    subtitle: "Trouble du spectre de l'autisme",
    short: "Spectre autistique, difficultés sociales.",
    tone: "blue",
    icon: "rainbow",
    intro:
      "L'enfant a besoin de repères stables, vit parfois les bruits ou les changements comme une agression et peine à décoder les codes sociaux. Ses forces sont réelles, mais souvent invisibles.",
    methode: [
      { verbe: "Observer", texte: "Profil sensoriel et communicationnel établi avec la famille." },
      { verbe: "Adapter", texte: "Environnement prévisible, supports visuels, routines rassurantes." },
      { verbe: "Accompagner", texte: "Socialisation progressive en petit groupe, puis ouverture vers la classe." },
    ],
    visuel: "Arc-en-ciel",
  },
  {
    slug: "langage",
    title: "Troubles du langage",
    subtitle: "Retard ou trouble du langage oral",
    short: "Retard ou trouble du langage oral.",
    tone: "night",
    icon: "speech",
    intro:
      "Les mots viennent tard, les phrases restent courtes ou peu compréhensibles. L'enfant se fait mal comprendre et peut se replier ou s'agacer.",
    methode: [
      { verbe: "Observer", texte: "Bilan orthophonique pour distinguer retard simple et trouble." },
      { verbe: "Adapter", texte: "Orthophonie intégrée à la journée et stimulation langagière continue." },
      { verbe: "Accompagner", texte: "Communication alternative si besoin et suivi des progrès avec les parents." },
    ],
    visuel: "Bulle",
  },
  {
    slug: "comportement",
    title: "Troubles du comportement",
    subtitle: "Opposition, colères, anxiété",
    short: "Opposition, colères, anxiété.",
    tone: "coral",
    icon: "zap",
    intro:
      "Crises, refus, agitation ou au contraire repli anxieux : l'enfant exprime par le comportement ce qu'il ne sait pas encore dire. La famille s'épuise et l'école s'inquiète.",
    methode: [
      { verbe: "Observer", texte: "Comprendre ce que le comportement cherche à dire, sans jugement." },
      { verbe: "Adapter", texte: "Cadre bienveillant et constant, Neuro-Gym, outils de régulation émotionnelle." },
      { verbe: "Accompagner", texte: "Guidance parentale et retour progressif vers un quotidien apaisé." },
    ],
    visuel: "Éclair",
  },
  {
    slug: "scolaire",
    title: "Difficultés scolaires",
    subtitle: "Échec scolaire, décrochage, phobie scolaire",
    short: "Échec scolaire, décrochage, phobie scolaire.",
    tone: "sun",
    icon: "school",
    intro:
      "Les notes chutent, l'enfant ne veut plus aller à l'école, parfois avec des maux de ventre le matin. Derrière l'échec se cache souvent un trouble non repéré ou une confiance brisée.",
    methode: [
      { verbe: "Observer", texte: "Bilan global pour identifier la cause réelle derrière les résultats." },
      { verbe: "Adapter", texte: "Remédiation ciblée, rythme sur-mesure, petites réussites quotidiennes." },
      { verbe: "Accompagner", texte: "Restauration de la confiance et réinsertion progressive en école classique." },
    ],
    visuel: "Cartable",
  },
];
