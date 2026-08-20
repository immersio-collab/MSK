"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundLines = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden bg-transparent",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <SVG />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </div>
  );
};

const SVG = () => {
  // Generate a cool set of horizontal waves
  const paths = Array.from({ length: 25 }).map((_, i) => {
    const yOffset = i * 20;
    const amplitude = (i % 3 === 0) ? 60 : (i % 2 === 0 ? -40 : 80);
    return `M-200,${100 + yOffset} C300,${100 + yOffset + amplitude} 800,${100 + yOffset - amplitude} 1300,${100 + yOffset + amplitude} 2000,${100 + yOffset}`;
  });

  return (
    <svg
      viewBox="0 0 1800 600"
      preserveAspectRatio="none"
      className="h-full w-full opacity-[0.2]"
    >
      <defs>
        <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="30%" stopColor="#8b5cf6" />
          <stop offset="70%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {paths.map((path, idx) => (
        <motion.path
          key={idx}
          d={path}
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{
            pathLength: {
              duration: 4 + (idx % 5),
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 4 + (idx % 5),
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        />
      ))}
    </svg>
  );
};
