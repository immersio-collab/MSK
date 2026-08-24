"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Mic, Pause, Play } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { cn } from "@/lib/utils";
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

const TEMOIGNAGES: Temoignage[] = [
  {
    id: "salma",
    type: "quote",
    tone: "coral",
    tag: "Primaire",
    quote: "En 6 mois, mon fils a retrouvé le sourire et l'envie d'apprendre.",
    author: "Salma B.",
    role: "maman de Ryan (7 ans, TDAH)",
  },
  {
    id: "audio-imane",
    type: "audio",
    tag: "Témoignage audio",
    quote: "« Elle nous raconte sa journée, ça n'était jamais arrivé. »",
    duration: "0:47",
    src: null,
    author: "Imane R.",
    role: "maman de Yassine (5 ans)",
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
  {
    id: "video-sara",
    type: "video",
    tag: "Témoignage vidéo",
    title: "La rentrée de Sara",
    poster: "/primaire.jpg",
    duration: "1:12",
    src: null,
    author: "Mehdi K.",
    role: "papa de Sara (6 ans)",
  },
  {
    id: "capture-rayan",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message:
      "Merci pour tout ce que vous faites. Rayan a lu sa première phrase hier soir, on a pleuré de joie.",
    time: "21:34",
    image: null,
    author: "maman de Rayan (8 ans)",
    role: "",
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
    id: "video-neurogym",
    type: "video",
    tag: "Témoignage vidéo",
    title: "Une séance au neuro-gym",
    poster: "/neuro-gym.jpg",
    duration: "0:58",
    src: null,
    author: "Ahmed B.",
    role: "papa d'Omar (5 ans)",
  },
  {
    id: "sofia",
    type: "quote",
    tone: "blue",
    tag: "Réadaptation",
    quote: "Le bilan a mis des mots sur ce que l'on vivait. On sait enfin comment l'aider.",
    author: "Sofia L.",
    role: "maman de Ghali (6 ans, dyspraxie)",
  },
  {
    id: "capture-selma",
    type: "screenshot",
    tag: "Reçu sur WhatsApp",
    message: "Il nous a demandé quand est-ce qu'on retourne à l'école… un dimanche matin !",
    time: "09:12",
    image: null,
    author: "papa de Selma (4 ans)",
    role: "",
  },
];

const VISIBLE_COUNT = 6;

/** Inclinaison au repos, alternée — même rythme que les stickers des troubles. */
const TILTS = [-2.5, 1.5, -1.5, 2.5, 2, -1.5, 2.5, -2];

const SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;

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
    card: "bg-msk-sun-400",
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

function useTilt(index: number) {
  // Posé après montage : `useReducedMotion` changerait de valeur dès
  // l'hydratation et créerait un mismatch serveur/client sur le transform.
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduceMotion ? 0 : (TILTS[index % TILTS.length] ?? 0);
}

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
      <TemoignageChatMock message={item.message} time={item.time} />
      <span className="mt-2.5 block font-display text-sm font-semibold text-msk-night-800">
        {item.tag}
      </span>
      <span className="mt-0.5 block text-xs text-msk-night-700">{item.author}</span>
    </motion.button>
  );
}

export const AccueilTemoignages = () => {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<TemoignageMedia | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const firstNewCardRef = useRef<HTMLLIElement>(null);

  // « Voir plus » se démonte au clic : sans cible de repli, le focus clavier
  // retomberait sur <body>.
  useEffect(() => {
    if (showAll) firstNewCardRef.current?.focus();
  }, [showAll]);

  const visible = showAll ? TEMOIGNAGES : TEMOIGNAGES.slice(0, VISIBLE_COUNT);

  const openLightbox = (media: TemoignageMedia, opener: HTMLElement) => {
    openerRef.current = opener;
    setLightbox(media);
  };

  const closeLightbox = () => {
    setLightbox(null);
    openerRef.current?.focus();
  };

  return (
    <section className="relative w-full overflow-hidden bg-msk-cream-50 py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[14%] h-[64%] bg-msk-sun-100"
        style={{ clipPath: "polygon(0 7%, 100% 0, 100% 82%, 0 95%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <FadeUp>
          <span className="inline-block rounded-full bg-msk-coral-100 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-coral-700">
            Paroles de parents
          </span>
          <h2 className="mt-5 max-w-3xl font-display text-[2rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-4xl md:text-5xl">
            Ce que les familles <span className="text-msk-coral-700">racontent</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-msk-night-800 md:text-lg">
            Des mots, des voix et des messages de parents, tels qu'ils nous arrivent.
          </p>
        </FadeUp>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, index) => (
            <li
              key={t.id}
              ref={index === VISIBLE_COUNT ? firstNewCardRef : undefined}
              tabIndex={index === VISIBLE_COUNT ? -1 : undefined}
              className="flex"
            >
              <FadeUp delay={0.1 * (index % 3)} className="flex h-full w-full">
                {t.type === "quote" && <QuoteCard item={t} index={index} />}
                {t.type === "audio" && <AudioCard item={t} index={index} />}
                {t.type === "video" && <VideoCard item={t} index={index} onOpen={openLightbox} />}
                {t.type === "screenshot" && (
                  <ScreenshotCard item={t} index={index} onOpen={openLightbox} />
                )}
              </FadeUp>
            </li>
          ))}
        </ul>

        <FadeUp className="mt-16">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!showAll && TEMOIGNAGES.length > VISIBLE_COUNT && (
              <MorphButton
                onClick={() => setShowAll(true)}
                className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-msk-night-900"
                fillClassName="border-2 border-msk-cream-200 bg-white shadow-sm group-hover:bg-msk-cream-100"
              >
                Voir plus de témoignages
              </MorphButton>
            )}
            <MorphButton
              href="/contact"
              className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
              fillClassName="bg-msk-coral-600 shadow-lg shadow-msk-coral-600/25 group-hover:bg-msk-coral-700"
            >
              Partager votre histoire
            </MorphButton>
          </div>
          <p className="mt-6 text-center text-sm text-msk-night-700">
            Chaque témoignage est publié avec l'accord de la famille.
          </p>
        </FadeUp>
      </div>

      <TemoignageLightbox item={lightbox} onClose={closeLightbox} />
    </section>
  );
};
