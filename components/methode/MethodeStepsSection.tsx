"use client";

import {
  ScrollCardDeck,
  type DeckCard,
} from "@/components/methode/ScrollCardDeck";
import { METHODE_STEPS } from "@/lib/data/methode-steps";

/**
 * Step identity (id + title) comes from METHODE_STEPS; copy and presentation
 * are this page's own.
 *
 * LES SIX MARQUES SONT LE CHOIX DU PROPRIÉTAIRE, arrêté le 2026-08-25 sur
 * planche de contact — les vingt animations disponibles rendues côte à côte,
 * au même cadrage et à la même taille, sur fond clair et sur fond sombre.
 * Ne pas les remplacer sur un raisonnement de bureau : elles ont été jugées
 * à l'œil, ce qu'aucune lecture de nom de calque ne remplace.
 *
 * LE FOND EST CALCULÉ, PAS CHOISI. Chaque JSON porte ses propres couleurs et
 * n'hérite de rien de son conteneur : un fond mal choisi efface le dessin. Les
 * dominantes ci-dessous ont été relevées en rendant l'animation à 55 % de sa
 * durée et en comptant les pixels opaques — PAS en lisant les couleurs du
 * fichier. Cette lecture-là avait déjà induit en erreur : un tracé noir
 * invisible pesait plus, en surface déclarée, que tout le dessin visible.
 * Le chiffre entre parenthèses est le contraste de la teinte la plus faible du
 * dessin (parmi celles couvrant au moins 10 % de sa surface) contre le fond.
 *
 * Refaire cette mesure avant de changer un fond.
 */
const CARDS = [
  {
    description:
      "Avant toute chose, nous observons. Pas de tests standardisés froids : nos éducateurs passent du temps avec votre enfant en situation réelle — jeu, consignes, travail — et reprennent avec vous son parcours scolaire, pour voir ce qu'il sait faire, ce qui le bloque et ce qui n'a jamais été posé.",
    // Rouges sombres (56 %) et verts sombres (29 %) : carte CLAIRE obligatoire,
    // le dessin disparaît sur tout fond foncé (1,1 sur coral-900).
    // cream-50 (3,7), le plus clair de la palette.
    card: "bg-msk-cream-50",
    titleTone: "text-msk-coral-700",
    bodyTone: "text-msk-night-900",
    lottie: "/methode/lottie/eyes-book.json",
  },
  {
    description:
      "Notre équipe pluridisciplinaire croise ses observations avec votre témoignage de parent et ce que vous rapportez de son école. Deux choses en sortent : son niveau réel, et les contraintes à respecter — fatigue, santé, angoisse du matin, démarches en cours.",
    // Jaune (68 %) et orange (28 %) : il faut du sombre. coral-800 plutôt que
    // coral-900, qui lisait brun et non corail (retour client) — un seul cran
    // plus clair, le jaune y tient 5,8 et l'orange 3,4, tous deux au-dessus de 3.
    // Corail
    // qu'un bleu nuit — c'est la seule carte qui porte la signature corail de
    // la page, et le jaune y est franc.
    card: "bg-msk-coral-800",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card2.json",
  },
  {
    description:
      "Votre enfant rejoint un groupe de cinq, constitué par taille et par niveau de développement — jamais par âge ni par classe d'origine. Le groupe tourne d'une salle à l'autre dans la journée, et le matériel Montessori est choisi pour ce qu'il a réellement à reprendre.",
    // Crème très clair (52 %) et jaune (47 %) : le dessin le plus lumineux du
    // paquet, il appelle un fond très sombre. night-900 plutôt que night-950,
    // qui lisait noir et non bleu nuit (retour client) : crème 14,7, jaune 10,8.
    card: "bg-msk-night-900",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card5.json",
  },
  {
    description:
      "Reprendre les bases manquantes une par une, avec du matériel concret avant l'abstraction — et non refaire au pas de charge l'année perdue. La Neuro-Gym vient en appui : un parcours moteur qui travaille l'attention et la régulation émotionnelle, pour qu'il tienne l'effort demandé.",
    // LE CAS DIFFICILE. Vert moyen (47 %) et vert très sombre (28 %) : les deux
    // tirent dans des directions opposées — le sombre veut du clair, le moyen
    // n'a d'écart franc nulle part. Son maximum absolu est 2,86, sur BLANC, et
    // aucun fond de la palette ne fait mieux (cream-50 : 2,77 ; sun-100 : 2,57 ;
    // blue-200 : 2,10). C'est donc blanc, et le dessin reste un cran en dessous
    // des cinq autres. Inutile de rechercher : la limite vient de la marque.
    card: "bg-white",
    titleTone: "text-msk-coral-700",
    bodyTone: "text-msk-night-900",
    lottie: "/methode/lottie/desc.json",
  },
  {
    description:
      "Vous n'êtes jamais seuls. Des bilans réguliers, un dialogue transparent, et selon les cas le suivi des démarches administratives ou l'organisation de la journée autour des consignes de son médecin. Chaque progrès se construit avec vous.",
    // Crème très clair (68 %) et jaune (32 %), comme la 03 : n'importe quel
    // fond sombre le sert. blue-900 (9,6) pour varier des noirs voisins.
    card: "bg-msk-blue-900",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card8.json",
  },
  {
    description:
      "L'objectif n'est pas qu'il reste ici : c'est qu'il tienne sa place dans sa classe et qu'il n'ait plus besoin de venir. Retour par paliers pour ceux qui s'étaient arrêtés, inscription officielle pour ceux qui n'en avaient pas — jusqu'au jour où son école lui suffit.",
    // Orange (51 %) et jaune (46 %) : l'orange est la teinte contraignante, il
    // plafonne à 5,1 sur le plus noir. night-800 (4,0), qui garde de la marge
    // et referme le paquet sur le bleu nuit du reste du site.
    card: "bg-msk-night-800",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card3.json",
  },
];

const STEPS: DeckCard[] = METHODE_STEPS.map((step, index) => ({
  id: step.number,
  title: step.verb,
  ...CARDS[index],
}));


export const MethodeStepsSection = () => (
  <ScrollCardDeck steps={STEPS} id="etapes" />
);
