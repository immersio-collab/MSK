"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { Reveal } from "@/components/motion/Reveal";
import { TROUBLES, type TroubleItem } from "@/lib/data/troubles";
import { cn } from "@/lib/utils";
import { SPRING, useTilt } from "@/lib/motion";
import { TroubleDetailDialog } from "./TroubleDetailDialog";
import { ICONS, LOOKS } from "./trouble-look";
import { Eyebrow } from "@/components/common/Eyebrow";

type CardState = "rest" | "hover" | "dimmed";

/** Vrai seulement pour un focus clavier — un clic souris ne soulève pas la carte. */
function isFocusVisible(el: HTMLElement) {
  try {
    return el.matches(":focus-visible");
  } catch {
    return true;
  }
}

// `custom` porte l'inclinaison propre à chaque carte : `rest` et `dimmed` y
// reviennent, `hover` redresse et soulève.
const CARD_VARIANTS: Variants = {
  rest: (tilt: number) => ({ rotate: tilt, y: 0, scale: 1, opacity: 1 }),
  hover: { rotate: 0, y: -8, scale: 1.03, opacity: 1 },
  dimmed: (tilt: number) => ({ rotate: tilt, y: 0, scale: 0.97, opacity: 0.5 }),
};

// La pastille frétille au survol (images-clés, donc tween et pas ressort).
const DISC_VARIANTS: Variants = {
  rest: { rotate: -6, transition: SPRING },
  hover: { rotate: [-6, 10, -8, 4, 0], transition: { duration: 0.6, ease: "easeInOut" } },
  dimmed: { rotate: -6, transition: SPRING },
};

const ARROW_VARIANTS: Variants = {
  rest: { x: 0 },
  hover: { x: 4 },
  dimmed: { x: 0 },
};

interface TroubleStickerCardProps {
  item: TroubleItem;
  index: number;
  state: CardState;
  onOpen: (slug: string) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

function TroubleStickerCard({ item, index, state, onOpen, buttonRef }: TroubleStickerCardProps) {
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const tilt = useTilt(index);
  // Distinct de useTilt (qui attend le montage pour éviter un mismatch SSR) :
  // ici seul le frétillement de la pastille est coupé, pas un transform rendu.
  const reduceMotion = useReducedMotion();
  const look = LOOKS[item.tone];
  const Icon = ICONS[item.icon];
  const animateTo: CardState = state === "dimmed" ? "dimmed" : keyboardFocus ? "hover" : "rest";

  return (
    // Wrapper neutre : c'est LUI qui porte l'entrée (pop en farandole par
    // rangée de trois). L'article en dessous garde inclinaison, survol et
    // expansion vers la fiche — jamais deux animations sur le même élément.
    // Reveal plutôt que gsap : framer pose l'état caché dès le rendu serveur,
    // là où gsap laissait les stickers visibles jusqu'au chargement du JS —
    // le « flash » contenu-puis-animation que la cliente a vu.
    <Reveal effect="pop" delay={(index % 3) * 0.08} className="flex">
      <motion.article
        layoutId={`trouble-${item.slug}`}
        custom={tilt}
        variants={CARD_VARIANTS}
        initial={false}
        animate={animateTo}
        whileHover={state === "dimmed" ? undefined : "hover"}
        whileTap={state === "dimmed" ? undefined : { scale: 0.98 }}
        transition={SPRING}
        // Rayon en style inline pour que framer-motion corrige les coins
        // pendant le changement d'échelle vers la fiche.
        style={{ borderRadius: 28 }}
        className={cn(
          "group relative flex min-h-[18rem] w-full flex-col p-6 text-left shadow-xl shadow-msk-night-900/10",
          "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-msk-blue-50",
          look.card,
          look.ring,
        )}
      >
        <motion.span
          aria-hidden
          variants={reduceMotion ? undefined : DISC_VARIANTS}
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md",
            look.icon,
          )}
        >
          <Icon className="h-8 w-8" strokeWidth={2.2} />
        </motion.span>

