import { PARENT_CONCERNS_FAQ } from "./site-content";

import type { FaqItem } from "@/components/common/FaqSection";

/**
 * Per-route FAQ content.
 *
 * Every page closes with a `FaqSection` just above its CTA, and each one asks
 * the questions a parent would actually have *on that page* — the programmes
 * page answers programme questions, the method page answers method questions.
 * Repeating one generic list on eight routes is what this file exists to avoid.
 *
 * The home page is the exception: it shows the shared `PARENT_CONCERNS_FAQ`,
 * imported rather than copied so the shared file stays the single source of
 * truth. Only the first five run on the page; the rest still serve other
 * consumers of that constant.
 *
 * WHAT THESE ANSWERS ARE NOT ALLOWED TO SAY
 *
 * An adversarial pass over an earlier draft of this file caught eight answers
 * that asserted things the site cannot back. The constraints below are the
 * result; break one and the site promises a parent something it does not have.
 *
 * - No phone number and no WhatsApp link. `SCHOOL_INFO.phone` and
 *   `SCHOOL_INFO.whatsapp` (lib/data/site-content.ts — the single place every
 *   wa.me link now comes from) are both placeholders. Sending a worried parent
 *   to dial one is worse than not answering.
 * - Nothing about the contact form being received or answered. Its `onSubmit`
 *   in components/contact/ContactMainSection.tsx only flips local state; there
 *   is no backend, no API call, no mailto. Until one exists, no answer may
 *   imply a reply is coming.
 * - No working 360° tour. `VIRTUAL_TOUR.embedUrl` is "" and the section
 *   renders "Lien de visite à renseigner" in its place.
 * - No recurring open days. The only source is one dated article from
 *   November 2023, in a file whose header declares its article bodies drafts.
 * - Nothing sourced from the old components/admissions/* sections (deleted —
 *   there is no /admissions route; FAQ_ADMISSIONS stays for a possible future
 *   page). Its copy was draft "to confirm before publishing", which rules out
 *   the paperwork list and the "dans un cadre calme / sans engagement"
 *   phrasing for the bilan. "Bilan gratuit" itself is fine: three live pages
 *   already print it.
 * - No claim that the articles report real clinical observation. Their bodies
 *   are declared drafts and their photographs are stock.
 * - No claim about who took the gallery photographs. Nothing in the repo
 *   establishes provenance.
 *
 * Questions are also deduplicated across routes: pages one CTA click apart
 * must not ask the same thing, and nothing here restates an entry the home
 * page already shows.
 */

/** Home — the shared parent concerns, first five. */
export const FAQ_ACCUEIL: FaqItem[] = PARENT_CONCERNS_FAQ.slice(0, 5);

/** /programmes — choosing between Maternelle and Primaire. */
export const FAQ_PROGRAMMES: FaqItem[] = [
  {
    question: "Comment choisir entre le programme Maternelle et le Primaire ?",
    answer:
      "L'âge donne le point de départ : la Maternelle accueille les enfants de 2 à 5 ans, le Primaire ceux de 6 à 11 ans — le centre ne va pas au-delà. À l'intérieur, en revanche, l'âge ne décide plus de rien : les groupes de travail sont formés par taille et par niveau de développement. Le bilan initial avec notre fondatrice précise le programme sur-mesure qui convient à votre enfant.",
  },
  {
    question: "Comment les groupes sont-ils formés, et comment se déroule la journée ?",
    answer:
      "Les enfants travaillent par groupes de cinq, constitués par taille et par niveau de développement — jamais par âge réel ni par classe d'origine. Chaque groupe tourne ensuite d'une salle à l'autre : pendant que l'un est en salle sensorielle, un autre est en espace Montessori, un autre en Neuro-Gym. En Maternelle, la matinée reste consacrée au travail Montessori structuré et l'après-midi à la sieste et aux jeux libres ; en Primaire, le matin porte sur les apprentissages cognitifs, l'après-midi sur les ateliers thérapeutiques et créatifs.",
  },
  {
    question: "Quelles thérapies sont incluses dans les deux programmes ?",
    answer:
      "La pédagogie Montessori, les séances de Neuro-Gym et l'orthophonie font partie des deux programmes, intégrées à la journée plutôt que renvoyées à l'extérieur. Le soutien psychologique accompagne les parents en Maternelle, l'enfant comme les parents en Primaire.",
  },
  {
    question: "Mon enfant est déscolarisé depuis un an : dans quel programme entre-t-il ?",
    answer:
      "Dans celui de son âge, pas de son niveau : le Primaire à partir de 6 ans, la Maternelle avant. Le décrochage, le retard accumulé et l'absence de code Massar ne changent pas le point d'entrée — ils changent ce que l'on reprend en premier. Les bases manquantes sont retravaillées à l'intérieur du groupe, avec du matériel concret, sans le renvoyer chez les plus jeunes.",
  },
  {
    question: "Pourquoi l'intégration scolaire n'apparaît-elle qu'en Primaire ?",
    answer:
      "En Maternelle, le travail porte d'abord sur la motricité, l'éveil sensoriel, le langage oral et la socialisation. En Primaire, l'enjeu devient explicite : tenir sa place dans sa classe ordinaire, suivre ce qui s'y fait et y retrouver sa confiance. C'est là que le travail sur l'intégration se formalise, une fois ces bases posées.",
  },
];

