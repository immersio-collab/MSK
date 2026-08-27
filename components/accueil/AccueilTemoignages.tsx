"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Mic, Pause, Play } from "lucide-react";
import { LottieMark } from "@/components/motion/LottieMark";
import { FadeUp } from "@/components/motion/FadeUp";
import { Reveal } from "@/components/motion/Reveal";
import { MorphButton } from "@/components/motion/MorphButton";
import { cn } from "@/lib/utils";
import { SPRING, useTilt } from "@/lib/motion";
import { Eyebrow } from "@/components/common/Eyebrow";
import {
  TemoignageChatMock,
  TemoignageLightbox,
  type TemoignageMedia,
} from "./TemoignageLightbox";

/**
 * Paroles de parents en mur de cartes : citations en stickers inclinés,
 * audio sur carte sombre, vidéos et captures WhatsApp en polaroids blancs
 * cliquables (agrandis dans TemoignageLightbox).
 *
 * Les entrées audio/vidéo/capture ci-dessous sont FICTIVES, validées comme
 * placeholders en attendant les enregistrements de la cliente : déposer les
 * fichiers dans public/temoignages/ puis renseigner `src` (audio, vidéo) ou
 * `image` (capture). Sans `src`, la carte audio reste muette (pas de lecteur
 * vers un fichier 404 — l'erreur déjà commise par l'ancienne version).
 */
type QuoteTone = "coral" | "blue" | "sun";

type Temoignage = { id: string; tag: string } & (
  | { type: "quote"; tone: QuoteTone; quote: string; author: string; role: string }
  | { type: "audio"; quote: string; duration: string; src: string | null; author: string; role: string }
  | TemoignageMedia
);

export type TemoignageFiltre = "tout" | "audio" | "video" | "image" | "citation";

const FILTRES: Array<{ cle: TemoignageFiltre; label: string }> = [
  { cle: "tout", label: "Tout" },
  { cle: "audio", label: "Audio" },
  { cle: "video", label: "Vidéo" },
  { cle: "image", label: "Images" },
  { cle: "citation", label: "Citations" },
];

