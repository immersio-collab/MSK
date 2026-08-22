"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MethodeCloud } from "@/components/methode/MethodeCloud";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero à ciel ouvert : bandeau bleu, nuages qui dérivent, et une « couture »
 * crème qui pivote au scroll pour révéler la section suivante sur une diagonale
 * mouvante plutôt que sur un horizon droit.
 *
 * Trois choix qui ne sont pas cosmétiques :
 *
 * 1. La couture a sa PROPRE teinte. Le hero et la grille qui suit sont deux
 *    blancs cassés (#FAF8F5 et #FFFFFF) : mesurés l'un contre l'autre, ils
 *    donnent 1,06:1. Une diagonale posée entre ces deux-là serait invisible.
 *    C'est le bandeau bleu au-dessus qui rend l'arête lisible.
 *
 * 2. La couture pivote depuis son état AU REPOS. `gsap.to` depuis le
 *    `rotate(-5.5deg)` déjà écrit en CSS, jamais `fromTo` : si gsap ne se charge
 *    pas ou si un tween ne part jamais, l'arête reste simplement inclinée à
 *    -5,5° au lieu de disparaître. Aucun état de départ invisible n'est posé au
 *    montage (cf. .agents/rules/scroll-page-composition.md).
 *
 * 3. Les anciens blobs floutés en `animate-blob` ont été retirés plutôt que
 *    conservés : leur transform est écrit par une animation CSS, qui l'emporte
 *    sur le style inline de gsap. Les garder aurait imposé un wrapper neutre
 *    par blob pour un décor que les nuages remplacent.
 *
 * Les entrées du texte restent en framer-motion, inchangées : la règle du projet
 * interdit d'animer un même élément avec les deux bibliothèques.
 */
export const TroublesHeroSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const seam = useRef<HTMLDivElement>(null);
  const duck = useRef<HTMLImageElement>(null);
  const baby = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scrub = {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      } as const;

      if (seam.current) {
        gsap.to(seam.current, { rotate: 3.5, ease: "none", scrollTrigger: scrub });
      }

      // Parallaxe : chaque pièce dérive à sa propre vitesse. `to` depuis la
      // position naturelle, donc rien n'est déplacé tant que le scroll ne
      // commence pas — et si le tween ne part jamais, tout reste en place.
      if (duck.current) {
        gsap.to(duck.current, { yPercent: 46, ease: "none", scrollTrigger: scrub });
      }
      if (baby.current) {
        gsap.to(baby.current, { yPercent: -22, ease: "none", scrollTrigger: scrub });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-msk-cream-100 pb-16 pt-16 md:pb-20"
    >
      {/* Ciel. Il s'arrête plus bas que la couture pour que celle-ci ait
          toujours du bleu à découper, quel que soit son angle. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[78%] bg-msk-blue-300" />

      {/* Nuages : dérive latérale continue, indépendante du scroll. Vitesses et
          phases distinctes pour qu'ils ne se déplacent pas en bloc. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <MethodeCloud
          motion="float"
          shape="a"
          speed={52}
          phase={0.2}
          className="absolute left-0 top-[52%] w-40 text-white md:w-56"
        />
        <MethodeCloud
          motion="float"
          shape="b"
          speed={38}
          phase={0.5}
          className="absolute left-0 top-[26%] w-48 text-white md:w-72"
        />
        <MethodeCloud
          motion="float"
          shape="a"
          speed={64}
          phase={0.8}
          className="absolute left-0 top-[8%] hidden w-32 text-msk-cream-50 lg:block"
        />

        {/* Le canard est un PNG encapsulé dans un .svg, pas un vecteur : son
            bitmap fait 619x644, donc il reste sous ~310px de large pour ne pas
            devenir flou. Il est posé sur le bleu — sur du jaune il serait
            invisible, et sur du crème il rendrait mou. */}
        <img
          ref={duck}
          src="/duck.svg"
          alt=""
          aria-hidden
          className="absolute right-[7%] top-[14%] w-32 max-w-[300px] md:w-44 lg:w-52"
        />
      </div>

      {/* La couture. Débordement latéral large pour que la rotation n'expose
          jamais les coins, et pivot ancré en haut au centre. */}
      <div
        ref={seam}
        aria-hidden
        className="absolute -left-1/4 -right-1/4 top-[64%] z-[2] h-[85vh] bg-msk-cream-100"
        style={{ transformOrigin: "50% 0%", transform: "rotate(-5.5deg)" }}
      />

      {/* Le bébé n'a un contraste suffisant que sur du crème ou du blanc : il est
          donc posé sous la couture, jamais sur le bleu. */}
      <img
        ref={baby}
        src="/Cute baby Peek a boo.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-[2%] z-[3] w-56 md:w-72 lg:left-[6%] lg:w-80"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="mx-auto mt-4 max-w-2xl rounded-[1.75rem] bg-white px-8 py-10 text-center shadow-2xl md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[2.25rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-5xl md:text-6xl"
          >
            Nous comprenons ce que{" "}
            <span className="text-msk-coral-700">traverse votre enfant.</span>
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 inline-block rounded-full bg-msk-night-900/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-700"
          >
            Troubles Accompagnés
          </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-base font-medium leading-snug text-msk-night-800 md:text-lg"
        >
          MSK accompagne les enfants de la maternelle et du primaire avec des
          difficultés d&apos;apprentissage, de langage, de comportement et de
          développement. Un cadre bienveillant, une méthode adaptée et une équipe
          dévouée.
        </motion.p>
        </div>
      </div>
    </section>
  );
};
