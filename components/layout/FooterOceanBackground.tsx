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
          preserveAspectRatio: "xMidYMax slice",
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
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
