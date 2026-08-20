"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandProps {
  src: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  useWindowScroll?: boolean;
  mediaZoom?: number;
  children?: React.ReactNode;
}

export default function ScrollExpand({
  src,
  alt = "Image",
  title,
  scrollHint,
  useWindowScroll = false,
  mediaZoom = 1.2,
  children,
}: ScrollExpandProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useWindowScroll determines whether to track scroll of the window or the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Expand width from 60% to 100% as you scroll down
  const width = useTransform(scrollYProgress, [0.1, 0.5], ["60%", "100%"]);
  // Zoom image from mediaZoom to 1
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [mediaZoom, 1]);
  // Border radius from 2rem to 0
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.5], ["32px", "0px"]);
  // Opacity for children to fade in
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden bg-[#FDFBF7]">
      {/* Optional Title/Hint */}
      {(title || scrollHint) && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 text-center">
          {title && <h2 className="text-xl md:text-2xl font-bold tracking-widest text-slate-800 uppercase">{title}</h2>}
          {scrollHint && <p className="text-sm text-slate-500 mt-2 animate-bounce">{scrollHint} ↓</p>}
        </div>
      )}

      {/* Expandable Image Container */}
      <motion.div
        style={{ width, borderRadius }}
        className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center shadow-2xl"
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ scale }}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />
        
        {/* Content overlay */}
        {children && (
          <motion.div 
            style={{ opacity, y }} 
            className="relative z-10 p-8 md:p-12 text-center max-w-3xl mx-auto bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
