"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

/**
 * Renders one of the Lottie animations in public/methode/lottie.
 *
 * lottie-web is imported dynamically so its ~250KB stays out of the initial
 * bundle, and playback is gated on an IntersectionObserver: an animation that
 * is off-screen is paused rather than burning frames. With several of these on
 * one page that matters.
 *
 * The JSON carries its own colours, so these marks do not inherit their
 * container's tone the way the inline SVG components do — pick card fills that
 * sit behind them rather than expecting them to adapt.
 */
export const MethodeLottie = ({
  src,
  className,
  loop = true,
}: {
  src: string;
  className?: string;
  loop?: boolean;
}) => {
  const host = useRef<HTMLDivElement | null>(null);
  const anim = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !host.current) return;

      anim.current = lottie.loadAnimation({
        container: host.current,
        renderer: "svg",
        loop,
        autoplay: false,
        path: src,
      });

      // Only run while on screen. Compositor-driven, so it works under Lenis.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) anim.current?.play();
            else anim.current?.pause();
          }
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(host.current);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      anim.current?.destroy();
      anim.current = null;
    };
  }, [src, loop]);

  return <div ref={host} aria-hidden className={className} />;
};
