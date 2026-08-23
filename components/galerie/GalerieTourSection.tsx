"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Maximize2, Play } from "lucide-react";

import { VIRTUAL_TOUR } from "@/lib/data/site-content";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";
import { MorphButton } from "@/components/motion/MorphButton";

/**
 * Tour virtuel Realsee / Matterport — 2e section de la galerie.
 *
 * Le cadre est volontairement NU : aucun texte, sticker ou bouton ne le
 * recouvre, pour ne pas gêner la navigation dans la visite. Le seul élément
 * posé dessus est le bouton de lancement, qui disparaît dès que la visite est
 * ouverte. Le plein écran est proposé SOUS le cadre.
 *
 * La section tient dans la hauteur d'écran : la largeur du cadre est bornée
 * par la hauteur disponible (16:9 × (100dvh − en-tête)), jamais l'inverse.
 *
 * L'iframe n'est montée qu'au clic, jamais au chargement : une visite 360°
 * télécharge plusieurs mégaoctets et lance son propre moteur de rendu.
 *
 * Si `VIRTUAL_TOUR.embedUrl` est encore vide, la section le dit franchement
 * au lieu de monter une iframe vide.
 */
export const GalerieTourSection = () => {
  const reduceMotion = useReducedMotion();
  const cadre = useRef<HTMLDivElement>(null);
  const [lance, setLance] = useState(false);
  const configure = VIRTUAL_TOUR.embedUrl.trim().length > 0;

  const pleinEcran = () => {
    const el = cadre.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <section
      id="tour-virtuel"
      className="relative w-full overflow-hidden bg-msk-cream-100 px-4 py-10 sm:px-8 md:py-12"
    >
      {/* En-tête compact : une pill, un titre, une phrase. */}
      <div className="mx-auto mb-6 max-w-4xl text-center md:mb-7">
        <span className="inline-block rounded-full bg-white px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-coral-700 shadow-sm">
          Tour virtuel · 360°
        </span>
        <GalerieTitreAnime
          au="scroll"
          texte="Visitez le centre depuis votre canapé"
          className="mt-4 font-display text-[1.75rem] font-bold uppercase leading-[0.95] text-msk-night-900 sm:text-3xl md:text-4xl"
        />
        <p className="mt-3 text-base text-msk-night-800 md:text-lg">
          Déplacez-vous de salle en salle, à votre rythme — directement dans la page.
        </p>
      </div>

      {/* Cadre polaroid, légèrement penché au repos ; il se redresse dès que la
          visite démarre, pour que la navigation se fasse bien droite. La largeur
          est bornée par la hauteur d'écran restante (ratio 16:9 conservé). */}
      <motion.div
        ref={cadre}
        initial={false}
        animate={{ rotate: lance || reduceMotion ? 0 : -0.8 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        style={{ width: "min(100%, 72rem, calc((100dvh - 19rem) * 16 / 9))", borderRadius: 28 }}
        className="mx-auto bg-white p-2.5 shadow-2xl shadow-msk-night-900/20 md:p-3"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-msk-cream-200">
          {lance && configure ? (
            <iframe
              src={VIRTUAL_TOUR.embedUrl}
              title={`Visite virtuelle 360° du centre MSK (${VIRTUAL_TOUR.provider})`}
              allowFullScreen
              allow="xr-spatial-tracking; fullscreen; accelerometer; gyroscope"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          ) : (
            <>
              <Image
                src={VIRTUAL_TOUR.poster}
                alt=""
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-msk-night-950/40" />

              {configure ? (
                <button
                  type="button"
                  onClick={() => setLance(true)}
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-4 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-msk-coral-400"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-msk-coral-600 text-white shadow-xl shadow-msk-coral-600/40 transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                    <Play className="ml-1 h-9 w-9 fill-white" aria-hidden />
                  </span>
                  <span className="font-display text-xl font-bold uppercase text-white drop-shadow-md md:text-2xl">
                    Lancer la visite 360°
                  </span>
                </button>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-msk-sun-300 text-msk-coral-700 shadow-lg">
                    <AlertTriangle className="h-7 w-7" aria-hidden />
                  </span>
                  <p className="font-display text-xl font-bold uppercase text-white drop-shadow-md">
                    Lien de visite à renseigner
                  </p>
                  <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-white/90 drop-shadow-md">
                    Collez l&apos;URL d&apos;intégration {VIRTUAL_TOUR.provider} dans{" "}
                    <code className="rounded bg-msk-night-950/50 px-1.5 py-0.5">VIRTUAL_TOUR.embedUrl</code>{" "}
                    (lib/data/site-content.ts) pour activer la visite.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Plein écran : sous le cadre, jamais dessus. */}
      {lance && configure ? (
        <div className="mt-5 flex justify-center">
          <MorphButton
            size="sm"
            onClick={pleinEcran}
            className="font-semibold text-msk-night-900"
            fillClassName="border-2 border-msk-cream-300 bg-white group-hover:bg-msk-cream-100"
          >
            <Maximize2 className="h-4 w-4" aria-hidden />
            Plein écran
          </MorphButton>
        </div>
      ) : null}
    </section>
  );
};
