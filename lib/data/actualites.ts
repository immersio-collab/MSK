/**
 * Contenu de la page /actualites et des pages d'articles /actualites/[id].
 *
 * Seul endroit à modifier pour publier, corriger ou retirer un article.
 * Le premier article de la liste est mis « À la une » ; l'ordre ci-dessous
 * est donc éditorial, du plus important au moins récent.
 *
 * Les couleurs (badges, bande du hero d'article) sont des classes COMPLÈTES —
 * jamais concaténées — une par famille de la palette et par catégorie.
 *
 * Les images sont des photos locales du centre (dossier `public/`), et les
 * corps d'articles des BROUILLONS rédigés pour donner la mesure : remplacez
 * les textes et les `image` par vos contenus au fur et à mesure.
 */

export type ArticleCategorie = "conseils" | "pedagogie" | "evenement" | "therapie";

/**
 * Corps d'article en blocs typés : la page /actualites/[id] les met en page
 * (intertitres numérotés, encadré « À retenir », citation) sans parser de
 * markdown. Pour publier un vrai article, remplacez simplement les textes.
 */
export type BlocArticle =
  | { type: "paragraphe"; texte: string }
  | { type: "intertitre"; texte: string }
  | { type: "encadre"; titre: string; points: string[] }
  | { type: "citation"; texte: string; auteur: string };

export interface Article {
  id: string;
  titre: string;
  extrait: string;
  categorie: ArticleCategorie;
  /** Date d'affichage, déjà en français (« 15 oct. 2023 »). */
  date: string;
  image: string;
  /** Légende sous la photo de couverture. */
  legende: string;
  corps: BlocArticle[];
}

export const CATEGORIES_ARTICLES: { cle: ArticleCategorie | "tous"; label: string }[] = [
  { cle: "tous", label: "Tous" },
  { cle: "conseils", label: "Conseils parents" },
  { cle: "pedagogie", label: "Pédagogie" },
  { cle: "evenement", label: "Événements" },
  { cle: "therapie", label: "Thérapie" },
];

export const CATEGORIE_ARTICLE_LABEL: Record<ArticleCategorie, string> = {
  conseils: "Conseils parents",
  pedagogie: "Pédagogie",
  evenement: "Événement",
  therapie: "Thérapie",
};

/** Badge de catégorie : un aplat par famille — coral / sun / blue / night. */
export const CATEGORIE_ARTICLE_BADGE: Record<ArticleCategorie, string> = {
  conseils: "bg-msk-coral-600 text-white",
  pedagogie: "bg-msk-sun-400 text-msk-night-900",
  evenement: "bg-msk-blue-500 text-msk-night-900",
  therapie: "bg-msk-night-800 text-msk-cream-200",
};

/** Bande du hero de la page article : la couleur suit la catégorie. */
export const CATEGORIE_ARTICLE_BANDE: Record<ArticleCategorie, string> = {
  conseils: "bg-msk-coral-400",
  pedagogie: "bg-msk-sun-400",
  evenement: "bg-msk-blue-400",
  therapie: "bg-msk-night-800",
};

/** Temps de lecture estimé, à ~200 mots par minute, arrondi au supérieur. */
export function minutesLecture(article: Article): number {
  const mots = article.corps
    .map((bloc) =>
      bloc.type === "encadre" ? bloc.points.join(" ") : bloc.type === "citation" ? bloc.texte : bloc.texte,
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(mots / 200));
}

/** Jusqu'à `n` articles liés : même catégorie d'abord, puis les plus récents. */
export function articlesLies(article: Article, n = 3): Article[] {
  const autres = ARTICLES.filter((a) => a.id !== article.id);
  const memeCategorie = autres.filter((a) => a.categorie === article.categorie);
  const reste = autres.filter((a) => a.categorie !== article.categorie);
  return [...memeCategorie, ...reste].slice(0, n);
}

