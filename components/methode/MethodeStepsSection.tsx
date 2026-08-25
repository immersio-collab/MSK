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
 * Fills follow the kinetic band's palette — saturated coral, blue and sun
 * rather than neutrals — but each one is still picked around what its Lottie
 * mark is painted from, measured by area. Marks built mainly from black (03,
 * 06) need a light card or they vanish; marks built from yellow, cream and red
 * need a saturated or deep one. Getting that backwards is what put card 06's
 * red at 1.28:1.
 */
const CARDS = [
  {
    description:
      "Avant toute chose, nous observons. Pas de tests standardisés froids : nos éducateurs passent du temps avec votre enfant en situation réelle — jeu, consignes, travail — et reprennent avec vous son parcours scolaire, pour voir ce qu'il sait faire, ce qui le bloque et ce qui n'a jamais été posé.",
    card: "bg-msk-coral-700",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card1.json",
  },
  {
    description:
      "Notre équipe pluridisciplinaire croise ses observations avec votre témoignage de parent et ce que vous rapportez de son école. Deux choses en sortent : son niveau réel, et les contraintes à respecter — fatigue, santé, angoisse du matin, démarches en cours.",
    card: "bg-msk-blue-800",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-white",
    lottie: "/methode/lottie/card2.json",
  },
  {
    description:
      "Votre enfant rejoint un groupe de cinq, constitué par taille et par niveau de développement — jamais par âge ni par classe d'origine. Le groupe tourne d'une salle à l'autre dans la journée, et le matériel Montessori est choisi pour ce qu'il a réellement à reprendre.",
    // Dark: this mark is yellow and red. An earlier area measurement read it
    // as black-dominant, but that black path's bbox (4M px²) is far larger than
    // the whole visible artwork (810x604) — it is an invisible backdrop, not
    // paint. Yellow and red need a dark field.
    card: "bg-msk-night-950",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card3.json",
  },
  {
    description:
      "Reprendre les bases manquantes une par une, avec du matériel concret avant l'abstraction — et non refaire au pas de charge l'année perdue. La Neuro-Gym vient en appui : un parcours moteur qui travaille l'attention et la régulation émotionnelle, pour qu'il tienne l'effort demandé.",
    card: "bg-msk-coral-900",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card4.json",
  },
  {
    description:
      "Vous n'êtes jamais seuls. Des bilans réguliers, un dialogue transparent, et selon les cas le suivi des démarches administratives ou l'organisation de la journée autour des consignes de son médecin. Chaque progrès se construit avec vous.",
    card: "bg-msk-blue-900",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card5.json",
  },
  {
    description:
      "L'objectif n'est pas qu'il reste ici : c'est qu'il tienne sa place dans sa classe et qu'il n'ait plus besoin de venir. Retour par paliers pour ceux qui s'étaient arrêtés, inscription officielle pour ceux qui n'en avaient pas — jusqu'au jour où son école lui suffit.",
    // Light: this mark really is black-dominant (verified against its art bounds).
    card: "bg-msk-blue-200",
    titleTone: "text-msk-coral-700",
    bodyTone: "text-msk-night-900",
    lottie: "/methode/lottie/card6.json",
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
