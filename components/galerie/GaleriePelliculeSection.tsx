"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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

import { PELLICULE } from "@/components/galerie/galerie-content";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";

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

export const GaleriePelliculeSection = () => {
  const reduceMotion = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const premiereListe = useRef<HTMLUListElement>(null);
  /** Survol, focus clavier ou glissement en cours : la bande est en pause. */
  const pause = useRef(false);
  /** Glissement souris en cours (origine du pointeur + position de départ). */
  const glisse = useRef<{ x: number; depart: number; bouge: boolean } | null>(null);
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
      if (avant > 0 && periode > 0) piste.scrollLeft = (piste.scrollLeft / avant) * periode;
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

  // Glissement à la souris. Le tactile et le stylet gardent le défilement
  // natif du conteneur, qui est déjà meilleur que tout ce qu'on écrirait ici.
  const auPointeurBas = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !rail.current) return;
    aGlisse.current = false;
    glisse.current = { x: event.clientX, depart: rail.current.scrollLeft, bouge: false };
    pause.current = true;
    rail.current.setPointerCapture(event.pointerId);
  };

  const auPointeurBouge = (event: ReactPointerEvent<HTMLDivElement>) => {
    const geste = glisse.current;
    if (!geste || !rail.current) return;
    const dx = event.clientX - geste.x;
    if (Math.abs(dx) > 4) geste.bouge = true;
    rail.current.scrollLeft = geste.depart - dx;
  };

  const auPointeurHaut = (event: ReactPointerEvent<HTMLDivElement>) => {
    const geste = glisse.current;
    if (!geste || !rail.current) return;
    rail.current.releasePointerCapture?.(event.pointerId);
    aGlisse.current = geste.bouge;
    glisse.current = null;
    // La souris peut avoir quitté la bande pendant la capture : on ne relance
    // que si le curseur est effectivement revenu dessus.
    pause.current = rail.current.matches(":hover");
  };

  const ouvrir = (index: number) => {
    if (aGlisse.current) {
      aGlisse.current = false;
      return;
    }
    setOuvert(index);
  };

  return (
    <section className="w-full overflow-hidden bg-msk-cream-200 py-24 md:py-28">
      <div className="mx-auto mb-11 w-full max-w-6xl px-6 sm:px-10">
        <GalerieTitreAnime
          au="scroll"
          texte="Chaque jour, de nouvelles découvertes"
          className="max-w-[18ch] font-display text-3xl font-bold uppercase leading-tight text-msk-night-900 md:text-4xl lg:text-5xl"
        />
        <p className="mt-4 max-w-lg text-base leading-relaxed text-msk-night-700 md:text-lg">
          La pellicule défile toute seule. Survolez-la pour l&apos;arrêter, faites-la glisser, et
          cliquez sur une photo pour la voir en grand.
        </p>
      </div>

      <div
        ref={rail}
        onPointerDown={auPointeurBas}
        onPointerMove={auPointeurBouge}
        onPointerUp={auPointeurHaut}
        onPointerCancel={auPointeurHaut}
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
        className="hide-scrollbar flex cursor-grab gap-6 overflow-x-auto px-6 py-3 active:cursor-grabbing sm:px-10"
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
                <button
                  type="button"
                  // Les copies ne sont pas atteignables au clavier : un même
                  // contenu répété trois fois dans l'ordre de tabulation serait
                  // pénible, et `aria-hidden` interdit d'y laisser le focus.
                  tabIndex={copie === 0 ? undefined : -1}
                  onClick={() => ouvrir(index)}
                  aria-label={`Agrandir : ${photo.titre}`}
                  className={`group block w-[min(46vw,340px)] cursor-zoom-in bg-white p-2 pb-3 shadow-xl transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-400 ${
                    index % 2
                      ? "mt-6 rotate-2 rounded-[6px_20px_8px_18px]"
                      : "-rotate-2 rounded-[18px_6px_20px_8px]"
                  }`}
                >
                  <span className="relative block aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt=""
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 640px) 46vw, 340px"
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="mt-2 block text-center font-display text-xs font-semibold text-msk-night-800">
                    {photo.titre}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Montée seulement à l'ouverture : `index` n'est lu qu'au montage par la
          visionneuse — la garder montée rouvrirait toujours la même photo. */}
      {ouvert >= 0 ? (
        <Lightbox
          open
          index={ouvert}
          close={() => setOuvert(-1)}
          plugins={[Captions, Counter, Zoom]}
          slides={PELLICULE.map((p) => ({ src: p.src, alt: p.titre, title: p.titre }))}
          styles={{
            container: { backgroundColor: "color-mix(in oklab, var(--color-msk-night-950) 94%, transparent)" },
            captionsTitle: { fontFamily: "var(--font-display)" },
          }}
          counter={{ container: { style: { top: "unset", bottom: 0, fontFamily: "var(--font-display)" } } }}
        />
      ) : null}
    </section>
  );
};