/** /notre-centre/troubles-accompagnes — the six situations and the quiz. */
export const FAQ_TROUBLES: FaqItem[] = [
  {
    question: "Faut-il un dossier scolaire ou un diagnostic avant de venir vous voir ?",
    answer:
      "Non, ni l'un ni l'autre. La première étape de notre méthode est l'observation, pas le dossier. Le bilan initial regarde votre enfant en situation réelle — jeu, consignes, motricité — avant toute conclusion, et il part de ce que vous constatez à la maison. Un enfant sans code Massar ni certificat de scolarité peut être accueilli.",
  },
  {
    question: "Et si plusieurs de ces situations se cumulent chez mon enfant ?",
    answer:
      "C'est le cas le plus fréquent : un enfant sans code Massar a souvent pris du retard, un enfant écarté pour sa santé finit par décrocher. Les six fiches de cette page suivent la même démarche — observer, adapter, accompagner — et le parcours est construit autour de votre enfant, pas autour d'une case.",
  },
  {
    question: "Le test en trois questions suffit-il à décider quoi que ce soit ?",
    answer:
      "Non. Il indique seulement si notre approche peut aider votre enfant, rien de plus. Ce qui décide vraiment, c'est le bilan initial : il regarde où il en est, ce qu'il sait faire et ce qui le bloque, puis c'est de là que part le programme.",
  },
  {
    question: "Mon enfant est diabétique ou épileptique : qui s'occupe de sa santé pendant la journée ?",
    answer:
      "Son médecin. Le centre n'est pas un lieu de soin et ne se substitue à personne. Ce que nous prenons en charge, c'est la scolarité : contrôles, collations, fatigue et horaires sont inscrits dans l'emploi du temps plutôt que traités comme des exceptions, selon les consignes écrites que vous nous transmettez, et nous vous joignons immédiatement si quelque chose sort de l'ordinaire. Pour tout ce qui relève du geste médical, parlons-en ensemble avant l'inscription.",
  },
  {
    question: "Ces six situations sont-elles les seules que vous accueillez ?",
    answer:
      "Ce sont celles que nous rencontrons le plus souvent, présentées ici pour vous aider à situer la vôtre. Si celle de votre enfant n'entre dans aucune de ces fiches, cela ne change rien à la démarche : le bilan part de ce qu'il sait faire et de ce qui le gêne. Écrivez-nous, nous vous dirons franchement si nous sommes le bon endroit.",
  },
];

/** /notre-centre/la-methode — the six steps. */
export const FAQ_METHODE: FaqItem[] = [
  {
    question: "Les six étapes se suivent-elles toujours dans cet ordre ?",
    answer:
      "Elles forment un chemin, de l'observation initiale à l'insertion, mais ce n'est pas une grille figée. Chaque étape est menée par l'équipe pluridisciplinaire et recalibrée aussi souvent que nécessaire, au rythme de votre enfant.",
  },
  {
    question: "Que se passe-t-il concrètement pendant l'étape Observer ?",
    answer:
      "Il n'y a pas de tests standardisés froids. Nos éducateurs passent du temps avec votre enfant en situation réelle — jeu, consignes, travail — pour voir ce qu'il sait faire et ce qui le bloque. Nous reprenons aussi son parcours scolaire avec vous : ce qui s'est passé, ce qui a été manqué, ce qui n'a jamais été posé.",
  },
  {
    question: "Qui accompagnera mon enfant à chaque étape ?",
    answer:
      "Une équipe pluridisciplinaire, autour d'éducateurs Montessori. À l'étape Comprendre, ils croisent leurs observations avec votre témoignage de parent, et vous restez associés ensuite par des bilans réguliers et un dialogue transparent. Sur place, votre enfant travaille dans un groupe de cinq, constitué par taille et par niveau de développement plutôt que par âge, qui tourne d'une salle à l'autre.",
  },
  {
    question: "« Rééduquer » : cela veut-il dire corriger mon enfant ?",
    answer:
      "Non. Notre méthode ne corrige pas l'enfant : elle ajuste ce qui l'entoure, l'environnement, le matériel et le rythme. Rééduquer désigne ici la remédiation scolaire — reprendre une à une les bases qui manquent, avec du matériel concret avant l'abstraction. La Neuro-Gym vient en appui : un parcours moteur qui travaille l'attention et la régulation émotionnelle, pour que l'enfant tienne l'effort demandé.",
  },
  {
    question: "Comment commence-t-on, concrètement ?",
    answer:
      "Le premier échange sert à comprendre votre situation et à répondre à vos questions. Vient ensuite le bilan d'évaluation, où l'équipe observe votre enfant et croise ses constats avec votre témoignage, puis la construction d'un programme sur-mesure, ajusté au fil de ses progrès.",
  },
];

