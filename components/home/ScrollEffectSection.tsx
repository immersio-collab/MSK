"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";

  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-msk-coral-500", isSpace && "w-4 md:w-8")}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};

export const ScrollEffectSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const text = "Chaque enfant a son rythme. Nous lui créons son chemin.";
  const words = text.split(" ");
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  let globalIndex = 0;
  const wordElements = words.map((word) => {
    const chars = word.split("").map((char) => ({ char, index: globalIndex++ }));
    const space = { char: " ", index: globalIndex++ };
    return { chars, space };
  });

  return (
    <ReactLenis root>
      <div className="w-full bg-[#FDFBF7]">
        <div
          ref={targetRef}
          className="relative box-border flex h-[calc(100vh-80px)] items-center justify-center gap-[2vw] overflow-hidden bg-[#FDFBF7] p-[2vw]"
        >
          <div
            className="font-geist w-full max-w-5xl text-center text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-msk-night-900 flex flex-wrap justify-center gap-y-2 md:gap-y-4"
            style={{
              perspective: "500px",
            }}
          >
            {wordElements.map((wordObj, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {wordObj.chars.map((c) => (
                  <CharacterV1
                    key={c.index}
                    char={c.char}
                    index={c.index}
                    centerIndex={centerIndex}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
                {wordIndex !== wordElements.length - 1 && (
                  <CharacterV1
                    key={wordObj.space.index}
                    char={wordObj.space.char}
                    index={wordObj.space.index}
                    centerIndex={centerIndex}
                    scrollYProgress={scrollYProgress}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};