        <h3 className={cn("mt-5 font-display text-2xl font-bold uppercase leading-[0.95]", look.title)}>
          {item.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed", look.body)}>{item.short}</p>

        {/* Onglet visuel ; le vrai contrôle est le bouton étiré ci-dessous. */}
        <span aria-hidden className="mt-auto pt-5">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.16em] shadow-sm",
              look.label,
            )}
          >
            En savoir plus
            <motion.span variants={ARROW_VARIANTS} className="inline-flex">
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </motion.span>
          </span>
        </span>

        {/* Bouton étiré sur toute la carte : un seul contrôle, un libellé
            explicite, et le titre reste un vrai <h3> pour les lecteurs d'écran. */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => onOpen(item.slug)}
          onFocus={(event) => setKeyboardFocus(isFocusVisible(event.currentTarget))}
          onBlur={() => setKeyboardFocus(false)}
          aria-haspopup="dialog"
          aria-label={`En savoir plus sur ${item.title}`}
          className="absolute inset-0 cursor-pointer rounded-[1.75rem] focus-visible:outline-hidden"
        />
      </motion.article>
    </Reveal>
  );
}

export function TroublesGridSection() {
  const root = useRef<HTMLElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const previousSlug = useRef<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const open = useCallback((slug: string) => setActiveSlug(slug), []);
  const close = useCallback(() => setActiveSlug(null), []);

  // À la fermeture, le focus revient sur la carte qui a ouvert la fiche.
  useEffect(() => {
    if (!activeSlug && previousSlug.current) {
      const button = buttons.current.get(previousSlug.current);
      requestAnimationFrame(() => button?.focus({ preventScroll: true }));
    }
    previousSlug.current = activeSlug;
  }, [activeSlug]);


  const activeIndex = TROUBLES.findIndex((t) => t.slug === activeSlug);
  const activeItem = activeIndex >= 0 ? TROUBLES[activeIndex] : null;

  // blue-50 : la teinte signature de la page (le ciel du hero et du quiz est
  // bleu — le canard jaune du hero interdit le jaune ici). Les huit stickers
  // colorés portent le reste.
  return (
    <section ref={root} id="troubles" className="relative overflow-hidden bg-msk-blue-50 py-24 md:py-28">
      {/* Nuages : dérive latérale continue, vitesses et phases distinctes. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* blue-200, pas white : blanc sur blue-50 était quasi invisible. */}
        <CloudDrift
          motion="float"
          shape="a"
          speed={52}
          phase={0.2}
          className="absolute left-0 top-[5%] w-40 text-msk-blue-200 md:w-56"
        />
        <CloudDrift
          motion="float"
          shape="b"
          speed={40}
          phase={0.65}
          className="absolute left-0 top-[24%] w-36 text-msk-blue-200 md:w-52"
        />

        {/* Marge latérale hors du max-w-5xl — n'existe qu'en très large. */}
        <Reveal effect="pop" className="absolute right-[2%] top-[40%] hidden xl:block">
          <img src="/Ballon.svg" alt="" loading="lazy" className="w-32 rotate-3" />
        </Reveal>
      </div>

      <div className="container relative mx-auto max-w-5xl px-4">
        {/* Badge en pop, titre en plongeon, texte en montée. */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal effect="pop" as="span">
            <Eyebrow className="bg-white text-msk-blue-700 shadow-sm">
              6 situations · 1 approche
            </Eyebrow>
          </Reveal>
          <Reveal effect="drop" delay={0.08}>
            <h2 className="mt-5 font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-5xl md:text-6xl">
              Les situations que nous <span className="text-msk-coral-700">accueillons</span>
            </h2>
          </Reveal>
          <Reveal effect="rise" delay={0.16}>
            <p className="mt-5 text-base text-msk-night-700 md:text-lg">
              Cliquez sur une carte pour comprendre la situation et découvrir comment MSK
              l&apos;accompagne.
            </p>
          </Reveal>
        </div>

        {/* Trois colonnes, pas quatre : six cartes remplissent exactement deux
            rangées. En quatre colonnes la seconde rangée n'en portait que deux
            et la section paraissait amputée. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {TROUBLES.map((item, index) => (
            <TroubleStickerCard
              key={item.slug}
              item={item}
              index={index}
              state={activeSlug && activeSlug !== item.slug ? "dimmed" : "rest"}
              onOpen={open}
              buttonRef={(el) => {
                if (el) buttons.current.set(item.slug, el);
                else buttons.current.delete(item.slug);
              }}
            />
          ))}
        </div>
      </div>

      <TroubleDetailDialog
        item={activeItem}
        look={activeItem ? LOOKS[activeItem.tone] : null}
        Icon={activeItem ? ICONS[activeItem.icon] : null}
        onClose={close}
      />
    </section>
  );
}
