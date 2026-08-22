"use client";

import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";

gsap.registerPlugin(ScrollTrigger);

export const EquipeHeroSection = () => {
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);

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

      if (image.current) {
        gsap.to(image.current, { yPercent: 120, ease: "none", scrollTrigger: scrub });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-msk-cream-100 pb-16 pt-16 md:pb-20">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[75%] bg-msk-sun-400"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 72%, 0 100%)" }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
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
          className="absolute left-0 top-[26%] w-48 text-msk-sun-100 md:w-72"
        />
        <MethodeCloud
          motion="float"
          shape="a"
          speed={64}
          phase={0.8}
          className="absolute left-0 top-[8%] hidden w-32 text-msk-cream-50 lg:block"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <img
          ref={image}
          src="/children playing.svg"
          alt="Illustration enfants"
          className="mx-auto h-auto w-full max-w-3xl md:h-64 object-contain scale-[1.5] md:scale-[1.8] translate-y-20 md:translate-y-36 origin-bottom relative z-10 pointer-events-none"
        />

        <FadeUp delay={0.1}>
          <div className="mx-auto mt-4 max-w-2xl rounded-[1.75rem] bg-white px-8 py-8 text-center shadow-2xl md:px-12">
            <h1 className="font-display text-[2rem] font-bold uppercase leading-[0.9] text-msk-night-900 sm:text-4xl md:text-5xl">
              L'expertise au service de <span className="text-msk-coral-500">votre enfant.</span>
            </h1>

            <span className="mt-4 inline-block rounded-full bg-msk-coral-100 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-coral-700">
              La Fondatrice
            </span>

            <p className="mx-auto mt-4 max-w-md text-base font-medium leading-snug text-msk-night-800 md:text-lg">
              Découvrez le parcours de notre fondatrice, dédiée à l'épanouissement de chaque enfant par une approche inclusive.
            </p>

            <a
              href="#suite"
              aria-label="Aller à la suite"
              className="mx-auto mt-6 flex h-11 w-11 items-center justify-center rounded-full border-2 border-msk-night-200 text-msk-night-700 transition-colors hover:bg-msk-night-900 hover:text-white"
            >
              <ChevronDown className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
