"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import {
  CATEGORIES,
  CATEGORIE_LABEL,
  CATEGORIE_TEXTE,
  CATEGORIE_TON,
  GALERIE_PHOTOS,
  type GalerieCategorie,
} from "@/lib/data/galerie";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";
import { CloudDrift } from "@/components/motion/CloudDrift";
import { cn } from "@/lib/utils";

/**
 * « Le grand album » : une photo à la fois, en grand, dans un cadre polaroid.
 *
 * Navigation : flèches, clavier (← →), balayage (drag framer-motion), points,
 * et rail de vignettes qui suit la photo active. Les filtres réduisent l'album
 * et remettent l'index à zéro. Le plein écran reste disponible via la
 * visionneuse (légende + compteur + zoom), recolorée aux tons MSK.
 *
 * Tout le mouvement est en framer-motion : ce sont des transitions d'état, pas
 * du scroll-driven. Rien ici ne dépend d'un trigger — l'album est visible dès
 * le premier rendu.
 */

type Filtre = GalerieCategorie | "tous";

/** Inclinaison des vignettes au repos, alternée comme les stickers. */
const TILTS = [-2, 1.5, -1.5, 2, 1, -2, 1.5, -1, 2, -1.5];

const SPRING = { type: "spring", stiffness: 280, damping: 26 } as const;

