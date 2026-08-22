"use client";

import {
  ScrollCardDeck,
  type DeckCard,
} from "@/components/motion/ScrollCardDeck";

/**
 * The four admission steps, as the deck used on the method page.
 *
 * NOTE — draft copy. `app/admissions/page.tsx` previously carried only section
 * headings ("Les 4 Étapes de l'Admission" and the rest) with no written body,
 * so these descriptions are a plausible reading of that flow rather than
 * supplied text. They are written to be replaced.
 *
 * Every fill is deep because all four marks are painted from yellow, cream,
 * red and green — none is black-dominant, so none needs a light card.
 */
const STEPS: DeckCard[] = [
  {
    id: "01",
    title: "Prendre contact",
    description:
      "Un premier échange par téléphone ou sur place, sans engagement. Vous nous racontez votre situation, nous répondons à vos questions et nous fixons ensemble un rendez-vous.",
    card: "bg-msk-night-950",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-cream-100",
    lottie: "/methode/lottie/dialog.json",
  },
  {
    id: "02",
    title: "Le bilan d'évaluation",
    description:
      "Notre équipe pluridisciplinaire observe votre enfant dans un cadre calme et croise ses constats avec votre témoignage de parent. Le bilan est gratuit et sans engagement.",
    card: "bg-msk-blue-800",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-white",
    stage: "bg-msk-blue-50",
    lottie: "/methode/lottie/card8.json",
  },
  {
    id: "03",
    title: "La proposition de parcours",
    description:
      "Nous vous présentons un parcours sur-mesure : rythme, accompagnements thérapeutiques, objectifs et modalités. Rien n'est décidé sans vous.",
    card: "bg-msk-coral-900",
    titleTone: "text-msk-sun-400",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-coral-50",
    lottie: "/methode/lottie/card7.json",
  },
  {
    id: "04",
    title: "L'inscription",
    description:
      "Constitution du dossier, calendrier d'intégration et première journée préparée avec l'équipe. Nous accompagnons aussi les démarches administratives si nécessaire.",
    card: "bg-msk-blue-900",
    titleTone: "text-msk-sun-300",
    bodyTone: "text-msk-cream-100",
    stage: "bg-msk-sun-50",
    lottie: "/methode/lottie/star.json",
  },
];

export const AdmissionsStepsSection = () => (
  <ScrollCardDeck steps={STEPS} id="etapes" />
);