export const ARTICLES: Article[] = [
  {
    id: "journee-portes-ouvertes",
    titre: "Journée portes ouvertes : venez découvrir nos nouveaux espaces",
    extrait:
      "Le centre MSK a le plaisir de vous inviter à sa journée portes ouvertes le samedi 25 novembre. Visite de la salle Neuro-Gym au programme.",
    categorie: "evenement",
    date: "10 nov. 2023",
    image: "/park exterieur.jpg",
    legende: "Les espaces du centre, prêts à vous accueillir.",
    corps: [
      {
        type: "paragraphe",
        texte:
          "Le samedi 25 novembre, de 9h à 17h, le centre MSK ouvre grand ses portes aux familles. Que vous soyez déjà parents d'un enfant accompagné, en réflexion, ou simplement curieux de découvrir notre approche, cette journée est faite pour vous.",
      },
      { type: "intertitre", texte: "Au programme" },
      {
        type: "paragraphe",
        texte:
          "Visite guidée de tous les espaces — salle sensorielle, espace Montessori, classes, parc extérieur — et surtout de la nouvelle salle Neuro-Gym, où l'équipe fera des démonstrations d'exercices neuro-moteurs tout au long de la journée.",
      },
      {
        type: "encadre",
        titre: "Infos pratiques",
        points: [
          "Samedi 25 novembre, 9h – 17h, entrée libre.",
          "Rue Sabou, Gauthier, Casablanca.",
          "Les enfants sont les bienvenus — des ateliers leur sont réservés.",
        ],
      },
      { type: "intertitre", texte: "Rencontrer l'équipe" },
      {
        type: "paragraphe",
        texte:
          "Éducateurs, orthophonistes et psychomotriciens seront présents pour répondre à toutes vos questions, sans rendez-vous. La fondatrice proposera des créneaux d'échange individuels pour les familles qui envisagent une inscription.",
      },
    ],
  },
  {
    id: "premiers-signes-tdah",
    titre: "Comment reconnaître les premiers signes d'un TDAH chez l'enfant ?",
    extrait:
      "L'inattention ou l'hyperactivité peuvent être difficiles à interpréter chez les jeunes enfants. Voici les 5 signes qui doivent vous amener à consulter.",
    categorie: "conseils",
    date: "15 oct. 2023",
    image: "/espace motricité.png",
    legende: "Un enfant qui bouge beaucoup n'est pas forcément un enfant TDAH — et inversement.",
    corps: [
      {
        type: "paragraphe",
        texte:
          "Tous les enfants bougent, rêvassent et oublient leurs affaires. La question n'est donc jamais « mon enfant est-il agité ? » mais « ces comportements le gênent-ils, lui, dans sa vie de tous les jours ? ». Voici les signes qui méritent un avis professionnel.",
      },
      { type: "intertitre", texte: "Les signes qui doivent alerter" },
      {
        type: "encadre",
        titre: "Les 5 signes",
        points: [
          "L'attention décroche en quelques minutes, même sur une activité choisie.",
          "L'agitation est constante, à la maison comme à l'école.",
          "L'impulsivité domine : il coupe la parole, agit avant de réfléchir.",
          "Les consignes en plusieurs étapes se perdent en route.",
          "L'école signale les mêmes difficultés que vous observez à la maison.",
        ],
      },
      { type: "intertitre", texte: "Un signe isolé ne fait pas un diagnostic" },
      {
        type: "paragraphe",
        texte:
          "C'est la persistance — plus de six mois —, la présence dans plusieurs contextes et la gêne réelle qui comptent. Seul un bilan complet permet de distinguer un TDAH d'une anxiété, d'un trouble du sommeil ou simplement d'un tempérament vif.",
      },
      {
        type: "citation",
        texte: "Consulter tôt, ce n'est pas coller une étiquette : c'est comprendre comment votre enfant fonctionne.",
        auteur: "L'équipe pluridisciplinaire MSK",
      },
      { type: "intertitre", texte: "Que faire si vous vous reconnaissez ?" },
      {
        type: "paragraphe",
        texte:
          "Notez des exemples concrets pendant deux semaines, échangez avec l'enseignant, puis prenez rendez-vous pour un bilan. Chez MSK, le bilan initial observe l'enfant en situation réelle — jeu, consignes, motricité — avant toute conclusion.",
      },
    ],
  },
  {
    id: "montessori-inclusion",
    titre: "La méthode Montessori : pourquoi est-elle idéale pour l'inclusion ?",
    extrait:
      "En s'adaptant au rythme de chacun, la pédagogie Montessori offre un cadre sécurisant pour les enfants à besoins spécifiques.",
    categorie: "pedagogie",
    date: "2 nov. 2023",
    image: "/espace montesori.jpeg",
    legende: "Le matériel Montessori : concret, sensoriel, auto-correctif.",
    corps: [
      {
        type: "paragraphe",
        texte:
          "Dans une classe traditionnelle, tous les enfants font la même chose au même moment. Pour un enfant dys, TDAH ou TSA, ce rythme unique devient vite un mur. La pédagogie Montessori renverse la logique : c'est le cadre qui s'adapte à l'enfant.",
      },
      { type: "intertitre", texte: "Chacun avance à son rythme" },
      {
        type: "paragraphe",
        texte:
          "Le matériel est en libre accès, les apprentissages sont individualisés, et l'erreur fait partie du chemin : le matériel est auto-correctif, l'enfant se corrige seul, sans le regard des autres. L'estime de soi est préservée — condition première de tout progrès.",
      },
      {
        type: "encadre",
        titre: "À retenir",
        points: [
          "Des apprentissages individualisés, pas de comparaison entre enfants.",
          "Du matériel concret et sensoriel, qui passe par la main avant l'abstraction.",
          "Un environnement ordonné et prévisible, rassurant pour les profils anxieux.",
        ],
      },
      { type: "intertitre", texte: "Ce que MSK y ajoute" },
      {
        type: "paragraphe",
        texte:
          "Montessori est notre socle, pas notre plafond : nous y intégrons la Neuro-Gym, l'orthophonie et la psychomotricité, dans les mêmes lieux et la même journée. L'enfant ne « sort » pas pour ses séances — elles font partie de sa vie de classe.",
      },
    ],
  },
  {
    id: "neuro-gym-concentration",
    titre: "Neuro-Gym : les bienfaits de l'activité neuro-motrice sur la concentration",
    extrait:
      "Découvrez comment des exercices physiques ciblés peuvent aider votre enfant à mieux réguler son attention en classe.",
    categorie: "therapie",
    date: "28 nov. 2023",
    image: "/neuro-gym.jpg",
    legende: "Parcours moteur en salle Neuro-Gym : le corps au service de l'attention.",
    corps: [
      {
        type: "paragraphe",
        texte:
          "Demander à un enfant agité de « se concentrer » sans passer par le corps, c'est demander à un ressort comprimé de rester immobile. La Neuro-Gym prend le chemin inverse : elle fait travailler le corps pour installer l'attention.",
      },
      { type: "intertitre", texte: "Que fait-on en séance ?" },
      {
        type: "paragraphe",
        texte:
          "Parcours d'équilibre, coordination croisée, jeux de rythme, exercices oculomoteurs : des activités courtes, ludiques et progressives, qui sollicitent exactement les circuits dont l'enfant a besoin pour tenir en classe — posture, inhibition, repérage dans l'espace.",
      },
      {
        type: "citation",
        texte: "Ici, on apprend en bougeant.",
        auteur: "L'équipe pluridisciplinaire MSK",
      },
      { type: "intertitre", texte: "Des effets visibles en classe" },
      {
        type: "paragraphe",
        texte:
          "Pratiquée quotidiennement, la Neuro-Gym améliore la tenue de la posture, la qualité du geste d'écriture et la durée de concentration. C'est pour cela qu'elle est intégrée à l'emploi du temps de chaque enfant MSK, et non proposée en option.",
      },
    ],
  },
  {
    id: "devoirs-enfant-dyslexique",
    titre: "Gérer les devoirs avec un enfant dyslexique : 3 astuces simples",
    extrait:
      "Le moment des devoirs se transforme souvent en conflit. Voici des stratégies concrètes pour apaiser ce moment crucial.",
    categorie: "conseils",
    date: "5 déc. 2023",
    image: "/primaire.jpg",
    legende: "Des devoirs plus courts, mieux découpés, dans le calme.",
    corps: [
      {
        type: "paragraphe",
        texte:
          "Pour un enfant dyslexique, une heure de devoirs équivaut à trois heures d'effort de lecture pour un autre. Si la fin de journée tourne au conflit, ce n'est ni de la mauvaise volonté ni de la paresse : c'est de la fatigue. Ces trois ajustements changent beaucoup de choses.",
      },
      { type: "intertitre", texte: "Découper, chronométrer, s'arrêter" },
      {
        type: "paragraphe",
        texte:
          "Des sessions de 15 à 20 minutes maximum, avec une vraie pause entre deux. On s'arrête à l'heure prévue, même si tout n'est pas fini — et on le note pour l'enseignant. Un enfant épuisé n'apprend plus rien après ce seuil.",
      },
      { type: "intertitre", texte: "Passer par l'oral et le corps" },
      {
        type: "paragraphe",
        texte:
          "Lire la consigne à voix haute à sa place n'est pas tricher : c'est retirer l'obstacle pour atteindre l'objectif réel de l'exercice. Réciter en marchant, épeler en sautant, dessiner la leçon — tout ce qui passe par le corps soulage la lecture.",
      },
      {
        type: "encadre",
        titre: "Les 3 astuces",
        points: [
          "Sessions courtes (15-20 min) et arrêt à heure fixe, quoi qu'il arrive.",
          "Lire les consignes à voix haute, viser l'objectif de l'exercice, pas la lecture.",
          "Faire passer les leçons par l'oral, le mouvement et le dessin.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Et si le conflit persiste malgré tout, parlons-en : chez MSK, la remédiation redonne d'abord à l'enfant le sentiment qu'il peut réussir — le reste suit.",
      },
    ],
  },
  {
    id: "guidance-parentale",
    titre: "L'importance de la guidance parentale dans le parcours thérapeutique",
    extrait:
      "Un accompagnement réussi implique toujours les parents. Découvrez pourquoi nous accordons une place centrale à la guidance parentale.",
    categorie: "pedagogie",
    date: "12 déc. 2023",
    image: "/accompagnement.jpeg",
    legende: "Une séance de guidance parentale au centre MSK.",
    corps: [
      {
        type: "paragraphe",
        texte:
          "Quand un enfant entre chez MSK, ce sont en réalité trois personnes qui commencent un parcours : l'enfant, et ses deux premiers éducateurs — ses parents. Les progrès réalisés en séance ne tiennent dans la durée que s'ils sont compris, relayés et encouragés à la maison.",
      },
      { type: "intertitre", texte: "Ce que la guidance change, concrètement" },
      {
        type: "paragraphe",
        texte:
          "La guidance parentale n'est ni un cours magistral, ni un jugement sur votre façon d'élever votre enfant. C'est un temps d'échange régulier avec l'équipe, où l'on traduit ce qui se passe en séance en gestes simples du quotidien : comment formuler une consigne, comment réagir à une crise, comment transformer les devoirs en moment apaisé.",
      },
      {
        type: "encadre",
        titre: "À retenir",
        points: [
          "Un point régulier avec l'équipe pluridisciplinaire, pas une réunion de plus.",
          "Des outils concrets à appliquer à la maison, adaptés à votre enfant.",
          "Les parents voient les mêmes progrès que l'équipe — et savent les entretenir.",
        ],
      },
      { type: "intertitre", texte: "Pourquoi c'est décisif pour les progrès" },
      {
        type: "paragraphe",
        texte:
          "Un enfant passe quelques heures par semaine au centre… et tout le reste du temps avec vous. Si les stratégies mises en place en séance s'arrêtent à la porte de MSK, chaque semaine repart de zéro. Quand les parents les prolongent à la maison, les acquis se stabilisent bien plus vite — c'est ce que nous observons sur les parcours que nous suivons.",
      },
      {
        type: "citation",
        texte:
          "Le cadre qui s'adapte à l'enfant ne s'arrête pas à l'école : il continue dans le salon, à table, au moment du coucher.",
        auteur: "Khadija Elabaya, fondatrice de MSK",
      },
      { type: "intertitre", texte: "Comment ça se passe chez MSK" },
      {
        type: "paragraphe",
        texte:
          "Chaque famille bénéficie d'un point de guidance intégré au parcours : un bilan des progrès, les difficultés rencontrées à la maison, et deux ou trois objectifs simples pour les semaines suivantes. Entre deux rendez-vous, l'équipe reste joignable — souvent, un message suffit à débloquer une situation.",
      },
    ],
  },
];
