/**
 * Contenu de la section « Les situations que nous accueillons »
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
 * (emplacement réservé par AssetSlot tant qu'il n'est pas fourni).
 *
 * LISTE CORRIGÉE LE 2026-08-25, SUR CONFIRMATION DE LA CLIENTE. Le site
 * annonçait auparavant huit troubles neuro-développementaux (TDAH, dyslexie,
 * dyspraxie, dyscalculie, TSA, langage, comportement, difficultés scolaires) :
 * ce n'est PAS ce que le centre prend en charge. Ne les réintroduisez pas.
 *
 * Le centre intervient EN COMPLÉMENT de l'école : l'enfant reste inscrit dans
 * son établissement public ou privé et vient ici quelques jours par semaine.
 * Ne jamais écrire que l'école « lui ferme sa porte » ni qu'elle le « laisse
 * dehors » — la cliente a corrigé cette formulation le 2026-08-25.
 *
 * Diabète et épilepsie sont des maladies, pas des troubles de l'apprentissage :
 * les textes décrivent une SCOLARITÉ adaptée, jamais un soin. RIEN n'établit
 * qu'il y ait une équipe médicale sur place — le propriétaire du site l'ignore
 * lui-même (2026-08-25). Aucune formulation ne doit donc laisser entendre
 * qu'un geste médical est posé ici : le centre organise la journée autour des
 * consignes écrites transmises par la famille, et prévient les parents.
 */

/**
 * Six tons pour six situations : chacune a SA couleur, identique sur la page
 * et dans l'éventail de l'accueil. Quatre tons obligeaient à en répéter deux,
 * et la grille donnait l'impression d'un reste de série.
 */
export type TroubleTone =
  | "coral"
  | "sun"
  | "blue"
  | "night"
  | "coralLight"
  | "sunDeep";

export type TroubleIcon =
  | "door"
  | "heart"
  | "id"
  | "drop"
  | "pulse"
  | "hourglass";

interface TroubleStep {
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
    slug: "decrochage-scolaire",
    title: "Décrochage scolaire",
    subtitle: "Rupture progressive avec l'école",
    short: "L'enfant s'est détaché de l'école, puis s'est arrêté.",
    tone: "coral",
    icon: "door",
    intro:
      "Les absences se sont multipliées, les retards se sont installés, et un jour l'enfant n'y est plus retourné du tout. Plus le temps passe, plus le retour paraît impossible — à lui comme à vous.",
    methode: [
      { verbe: "Observer", texte: "Reprendre son histoire scolaire avec vous, pour voir où le fil s'est rompu." },
      { verbe: "Adapter", texte: "Un retour par paliers, en petit groupe, avec des journées d'abord courtes." },
      { verbe: "Accompagner", texte: "Reconstruire les repères jusqu'à ce qu'une scolarité entière redevienne tenable." },
    ],
    visuel: "Porte",
  },
  {
    slug: "refus-scolaire",
    title: "Refus scolaire",
    subtitle: "Refus d'aller à l'école, souvent anxieux",
    short: "Angoisse du matin, maux de ventre, refus d'y aller.",
    tone: "sun",
    icon: "heart",
    intro:
      "Chaque matin devient une épreuve : maux de ventre, larmes, colère ou blocage complet devant la porte. L'enfant ne fait pas un caprice — il tient tête à quelque chose qu'il n'arrive pas encore à nommer.",
    methode: [
      { verbe: "Observer", texte: "Chercher ce que le refus protège, sans le forcer ni le banaliser." },
      { verbe: "Adapter", texte: "Un cadre prévisible, un groupe restreint, une pression scolaire desserrée." },
      { verbe: "Accompagner", texte: "Guidance des parents et retour progressif, au rythme que l'enfant peut tenir." },
    ],
    visuel: "Cartable",
  },
  {
    slug: "sans-code-massar",
    title: "Sans code Massar",
    subtitle: "Enfant non inscrit au système scolaire national",
    short: "Aucune inscription au système scolaire national.",
    tone: "blue",
    icon: "id",
    intro:
      "Sans code Massar, l'enfant n'existe pas dans le système : ni inscription officielle, ni bulletin, ni passage en classe supérieure. Les mois passent et le retard s'installe pendant que le dossier attend.",
    methode: [
      { verbe: "Observer", texte: "Situer où l'enfant en est réellement, indépendamment de tout dossier." },
      { verbe: "Adapter", texte: "Une place dès maintenant, avec ou sans code, et des apprentissages remis en route." },
      { verbe: "Accompagner", texte: "Suivi des démarches administratives en vue d'une inscription officielle." },
    ],
    visuel: "Dossier",
  },
  {
    slug: "diabete",
    title: "Diabète",
    subtitle: "Une scolarité organisée autour de la maladie",
    short: "Une journée d'école qui tient compte des contrôles.",
    tone: "night",
    icon: "drop",
    intro:
      "Contrôles, collations, horaires de traitement : une journée ne s'organise pas d'elle-même autour de tout cela. À force d'être traité comme une exception, l'enfant finit par manquer, ou par rester à part.",
    methode: [
      { verbe: "Observer", texte: "Reprendre avec vous les consignes écrites de son médecin — le centre n'est pas un lieu de soin." },
      { verbe: "Adapter", texte: "Contrôles, collations et horaires inscrits dans l'emploi du temps, pas à côté." },
      { verbe: "Accompagner", texte: "L'enfant gagne en autonomie face à sa maladie, et le lien avec vous reste quotidien." },
    ],
    visuel: "Goutte",
  },
  {
    slug: "epilepsie",
    title: "Épilepsie",
    subtitle: "Une scolarité qui ne s'arrête pas à la maladie",
    short: "Un cadre sans surprise, une équipe prévenue.",
    tone: "coralLight",
    icon: "pulse",
    intro:
      "La crainte d'une crise pèse sur chaque journée, celle des parents comme celle de l'école. Elle finit par réduire ce que l'enfant a le droit de faire, alors que la plupart de ses journées se passent sans rien.",
    methode: [
      { verbe: "Observer", texte: "Connaître la conduite à tenir que son médecin a écrite, et les consignes que vous donnez." },
      { verbe: "Adapter", texte: "Fatigue, bruit, lumière : la journée est calibrée sur ce qui le fragilise." },
      { verbe: "Accompagner", texte: "Une classe où l'enfant est attendu, et un contact immédiat avec vous si besoin." },
    ],
    visuel: "Onde",
  },
  {
    slug: "retard-scolaire",
    title: "Retard scolaire",
    subtitle: "Décalage entre l'âge et le niveau",
    short: "Un niveau en décalage avec son âge.",
    tone: "sunDeep",
    icon: "hourglass",
    intro:
      "L'enfant a pris plusieurs années de retard : parfois faute d'avoir été scolarisé, parfois parce que les bases n'ont jamais été posées. Le placer dans sa classe d'âge le noierait, l'y laisser en dessous l'humilie.",
    methode: [
      { verbe: "Observer", texte: "Mesurer où il en est vraiment, base par base, sans le rapporter à son âge." },
      { verbe: "Adapter", texte: "Reprendre les fondations manquantes avec du matériel concret, à son rythme." },
      { verbe: "Accompagner", texte: "Combler l'écart, puis préparer le retour vers une classe ordinaire." },
    ],
    visuel: "Sablier",
  },
];
