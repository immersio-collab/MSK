"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /**
   * `view` (défaut) : anime quand l'élément entre dans le viewport.
   * `mount` : anime dès le montage — pour l'au-dessus-du-pli (héros), où un
   * trigger de scroll ne se déclencherait jamais ou laisserait l'élément caché.
   */
  mode?: "view" | "mount";
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 40,
  mode = "view",
}: FadeUpProps) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={mode === "mount" ? target : undefined}
      whileInView={mode === "view" ? target : undefined}
      viewport={mode === "view" ? { once: true, margin: "-50px" } : undefined}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