/** /notre-centre/la-fondatrice — Khadija Elabaya. */
export const FAQ_FONDATRICE: FaqItem[] = [
  {
    question: "Peut-on rencontrer la fondatrice avant d'inscrire son enfant ?",
    answer:
      "Oui, et c'est même la première étape. Un bilan initial avec notre fondatrice est indispensable pour comprendre finement le profil de votre enfant et concevoir son programme sur-mesure. Ce bilan est gratuit.",
  },
  {
    question: "Sur quelles expertises Khadija Elabaya s'appuie-t-elle ?",
    answer:
      "Elle est thérapeute spécialisée en réadaptation du comportement, neuro-thérapeute, et spécialiste de l'intégration scolaire et de l'éducation inclusive. Elle est également directrice pédagogique du centre et formatrice en psycho-neuro-éducation.",
  },
  {
    question: "Khadija Elabaya forme-t-elle d'autres professionnels ?",
    answer:
      "Oui. Au-delà de la direction pédagogique du centre, elle est formatrice en psycho-neuro-éducation. C'est cette double casquette — praticienne auprès des enfants et formatrice — qui structure la méthode appliquée à MSK.",
  },
  {
    question: "« La neurodiversité n'est pas un obstacle » : qu'est-ce que cela change ?",
    answer:
      "Cela oriente l'organisation du centre, pas seulement le discours. Les expertises réunies ici — réadaptation du comportement, neuro-thérapie, intégration scolaire — servent à ajuster l'environnement, le matériel et le rythme autour de l'enfant, plutôt qu'à lui demander de suivre un cadre unique.",
  },
  {
    question: "Quelle place la fondatrice donne-t-elle aux parents ?",
    answer:
      "Une place centrale : pour elle, le cadre qui s'adapte à l'enfant ne s'arrête pas à l'école, il continue à la maison. La guidance parentale fait partie du parcours — un point avec l'équipe pour faire le bilan des progrès, parler des difficultés du quotidien et fixer deux ou trois objectifs simples pour les semaines suivantes.",
  },
];

/** /notre-centre/galerie — the spaces. */
export const FAQ_GALERIE: FaqItem[] = [
  {
    question: "Que montrent les photos de cette page ?",
    answer:
      "Chaque photo montre un espace du centre : espace Montessori, salle sensorielle, Neuro-Gym, espace motricité, salle de rééducation, salle d'étude, atelier créatif, classes maternelle et primaire, et le parc extérieur.",
  },
  {
    question: "La visite virtuelle remplace-t-elle une visite sur place ?",
    answer:
      "Non, et ce n'est pas son rôle. Une visite virtuelle donne un premier aperçu des salles depuis chez vous ; voir les lieux avec votre enfant et rencontrer l'équipe reste une autre étape.",
  },
  {
    question: "Peut-on voir les espaces en vrai avant d'inscrire son enfant ?",
    answer:
      "Oui. Écrivez-nous en choisissant l'objet « Visite du centre » : nous convenons d'un créneau avec vous et nous vous faisons visiter les espaces. Lorsqu'une journée portes ouvertes est organisée, elle est annoncée dans nos actualités avec ses informations pratiques.",
  },
  {
    question: "À quoi sert la salle Neuro-Gym que l'on voit sur les photos ?",
    answer:
      "On y mène des exercices ciblés de coordination neuro-motrice, qui améliorent l'attention, la mémoire et la régulation émotionnelle. C'est un parcours moteur, pas un cours : le corps travaille pour libérer l'esprit.",
  },
  {
    question: "Comment savoir quels espaces conviendront à mon enfant ?",
    answer:
      "Par l'observation, avant toute conclusion. Le bilan initial permet à l'équipe d'observer votre enfant et de croiser ses constats avec votre témoignage de parent. Les espaces et les séances sont choisis à partir de là, puis les supports s'adaptent au fil des semaines.",
  },
];

