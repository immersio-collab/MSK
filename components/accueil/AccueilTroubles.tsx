"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";

import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { ICONS } from "@/components/troubles/trouble-look";
import { TROUBLES } from "@/lib/data/troubles";
import { Eyebrow } from "@/components/common/Eyebrow";

/**
 * Les troubles accompagnés, distribués comme un jeu de cartes.
 *
 * La section tient dans UN écran (`h-[100svh]`) : en-tête, éventail et CTA sont
 * les trois lignes d'une colonne flex, l'éventail prenant la place restante.
 * Tout est framer-motion — l'ancienne piste gsap épinglée de 400vh a été retirée.
 *
 * La donne part d'une PILE VISIBLE, jamais d'une opacité nulle : si le module
 * n'exécute jamais son animation, le lecteur voit un paquet de cartes posé au
 * centre, pas une section vide (`.agents/rules/scroll-page-composition.md` —
 * « ne jamais garer l'état de repos hors de vue »).
 *
 * Les textes et les icônes viennent de `lib/data/troubles.ts`, la même source
 * que `/notre-centre/troubles-accompagnes`, pour que les deux ne divergent pas.
 */

/** Degrés entre deux cartes voisines de l'éventail. */
const STEP_DEG = 4;

/** Position de la carte `i` dans l'éventail, symétrique autour de zéro. */
const midIndex = (TROUBLES.length - 1) / 2;
const offsetAt = (i: number) => i - midIndex;

/**
 * Inclinaison de la carte `i` dans la pile d'avant-donne. Déterministe (pas de
 * Math.random) pour que le rendu serveur et le rendu client coïncident.
 */
const stackRotAt = (i: number) => (((i * 37) % 7) - 3) * 0.9;

const TROUBLES_HREF = "/notre-centre/troubles-accompagnes#troubles";

/**
 * Un fond par carte, les huit distincts.
 *
 * Volontairement PAS `LOOKS[trouble.tone]` : cette table n'a que quatre tons
 * pour huit troubles, donc l'éventail répétait sa palette à mi-parcours et les
 * cartes de droite ressemblaient à une copie de celles de gauche. Les
 * contrastes de chaque paire ont été audités sur son fond.
 */
