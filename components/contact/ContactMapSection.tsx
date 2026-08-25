"use client";

import React from "react";
import { FadeUp } from "@/components/motion/FadeUp";

export const ContactMapSection: React.FC = () => {
  return (
    // `lg:screen-section` : la carte occupe exactement une fenêtre à partir de
    // lg. Pas de marge haute — c'est le `pb` du panneau de formulaire juste
    // au-dessus qui fait l'espace, en ajouter une ici doublerait l'écart.
    <section className="w-full bg-transparent px-5 pb-[4.1875rem] lg:screen-section lg:px-[2rem]">
      {/* Framed card wrapper matching website design system */}
      <div className="relative w-full overflow-hidden rounded-[1.25rem] border border-msk-cream-300 bg-white p-3 shadow-xl md:p-5 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <FadeUp className="h-full w-full lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
          {/*
            La carte prend la place qui reste (`flex-1`), au lieu des 640px
            figés qui poussaient la section à 749px — une fenêtre de 720 plus
            29px. `min-h-0` est obligatoire : sans lui un enfant flex refuse de
            descendre sous sa taille de contenu et le `flex-1` ne sert à rien.
          */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-msk-cream-200 sm:h-[580px] lg:h-auto lg:min-h-0 lg:flex-1">
            {/* Google Maps iframe spanning 100% width & height */}
            <iframe
              src="https://maps.google.com/maps?q=Rue+Sabou,+Gauthier,+20060+Casablanca,+Maroc&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte MSK - Rue Sabou, Gauthier, Casablanca"
              className="h-full w-full"
            ></iframe>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

