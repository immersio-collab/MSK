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
      "Avant toute chose, nous observons. Pas de tests standardisés froids. Nos éducateurs passent du temps avec votre enfant dans un environnement naturel pour identifier ses forces, ses sensibilités sensorielles et son style d'apprentissage unique.",
    card: "bg-msk-coral-700",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card1.json",
  },
  {
    description:
      "Notre équipe pluridisciplinaire — éducateurs Montessori, psychomotriciens, orthophonistes — croise ses observations avec votre témoignage de parent. Ensemble, nous construisons un portrait complet et bienveillant de votre enfant.",
    card: "bg-msk-blue-800",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-white",
    lottie: "/methode/lottie/card2.json",
  },
  {
    description:
      "L'environnement, le matériel, le rythme : tout est ajusté. Le matériel sensoriel Montessori est personnalisé, les séances sont calibrées, les supports pédagogiques sont conçus sur-mesure.",
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
      "Grâce à la Neuro-Gym et à la rééducation ciblée, nous stimulons les connexions neuro-motrices, régulons l'attention et libérons le potentiel cognitif. Des exercices concrets, mesurables, qui changent la vie.",
    card: "bg-msk-coral-900",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card4.json",
  },
  {
    description:
      "Vous n'êtes jamais seuls. Des bilans réguliers, un dialogue transparent, une équipe disponible. Nous co-construisons chaque progrès avec vous, au quotidien.",
    card: "bg-msk-blue-900",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    lottie: "/methode/lottie/card5.json",
  },
  {
    description:
      "L'objectif final : l'autonomie. Que ce soit l'intégration dans une école classique, une formation professionnelle ou simplement la confiance en soi — nous préparons votre enfant à voler de ses propres ailes.",
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
