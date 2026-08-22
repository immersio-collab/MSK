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
/** Frames sampled when measuring the artwork's travelled bounds. */
const SAMPLES = 12;

export const MethodeLottie = ({
  src,
  className,
  loop = true,
  fit = true,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  /** Crop the viewBox to the artwork so marks fill their box consistently. */
  fit?: boolean;
}) => {
  const host = useRef<HTMLDivElement | null>(null);
  const anim = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let isVisible = false;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !host.current) return;

      anim.current = lottie.loadAnimation({
        container: host.current,
        renderer: "svg",
        loop,
        autoplay: false,
        path: src,
      });

      // Crop the viewBox to the artwork.
      //
      // These files are exported on whatever canvas the comp happened to use,
      // and the art does not fill it consistently — card3 occupies 40% of its
      // 2018px canvas while card5 occupies 93% of a 1080px one. Rendered into
      // identical boxes that makes some marks look half the size of others.
      //
      // The bounds are sampled across the timeline and unioned, not taken from
      // a single frame: these animations move, and cropping to frame 0 would
      // clip whatever travels outside it later.
      // Only run while on screen. Compositor-driven, so it is independent of
      // however the page happens to be scrolled.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
            if (isVisible) anim.current?.play();
            else anim.current?.pause();
          }
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(host.current);

      anim.current.addEventListener("DOMLoaded", () => {
        if (!fit || !anim.current || !host.current) return;
        const svg = host.current.querySelector("svg");
        if (!svg) return;

        const total = anim.current.totalFrames;
        let x0 = Infinity;
        let y0 = Infinity;
        let x1 = -Infinity;
        let y1 = -Infinity;

        for (let i = 0; i <= SAMPLES; i += 1) {
          anim.current.goToAndStop((total * i) / SAMPLES, true);
          try {
            const b = svg.getBBox();
            if (!b.width || !b.height) continue;
            x0 = Math.min(x0, b.x);
            y0 = Math.min(y0, b.y);
            x1 = Math.max(x1, b.x + b.width);
            y1 = Math.max(y1, b.y + b.height);
          } catch {
            // Restore playback state if error
            if (isVisible) anim.current.play();
            return;
          }
        }
        
        anim.current.goToAndStop(0, true);

        if (Number.isFinite(x0) && x1 > x0 && y1 > y0) {
          const pad = Math.max(x1 - x0, y1 - y0) * 0.04;
          svg.setAttribute(
            "viewBox",
            `${x0 - pad} ${y0 - pad} ${x1 - x0 + pad * 2} ${y1 - y0 + pad * 2}`,
          );
          svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }

        // Restore playback state after crop
        if (isVisible) anim.current.play();
      });
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      anim.current?.destroy();
      anim.current = null;
    };
  }, [src, loop, fit]);

  return <div ref={host} aria-hidden className={className} />;
};
