"use client";

import React from "react";

export const FooterWaveTransition: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute -top-14 sm:-top-20 md:-top-24 inset-x-0 w-full h-18 sm:h-24 md:h-28 overflow-hidden pointer-events-none select-none z-20"
    >
      <style jsx>{`
        @keyframes waveDriftSlow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-25%, 3px, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes waveDriftFast {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          50% {
            transform: translate3d(-25%, -4px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes waveDriftFore {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-25%, 4px, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .anim-wave-1 {
          animation: waveDriftSlow 14s ease-in-out infinite;
        }
        .anim-wave-2 {
          animation: waveDriftFast 10s ease-in-out infinite;
        }
        .anim-wave-3 {
          animation: waveDriftFore 7.5s ease-in-out infinite;
        }
      `}</style>

      {/* Wave Layer 1 (Distant ambient wave - deep blue) */}
      <div className="anim-wave-1 absolute bottom-0 left-0 w-[200%] h-full opacity-40">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full fill-msk-night-900"
        >
          <path d="M0,45 C150,5 350,85 600,45 C750,5 950,85 1200,45 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Wave Layer 2 (Mid-depth wave - contrasting roll) */}
      <div className="anim-wave-2 absolute bottom-0 left-0 w-[200%] h-full opacity-70">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full fill-msk-night-900"
        >
          <path d="M0,55 C180,95 420,15 600,55 C780,95 1020,15 1200,55 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Wave Layer 3 (Foreground surface that seamlessly connects to footer background) */}
      <div className="anim-wave-3 absolute bottom-0 left-0 w-[200%] h-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full fill-msk-night-950"
        >
          <path d="M0,65 C200,20 400,105 600,65 C800,20 1000,105 1200,65 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
};
