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
  /**
   * - `parallax` drifts vertically with page scroll (the default).
   * - `float` crosses the viewport sideways forever, independent of scroll.
   * - `rise` travels bottom-to-top across its section, scrubbed to scroll.
   */
  motion?: "parallax" | "float" | "rise";
  /** `float` only: seconds for one full crossing. Lower is faster. */
  speed?: number;
  /** 0-1 starting point in the cycle, to spread clouds apart. */
  phase?: number;
  /** `rise` only: full bottom-to-top passes across the scope. One per card. */
  cycles?: number;
}

export const MethodeCloud = ({
  shape = "a",
  className,
  weight = 1,
  offset = 0,
  delay = 0,
  motion = "parallax",
  speed = 46,
  phase = 0,
  cycles = 1,
}: MethodeCloudProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // No entrance pop for floaters: they drift in from off the left edge, so
      // scaling them up as well is both redundant and a liability — above the
      // fold the trigger fires at once, and if the tween could not then finish
      // the cloud would be stranded at scale 0.
      if (motion !== "float") {
        // `from` with immediateRender:false, not `fromTo`. A fromTo would stamp
        // scale:0 on at mount, so any failure to run the tween — gsap not
        // loading, a JS error earlier in the page — would leave the clouds
        // permanently invisible rather than merely unanimated. This way the
        // shrunk state is only applied once the trigger has actually fired, and
        // the resting state is the visible one.
        gsap.from(el, {
          scale: 0,
          transformOrigin: "center center",
          duration: 1.2,
          ease: "elastic.out(1, 1)",
          delay,
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top bottom" },
        });
      }

      if (motion === "float") {
        // Seamless sideways loop. The cloud starts one width off the left edge
        // and travels the viewport plus its own width, so the wrap point sits
        // off-screen and never shows as a jump. `modifiers` does the wrapping,
        // which keeps it to a single tween rather than a restart per lap.
        const span = () => window.innerWidth + el.getBoundingClientRect().width;
        let total = span();

        // fromTo with immediateRender:false rather than a bare set + to. The
        // start state parks the cloud one width off the left edge, which is
        // what makes the wrap seam land off-screen — but applying that at mount
        // would hide the clouds outright if the tween never ran. Deferring it
        // to tween start keeps the CSS position as the resting state.
        const loop = gsap.fromTo(
          el,
          { xPercent: -100, x: 0 },
          {
            x: total,
            duration: speed,
            ease: "none",
            repeat: -1,
            immediateRender: false,
            modifiers: {
              x: gsap.utils.unitize((x: string) => parseFloat(x) % total),
            },
          },
        );

        // Phase, not delay: a delay would stall the cloud off-screen before its
        // first pass. Seeking into the loop starts it mid-crossing instead.
        loop.progress(phase % 1);

        // Recompute on resize, or the wrap distance stops matching the viewport
        // and the cloud starts jumping mid-screen.
        const onResize = () => {
          total = span();
          loop.invalidate();
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }

      if (motion === "rise") {
        // One full bottom-to-top pass per card, then round again from below.
        //
        // Driven off a wrapped progress rather than a plain fromTo: the deck's
        // own trigger runs 0-1 across the whole column, so multiplying by
        // `cycles` and taking the remainder gives each card its own pass.
        //
        // Travel is measured against the viewport, not yPercent. yPercent is a
        // share of the element's own height, so at these sizes a cloud would
        // shift about 70px — nowhere near "all the way up", and the wrap would
        // land mid-frame in plain sight. Spanning the frame plus twice the
        // cloud height puts both ends safely off-screen, so the reset is
        // invisible.
        const scope =
          el.closest<HTMLElement>("[data-cloud-scope]") ?? el.closest("section");
        // Frame + twice the cloud + a margin. Without the margin the extremes
        // sit exactly flush with the frame edges — measured at 1px of
        // clearance — which leaves no room for the element's base offset to be
        // slightly off centre, and the reset shows as a flicker at the rim.
        const WRAP_MARGIN = 120;
        const span = () =>
          window.innerHeight +
          el.getBoundingClientRect().height * 2 +
          WRAP_MARGIN;

        ScrollTrigger.create({
          trigger: scope ?? el,
          start: "top top",
          end: "bottom center",
          scrub: true,
          onUpdate: (self) => {
            const local = (((self.progress * cycles + phase) % 1) + 1) % 1;
            const s = span();
            gsap.set(el, { y: s / 2 - local * s });
          },
        });
        return;
      }

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
  }, [weight, offset, delay, motion, speed, phase, cycles]);

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
