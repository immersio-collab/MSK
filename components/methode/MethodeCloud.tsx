"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Decorative cloud with a scroll-linked parallax drift.
 *
 * The two shapes arrived as bare path data with no wrapper, so the viewBoxes
 * below are the measured bounds of each path rather than an authored canvas.
 *
 * Motion follows the pattern the reference uses: pop in with an elastic
 * overshoot, then drift on a scrubbed ScrollTrigger over a band whose width is
 * set by `weight` and whose centre is shifted by `offset`. Both are expressed
 * as a percentage of the cloud's own height, so the effect scales with size.
 */

const SHAPES = {
  a: {
    viewBox: "250 376 383 139",
    d: "M633 514.999C626.404 474.185 593.488 443.147 553.853 443.147C539.594 443.147 526.189 447.18 514.585 454.236C510.585 410.306 476.325 375.969 434.614 375.969C403.713 375.969 376.903 394.818 363.468 422.434C353.391 417.516 342.185 414.736 330.399 414.736C285.97 414.767 250 453.656 250 501.619C250 506.171 250.336 510.631 250.947 514.999H633Z",
  },
  b: {
    viewBox: "1733 304 418 146",
    d: "M2150.68 450C2150.86 447.409 2151 444.819 2151 442.168C2151 388.738 2111.03 345.448 2061.71 345.448C2039.74 345.448 2019.62 354.07 2004.07 368.338C1986.17 330.168 1949.59 304 1907.38 304C1856.47 304 1813.77 342.008 1802.13 393.272C1799.02 392.725 1795.83 392.442 1792.56 392.442C1761.75 392.442 1736.39 417.619 1733 450.02H2150.68V450Z",
  },
} as const;

interface MethodeCloudProps {
  shape?: keyof typeof SHAPES;
  className?: string;
  /** Parallax strength. 0 pins the cloud to the page; 1 is a full-height drift. */
  weight?: number;
  /** Shifts the drift band up or down without changing its width. */
  offset?: number;
  /** Stagger for the entrance pop. */
  delay?: number;
}

export const MethodeCloud = ({
  shape = "a",
  className,
  weight = 1,
  offset = 0,
  delay = 0,
}: MethodeCloudProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0, transformOrigin: "center center" },
        { scale: 1, duration: 1.2, ease: "elastic.out(1, 1)", delay },
      );

      const centre = offset * 150;
      gsap.fromTo(
        el,
        { yPercent: -weight * 150 + centre },
        {
          yPercent: weight * 150 + centre,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom -100%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [weight, offset, delay]);

  const { viewBox, d } = SHAPES[shape];

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={viewBox}
      fill="currentColor"
      className={`pointer-events-none h-auto ${className ?? ""}`.trim()}
    >
      <path d={d} />
    </svg>
  );
};
