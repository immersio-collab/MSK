"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  The site's button. Pill-to-circle hover.

  The button keeps its pill footprint in the layout; the coloured shape behind
  the label is an absolutely positioned sibling that grows from the pill height
  to a full circle whose diameter equals the button width — so it swells over
  the surrounding content instead of pushing it around.

  Two details make it read as a bounce rather than a resize:

  - Only `height` animates. Width never changes, and `rounded-full` clamps the
    radius to half the *smaller* side, so the shape passes through
    pill → circle and, on the overshoot, a barely-taller-than-wide capsule.
    A `scaleY` would give an ellipse instead, which is why this is not a transform.
  - Enter and leave use different curves. The enter winds up briefly, snaps, and
    overshoots ~8% past the circle; the leave collapses fast and squashes ~12px
    under the resting pill before springing back.

  `100cqw` is what ties the circle to the button width without measuring anything
  in JS: `<span className="@container">` is absolutely positioned, so giving it
  `container-type: inline-size` costs nothing (its width comes from the button,
  never from its contents) while making the button's own width queryable.

  THE FILL COLOUR NEVER CHANGES ON HOVER — only the shape animates. A
  `group-hover:bg-*` in `fillClassName` shipped once and made a label vanish:
  the fill turned white under a label that stayed white. And the label cannot
  compensate, because `className` lands on the ROOT, which is itself the
  `group`: a `group-hover:*` written there never matches anything, `.group:hover
  .x` being a descendant selector. Silent, like every Tailwind mistake here.
*/

/** Wind-up → snap → overshoot ~8% past the circle. */
const ENTER =
  "group-hover:duration-[440ms] group-hover:ease-[cubic-bezier(0.5,0.03,0.2,1.42)] " +
  "group-focus-visible:duration-[440ms] group-focus-visible:ease-[cubic-bezier(0.5,0.03,0.2,1.42)]";
/** Fast collapse → squash under the resting height → settle. */
const LEAVE = "duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const SIZES = {
  sm: "h-11 px-6",
  md: "h-14 px-8",
  lg: "h-16 px-12",
} as const;

interface MorphButtonProps {
  children: ReactNode;
  /** Renders a `next/link` when set, a `<button>` otherwise. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  size?: keyof typeof SIZES;
  /**
   * Typography and label colour — the component owns layout and motion only.
   * No `group-hover:*` here: this lands on the group itself and never applies.
   */
  className?: string;
  /** Background, border and shadow of the morphing shape. No hover colour. */
  fillClassName?: string;
  /**
   * Caps the circle diameter, e.g. `"14rem"`. Needed whenever the button can
   * stretch — a full-width button would otherwise open to a circle as tall as
   * the viewport. Past the cap the shape settles as a capsule instead.
   */
  maxDiameter?: string;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
}

export function MorphButton({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  size = "md",
  className,
  fillClassName = "bg-white",
  maxDiameter,
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
}: MorphButtonProps) {
  const content = (
    <>
      {/* Absolutely positioned, so `@container` reports the button width, not the label width. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 @container">
        <span
          className={cn(
            "absolute left-0 top-1/2 h-full w-full -translate-y-1/2 rounded-full",
            // Colours ride along so callers never need their own `transition-*`
            // in `fillClassName` — twMerge would drop the height transition.
            "transition-[height,background-color,border-color,box-shadow] motion-reduce:transition-none",
            "group-hover:h-[min(100cqw,var(--morph-max,100cqw))]",
            "group-focus-visible:h-[min(100cqw,var(--morph-max,100cqw))]",
            LEAVE,
            ENTER,
            fillClassName
          )}
        />
      </span>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  const style = maxDiameter
    ? ({ "--morph-max": maxDiameter } as CSSProperties)
    : undefined;

  const classes = cn(
    "group relative inline-flex items-center justify-center",
    "focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-60",
    SIZES[size],
    className
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={classes}
      style={style}
    >
      {content}
    </button>
  );
}
