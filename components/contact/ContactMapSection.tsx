"use client";

import React from "react";
import { FadeUp } from "@/components/motion/FadeUp";

export const ContactMapSection: React.FC = () => {
  return (
    <section className="w-full bg-transparent px-5 pb-[4.1875rem] lg:px-[2rem]">
      {/* Framed card wrapper matching website design system */}
      <div className="relative w-full overflow-hidden rounded-[1.25rem] border border-msk-cream-300 bg-white p-3 md:p-5 shadow-xl">
        <FadeUp className="h-full w-full">
          <div className="relative h-[500px] w-full overflow-hidden rounded-xl border border-msk-cream-200 sm:h-[580px] lg:h-[640px]">
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