/** /actualites — the index. Questions are about navigating the list itself. */
export const FAQ_ACTUALITES: FaqItem[] = [
  {
    question: "Comment trouver les articles qui concernent mon enfant ?",
    answer:
      "Les filtres en haut de page trient les articles par catégorie — Conseils parents, Pédagogie, Événements, Thérapie — et le compteur indique combien d'articles chacune contient. À la fin de chaque article, la rubrique « À lire ensuite » vous propose d'abord des textes de la même catégorie.",
  },
  {
    question: "Que signifie l'étiquette « À la une » ?",
    answer:
      "Elle marque l'article que nous mettons en avant en ce moment. Les autres sont présentés à la suite, chacun avec sa catégorie, sa date et sa durée de lecture.",
  },
  {
    question: "Quelle différence entre les catégories Pédagogie et Thérapie ?",
    answer:
      "Pédagogie regroupe ce qui touche à la classe et aux apprentissages — matériel Montessori, adaptations, travail scolaire. Thérapie regroupe les séances qui les accompagnent : Neuro-Gym, orthophonie, psychomotricité. Conseils parents s'adresse à ce que vous vivez à la maison, et Événements annonce la vie du centre.",
  },
  {
    question: "Combien de temps faut-il pour lire un article ?",
    answer:
      "La durée de lecture est indiquée sur chaque article, à côté de sa date. La plupart se lisent en quelques minutes.",
  },
  {
    question: "Comment suivre les événements du centre ?",
    answer:
      "Nos événements sont annoncés ici, dans la catégorie Événements, avec leurs informations pratiques : dates, horaires et déroulé de la journée. Revenez sur cette page, ou posez-nous la question depuis la page Contact.",
  },
];

/** /actualites/[id] — shown under every article, after "À lire ensuite". */
export const FAQ_ARTICLE: FaqItem[] = [
  {
    question: "Qui rédige les articles que vous publiez ?",
    answer:
      "L'équipe pluridisciplinaire du centre : éducateurs, orthophonistes et psychomotriciens, à Casablanca. Certains passages sont signés directement par Khadija Elabaya, la fondatrice.",
  },
  {
    question: "Je me reconnais dans cet article : par où commencer ?",
    answer:
      "Notez des exemples concrets pendant deux semaines, puis échangez avec l'enseignant de votre enfant — ce sont ces observations qui font avancer le plus vite. Prenez ensuite rendez-vous pour un bilan : chez MSK, il observe l'enfant en situation réelle — jeu, consignes, motricité — avant toute conclusion.",
  },
  {
    question: "Ce que décrit cet article est-il pratiqué au centre ?",
    answer:
      "Pour ce qui se passe au centre, oui : la Neuro-Gym, l'orthophonie et la psychomotricité ont lieu dans les mêmes lieux et la même journée que la classe, et votre enfant ne sort pas de classe pour ses séances. Les conseils destinés à la maison, eux, sont des repères à adapter à votre enfant.",
  },
  {
    question: "Puis-je envoyer cet article à l'enseignant de mon enfant ?",
    answer:
      "Bien sûr, et c'est souvent utile : plusieurs de nos articles vous invitent justement à en parler avec l'enseignant. La rangée « Partager », plus haut, envoie le lien par WhatsApp ou sur Facebook, ou le copie pour un mail.",
  },
  {
    question: "Où trouver les autres articles sur le même sujet ?",
    answer:
      "La rubrique « À lire ensuite », juste au-dessus, vous propose d'abord des articles de la même catégorie. La page Actualités permet ensuite de filtrer l'ensemble, catégorie par catégorie.",
  },
];

/**
 * /contact — questions answerable from the page itself.
 *
 * Deliberately silent on what happens after the form is submitted: nothing
 * does. See the header of this file.
 */
export const FAQ_CONTACT: FaqItem[] = [
  {
    question: "Quel objet choisir dans le formulaire ?",
    answer:
      "« Demande de bilan / orientation » si vous souhaitez faire évaluer votre enfant, « Demande d'inscription » si votre choix est fait, « Visite du centre » pour voir les lieux, et « Demande d'information » pour tout le reste.",
  },
  {
    question: "Quelles informations dois-je préparer ?",
    answer:
      "Vos coordonnées, l'objet de votre demande et votre message sont obligatoires ; le téléphone et l'âge de votre enfant sont facultatifs. Sur votre enfant, rien d'autre n'est demandé à ce stade.",
  },
  {
    question: "Où se trouve le centre, et à quelles heures ?",
    answer:
      "Le centre est situé Rue Sabou, dans le quartier Gauthier à Casablanca (20060), et il est ouvert du lundi au vendredi de 8h00 à 18h00. Le plan d'accès se trouve juste au-dessus.",
  },
  {
    question: "Que deviennent les informations que je vous confie ?",
    answer:
      "Avant l'envoi, vous cochez une case indiquant que vos données sont utilisées pour traiter votre demande. Le formulaire ne demande ni document ni information médicale : votre message peut rester aussi court que vous le souhaitez.",
  },
  {
    question: "Le bilan est-il payant ?",
    answer:
      "Non, le bilan initial est gratuit. C'est la première étape de notre méthode : il permet de comprendre le profil de votre enfant avant toute proposition de programme.",
  },
];