const TEMOIGNAGES: Temoignage[] = [
  // --- TOP 6 : MIX ÉQUILIBRÉ DE TOUS LES FORMATS ---
  {
    id: "salma",
    type: "quote",
    tone: "coral",
    tag: "Primaire",
    quote: "En 6 mois, mon fils a retrouvé le sourire et l'envie d'apprendre.",
    author: "Salma B.",
    role: "maman de Ryan (7 ans, déscolarisé)",
  },
  {
    id: "video-orthophonie",
    type: "video",
    tag: "Séance en vidéo",
    title: "PPT (séance d’orthophonie)",
    poster: "https://embed-ssl.wistia.com/deliveries/fd148646ad8c57d3af9c0cad1188ac0009073756.bin",
    duration: "1:25",
    src: "https://embed-ssl.wistia.com/deliveries/89a4bc658896539275f30933fe6068226a7add6a.bin",
    author: "Séance avec Fahd",
    role: "Déroulement de séance — Orthophonie",
  },
  {
    id: "audio-1",
    type: "audio",
    tag: "Message vocal WhatsApp",
    quote: "« L'évolution et les progrès de mon enfant au centre sont remarquables, merci infiniment. »",
    duration: "0:47",
    src: "/temoignages/audio-1.ogg",
    author: "Maman d'élève",
    role: "Témoignage audio vérifié",
  },
  {
    id: "capture-1",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Retour d'expérience après le premier trimestre au centre.",
    time: "14:22",
    image: "/temoignages/capture-1.webp",
    author: "Maman d'élève",
    role: "",
  },
  {
    id: "video-concentration",
    type: "video",
    tag: "Séance en vidéo",
    title: "Concentration et coordination",
    poster: "https://embed-ssl.wistia.com/deliveries/edbec1ded4d7ab7e5f342d1330644e7af6d28fe9.bin",
    duration: "0:49",
    src: "https://embed-ssl.wistia.com/deliveries/672ca956aac17ae953b03426a23758a386074a5c.bin",
    author: "Atelier sensoriel",
    role: "Déroulement de séance — Neuro-gym",
  },
  {
    id: "karim-yasmine",
    type: "quote",
    tone: "blue",
    tag: "Petite enfance",
    quote:
      "Lina va à l'école avec enthousiasme. L'approche Montessori combinée à l'inclusion est une merveille.",
    author: "Karim & Yasmine T.",
    role: "parents de Lina (4 ans)",
  },

  // --- SUITE DES TÉMOIGNAGES (Accessibles via 'Voir plus') ---
  {
    id: "audio-2",
    type: "audio",
    tag: "Message vocal WhatsApp",
    quote: "« Il communique beaucoup mieux et a repris confiance en lui depuis son intégration. »",
    duration: "1:46",
    src: "/temoignages/audio-2.ogg",
    author: "Parent d'élève",
    role: "Témoignage audio vérifié",
  },
  {
    id: "capture-2",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Message de remerciement pour les progrès en lecture et autonomie.",
    time: "18:05",
    image: "/temoignages/capture-2.webp",
    author: "Famille MSK",
    role: "",
  },
  {
    id: "video-montessori",
    type: "video",
    tag: "Séance en vidéo",
    title: "Séance Montessori et adaptation scolaire",
    poster: "https://embed-ssl.wistia.com/deliveries/0a47a6f755e37d63b2a7b8ed142dd925c6471830.bin",
    duration: "1:00",
    src: "https://embed-ssl.wistia.com/deliveries/56f87f0e21db37a34b2a1cb5677acc647ca1909c.bin",
    author: "Classe inclusive",
    role: "Déroulement de séance — Pédagogie Montessori",
  },
  {
    id: "nadia",
    type: "quote",
    tone: "sun",
    tag: "Primaire",
    quote:
      "On nous avait dit qu'il ne pourrait jamais suivre un cursus normal. Aujourd'hui il est en CM1 dans une école classique.",
    author: "Nadia M.",
    role: "maman de Adam (9 ans)",
  },
  {
    id: "capture-3",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Évolution du comportement et enthousiasme le matin pour aller en classe.",
    time: "20:30",
    image: "/temoignages/capture-3.webp",
    author: "Parent d'élève",
    role: "",
  },
  {
    id: "audio-3",
    type: "audio",
    tag: "Message vocal WhatsApp",
    quote: "« Nous avons enfin trouvé un cadre bienveillant et structuré, adapté à son rythme. »",
    duration: "0:38",
    src: "/temoignages/audio-3.ogg",
    author: "Papa d'élève",
    role: "Témoignage audio vérifié",
  },
  {
    id: "video-comportement",
    type: "video",
    tag: "Séance en vidéo",
    title: "Trouble du comportement & régulation",
    poster: "https://embed-ssl.wistia.com/deliveries/dc697a695ed1d692e2f60650035edc41e63d5a02.bin",
    duration: "1:00",
    src: "https://embed-ssl.wistia.com/deliveries/17005beb6a86f3dbe3008cbac4f7af71068f632d.bin",
    author: "Accompagnement individualisé",
    role: "Déroulement de séance — Éducation spécialisée",
  },
  {
    id: "capture-4",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Autonomie et épanouissement au sein des ateliers éducatifs.",
    time: "11:15",
    image: "/temoignages/capture-4.webp",
    author: "Maman d'élève",
    role: "",
  },
  {
    id: "sofia",
    type: "quote",
    tone: "blue",
    tag: "Réadaptation",
    quote: "Le bilan a mis des mots sur ce que l'on vivait. On sait enfin comment l'aider.",
    author: "Sofia L.",
    role: "maman de Ghali (6 ans, sans code Massar)",
  },
  {
    id: "audio-4",
    type: "audio",
    tag: "Message vocal WhatsApp",
    quote: "« Un suivi personnalisé et une équipe dévouée dès le premier bilan. »",
    duration: "0:10",
    src: "/temoignages/audio-4.ogg",
    author: "Maman d'élève",
    role: "Témoignage audio vérifié",
  },
  {
    id: "video-coordination",
    type: "video",
    tag: "Séance en vidéo",
    title: "Coordination physique",
    poster: "https://embed-ssl.wistia.com/deliveries/a7a7959e1f5ba51231052d5430bde10197f36f77.bin",
    duration: "0:22",
    src: "https://embed-ssl.wistia.com/deliveries/91c2df3f3319b43fee0ab1d54610804925257ce1.bin",
    author: "Séance avec Adam",
    role: "Déroulement de séance — Psychomotricité",
  },
  {
    id: "capture-5",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Félicitations pour l'approche douce et individualisée.",
    time: "16:40",
    image: "/temoignages/capture-5.webp",
    author: "Papa d'élève",
    role: "",
  },
  {
    id: "video-apprentissage",
    type: "video",
    tag: "Séance en vidéo",
    title: "Séance d’apprentissage & mémorisation",
    poster: "https://embed-ssl.wistia.com/deliveries/2c8b8f9a55c78d1797cf314a2a120b5b5d8a46ee.bin",
    duration: "0:40",
    src: "https://embed-ssl.wistia.com/deliveries/570a3f8adf07a7eaa58f2f250d033a670eddc98a.bin",
    author: "Séance avec Hissa",
    role: "Déroulement de séance — Apprentissage guidé",
  },
  {
    id: "capture-6",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Rapport et retour d'expérience après le bilan initial.",
    time: "09:12",
    image: "/temoignages/capture-6.webp",
    author: "Parent d'élève",
    role: "",
  },
  {
    id: "capture-7",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Remerciements à l'équipe pédagogique et de réadaptation.",
    time: "19:50",
    image: "/temoignages/capture-7.webp",
    author: "Famille MSK",
    role: "",
  },
];

