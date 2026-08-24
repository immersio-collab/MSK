"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Témoignages « médias » de la home : la carte les montre en vignette, la
 * lightbox les agrandit. `src`/`image` restent `null` tant que la cliente n'a
 * pas fourni les fichiers (les mettre dans public/temoignages/) — la lightbox
 * affiche alors le poster ou la maquette de conversation en grand.
 */
export type TemoignageMedia =
  | {
      id: string;
      type: "video";
      title: string;
      poster: string;
      duration: string;
      src: string | null;
      author: string;
      role: string;
    }
  | {
      id: string;
      type: "screenshot";
      message: string;
      time: string;
      image: string | null;
      author: string;
      role: string;
    };

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;

/**
 * Fausse conversation WhatsApp rendue en HTML tant qu'aucune vraie capture
 * n'est fournie. Tout en `<span>` : la carte de la section l'insère dans un
 * `<button>`, dont le modèle de contenu n'accepte pas de `<div>`.
 */
export function TemoignageChatMock({
  message,
  time,
  large = false,
}: {
  message: string;
  time: string;
  large?: boolean;
}) {
  return (
    <span className={cn("block rounded-[12px] bg-msk-cream-100 text-left", large ? "p-4" : "p-3")}>
      <span className="flex items-center gap-2 border-b border-msk-cream-200 pb-2">
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-msk-coral-100 font-display font-semibold text-msk-coral-700",
            large ? "h-8 w-8 text-[0.7rem]" : "h-6 w-6 text-[0.55rem]",
          )}
        >
          MSK
        </span>
        <span className={cn("font-display font-semibold text-msk-night-900", large ? "text-sm" : "text-xs")}>
          École MSK
        </span>
        <MessageCircle
          aria-hidden
          className={cn("ml-auto text-msk-night-700", large ? "h-5 w-5" : "h-4 w-4")}
          strokeWidth={2.2}
        />
      </span>
      <span
        className={cn(
          "mt-2 block rounded-[10px_10px_10px_2px] bg-white leading-relaxed text-msk-night-800",
          large ? "p-4 text-base" : "p-2.5 text-xs",
        )}
      >
        {message}
      </span>
      <span className={cn("mt-1 block text-right text-msk-night-700", large ? "text-xs" : "text-[0.6rem]")}>
        {time}
      </span>
    </span>
  );
}

interface TemoignageLightboxProps {
  item: TemoignageMedia | null;
  onClose: () => void;
}

export function TemoignageLightbox({ item, onClose }: TemoignageLightboxProps) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Portal vers <body> : rendu client uniquement.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!item) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], video, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      // Un clic sur une zone non interactive du dialogue met le focus sur
      // <body> : sans cette garde, Tab s'échapperait vers la page masquée.
      if (!(active instanceof HTMLElement) || !dialogRef.current.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        // `key` obligatoire : sans lui AnimatePresence ne retire jamais le
        // nœud à la fermeture et l'overlay invisible bloque toute la page.
        <motion.div
          key={item.id}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-msk-night-950/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Témoignage de ${item.author}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={SPRING}
            className={cn("relative w-full", item.type === "video" ? "max-w-3xl" : "max-w-md")}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute -right-2 -top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-msk-night-900 shadow-lg transition-colors hover:bg-msk-cream-100 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300 sm:-right-4 sm:-top-4"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>

            {item.type === "video" &&
              (item.src ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[76vh] w-full rounded-[1.5rem] bg-msk-night-900 object-contain"
                />
              ) : (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-msk-cream-200">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 48rem, 92vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-5 flex justify-center">
                    <span className="rounded-full bg-white/95 px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-msk-night-900 shadow-md">
                      Vidéo bientôt disponible
                    </span>
                  </span>
                </div>
              ))}

            {item.type === "screenshot" &&
              (item.image ? (
                <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] bg-msk-cream-200">
                  <Image
                    src={item.image}
                    alt={`Message envoyé par ${item.author}`}
                    fill
                    sizes="(min-width: 640px) 28rem, 92vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="rounded-[24px_10px_28px_12px] bg-white p-3 pb-4 shadow-2xl">
                  <TemoignageChatMock message={item.message} time={item.time} large />
                </div>
              ))}

            <p className="mt-4 text-center text-sm text-msk-cream-100">
              {item.type === "video" && (
                <span className="block font-display text-base font-semibold uppercase tracking-[0.08em]">
                  {item.title}
                </span>
              )}
              <span className="mt-1 block">
                <span className="font-semibold">{item.author}</span>
                {item.role && <span className="text-msk-cream-100/70"> · {item.role}</span>}
              </span>
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
