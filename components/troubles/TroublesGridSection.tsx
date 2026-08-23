"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { TROUBLES, type TroubleItem } from "@/lib/data/troubles";
import { cn } from "@/lib/utils";
import { TroubleDetailDialog } from "./TroubleDetailDialog";
import { ICONS, LOOKS } from "./trouble-look";

gsap.registerPlugin(ScrollTrigger);

/** Inclinaison au repos de chaque sticker, alternée pour l'effet « collé à la main ». */
const TILTS = [-2.5, 1.5, -1.5, 2.5, 2, -1.5, 2.5, -2];

const SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;

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
  const reduceMotion = useReducedMotion();
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const tilt = reduceMotion ? 0 : (TILTS[index % TILTS.length] ?? 0);
  const look = LOOKS[item.tone];
  const Icon = ICONS[item.icon];
  const animateTo: CardState = state === "dimmed" ? "dimmed" : keyboardFocus ? "hover" : "rest";

  return (
    // Wrapper neutre : c'est LUI que gsap anime à l'entrée. L'article en
    // dessous appartient à framer-motion (inclinaison, survol, expansion vers
    // la fiche) — la règle du projet interdit d'animer un même élément avec
    // les deux bibliothèques.
    <div className="troubles-card flex">
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
          "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-msk-cream-100",
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
    </div>
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

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Un seul ScrollTrigger pour toute la grille, le stagger fait la
      // séquence. `from` + immediateRender:false : l'état de départ n'est
      // écrit qu'au déclenchement — si gsap ne part jamais, les stickers
      // restent simplement visibles au lieu d'être bloqués à opacity 0.
      gsap.from(".troubles-card", {
        y: 56,
        rotate: (i: number) => (i % 2 ? 5 : -5),
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.07,
        immediateRender: false,
        scrollTrigger: { trigger: ".troubles-grid", start: "top 82%" },
      });

      gsap.from(".troubles-heading > *", {
        y: 28,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: ".troubles-heading", start: "top 88%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const activeIndex = TROUBLES.findIndex((t) => t.slug === activeSlug);
  const activeItem = activeIndex >= 0 ? TROUBLES[activeIndex] : null;

  return (
    <section ref={root} id="troubles" className="relative overflow-hidden bg-msk-cream-100 py-24 md:py-28">
      {/* Coin oblique posé derrière les cartes. Il ne touche jamais le bord
          haut de la section : le raccord avec le hero reste donc en crème,
          sans trait horizontal. Même device de clip-path que /la-methode. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[56%] bg-msk-sun-100"
        style={{ clipPath: "polygon(0 14%, 100% 4%, 100% 62%, 0 92%)" }}
      />

      {/* Nuages : dérive latérale continue, vitesses et phases distinctes. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <MethodeCloud
          motion="float"
          shape="a"
          speed={52}
          phase={0.2}
          className="absolute left-0 top-[5%] w-40 text-white md:w-56"
        />
        <MethodeCloud
          motion="float"
          shape="b"
          speed={40}
          phase={0.65}
          className="absolute left-0 top-[24%] w-36 text-white md:w-52"
        />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="troubles-heading mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-coral-700 shadow-sm">
            8 troubles · 1 approche
          </span>
          <h2 className="mt-5 font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-5xl md:text-6xl">
            Les troubles que nous <span className="text-msk-coral-700">accompagnons</span>
          </h2>
          <p className="mt-5 text-base text-msk-night-700 md:text-lg">
            Cliquez sur une carte pour comprendre le trouble et découvrir comment MSK
            l&apos;accompagne.
          </p>
        </div>

        <div className="troubles-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
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
        position={activeIndex + 1}
        total={TROUBLES.length}
        look={activeItem ? LOOKS[activeItem.tone] : null}
        Icon={activeItem ? ICONS[activeItem.icon] : null}
        onClose={close}
      />
    </section>
  );
}
