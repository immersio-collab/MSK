"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordPullUpProps {
  text: string;
  className?: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
}

export function WordPullUp({
  text,
  className,
  delayMultiple = 0.1,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delayMultiple,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
}: WordPullUpProps) {
  const words = text.split(" ");

  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "8px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
