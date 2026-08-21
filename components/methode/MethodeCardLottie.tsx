"use client";

import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * Thin wrapper around the <dotlottie-wc> custom element.
 *
 * The player script and the animation JSON are both loaded from third-party
 * origins at runtime (unpkg and maximatherapy.com). If either is unreachable the
 * element renders nothing, so this mark is not guaranteed the way the inline SVG
 * motif is — see MethodeCardMotif, which needs no network at all.
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-wc": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        speed?: string;
        mode?: string;
        loop?: boolean;
        autoplay?: boolean;
      };
    }
  }
}

export const MethodeCardLottie = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => (
  <span className={`block ${className ?? ""}`.trim()} aria-hidden>
    <dotlottie-wc
      src={src}
      speed="1"
      mode="forward"
      loop
      autoplay
      style={{ width: "100%", height: "100%" }}
    />
  </span>
);
