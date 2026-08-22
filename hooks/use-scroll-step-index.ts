"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives a scroll-pinned section: returns the index of the step whose sentinel
 * band currently straddles the viewport's mid-line.
 *
 * The caller renders one `[data-step-index]` element per step inside `ref`,
 * positioned as contiguous, non-overlapping bands. Because the bands tile the
 * whole column, exactly one can intersect the mid-line at a time.
 *
 * Deliberately not a `scroll` listener. Observing where the section actually is
 * behaves the same under anchor jumps, keyboard scroll, a restored scroll
 * position, and any smooth-scroll layer that may be reintroduced — and costs
 * nothing while the section is off-screen.
 */
export const useScrollStepIndex = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // A fast flick can coalesce several crossings into one callback, and
        // entry order is not chronological — take the most recent one that is
        // actually intersecting.
        let index = -1;
        let latest = -1;
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.time < latest) continue;
          latest = entry.time;
          index = Number((entry.target as HTMLElement).dataset.stepIndex);
        }
        if (index < 0 || Number.isNaN(index)) return;
        setActive((current) => (current === index ? current : index));
      },
      // A hairline band across the vertical middle of the viewport. The extra
      // 0.1% keeps the root from collapsing to zero area, which some engines
      // treat as never intersecting.
      { rootMargin: "-50% 0px -49.9% 0px", threshold: 0 },
    );

    root
      .querySelectorAll<HTMLElement>("[data-step-index]")
      .forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return { ref, active };
};
