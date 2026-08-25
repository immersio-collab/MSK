"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { MoveHorizontal, ZoomIn } from "lucide-react";

import { PELLICULE } from "@/lib/data/galerie";
import { PolaroidCard } from "@/components/common/PolaroidCard";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";
import { cn } from "@/lib/utils";

/**
 * Pellicule horizontale à défilement continu.
 *
 * Le mouvement n'est plus lié au scroll de la page : la bande avance toute
 * seule, en permanence. Elle s'arrête au survol, au focus clavier et pendant
 * qu'on la fait glisser à la souris. Un clic ouvre la photo en grand.
 *
 * Mécanique : un conteneur `overflow-x` dont on incrémente `scrollLeft` à
 * chaque frame. Tout passe donc par le défilement natif — molette, trackpad,
 * balayage tactile et navigation clavier fonctionnent sans code dédié, et
 * l'auto-défilement repart de là où le visiteur a laissé la bande.
 *
 * La boucle est invisible parce que la liste est rendue TROIS fois et que
 * `scrollLeft` est ramené dans la fenêtre [période/2, période×1,5[ : on peut
 * donc dériver d'une demi-période dans les deux sens avant que la position ne
 * soit recollée sur une copie identique — le raccord ne se voit jamais.
 *
 * La période est mesurée sur la PREMIÈRE liste (+ l'écart qui la suit), pas en
 * divisant `scrollWidth` par trois : avec 21 éléments et 20 écarts, la division
 * serait fausse des deux tiers d'un écart, et la bande dériverait à chaque tour.
 *
 * `gsap.ticker` plutôt qu'une boucle `requestAnimationFrame` maison : la page
 * en fait déjà tourner une, et le ticker fournit le delta temps, donc la
 * vitesse reste la même à 60 comme à 120 Hz.
 */

/** Vitesse de croisière, en pixels par seconde. */
const VITESSE = 42;

/** Trois copies de la liste : une visible, une de chaque côté pour la boucle. */
const COPIES = [0, 1, 2];

interface GaleriePelliculeSectionProps {
  variant?: "page" | "home";
  header?: React.ReactNode;
}

