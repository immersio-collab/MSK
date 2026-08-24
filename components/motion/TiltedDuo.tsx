"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Two tilted square windows onto one continuous photograph.
 *
 * The trick is that the picture is never rotated — only the windows are. Each
 * frame carries a rotation and its immediate child carries the exact opposite,
 * about the same centre, so the two cancel and the photo inside sits upright;
 * `overflow-hidden` still clips in the frame's own space, so the *opening* is
 * what tilts. Both frames then draw the same image at the same place in a shared
 * scene, which is why the subject runs across the gap unbroken instead of
 * reading as two separate crops.
 *
 * The picture is drawn across a scene W wide and 0.7W tall, **bled out by 0.14W
 * on all four sides**. The bleed is what stops the frames showing bare corners
 * as they turn: a square of side `s` rotated by θ about its centre pushes its
 * corners `s/2·(cosθ + sinθ - 1)` past its upright box. That term peaks at 45°,
 * where it is `s·(√2 - 1)/2` — 0.120W for the larger frame — so 0.14W covers
 * *any* angle, and the tilt range below can be pushed without recomputing it.
 * With too little bleed the clip window sweeps onto nothing and the cream page
 * shows through the corners.
 *
 * Each frame then expresses that bled rect in its own box: a frame of side `s`
 * draws the image `1.28W/s` wide and `0.98W/s` tall, offset by minus its own
 * position less the bleed. Every frame must resolve to the same aspect ratio
 * (1.28/0.98 = 1.306) or `object-cover` crops them differently and the halves
 * stop lining up. Move or resize a frame and its four numbers are recomputed.
 *
 * Scroll turns the windows only. Each frame's counter-rotation is scrubbed by
 * the same trigger, so the photograph inside stays perfectly still while the
 * openings rotate over it. The resting angles live in `style`, so with no
 * JavaScript — or if gsap fails — the composition still renders at its load
 * angle rather than flat or invisible, per .agents/rules/scroll-page-composition.md.
 */

/**
 * Resting tilt of each frame, in degrees, and where the scrub carries it. The
 * ranges straddle the composition's neutral look, so mid-scroll — where the
 * section actually sits while being read — lands near the gentle tilt the design
 * calls for, and the travel either side is what reads as motion.
 */
const FRAMES = [
  { key: "a", from: -14, to: 6 },
  { key: "b", from: 12, to: -8 },
] as const;

interface TiltedDuoProps {
  src: string;
  alt: string;
  className?: string;
}

export const TiltedDuo = ({
  src,
  alt,
  className,
}: TiltedDuoProps) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      FRAMES.forEach(({ key, from, to }) => {
        const scrollTrigger = {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        };
        // The frame opens up; the counter-rotation tracks it so the photo
        // inside stays upright through the whole scrub.
        gsap.fromTo(
          `[data-tilt-frame="${key}"]`,
          { rotation: from },
          { rotation: to, ease: "none", scrollTrigger }
        );
        gsap.fromTo(
          `[data-tilt-inner="${key}"]`,
          { rotation: -from },
          { rotation: -to, ease: "none", scrollTrigger }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className={cn("relative w-full", className)}
      style={{ aspectRatio: "10 / 7" }}
    >
      {/* Top-left window: at the scene origin, so it offsets by the bleed alone. */}
      <div
        data-tilt-frame="a"
        className="absolute left-0 top-0 aspect-square w-[58%] overflow-hidden rounded-[2rem] shadow-xl shadow-msk-night-900/15"
        style={{ transform: "rotate(-14deg)" }}
      >
        <div
          data-tilt-inner="a"
          className="absolute inset-0"
          style={{ transform: "rotate(14deg)" }}
        >
          <div className="absolute left-[-24.1%] top-[-24.1%] h-[169%] w-[220.7%]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>

      {/* Bottom-right window: same picture, pulled back by its own position. */}
      <div
        data-tilt-frame="b"
        className="absolute bottom-0 right-0 aspect-square w-[54%] overflow-hidden rounded-[2rem] shadow-xl shadow-msk-night-900/15"
        style={{ transform: "rotate(12deg)" }}
      >
        <div
          data-tilt-inner="b"
          className="absolute inset-0"
          style={{ transform: "rotate(-12deg)" }}
        >
          <div className="absolute left-[-111.1%] top-[-55.6%] h-[181.5%] w-[237%]">
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
