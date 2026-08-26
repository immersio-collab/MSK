"use client";

import React from "react";

import { FadeUp } from "@/components/motion/FadeUp";

export const ContactMapSection: React.FC = () => {
  return (
    // `lg:screen-section` : la carte occupe exactement une fenêtre à partir de
    // lg. Pas de marge haute — c'est le `pb` du panneau de formulaire juste
    // au-dessus qui fait l'espace, en ajouter une ici doublerait l'écart.
    <section className="relative w-full bg-transparent px-5 pb-16 lg:px-8">
      {/* « Posé » sur le coin haut du cadre blanc — dans la section, pas dans
          le cadre (son overflow-hidden le couperait). */}
      <img
        src="/_unused/location.svg"
        alt=""
        className="pointer-events-none absolute right-[8%] top-0 z-10 hidden w-32 -translate-y-1/2 rotate-3 sm:block"
      />
      {/* Framed card wrapper matching website design system */}
      <div className="mx-auto w-full max-w-[1400px] overflow-hidden rounded-[1.5rem] border border-msk-cream-300 bg-white p-3 shadow-xl md:p-4">
        <FadeUp>
          <div className="relative h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] w-full overflow-hidden rounded-[1.25rem] border border-msk-cream-200">
            {/* Google Maps iframe spanning 100% width & height */}
            <iframe
              src="https://maps.google.com/maps?q=Rue+Sabou,+Gauthier,+20060+Casablanca,+Maroc&t=&z=16&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte MSK - Rue Sabou, Gauthier, Casablanca"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

