"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import {
  CATEGORIES,
  CATEGORIE_LABEL,
  CATEGORIE_TON,
  GALERIE_ACCENTS,
  GALERIE_PHOTOS,
  type GalerieAccent,
  type GaleriePhoto,
  type GalerieCategorie,
} from "@/components/galerie/galerie-content";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";
import { MorphButton } from "@/components/motion/MorphButton";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mur de photos filtrable. Les cartes se redressent en entrant dans le champ.
 *
 * Deux points qui suivent .agents/rules/scroll-page-composition.md :
 *
 * - `gsap.from` avec `immediateRender: false`, jamais `fromTo`. L'état de départ
 *   (incliné, réduit, transparent) n'est écrit qu'au déclenchement du trigger.
 *   Si gsap ne se charge pas, ou si une erreur JS survient avant, les cartes
 *   restent simplement droites et visibles au lieu d'être bloquées à opacity 0.
 *
 * - Un seul ScrollTrigger pour toute la grille, le `stagger` fait la séquence.
 *   Pas un trigger par carte.
 *
 * Le filtre change le nombre de cartes montées, donc les triggers sont
 * reconstruits à chaque changement de catégorie : sans cela le stagger porterait
 * sur des nœuds démontés et les nouvelles cartes n'auraient aucune animation.
 */

const COINS = [
  "rounded-[26px_8px_30px_10px]",
  "rounded-[8px_28px_10px_32px]",
  "rounded-[30px_10px_8px_26px]",
  "rounded-[10px_26px_30px_8px]",
];

export const GalerieGridSection = () => {
  const root = useRef<HTMLElement>(null);
  const [filtre, setFiltre] = useState<GalerieCategorie | "tous">("tous");
  const [ouvert, setOuvert] = useState(-1);

  const photos =
    filtre === "tous"
      ? GALERIE_PHOTOS
      : GALERIE_PHOTOS.filter((p) => p.categorie === filtre);

  /**
   * Mur = photos + cartes de texte intercalées. L'index de lightbox est porté
   * par chaque entrée photo : il doit indexer `photos`, pas le mur, sinon les
   * cartes de texte décaleraient la vignette ouverte.
   */
  type Bloc =
    | { genre: "photo"; photo: GaleriePhoto; index: number }
    | { genre: "accent"; accent: GalerieAccent };

  const mur: Bloc[] = [];
  photos.forEach((photo, index) => {
    mur.push({ genre: "photo", photo, index });
    GALERIE_ACCENTS.filter((a) => a.apres === index + 1).forEach((accent) =>
      mur.push({ genre: "accent", accent }),
    );
  });
  GALERIE_ACCENTS.filter((a) => a.apres > photos.length).forEach((accent) =>
    mur.push({ genre: "accent", accent }),
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".galerie-carte", {
        y: 52,
        rotate: (i: number) => (i % 2 ? 4.5 : -4.5),
        scale: 0.93,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.06,
        immediateRender: false,
        scrollTrigger: { trigger: ".galerie-mur", start: "top 85%" },
      });
    }, el);

    return () => ctx.revert();
  }, [filtre]);

  return (
    <section ref={root} id="galerie" className="bg-white py-24 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <GalerieTitreAnime
            au="scroll"
            texte="Nos espaces, mille moments"
            className="font-display text-3xl font-bold uppercase leading-tight text-msk-night-900 md:text-4xl lg:text-5xl"
          />
          <p className="mt-4 text-lg leading-relaxed text-msk-night-700">
            Filtrez par univers, ou laissez-vous porter. Chaque photo est prise
            dans nos locaux, avec nos enfants et notre équipe.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filtrer la galerie"
          className="mx-auto mb-12 flex max-w-3xl flex-wrap justify-center gap-2.5"
        >
          {CATEGORIES.map((cat) => {
            const actif = filtre === cat.cle;
            return (
              <MorphButton
                key={cat.cle}
                aria-pressed={actif}
                onClick={() => setFiltre(cat.cle)}
                className={`h-10 px-5 font-display text-[13px] font-semibold uppercase tracking-wider ${
                  actif ? "text-white" : "text-msk-night-800"
                }`}
                fillClassName={
                  actif
                    ? "border-2 border-msk-night-900 bg-msk-night-900"
                    : "border-2 border-msk-cream-300 bg-white group-hover:border-msk-coral-400"
                }
              >
                {cat.label}
              </MorphButton>
            );
          })}
        </div>

        {/* Mur en colonnes CSS : chaque carte reste insécable, la hauteur
            s'équilibre toute seule quel que soit le ratio des photos. */}
        <div className="galerie-mur columns-1 gap-5 sm:columns-2 lg:columns-3">
          {mur.map((bloc, rang) => {
            if (bloc.genre === "accent") {
              const { accent } = bloc;
              const coral = accent.ton === "coral";
              return (
                <div
                  key={`accent-${accent.titre}`}
                  className={`galerie-carte mb-5 break-inside-avoid px-7 py-8 ${COINS[rang % COINS.length]} ${
                    // coral-600 et non coral-500 : sur coral-500, le sous-titre
                    // en 14px tombe à 3,52:1, sous le seuil WCAG de 4,5:1 pour
                    // du petit texte. coral-600 le remonte à 6,8:1.
                    coral ? "bg-msk-coral-600 text-white" : "bg-msk-sun-300 text-msk-night-900"
                  }`}
                >
                  {accent.citation && (
                    <span
                      aria-hidden
                      className="mb-2 block font-display text-6xl leading-[0.6] text-msk-coral-600"
                    >
                      &ldquo;
                    </span>
                  )}
                  <p className="font-display text-2xl font-bold uppercase leading-[0.95] lg:text-[1.7rem]">
                    {accent.titre}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${coral ? "text-white" : "text-msk-night-800"}`}
                  >
                    {accent.sousTitre}
                  </p>
                </div>
              );
            }

            const { photo, index } = bloc;
            const Icone = photo.icon;
            return (
              <figure
                key={photo.src}
                className={`galerie-carte mb-5 break-inside-avoid overflow-hidden border border-msk-cream-200 bg-white shadow-sm ${COINS[rang % COINS.length]}`}
              >
                <button
                  type="button"
                  onClick={() => setOuvert(index)}
                  aria-label={`Agrandir : ${photo.titre}`}
                  className="group block w-full cursor-zoom-in overflow-hidden focus-visible:outline-3 focus-visible:outline-msk-blue-500"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.045]"
                  />
                </button>

                <figcaption className="flex items-center gap-3 px-4 py-3.5">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${CATEGORIE_TON[photo.categorie]}`}
                  >
                    <Icone className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-base font-semibold text-msk-night-900">
                      {photo.titre}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] font-bold uppercase tracking-[0.12em] text-msk-night-700/60">
                      {CATEGORIE_LABEL[photo.categorie]}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Monté seulement à l'ouverture, et non laissé en place avec open={false}.
          `index` n'est lu qu'au montage par la visionneuse : en la gardant
          montée, tous les clics rouvraient la première photo quelle que soit la
          vignette choisie. */}
      {ouvert >= 0 && (
        <Lightbox
          open
          index={ouvert}
          close={() => setOuvert(-1)}
          slides={photos.map((p) => ({ src: p.src, alt: p.alt, title: p.titre }))}
        />
      )}
    </section>
  );
};