const VISIBLE_COUNT = 6;

// `custom` porte l'inclinaison propre à chaque carte : `rest` y revient,
// `hover` redresse et soulève.
const CARD_VARIANTS: Variants = {
  rest: (tilt: number) => ({ rotate: tilt, y: 0, scale: 1 }),
  hover: { rotate: 0, y: -8, scale: 1.03 },
};

const QUOTE_LOOKS: Record<
  QuoteTone,
  { card: string; tag: string; quote: string; footer: string; role: string }
> = {
  // Nuances pleines (pas de /opacité) : les petits textes passeraient sous le
  // seuil AA 4.5:1 sinon — même table de contrastes que trouble-look.ts.
  coral: {
    card: "bg-msk-coral-600",
    tag: "text-msk-coral-50",
    quote: "text-white",
    footer: "text-white",
    role: "text-msk-coral-50",
  },
  blue: {
    card: "bg-msk-blue-500",
    tag: "text-msk-night-800",
    quote: "text-msk-night-900",
    footer: "text-msk-night-900",
    role: "text-msk-night-800",
  },
  sun: {
    card: "bg-msk-sun-300",
    tag: "text-msk-sun-900",
    quote: "text-msk-night-900",
    footer: "text-msk-night-900",
    role: "text-msk-sun-900",
  },
};

const POLAROID_SHADOW = "shadow-xl shadow-msk-night-900/10";
const POLAROID_CORNERS = ["rounded-[18px_6px_20px_8px]", "rounded-[6px_20px_8px_18px]"];
const POLAROID_FOCUS =
  "focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-msk-cream-50";

function QuoteCard({
  item,
  index,
}: {
  item: Extract<Temoignage, { type: "quote" }>;
  index: number;
}) {
  const tilt = useTilt(index);
  const look = QUOTE_LOOKS[item.tone];

  return (
    <motion.article
      custom={tilt}
      variants={CARD_VARIANTS}
      initial={false}
      animate="rest"
      whileHover="hover"
      transition={SPRING}
      style={{ borderRadius: 28 }}
      className={cn(
        "flex h-full min-h-[16rem] w-full flex-col justify-between p-7",
        POLAROID_SHADOW,
        look.card,
      )}
    >
      <div>
        <span
          className={cn("font-display text-xs font-semibold uppercase tracking-[0.16em]", look.tag)}
        >
          {item.tag}
        </span>
        <blockquote
          className={cn("mt-4 font-display text-lg font-bold uppercase leading-snug", look.quote)}
        >
          {item.quote}
        </blockquote>
      </div>
      <footer className={cn("mt-8 text-sm leading-snug", look.footer)}>
        <p className="font-semibold">{item.author}</p>
        <p className={look.role}>{item.role}</p>
      </footer>
    </motion.article>
  );
}

