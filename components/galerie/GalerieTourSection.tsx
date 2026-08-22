"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertTriangle, Play } from "lucide-react";

import { VIRTUAL_TOUR } from "@/lib/data/site-content";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";

/**
 * Tour virtuel Realsee / Matterport.
 *
 * Reprend la grammaire d'EspacesTourVirtuelSection : cadre à bordure dégradée
 * coral → sun → blue, et affiche cliquable avant activation.
 *
 * L'iframe n'est montée qu'au clic, jamais au chargement : une visite 360°
 * télécharge plusieurs mégaoctets et lance son propre moteur de rendu. La
 * monter d'emblée pénaliserait chaque visiteur de la galerie, y compris ceux
 * qui ne lanceront jamais la visite.
 *
 * Si `VIRTUAL_TOUR.embedUrl` est encore vide, la section le dit franchement au
 * lieu de monter une iframe vide : un cadre noir muet passerait inaperçu en
 * recette et partirait en production.
 */
export const GalerieTourSection = () => {
  const [lance, setLance] = useState(false);
  const configure = VIRTUAL_TOUR.embedUrl.trim().length > 0;

  return (
    <section
      id="tour-virtuel"
      className="relative -mt-8 w-full overflow-hidden bg-msk-night-950 px-6 pb-24 pt-28 sm:px-10 md:pb-28 md:pt-32"
      style={{ clipPath: "polygon(0 4%, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="inline-block rounded-full bg-white/12 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-sun-300">
          Tour virtuel · 360°
        </span>
        <GalerieTitreAnime
          au="scroll"
          texte="Visitez le centre sans quitter votre canapé"
          className="mt-5 font-display text-3xl font-bold uppercase leading-tight text-white md:text-4xl lg:text-5xl"
        />
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-msk-blue-200 md:text-lg">
          Déplacez-vous de salle en salle, à votre rythme. La visite s&apos;ouvre
          directement dans la page.
        </p>
      </div>

      <div className="mx-auto max-w-5xl rounded-[2.2rem] bg-linear-to-tr from-msk-coral-400 via-msk-sun-400 to-msk-blue-400 p-1.5 shadow-2xl">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-[1.75rem] bg-msk-cream-50 md:aspect-21/9">
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
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-msk-night-950/45" />

              {configure ? (
                <button
                  type="button"
                  onClick={() => setLance(true)}
                  className="group absolute inset-0 flex flex-col items-center justify-center focus-visible:outline-3 focus-visible:outline-msk-sun-400"
                >
                  <span className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-8 w-8 fill-white text-white" aria-hidden />
                  </span>
                  <span className="font-display text-2xl font-bold text-white drop-shadow-md">
                    Lancer la visite 360°
                  </span>
                  <span className="mt-2 text-sm font-medium text-white/90 drop-shadow-md">
                    Cliquez pour explorer
                  </span>
                </button>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-msk-sun-300/50 bg-msk-sun-400/20">
                    <AlertTriangle className="h-7 w-7 text-msk-sun-300" aria-hidden />
                  </span>
                  <p className="font-display text-xl font-bold text-white drop-shadow-md">
                    Lien de visite à renseigner
                  </p>
                  <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-white/85 drop-shadow-md">
                    Collez l&apos;URL d&apos;intégration {VIRTUAL_TOUR.provider} dans{" "}
                    <code className="rounded bg-black/35 px-1.5 py-0.5">
                      VIRTUAL_TOUR.embedUrl
                    </code>{" "}
                    (lib/data/site-content.ts) pour activer la visite.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
