"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PELLICULE } from "@/components/galerie/galerie-content";
import { GalerieTitreAnime } from "@/components/galerie/GalerieTitreAnime";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pellicule horizontale scrubbée : la bande avance pendant que la section
 * traverse le champ.
 *
 * `gsap.to` depuis la position naturelle, pas `fromTo` : la bande commence là où
 * le CSS la pose. Si le tween ne part jamais, on voit les premières photos
 * immobiles — pas une bande vide décalée hors cadre.
 *
 * La distance de défilement est MESURÉE et non codée en dur : une valeur fixe
 * laisserait un vide à droite sur grand écran, ou couperait les dernières photos
 * sur petit. Elle est recalculée au resize, sans quoi le débord cesse de
 * correspondre au viewport.
 *
 * Elle se mesure contre la largeur visible de la SECTION, pas contre celle de la
 * piste. La piste est en `w-max` : elle se dimensionne sur son contenu, donc son
 * `scrollWidth` égale toujours son `clientWidth` et le débord calculé de cette
 * façon vaudrait invariablement zéro — la pellicule resterait immobile.
 *
 * Ce n'est pas du scroll-jacking : rien n'est épinglé, le défilement vertical
 * reste entièrement sous contrôle du visiteur, y compris sur mobile.
 */
export const GaleriePelliculeSection = () => {
  const root = useRef<HTMLElement>(null);
  const piste = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const track = piste.current;
    if (!el || !track) return;

    const ctx = gsap.context(() => {
      const debord = () => Math.max(track.scrollWidth - el.clientWidth, 0);

      const tween = gsap.to(track, {
        x: () => -debord(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      const onResize = () => {
        tween.invalidate();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="w-full overflow-hidden bg-msk-cream-200 py-24 md:py-28">
      <div className="mx-auto mb-11 w-full max-w-6xl px-6 sm:px-10">
        <GalerieTitreAnime
          au="scroll"
          texte="Chaque jour, de nouvelles découvertes"
          className="max-w-[18ch] font-display text-3xl font-bold uppercase leading-tight text-msk-night-900 md:text-4xl lg:text-5xl"
        />
        <p className="mt-4 max-w-lg text-base leading-relaxed text-msk-night-700 md:text-lg">
          Faites défiler : la pellicule avance avec vous.
        </p>
      </div>

      <div ref={piste} className="flex w-max gap-6 px-6 will-change-transform sm:px-10">
        {PELLICULE.map((photo, index) => (
          <figure
            key={`${photo.src}-${index}`}
            className={`w-[min(46vw,340px)] shrink-0 bg-white p-2 pb-3 shadow-xl ${
              index % 2
                ? "mt-6 rotate-2 rounded-[6px_20px_8px_18px]"
                : "-rotate-2 rounded-[18px_6px_20px_8px]"
            }`}
          >
            <Image
              src={photo.src}
              alt=""
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 46vw, 340px"
              className="aspect-4/3 w-full object-cover"
            />
            <figcaption className="mt-2 text-center font-display text-xs font-semibold text-msk-night-800">
              {photo.titre}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