/** Hauteurs fixes (pas de Math.random : rendu serveur + rendu client identiques). */
const WAVE_HEIGHTS = [8, 16, 11, 22, 14, 20, 9, 17, 12, 19, 8, 15, 21, 10, 18, 13];

function AudioCard({
  item,
  index,
}: {
  item: Extract<Temoignage, { type: "audio" }>;
  index: number;
}) {
  const tilt = useTilt(index);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const filledBars = Math.round(progress * WAVE_HEIGHTS.length);

  // `playing` suit les événements du média, pas les clics : un play() qui
  // échoue (fichier absent, autoplay refusé) laisserait sinon le bouton en
  // état « pause ».
  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <motion.article
      custom={tilt}
      variants={CARD_VARIANTS}
      initial={false}
      animate="rest"
      whileHover="hover"
      transition={SPRING}
      style={{ borderRadius: 28 }}
      className={cn(
        "flex h-full min-h-[16rem] w-full flex-col justify-between bg-msk-night-800 p-7",
        "shadow-xl shadow-msk-night-900/20",
      )}
    >
      <div>
        <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-msk-sun-300">
          {item.tag}
        </span>
        <p className="mt-4 font-display text-lg font-semibold leading-snug text-msk-cream-100">
          {item.quote}
        </p>
      </div>
      <div>
        <div className="mt-8 flex items-center gap-3">
          {item.src ? (
            <>
              <audio
                ref={audioRef}
                src={item.src}
                preload="none"
                onTimeUpdate={(event) => {
                  const audio = event.currentTarget;
                  setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
                }}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onError={() => setPlaying(false)}
                onEnded={() => setProgress(0)}
              />
              <button
                type="button"
                onClick={toggle}
                aria-label={
                  playing ? "Mettre le témoignage en pause" : `Écouter le témoignage de ${item.author}`
                }
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-msk-coral-600 shadow-md transition-colors hover:bg-msk-cream-100",
                  "focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-sun-300 focus-visible:ring-offset-2 focus-visible:ring-offset-msk-night-800",
                )}
              >
                {playing ? (
                  <Pause className="h-5 w-5" strokeWidth={2.2} />
                ) : (
                  <Play className="ml-0.5 h-5 w-5" strokeWidth={2.2} />
                )}
              </button>
            </>
          ) : (
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-msk-coral-600 shadow-md"
            >
              <Mic className="h-5 w-5" strokeWidth={2.2} />
            </span>
          )}
          <span aria-hidden className="flex h-7 flex-1 items-center gap-[3px]">
            {WAVE_HEIGHTS.map((height, barIndex) => (
              <span
                key={barIndex}
                style={{ height }}
                className={cn(
                  "w-[3px] rounded-full",
                  barIndex < filledBars ? "bg-msk-sun-300" : "bg-msk-cream-100/35",
                )}
              />
            ))}
          </span>
          <span className="text-xs text-msk-cream-100/80">{item.duration}</span>
          {!item.src && <span className="sr-only">Extrait audio bientôt disponible.</span>}
        </div>
        <footer className="mt-5 text-sm leading-snug text-msk-cream-100">
          <p className="font-semibold">{item.author}</p>
          <p className="text-msk-cream-100/65">{item.role}</p>
        </footer>
      </div>
    </motion.article>
  );
}