// La photo suivante glisse par-dessus depuis le côté d'où l'on vient, avec une
// légère rotation — l'effet « on passe la page ». `custom` porte la direction.
const CARTE: Variants = {
  entree: (dir: number) => ({ x: dir * 90, rotate: dir * 5, opacity: 0, scale: 0.96 }),
  centre: { x: 0, rotate: -1.2, opacity: 1, scale: 1, transition: SPRING },
  sortie: (dir: number) => ({
    x: dir * -70,
    rotate: dir * -4,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

const SEUIL_BALAYAGE = 60;

export function GalerieAlbumSection() {
  const reduceMotion = useReducedMotion();
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [pleinEcran, setPleinEcran] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const vignettes = useRef<Array<HTMLButtonElement | null>>([]);

  const photos = useMemo(
    () => (filtre === "tous" ? GALERIE_PHOTOS : GALERIE_PHOTOS.filter((p) => p.categorie === filtre)),
    [filtre],
  );
  const total = photos.length;
  const photo = photos[Math.min(index, total - 1)] ?? photos[0];
  const position = photos.indexOf(photo);

  const aller = useCallback(
    (cible: number, dir?: number) => {
      if (total === 0) return;
      const normalise = ((cible % total) + total) % total;
      setDirection(dir ?? (normalise > position ? 1 : -1));
      setIndex(normalise);
    },
    [position, total],
  );
  const precedent = useCallback(() => aller(position - 1, -1), [aller, position]);
  const suivant = useCallback(() => aller(position + 1, 1), [aller, position]);

  const changerFiltre = (cle: Filtre) => {
    setFiltre(cle);
    setIndex(0);
    setDirection(1);
  };

  // Le rail suit la photo active. Défilement horizontal du rail uniquement —
  // pas de scrollIntoView, qui ferait aussi défiler la page jusqu'à la galerie
  // au chargement.
  useEffect(() => {
    const conteneur = rail.current;
    const vignette = vignettes.current[position];
    if (!conteneur || !vignette) return;
    const cible = vignette.offsetLeft - (conteneur.clientWidth - vignette.offsetWidth) / 2;
    conteneur.scrollTo({ left: Math.max(cible, 0), behavior: reduceMotion ? "auto" : "smooth" });
  }, [position, reduceMotion]);

  const auClavier = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      suivant();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      precedent();
    }
  };

  const finBalayage = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SEUIL_BALAYAGE || velocity.x < -500) suivant();
    else if (offset.x > SEUIL_BALAYAGE || velocity.x > 500) precedent();
  };

  const compte = (cle: Filtre) =>
    cle === "tous" ? GALERIE_PHOTOS.length : GALERIE_PHOTOS.filter((p) => p.categorie === cle).length;

  if (!photo) return null;
  const Icone = photo.icon;

  return (
    <section id="galerie" className="relative overflow-hidden bg-msk-cream-100 pb-28 pt-16 md:pb-36 md:pt-20">
      {/* Ciel en biais, même device que le hero et /la-methode. Il ne touche
          pas le bord haut : le raccord avec le hero reste en crème. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[62%] bg-msk-blue-200"
        style={{ clipPath: "polygon(0 10%, 100% 2%, 100% 70%, 0 96%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soleil du ciel. Plain <img> et non next/image : le SVG porte sa
            propre animation SMIL (les rayons tournent), que l'optimiseur
            d'images aplatirait. */}
        <img
          src="/Sunny.svg"
          alt=""
          className="absolute right-[1%] top-[3%] w-24 sm:w-32 lg:right-[4%] lg:w-44"
        />
        <CloudDrift
          motion="float"
          shape="a"
          speed={54}
          phase={0.3}
          className="absolute left-0 top-[12%] w-40 text-white md:w-56"
        />
        <CloudDrift
          motion="float"
          shape="b"
          speed={42}
          phase={0.75}
          className="absolute left-0 top-[40%] hidden w-36 text-white lg:block"
        />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-8">
        {/* En-tête volontairement réduit au titre : l'album doit tenir dans
            la hauteur d'écran avec son rail de vignettes. */}
        <div className="mx-auto mb-4 max-w-3xl text-center">
          <GalerieTitreAnime
            au="scroll"
            texte="Nos espaces, mille moments"
            className="font-display text-[2rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-4xl md:text-5xl"
          />
        </div>

        {/* Filtres : la pastille coral glisse d'un filtre à l'autre. */}
        <div role="group" aria-label="Filtrer la galerie" className="mb-5 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const actif = filtre === cat.cle;
            return (
              <button
                key={cat.cle}
                type="button"
                aria-pressed={actif}
                onClick={() => changerFiltre(cat.cle)}
                className={cn(
                  "relative inline-flex h-10 items-center gap-2 rounded-full px-4 font-display text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300",
                  actif ? "text-white" : "text-msk-night-900 hover:text-msk-coral-700",
                )}
              >
                {actif ? (
                  <motion.span
                    layoutId="galerie-filtre-actif"
                    aria-hidden
                    transition={SPRING}
                    className="absolute inset-0 rounded-full bg-msk-coral-600 shadow-lg shadow-msk-coral-600/30"
                  />
                ) : (
                  <span aria-hidden className="absolute inset-0 rounded-full border-2 border-msk-cream-300 bg-white" />
                )}
                <span className="relative">{cat.label}</span>
                <span
                  className={cn(
                    "relative rounded-full px-1.5 py-0.5 text-[0.65rem]",
                    actif ? "bg-white/25 text-white" : "bg-msk-cream-100 text-msk-night-700",
                  )}
                >
                  {compte(cat.cle)}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="region"
          aria-roledescription="carrousel"
          aria-label="Album photo du centre"
          tabIndex={0}
          onKeyDown={auClavier}
          className="rounded-[2rem] focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300/70"
        >
          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={precedent}
              aria-label="Photo précédente"
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-msk-night-900 shadow-lg shadow-msk-night-900/15 transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300 md:flex"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <div className="relative min-w-0 flex-1">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-2 rotate-[2.2deg] rounded-[1.5rem] bg-white/70 shadow-md"
              />

              <div className="relative grid">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.figure
                    key={photo.src}
                    custom={direction}
                    variants={reduceMotion ? undefined : CARTE}
                    initial="entree"
                    animate="centre"
                    exit="sortie"
                    drag={reduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={finBalayage}
                    role="group"
                    aria-roledescription="diapositive"
                    aria-label={`${position + 1} sur ${total}`}
                    style={{ borderRadius: 24, rotate: reduceMotion ? 0 : -1.2 }}
                    className="col-start-1 row-start-1 cursor-grab touch-pan-y bg-white p-3 shadow-2xl shadow-msk-night-900/20 active:cursor-grabbing"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-msk-cream-200 md:aspect-[16/9]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        priority={position === 0}
                        sizes="(max-width: 1024px) 92vw, 860px"
                        className="object-cover"
                        draggable={false}
                      />
                      <span
                        className={cn(
                          "absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.16em] shadow-sm",
                          CATEGORIE_TEXTE[photo.categorie],
                        )}
                      >
                        {CATEGORIE_LABEL[photo.categorie]}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPleinEcran(true)}
                        aria-label={`Voir en plein écran : ${photo.titre}`}
                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-msk-night-900 shadow-md transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300"
                      >
                        <Maximize2 className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                      <span
                        aria-hidden
                        className="absolute bottom-3 right-3 rounded-full bg-msk-night-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {position + 1} / {total}
                      </span>
                    </div>

                    <figcaption className="flex items-end justify-between gap-4 px-2 pb-0.5 pt-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                            CATEGORIE_TON[photo.categorie],
                          )}
                        >
                          <Icone className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-xl font-bold uppercase leading-none text-msk-night-900 md:text-2xl">
                            {photo.titre}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-msk-night-700">{photo.alt}</p>
                        </div>
                      </div>

                      <div className="hidden shrink-0 items-center gap-1.5 sm:flex" aria-label="Aller à la photo">
                        {photos.map((p, i) => (
                          <button
                            key={p.src}
                            type="button"
                            onClick={() => aller(i)}
                            aria-label={`Photo ${i + 1} : ${p.titre}`}
                            aria-current={i === position ? "true" : undefined}
                            className={cn(
                              "h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-msk-coral-300",
                              i === position ? "w-5 bg-msk-coral-600" : "w-2 bg-msk-cream-300 hover:bg-msk-coral-300",
                            )}
                          />
                        ))}
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            <button
              type="button"
              onClick={suivant}
              aria-label="Photo suivante"
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-msk-coral-600 text-white shadow-lg shadow-msk-coral-600/30 transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300 md:flex"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={precedent}
              aria-label="Photo précédente"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-msk-night-900 shadow-md focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <span className="font-display text-sm font-semibold text-msk-night-800" aria-live="polite">
              {position + 1} / {total}
            </span>
            <button
              type="button"
              onClick={suivant}
              aria-label="Photo suivante"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-msk-coral-600 text-white shadow-md focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div ref={rail} className="hide-scrollbar relative -mx-4 mt-5 overflow-x-auto px-4 pb-4 pt-3 sm:-mx-8 sm:px-8">
          <ul className="flex w-max items-end gap-4" aria-label="Vignettes">
            {photos.map((p, i) => {
              const actif = i === position;
              return (
                <li key={p.src} className="shrink-0">
                  <motion.button
                    ref={(el) => {
                      vignettes.current[i] = el;
                    }}
                    type="button"
                    onClick={() => aller(i)}
                    aria-label={`Photo ${i + 1} : ${p.titre}`}
                    aria-current={actif ? "true" : undefined}
                    initial={false}
                    animate={{
                      rotate: actif || reduceMotion ? 0 : TILTS[i % TILTS.length],
                      y: actif ? -4 : 0,
                      opacity: actif ? 1 : 0.78,
                    }}
                    whileHover={{ rotate: 0, y: -4, opacity: 1 }}
                    transition={SPRING}
                    className={cn(
                      "block w-32 rounded-2xl bg-white p-2 pb-2.5 text-left shadow-md focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300 md:w-40",
                      actif && "ring-[3px] ring-msk-coral-600",
                    )}
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-msk-cream-200">
                      <Image
                        src={p.src}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                        draggable={false}
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-2 block truncate text-center font-display text-xs font-semibold",
                        actif ? "text-msk-night-900" : "text-msk-night-700",
                      )}
                    >
                      {p.titre}
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Plein écran : monté seulement à l'ouverture — `index` n'est lu qu'au
          montage par la visionneuse. Recolorée aux tons MSK via ses variables. */}
      {pleinEcran ? (
        <Lightbox
          open
          index={position}
          close={() => setPleinEcran(false)}
          plugins={[Captions, Counter, Zoom]}
          on={{ view: ({ index: i }) => aller(i) }}
          slides={photos.map((p) => ({ src: p.src, alt: p.alt, title: p.titre, description: p.alt }))}
          styles={{
            container: { backgroundColor: "color-mix(in oklab, var(--color-msk-night-950) 94%, transparent)" },
            captionsTitle: { fontFamily: "var(--font-display)" },
          }}
          counter={{ container: { style: { top: "unset", bottom: 0, fontFamily: "var(--font-display)" } } }}
        />
      ) : null}
    </section>
  );
}
