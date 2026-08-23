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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.56000720448!2d-7.669394336082531!3d33.57240182604313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2801456d357%3A0xc3c5c1cb5282542a!2sOasis%2C%20Casablanca!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte MSK Casablanca"
              className="h-full w-full"
            ></iframe>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