function VideoCard({
  item,
  index,
  onOpen,
}: {
  item: Extract<Temoignage, { type: "video" }>;
  index: number;
  onOpen: (media: TemoignageMedia, opener: HTMLElement) => void;
}) {
  const tilt = useTilt(index);

  return (
    <motion.button
      type="button"
      onClick={(event) => onOpen(item, event.currentTarget)}
      custom={tilt}
      variants={CARD_VARIANTS}
      initial={false}
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      className={cn(
        "my-auto block w-full bg-white p-2 pb-3 text-center",
        POLAROID_CORNERS[index % 2],
        POLAROID_SHADOW,
        POLAROID_FOCUS,
      )}
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-[12px] bg-msk-cream-200">
        <Image
          src={item.poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-msk-coral-600 shadow-lg">
            <Play className="ml-0.5 h-5 w-5" strokeWidth={2.2} />
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded-full bg-msk-night-950/60 px-2.5 py-0.5 text-[0.65rem] text-white">
          {item.duration}
        </span>
      </span>
      <span className="mt-2.5 block font-display text-sm font-semibold text-msk-night-800">
        {item.title}
      </span>
      <span className="mt-0.5 block text-xs text-msk-night-700">{item.role}</span>
    </motion.button>
  );
}

function ScreenshotCard({
  item,
  index,
  onOpen,
}: {
  item: Extract<Temoignage, { type: "screenshot" }>;
  index: number;
  onOpen: (media: TemoignageMedia, opener: HTMLElement) => void;
}) {
  const tilt = useTilt(index);

  return (
    <motion.button
      type="button"
      onClick={(event) => onOpen(item, event.currentTarget)}
      custom={tilt}
      variants={CARD_VARIANTS}
      initial={false}
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      transition={SPRING}
      className={cn(
        "my-auto block w-full bg-white p-2 pb-3 text-center",
        POLAROID_CORNERS[(index + 1) % 2],
        POLAROID_SHADOW,
        POLAROID_FOCUS,
      )}
    >
      {item.image ? (
        <span className="relative block aspect-[4/3] overflow-hidden rounded-[12px] bg-msk-cream-200">
          <Image
            src={item.image}
            alt={`Message WhatsApp de ${item.author}`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover object-top"
          />
        </span>
      ) : (
        <TemoignageChatMock message={item.message} time={item.time} />
      )}
      <span className="mt-2.5 block font-display text-sm font-semibold text-msk-night-800">
        {item.tag}
      </span>
      <span className="mt-0.5 block text-xs text-msk-night-700">{item.author}</span>
    </motion.button>
  );
}

export const AccueilTemoignages = () => {
  const [filtre, setFiltre] = useState<TemoignageFiltre>("tout");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<TemoignageMedia | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const firstNewCardRef = useRef<HTMLLIElement>(null);

  const filtered = useMemo(() => {
    if (filtre === "tout") return TEMOIGNAGES;
    if (filtre === "audio") return TEMOIGNAGES.filter((t) => t.type === "audio");
    if (filtre === "video") return TEMOIGNAGES.filter((t) => t.type === "video");
    if (filtre === "image") return TEMOIGNAGES.filter((t) => t.type === "screenshot");
    if (filtre === "citation") return TEMOIGNAGES.filter((t) => t.type === "quote");
    return TEMOIGNAGES;
  }, [filtre]);

  const compte = (cle: TemoignageFiltre) => {
    if (cle === "tout") return TEMOIGNAGES.length;
    if (cle === "audio") return TEMOIGNAGES.filter((t) => t.type === "audio").length;
    if (cle === "video") return TEMOIGNAGES.filter((t) => t.type === "video").length;
    if (cle === "image") return TEMOIGNAGES.filter((t) => t.type === "screenshot").length;
    if (cle === "citation") return TEMOIGNAGES.filter((t) => t.type === "quote").length;
    return 0;
  };

  // « Voir plus » se démonte au clic : sans cible de repli, le focus clavier
  // retomberait sur <body>.
  useEffect(() => {
    if (showAll) firstNewCardRef.current?.focus();
  }, [showAll]);

  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_COUNT);

  const openLightbox = (media: TemoignageMedia, opener: HTMLElement) => {
    openerRef.current = opener;
    setLightbox(media);
  };

  const closeLightbox = () => {
    setLightbox(null);
    openerRef.current?.focus();
  };

  return (
    <section className="relative w-full overflow-hidden bg-msk-sun-100 py-24 md:py-32">
      {/* Tiers droit de l'en-tête (titre calé à gauche). Ancré en px depuis le
          haut : la hauteur de la section varie avec « Voir plus ». */}
      <LottieMark
        src="/Topictalk_icon.json"
        className="pointer-events-none absolute right-[6%] top-44 hidden w-40 rotate-3 lg:block"
      />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/* Badge en pop, titre en plongeon, texte en montée. */}
        <Reveal effect="pop" as="span">
          <Eyebrow className="bg-white text-msk-sun-800 shadow-sm">
            Paroles de parents
          </Eyebrow>
        </Reveal>
        <Reveal effect="drop" delay={0.08}>
          <h2 className="mt-5 max-w-3xl font-display text-[2rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-4xl md:text-5xl">
            Ce que les familles <span className="text-msk-coral-700">racontent</span>
          </h2>
        </Reveal>
        <FadeUp delay={0.16}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-msk-night-800 md:text-lg">
            Des mots, des voix et des messages de parents, tels qu&apos;ils nous arrivent.
          </p>
        </FadeUp>

        {/* Filtres : farandole de pops — chaque pilule gonfle à son tour. */}
        <div
          role="group"
          aria-label="Filtrer les témoignages"
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {FILTRES.map((f, indexFiltre) => {
            const actif = filtre === f.cle;
              return (
                <Reveal
                  key={f.cle}
                  as="span"
                  effect="pop"
                  delay={0.05 * indexFiltre}
                >
                <button
                  type="button"
                  aria-pressed={actif}
                  onClick={() => {
                    setFiltre(f.cle);
                    setShowAll(false);
                  }}
                  className={cn(
                    "relative inline-flex h-10 items-center gap-2 rounded-full px-4 font-display text-[0.7rem] font-semibold uppercase tracking-[0.13em] transition-colors focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300",
                    actif ? "text-white" : "text-msk-night-900 hover:text-msk-coral-700",
                  )}
                >
                  {actif ? (
                    <motion.span
                      layoutId="temoignages-filtre-actif"
                      aria-hidden
                      transition={SPRING}
                      className="absolute inset-0 rounded-full bg-msk-night-900 shadow-lg shadow-msk-night-900/30"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full border-2 border-msk-cream-300 bg-white"
                    />
                  )}
                  {/* Espace explicite : sans lui le nom accessible du bouton
                      concatène les deux spans — « Tout21 ». */}
                  <span className="relative">{f.label}</span>{" "}
                  <span
                    className={cn(
                      "relative rounded-full px-1.5 py-0.5 text-[0.65rem]",
                      actif
                        ? "bg-msk-sun-300 text-msk-night-900"
                        : "bg-msk-cream-100 text-msk-night-700",
                    )}
                  >
                    {compte(f.cle)}
                  </span>
                </button>
                </Reveal>
              );
            })}
          </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, index) => (
            <li
              key={`${filtre}-${t.id}`}
              ref={index === VISIBLE_COUNT ? firstNewCardRef : undefined}
              tabIndex={index === VISIBLE_COUNT ? -1 : undefined}
              className="flex"
            >
              {/* Deux mouvements selon la matière : les cartes de texte (citations,
                  audio) gonflent en pop, les polaroïds photo (vidéo, capture) se
                  collent en tampon. Le delay fait la farandole par rangée. */}
              <Reveal
                effect={t.type === "quote" || t.type === "audio" ? "pop" : "stamp"}
                delay={0.06 * (index % 3)}
                className="flex h-full w-full"
              >
                {t.type === "quote" && <QuoteCard item={t} index={index} />}
                {t.type === "audio" && <AudioCard item={t} index={index} />}
                {t.type === "video" && <VideoCard item={t} index={index} onOpen={openLightbox} />}
                {t.type === "screenshot" && (
                  <ScreenshotCard item={t} index={index} onOpen={openLightbox} />
                )}
              </Reveal>
            </li>
          ))}
        </ul>

        <FadeUp className="mt-16">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!showAll && filtered.length > VISIBLE_COUNT && (
              <MorphButton
                onClick={() => setShowAll(true)}
                className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-msk-night-900"
                fillClassName="border-2 border-msk-cream-200 bg-white shadow-sm"
              >
                Voir plus
              </MorphButton>
            )}
            <MorphButton
              href="/contact"
              className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
              fillClassName="bg-msk-coral-600 shadow-lg shadow-msk-coral-600/25"
            >
              Témoigner
            </MorphButton>
          </div>
          <p className="mt-6 text-center text-sm text-msk-night-700">
            Chaque témoignage est publié avec l&apos;accord de la famille.
          </p>
        </FadeUp>
      </div>

      <TemoignageLightbox item={lightbox} onClose={closeLightbox} />
    </section>
  );
};
