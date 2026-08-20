"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollStrokePathProps {
  className?: string;
  targetRef?: React.RefObject<HTMLElement>;
}

// Single continuous path starting directly behind the 3D character video in the Hero Section and flowing to the Footer
const SINGLE_HERO_TO_FOOTER_PATH =
  "M 750 380 " +
  "C 750 600, 540 800, 300 1020 " +
  "C 100 1220, 110 1460, 320 1680 " +
  "C 540 1880, 880 1840, 860 2150 " +
  "C 840 2420, 520 2550, 220 2750 " +
  "C -40 2950, 350 3180, 780 3350 " +
  "C 960 3500, 740 3780, 500 4000";

export function ScrollStrokePath({ className, targetRef }: ScrollStrokePathProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const activeRef = targetRef || fallbackRef;

  // Real-time scroll binding with 0 delay (no spring smoothing lag)
  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: ["start start", "end end"],
  });

  // Direct 1:1 scroll progress
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={fallbackRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden w-full h-full",
        className
      )}
    >
      <svg
        viewBox="0 0 1000 4000"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* MSK Montessori strong signature gradient */}
          <linearGradient id="mskCleanScrollGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DF5B85" stopOpacity="1" />    {/* Coral */}
            <stop offset="25%" stopColor="#F5B738" stopOpacity="1" />   {/* Sunshine Yellow */}
            <stop offset="50%" stopColor="#6AAEE0" stopOpacity="1" />   {/* Sky Blue */}
            <stop offset="75%" stopColor="#DF5B85" stopOpacity="1" />   {/* Coral */}
            <stop offset="100%" stopColor="#F5B738" stopOpacity="1" />  {/* Sunshine Gold */}
          </linearGradient>

          {/* Clean Soft Shadow */}
          <filter id="mskCleanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#DF5B85" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Single strong animated progressive stroke (no faint ghost path) */}
        <motion.path
          d={SINGLE_HERO_TO_FOOTER_PATH}
          stroke="url(#mskCleanScrollGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#mskCleanGlow)"
          opacity={0.4}
          style={{
            pathLength,
          }}
        />
      </svg>
    </div>
  );
}