export const GaleriePelliculeSection = ({ variant = "page", header }: GaleriePelliculeSectionProps = {}) => {
  const reduceMotion = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const premiereListe = useRef<HTMLUListElement>(null);
  /** Survol, focus clavier ou glissement en cours : la bande est en pause. */
  const pause = useRef(false);
  /** Glissement souris en cours (origine du pointeur + position de départ). */
  const glisse = useRef<{ x: number; depart: number; bouge: boolean } | null>(
    null,
  );
  /** Le dernier geste était un glissement : le clic qui suit ne doit pas ouvrir. */
  const aGlisse = useRef(false);
  const [ouvert, setOuvert] = useState(-1);

  useEffect(() => {
    const piste = rail.current;
    const liste = premiereListe.current;
    if (!piste || !liste) return;

    // Période = largeur d'une copie + l'écart qui la sépare de la suivante.
    //
    // Mesurée une fois et mise en cache, pas à chaque frame : la boucle écrit
    // `scrollLeft` à chaque tour, et intercaler une lecture de mise en page
    // entre deux écritures forcerait le navigateur à recalculer le layout
    // soixante fois par seconde pour une valeur qui ne bouge qu'au resize.
    let periode = 0;
    const mesurer = () => {
      const ecart = parseFloat(getComputedStyle(piste).columnGap || "0");
      periode = liste.offsetWidth + (Number.isNaN(ecart) ? 0 : ecart);
    };
    mesurer();

    // On démarre sur la copie du milieu, pour avoir de la matière des deux côtés.
    piste.scrollLeft = periode;

    // Les vignettes sont en `min(46vw, 340px)` : leur largeur suit le viewport,
    // donc la période aussi. On la reprend quand la liste change de taille, et
    // on ramène la position dans la nouvelle fenêtre.
    const observateur = new ResizeObserver(() => {
      const avant = periode;
      mesurer();
      if (avant > 0 && periode > 0)
        piste.scrollLeft = (piste.scrollLeft / avant) * periode;
    });
    observateur.observe(liste);

    const avance = (_time: number, delta: number) => {
      if (periode <= 0) return;

      // Recollage : ramène la position dans la fenêtre centrale. Fait à chaque
      // frame, donc valable aussi bien pour l'auto-défilement que pour un
      // geste du visiteur.
      if (piste.scrollLeft >= periode * 1.5) piste.scrollLeft -= periode;
      else if (piste.scrollLeft < periode * 0.5) piste.scrollLeft += periode;

      if (pause.current || reduceMotion) return;
      piste.scrollLeft += (VITESSE * delta) / 1000;
    };

    gsap.ticker.add(avance);
    return () => {
      gsap.ticker.remove(avance);
      observateur.disconnect();
    };
  }, [reduceMotion]);

  // Glissement à la souris.
  //
  // Volontairement SANS `setPointerCapture` : capturer le pointeur redirige le
  // `click` qui suit vers l'élément capteur — le rail — si bien que le bouton
  // de la vignette ne le recevait jamais et qu'un clic n'ouvrait rien. Le suivi
  // passe donc par des écouteurs sur `window`, ce qui permet en prime de
  // continuer à faire glisser la bande quand le curseur sort du rail.
  //
  // Le tactile et le stylet gardent le défilement natif du conteneur, qui est
  // déjà meilleur que tout ce qu'on écrirait ici.
  const auPointeurBas = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !rail.current)
      return;
    const piste = rail.current;
    aGlisse.current = false;
    glisse.current = {
      x: event.clientX,
      depart: piste.scrollLeft,
      bouge: false,
    };
    pause.current = true;

    const bouger = (e: PointerEvent) => {
      const geste = glisse.current;
      if (!geste) return;
      const dx = e.clientX - geste.x;
      if (Math.abs(dx) > 4) geste.bouge = true;
      piste.scrollLeft = geste.depart - dx;
    };

    const lacher = () => {
      window.removeEventListener("pointermove", bouger);
      window.removeEventListener("pointerup", lacher);
      window.removeEventListener("pointercancel", lacher);
      const geste = glisse.current;
      if (!geste) return;
      // Consommé par le `click` qui suit immédiatement : un glissement ne doit
      // pas ouvrir la photo sur laquelle on a relâché.
      aGlisse.current = geste.bouge;
      glisse.current = null;
      // Le curseur a pu quitter la bande pendant le geste : on ne relance le
      // défilement que s'il est effectivement revenu dessus.
      pause.current = piste.matches(":hover");
    };

    window.addEventListener("pointermove", bouger);
    window.addEventListener("pointerup", lacher);
    window.addEventListener("pointercancel", lacher);
  };

  const ouvrir = (index: number) => {
    if (aGlisse.current) {
      aGlisse.current = false;
      return;
    }
    setOuvert(index);
  };

  return (
    // `lg:screen-section` : une fenêtre pile, en-tête et pellicule centrés
    // dedans. La marge verticale est portée par UNE seule classe par variante —
    // deux `py-*` sur le même élément laisseraient l'ordre de la feuille
    // décider laquelle gagne.
    <section
      className={cn(
        "w-full overflow-hidden flex flex-col justify-center",
        variant === "home"
          ? "bg-msk-night-700 py-20 sm:py-24 md:py-32 lg:py-36 min-h-[85vh] lg:min-h-screen"
          : "bg-msk-cream-200 py-16 md:py-24",
      )}
    >
      <div className="mx-auto mb-10 sm:mb-12 md:mb-16 flex w-full max-w-[1400px] items-center justify-between gap-8 px-6 sm:px-10 lg:px-16">
        {header ? header : (
          <>
            <div>
              <GalerieTitreAnime
                au="scroll"
                texte="Chaque jour, de nouvelles découvertes"
                className="max-w-[18ch] font-display text-3xl font-bold uppercase leading-tight text-msk-night-900 md:text-4xl lg:text-5xl"
              />
              <p className="mt-4 max-w-lg text-base leading-relaxed text-msk-night-700 md:text-lg">
                La pellicule défile toute seule. Survolez-la pour l&apos;arrêter.
              </p>

              {/* Le glissement est invisible par nature : sans repère explicite,
                  personne ne devine qu'on peut attraper la bande. */}
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-msk-night-800 shadow-sm">
                <MoveHorizontal
                  className="h-4 w-4 text-msk-coral-600"
                  aria-hidden
                />
                Glissez pour parcourir · cliquez pour agrandir
              </p>
            </div>

            {/* Illustration décorative, à droite du titre. Plain <img> : l'optimiseur
                d'images refuse les SVG locaux (400) et aplatirait l'animation SMIL.
                Masquée sous md, où la colonne de texte prend toute la largeur. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Camera - Copie.svg"
              alt=""
              aria-hidden
              width={400}
              height={300}
              loading="lazy"
              decoding="async"
              className="hidden w-72 shrink-0 rotate-6 md:block lg:w-96"
            />
          </>
        )}
      </div>

      {/* Conteneur relatif : il porte les dégradés de bord, qui montrent que la
          bande se poursuit hors cadre au lieu de s'arrêter net. */}
      <div className="relative">
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16", variant === "home" ? "bg-linear-to-r from-msk-night-700 to-transparent" : "bg-linear-to-r from-msk-cream-200 to-transparent")}
        />
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16", variant === "home" ? "bg-linear-to-l from-msk-night-700 to-transparent" : "bg-linear-to-l from-msk-cream-200 to-transparent")}
        />

        <div
          ref={rail}
          onPointerDown={auPointeurBas}
          onMouseEnter={() => {
            pause.current = true;
          }}
          onMouseLeave={() => {
            if (!glisse.current) pause.current = false;
          }}
          onFocusCapture={() => {
            pause.current = true;
          }}
          onBlurCapture={() => {
            pause.current = false;
          }}
          className="hide-scrollbar flex cursor-grab select-none gap-6 overflow-x-auto px-6 py-3 active:cursor-grabbing sm:px-10"
        >
          {COPIES.map((copie) => (
            <ul
              key={copie}
              ref={copie === 0 ? premiereListe : undefined}
              // Seule la première copie est exposée aux technologies d'assistance ;
              // les autres n'existent que pour masquer le raccord de la boucle.
              aria-hidden={copie > 0 || undefined}
              aria-label={copie === 0 ? "Photos du centre" : undefined}
              className="flex w-max shrink-0 gap-6"
            >
              {PELLICULE.map((photo, index) => (
                <li key={`${copie}-${photo.src}-${index}`} className="shrink-0">
                  <PolaroidCard
                    as="button"
                    index={index}
                    // Les copies ne sont pas atteignables au clavier : un même
                    // contenu répété trois fois dans l'ordre de tabulation serait
                    // pénible, et `aria-hidden` interdit d'y laisser le focus.
                    tabIndex={copie === 0 ? undefined : -1}
                    onClick={() => ouvrir(index)}
                    aria-label={`Agrandir : ${photo.titre}`}
                    // Curseur « main » et non « loupe » : la main est le signal
                    // universel du glissement, et c'est le geste que personne ne
                    // devinait. La loupe reste présente, mais en pastille sur la
                    // photo — les deux actions sont ainsi annoncées à la fois.
                    className="group cursor-grab transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-400 active:cursor-grabbing"
                    caption={photo.titre}
                    media={
                      <>
                        <Image
                          src={photo.src}
                          alt=""
                          width={photo.width}
                          height={photo.height}
                          sizes="(max-width: 640px) 46vw, 340px"
                          draggable={false}
                          className="h-full w-full object-cover"
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-msk-night-900 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                          <ZoomIn className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Montée seulement à l'ouverture : `index` n'est lu qu'au montage par la
          visionneuse — la garder montée rouvrirait toujours la même photo. */}
      {ouvert >= 0 ? (
        <Lightbox
          open
          index={ouvert}
          close={() => setOuvert(-1)}
          plugins={[Captions, Counter, Zoom]}
          slides={PELLICULE.map((p) => ({
            src: p.src,
            alt: p.titre,
            title: p.titre,
          }))}
          styles={{
            container: {
              backgroundColor:
                "color-mix(in oklab, var(--color-msk-night-950) 94%, transparent)",
            },
            captionsTitle: { fontFamily: "var(--font-display)" },
          }}
          counter={{
            container: {
              style: {
                top: "unset",
                bottom: 0,
                fontFamily: "var(--font-display)",
              },
            },
          }}
        />
      ) : null}
    </section>
  );
};
