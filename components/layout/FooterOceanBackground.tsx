"use client";

import React, { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

export const FooterOceanBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !containerRef.current) return;

      animRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: "/ocean-bed.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMax meet",
        },
      });

      // IntersectionObserver for performance: only run when footer is near/in viewport
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              animRef.current?.play();
            } else {
              animRef.current?.pause();
            }
          }
        },
        { rootMargin: "150px 0px" }
      );

      observer.observe(containerRef.current);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-70"
    >
      {/*
        La scène est une BANDE calée en bas, à son propre ratio (1667x1080), et
        non un calque plein cadre. Sur mobile elle est élargie à 190 % et
        recentrée : à 100 % de 375px la scène ne faisait que 243px de haut et
        poissons comme algues devenaient minuscules. Le débord latéral est
        rogné par l'`overflow-hidden` du parent, le bas reste ancré.

        En `inset-0 h-full` + `slice`, lottie-web mettait la comp à l'échelle
        pour COUVRIR la boîte. Sur mobile le footer est haut et étroit (375x900,
        ratio 0,42 contre 1,54 pour la scène) : elle était donc mise à l'échelle
        par la hauteur, débordait énormément en largeur, et l'on ne voyait qu'un
        rail vertical — poissons tranchés, algues hors cadre. Le desktop, lui,
        est large et court, donc l'échelle se faisait par la largeur : c'est
        pourquoi lui seul paraissait correct.

        À ratio imposé, `meet` n'a plus rien à recadrer : la scène entière est
        visible sur mobile. Sur desktop la bande est plus haute que le footer et
        déborde par le haut — bornée par l'`overflow-hidden` du parent, ce qui
        redonne exactement le cadrage bas actuel.
      */}
      <div
        ref={containerRef}
        className="absolute bottom-0 left-1/2 w-[190%] -translate-x-1/2 aspect-[1667/1080] sm:left-0 sm:w-full sm:translate-x-0"
      />
    </div>
  );
};
