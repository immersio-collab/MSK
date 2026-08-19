"use client";

import React, { useEffect, useState } from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export const MotionDiv: React.FC<MotionWrapperProps> = ({
  children,
  variants,
  className = "",
  delay = 0,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