const CARD_TONES = [
  { card: "bg-msk-coral-600", title: "text-white", body: "text-msk-coral-50", icon: "text-msk-coral-600" },
  { card: "bg-msk-sun-400", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-sun-600" },
  { card: "bg-msk-blue-500", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-blue-600" },
  { card: "bg-msk-night-800", title: "text-msk-sun-300", body: "text-msk-cream-200", icon: "text-msk-night-800" },
  { card: "bg-msk-coral-400", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-coral-600" },
  { card: "bg-msk-sun-600", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-sun-700" },
  { card: "bg-msk-blue-700", title: "text-white", body: "text-msk-blue-50", icon: "text-msk-blue-700" },
  { card: "bg-msk-coral-800", title: "text-white", body: "text-msk-coral-50", icon: "text-msk-coral-800" },
];

const Heading = () => (
  <>
    <Eyebrow className="bg-msk-blue-100 text-msk-blue-800">
      À qui s&apos;adresse MSK ?
    </Eyebrow>
    <h2 className="mx-auto mt-4 max-w-[20ch] font-display text-[1.75rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-4xl lg:text-5xl">
      Chaque âge, chaque profil a <span className="text-msk-coral-700">sa place</span>
    </h2>
    <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-msk-night-800 md:text-base">
      Les troubles que nous accompagnons au quotidien.
    </p>
  </>
);

/**
 * La face de la carte, partagée par l'éventail et la rangée mobile pour que les
 * deux ne divergent pas : titre en haut, icône sur pastille blanche au centre,
 * description en pied.
 */
const TroubleFace = ({
  trouble,
  index,
  compact,
}: {
  trouble: (typeof TROUBLES)[number];
  index: number;
  compact?: boolean;
}) => {
  const tone = CARD_TONES[index % CARD_TONES.length];
  const Icon = ICONS[trouble.icon];

  return (
    <>
      <h3
        className={`font-display font-bold uppercase leading-tight ${tone.title} ${
          compact ? "text-base" : "text-[0.8rem] xl:text-sm"
        }`}
      >
        {trouble.title}
      </h3>

      <span
        className={`flex shrink-0 items-center justify-center self-center rounded-full bg-white ${
          compact ? "h-12 w-12" : "h-10 w-10 xl:h-11 xl:w-11"
        }`}
      >
        <Icon
          aria-hidden
          className={`${compact ? "h-6 w-6" : "h-5 w-5"} ${tone.icon}`}
          strokeWidth={2.2}
        />
      </span>

      <p
        className={`leading-snug ${tone.body} ${
          compact ? "text-sm" : "text-[0.68rem] xl:text-[0.72rem]"
        }`}
      >
        {trouble.short}
      </p>
    </>
  );
};

const Cta = () => (
  <MorphButton
    href={TROUBLES_HREF}
    className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
    fillClassName="bg-msk-night-950 shadow-lg shadow-msk-night-950/25 group-hover:bg-msk-night-800"
    maxDiameter="18rem"
  >
    Voir tous les troubles accompagnés
  </MorphButton>
);

/** Géométrie de l'éventail, dérivée de la place réellement disponible. */
interface FanGeometry {
  cardW: number;
  step: number;
}

const DEFAULT_GEOMETRY: FanGeometry = { cardW: 196, step: 152 };

/**
 * Ressort partagé par la donne et le survol. Un ressort plutôt qu'une durée :
 * il encaisse l'interruption (survol pendant la donne) sans à-coup, et rend le
 * rebond de carte que la maquette validait.
 */
const SPRING = { type: "spring", stiffness: 240, damping: 24 } as const;

/** Délai avant que les huit cartes ne partent ensemble. */
const DEAL_DELAY = 0.45;

export const AccueilTroubles = () => {
  const fanRef = useRef<HTMLUListElement>(null);
  const inView = useInView(fanRef, { once: true, amount: 0.35 });
  const [geometry, setGeometry] = useState<FanGeometry>(DEFAULT_GEOMETRY);
  const [reduceMotion, setReduceMotion] = useState(false);

  // La carte survolée doit passer AU-DESSUS de ses voisines et le rester
  // pendant sa redescente en ressort : remettre l'index à `null` dès la sortie
  // du survol la ferait repasser sous les autres en pleine animation. Le délai
  // de 500ms couvre le temps que met le ressort (stiffness 240 / damping 24) à
  // se stabiliser.
  const [topIndex, setTopIndex] = useState<number | null>(null);
  const resetTopTimeout = useRef<ReturnType<typeof setTimeout>>();

  const liftCard = (index: number) => {
    clearTimeout(resetTopTimeout.current);
    setTopIndex(index);
  };
  const scheduleUnlift = () => {
    resetTopTimeout.current = setTimeout(() => setTopIndex(null), 500);
  };

  // Vrai une fois la donne jouée, et le reste pour toujours (comme `inView`,
  // qui ne repasse jamais à `false`). Sert à n'appliquer le délai de la donne
  // qu'à CETTE transition-là : sans ce garde-fou, chaque `animate` reprendrait
  // le même objet `transition` — delay compris — et un simple survol après la
  // donne referait attendre la carte avant de redescendre.
  const dealt = inView || reduceMotion;
  const hasDealtRef = useRef(false);
  useEffect(() => {
    if (dealt) hasDealtRef.current = true;
  }, [dealt]);

  // Posé après montage : `useReducedMotion` renverrait false au rendu serveur
  // puis true à l'hydratation, et le transform des cartes ne coïnciderait pas.
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => () => clearTimeout(resetTopTimeout.current), []);

  // `useLayoutEffect`, pas `useEffect` : la mesure doit être résolue AVANT que
  // le premier paint puisse déclencher `useInView`. Un `useEffect` mesure de
  // façon asynchrone, sur son propre calendrier — rien ne garantissait qu'il
  // ait déjà tourné au moment où la donne démarre, et la moitié des cartes
  // héritait alors de `DEFAULT_GEOMETRY` au lieu de la place réellement
  // disponible. `useLayoutEffect` s'exécute de façon synchrone, avant peinture
  // et donc avant tout callback d'IntersectionObserver, qui est intrinsèquement
  // asynchrone.
  useLayoutEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;

    const measure = () => {
      const { width, height } = fan.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      // Les 96px retirés à la hauteur sont la marge que réclament la rotation
      // de l'éventail (sa boîte est plus haute que la carte) et le soulèvement
      // au survol : sans eux la carte du bord déborde sous le CTA.
      const cardW = Math.max(
        140,
        Math.min(width * 0.145, 208, (height - 96) * 0.72),
      );
      // Le second terme est la garantie que l'éventail ne déborde jamais :
      // au-delà, l'écartement est plafonné par la largeur disponible.
      const step = Math.min(
        cardW * 0.78,
        (width - cardW) / (TROUBLES.length - 1),
      );
      setGeometry({ cardW, step });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(fan);
    return () => observer.disconnect();
  }, []);

  const { cardW, step } = geometry;
  const dipK = cardW * 0.014;

  return (
    <section className="relative w-full overflow-hidden bg-msk-cream-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[30%] h-[52%] bg-msk-blue-100"
        style={{ clipPath: "polygon(0 9%, 100% 0, 100% 84%, 0 96%)" }}
      />

      <div className="relative hidden h-[100svh] flex-col px-6 pb-10 pt-[6.5rem] lg:flex lg:px-16">
        <FadeUp className="shrink-0 text-center">
          <Heading />
        </FadeUp>

        {/* L'éventail prend toute la place restante ; `min-h-0` l'autorise à
            rétrécir au lieu de pousser le CTA hors de l'écran. Un simple `<ul>` :
            chaque carte calcule son `animate` d'après `dealt` — la propagation de
            variants via un `motion.ul` ne déclenchait jamais la donne au scroll. */}
        <ul ref={fanRef} className="relative mt-6 min-h-0 flex-1">
          {TROUBLES.map((trouble, index) => {
            const offset = offsetAt(index);
            const tx = offset * step;
            const ty = offset * offset * dipK;
            const rot = offset * STEP_DEG;
            const stackRot = reduceMotion ? rot : stackRotAt(index);
            const isLifted = topIndex === index;

            const target = !dealt
              ? { x: 0, y: 0, rotate: stackRot, scale: 0.92 }
              : isLifted && !reduceMotion
                ? { x: tx, y: ty - 22, rotate: 0, scale: 1.1 }
                : { x: tx, y: ty, rotate: rot, scale: 1 };

            // Le délai n'a de sens que pour LA donne elle-même — jamais rejoué
            // une fois `hasDealtRef` posé (voir sa déclaration). Identique pour
            // les huit cartes : elles partent toutes ensemble, pas en cascade.
            const transition = hasDealtRef.current ? SPRING : { ...SPRING, delay: DEAL_DELAY };

            return (
              // Un seul élément anime ET se positionne : `inset-0` + `m-auto`
              // centre la carte via `margin`, pas via `transform`, pour que le
              // SEUL transform de l'élément soit celui de framer-motion
              // (x/y/rotate/scale).
              <motion.li
                key={trouble.slug}
                initial={{ x: 0, y: 0, rotate: stackRot, scale: 0.92 }}
                animate={target}
                transition={transition}
                onHoverStart={() => dealt && !reduceMotion && liftCard(index)}
                onHoverEnd={scheduleUnlift}
                style={
                  {
                    width: cardW,
                    zIndex: topIndex === index ? TROUBLES.length + 1 : index + 1,
                  } as CSSProperties
                }
                className={`absolute inset-0 m-auto flex aspect-[0.72] flex-col justify-between rounded-[1rem] p-3.5 shadow-lg shadow-msk-night-900/15 ${
                  CARD_TONES[index % CARD_TONES.length].card
                }`}
              >
                <TroubleFace trouble={trouble} index={index} />
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-6 flex shrink-0 justify-center">
          <Cta />
        </div>
      </div>

      {/* Huit cartes en éventail sont illisibles sur 375px, et une grille
          empilée déborderait de l'écran — ce que cette section s'interdit. */}
      <div className="relative flex h-[100svh] flex-col pb-8 pt-[6.5rem] lg:hidden">
        <FadeUp className="shrink-0 px-6 text-center sm:px-10">
          <Heading />
        </FadeUp>

        <div className="mt-6 flex min-h-0 flex-1 items-center">
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:px-10">
            {TROUBLES.map((trouble, index) => (
              <li key={trouble.slug} className="snap-center">
                <FadeUp
                  delay={0.06 * index}
                  className={`flex aspect-[0.72] w-[62vw] max-w-[240px] flex-col justify-between rounded-[1rem] p-5 shadow-lg shadow-msk-night-900/15 ${
                    CARD_TONES[index % CARD_TONES.length].card
                  }`}
                >
                  <TroubleFace trouble={trouble} index={index} compact />
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex shrink-0 justify-center px-6">
          <Cta />
        </div>
      </div>
    </section>
  );
};
