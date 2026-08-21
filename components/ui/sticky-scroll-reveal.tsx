"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode; 
    mobileImage?: React.ReactNode;
  }[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire section container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Distribute active cards evenly across scroll progress [0, 1]
    const index = Math.min(Math.floor(latest * cardLength), cardLength - 1);
    setActiveCard(Math.max(0, index));
  });

  // MSK Brand Neutral Backgrounds (soft light colors)
  const backgroundColors = [
    "#fdfbf7", // msk-cream-50
    "#f1f7fc", // msk-blue-50
    "#fdf4f7", // msk-coral-50
    "#fef9ee", // msk-sun-50
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: `${cardLength * 50}vh` }} // scroll depth proportional to the number of spaces
    >
      {/* Sticky viewport container - pinned just below the 80px (top-20) navbar */}
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        className="sticky top-0 left-0 w-full h-screen flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 px-6 md:px-16 pt-20 overflow-hidden transition-colors duration-500"
      >
        {/* Left/Top Content: Active Image (order-1 on mobile for visual focus, order-2 on desktop) */}
        <div
          className={cn(
            "order-1 lg:order-2 relative h-[38vh] w-full sm:h-[45vh] lg:h-[32rem] lg:w-[44rem] shrink-0 overflow-hidden rounded-3xl shadow-2xl",
            contentClassName,
          )}
        >
          <AnimatePresence>
            <motion.div
              key={activeCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {content[activeCard].content ?? null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right/Bottom Content: Active Text Content */}
        <div className="order-2 lg:order-1 w-full lg:max-w-2xl flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4 lg:space-y-6 text-center lg:text-left"
            >
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-msk-coral-500 block">
                Espace {activeCard + 1} sur {cardLength}
              </span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-msk-night-900 leading-tight">
                {content[activeCard].title}
              </h3>
              <p className="text-slate-600 text-sm md:text-lg lg:text-xl leading-relaxed">
                {content[activeCard].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
