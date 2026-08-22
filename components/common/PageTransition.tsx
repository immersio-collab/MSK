"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const overlayVariants = {
  initial: { scale: 0, rotate: 45 },
  animate: {
    scale: [0, 3.5, 3.5, 0],
    transition: {
      duration: 0.9,
      times: [0, 0.45, 0.55, 1],
      ease: "easeInOut",
    },
  },
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.45, duration: 0.3 },
  },
  exit: { opacity: 0 },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay carré qui balaie l'écran */}
      <AnimatePresence>
        <motion.div
          key={pathname + "-overlay"}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          className="bg-msk-coral-500"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "150vmax",
            height: "150vmax",
            marginTop: "-75vmax",
            marginLeft: "-75vmax",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      </AnimatePresence>

      {/* Contenu de page */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
