"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, X, type LucideIcon } from "lucide-react";
import { AssetSlot } from "@/components/common/AssetSlot";
import { MorphButton } from "@/components/motion/MorphButton";
import type { TroubleItem } from "@/lib/data/troubles";
import { cn } from "@/lib/utils";

/**
 * Habillage d'un ton (coral / sun / blue / night) : classes Tailwind complètes,
 * jamais concaténées, pour que chacune soit bien émise dans le CSS. Partagé
 * entre la carte sticker et le bandeau de sa fiche pour qu'ils se répondent.
 */
export interface TroubleLook {
  /** Fond + couleur de texte de base (carte et bandeau de la fiche). */
  card: string;
  /** Couleur du titre posé sur `card`. */
  title: string;
  /** Couleur du texte courant posé sur `card`. */
  body: string;
  /** Couleur de l'icône dans la pastille blanche. */
  icon: string;
  /** Couleur des libellés posés sur blanc (onglet, pill, intertitres). */
  label: string;
  /** Tonalité de l'emplacement visuel (AssetSlot). */
  slot: string;
  /** Anneau de focus clavier de la carte. */
  ring: string;
}

interface TroubleDetailDialogProps {
  item: TroubleItem | null;
  /** Position 1-based dans la liste, pour « 01 / 08 ». */
  position: number;
  total: number;
  look: TroubleLook | null;
  Icon: LucideIcon | null;
  onClose: () => void;
}

/** Ressort partagé avec la carte : l'expansion et la contraction se répondent. */
const SPRING = { type: "spring", stiffness: 260, damping: 28 } as const;

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Fiche détaillée d'un trouble.
 *
 * Partage son `layoutId` avec la carte sticker : framer-motion fait grandir la
 * carte jusqu'au panneau à l'ouverture, et la recontracte à la fermeture
 * (AnimatePresence garde le panneau monté le temps du retour). Le contenu du
 * panneau apparaît ensuite en fondu décalé, pour ne pas être étiré pendant le
 * changement d'échelle.
 *
 * Rendu en portal sur <body> : un ancêtre transformé (wrappers gsap, transition
 * de page) ferait de `fixed` un positionnement relatif à lui.
 */
export function TroubleDetailDialog({
  item,
  position,
  total,
  look,
  Icon,
  onClose,
}: TroubleDetailDialogProps) {
  const [mounted, setMounted] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const open = Boolean(item && look && Icon);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Échap, piège à Tab, focus initial et verrou du scroll — le temps de l'ouverture.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      const focusables = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && look && Icon ? (
        <motion.div
          key={item.slug}
          className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-4"
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-msk-night-950/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            layoutId={`trouble-${item.slug}`}
            transition={SPRING}
            // Rayon en style inline : framer-motion ne corrige l'étirement des
            // coins pendant le changement d'échelle que s'il connaît la valeur.
            style={{ borderRadius: 28 }}
            className="relative z-10 flex max-h-[calc(100dvh-1.5rem)] w-full flex-col overflow-hidden bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:w-[min(44rem,calc(100vw-2rem))]"
          >
            <div className={cn("relative shrink-0 px-6 pb-7 pt-6 md:px-9 md:pb-8 md:pt-8", look.card)}>
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                aria-label="Fermer la fiche"
                className={cn(
                  "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-white/60",
                  look.icon,
                )}
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
                className="flex items-start gap-4 pr-12 md:gap-5"
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md",
                    look.icon,
                  )}
                >
                  <Icon className="h-8 w-8" strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <span
                    className={cn(
                      "inline-block rounded-full bg-white px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
                      look.label,
                    )}
                  >
                    Situation accueillie · {pad(position)} / {pad(total)}
                  </span>
                  <h3
                    id={titleId}
                    className={cn(
                      "mt-3 font-display text-3xl font-bold uppercase leading-[0.95] md:text-4xl",
                      look.title,
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className={cn("mt-2 text-sm md:text-base", look.body)}>{item.subtitle}</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="overflow-y-auto px-6 py-7 md:px-9 md:py-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } } }}
            >
              <motion.section variants={REVEAL}>
                <h4
                  className={cn(
                    "font-display text-xs font-semibold uppercase tracking-[0.18em]",
                    look.label,
                  )}
                >
                  Ce que vit l&apos;enfant
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-msk-night-700">{item.intro}</p>
              </motion.section>

              <motion.section variants={REVEAL} className="mt-7">
                <h4
                  className={cn(
                    "font-display text-xs font-semibold uppercase tracking-[0.18em]",
                    look.label,
                  )}
                >
                  Comment MSK l&apos;accompagne
                </h4>
                <ol className="mt-3 space-y-3">
                  {item.methode.map((step, i) => (
                    <li key={step.verbe} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-msk-sun-300 font-display text-sm font-bold text-msk-coral-700"
                      >
                        {i + 1}
                      </span>
                      <p className="pt-1 text-[15px] leading-relaxed text-msk-night-800">
                        <strong className="font-semibold text-msk-night-900">{step.verbe}</strong>
                        {" — "}
                        {step.texte}
                      </p>
                    </li>
                  ))}
                </ol>
              </motion.section>

              {/* Dernière ligne : le CTA à gauche, le petit visuel décoratif à
                  droite — en flux, donc jamais de chevauchement avec le texte. */}
              <motion.div variants={REVEAL} className="mt-8 flex items-end justify-between gap-4">
                <MorphButton
                  href="/contact"
                  size="sm"
                  className="font-semibold text-white"
                  fillClassName="bg-msk-blue-700 shadow-lg shadow-msk-blue-900/20"
                  maxDiameter="12rem"
                >
                  Prendre rendez-vous
                  <ArrowRight className="h-4 w-4" />
                </MorphButton>

                {/* Emplacement du SVG décoratif de la fiche. Remplacez le slot
                    par votre <img> (même taille : w-28 / md:w-32). */}
                <div aria-hidden className="-mb-1 -mr-1 w-28 shrink-0 rotate-6 md:w-32">
                  <AssetSlot
                    label="SVG"
                    hint={item.visuel}
                    tone={look.slot}
                    className="aspect-square w-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
