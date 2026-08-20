"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MethodStep {
  number: string;
  step: string;
  title: string;
  description: string;
  image: string;
}

interface MethodHoverExpandProps {
  steps: MethodStep[];
  className?: string;
}

export const MethodHoverExpand: React.FC<MethodHoverExpandProps> = ({
  steps,
  className,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop & Tablet: Horizontal Expanding Cards */}
      <div className="hidden md:flex w-full items-stretch justify-center gap-2.5 lg:gap-3.5 h-[460px] lg:h-[500px]">
        {steps.map((item, index) => {
          const isActive = activeStep === index;

          return (
            <motion.div
              key={item.number}
              className="relative cursor-pointer overflow-hidden rounded-3xl select-none group"
              animate={{
                flex: isActive ? 4 : 1,
              }}
              transition={{
                duration: 0.45,
                ease: [0.32, 0.72, 0, 1],
              }}
              onClick={() => setActiveStep(index)}
              onHoverStart={() => setActiveStep(index)}
            >
              {/* Full Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1200px) 50vw, 33vw"
                className={cn(
                  "object-cover transition-transform duration-700 ease-out",
                  isActive ? "scale-105" : "scale-110 brightness-[0.7] group-hover:brightness-90"
                )}
                priority={index <= 2}
              />

              {/* Clean Dark Scrim Overlay (ensures 100% legibility) */}
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-300",
                  isActive
                    ? "bg-linear-to-t from-black/90 via-black/40 to-black/20"
                    : "bg-linear-to-t from-black/80 via-black/30 to-black/30 group-hover:from-black/70"
                )}
              />

              {/* Number (Always visible top-left) */}
              <div className="absolute top-5 left-5 z-20">
                <span className="text-sm font-bold tracking-wider text-white/90">
                  {item.number}
                </span>
              </div>

              {/* Collapsed State: Vertical Step Name */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col justify-end items-center pb-8 pointer-events-none z-10"
                  >
                    <p className="[writing-mode:vertical-lr] rotate-180 text-sm font-semibold tracking-widest text-white/80 uppercase">
                      {item.step}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded State: Clean Typography */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 }}
                    className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-20 text-white"
                  >
                    <div className="max-w-xl space-y-2">
                      <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                        Étape {item.number} • {item.step}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm lg:text-base text-white/85 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: Accordion */}
      <div className="flex md:hidden flex-col gap-3">
        {steps.map((item, index) => {
          const isActive = activeStep === index;

          return (
            <motion.div
              key={item.number}
              onClick={() => setActiveStep(index)}
              className={cn(
                "relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300",
                isActive ? "h-64" : "h-16"
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                className={cn(
                  "absolute inset-0",
                  isActive
                    ? "bg-linear-to-t from-black/90 via-black/50 to-black/30"
                    : "bg-black/60"
                )}
              />

              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-white/70">
                      {item.number}
                    </span>
                    <span className="text-sm font-semibold tracking-wide uppercase">
                      {item.step}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                  >
                    <h4 className="text-base font-bold text-white leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
