"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix = "", className = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("fr-FR").format(Math.round(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
};

export const StatsSection = () => {
  const stats = [
    { value: 10, suffix: "+", label: "Années d'expérience", color: "text-msk-coral-500", bg: "bg-msk-coral-50" },
    { value: 40, suffix: "+", label: "Familles accompagnées", color: "text-msk-sun-500", bg: "bg-msk-sun-50" },
    { value: 6, suffix: "", label: "Étapes de la méthode MSK", color: "text-msk-blue-500", bg: "bg-msk-blue-50" },
    { value: 100, suffix: "%", label: "Programme individualisé", color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <section className="relative z-10 w-full py-16 md:py-24 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-10 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-[2rem] ${stat.bg} shadow-sm border border-white/60`}
            >
              <h3 className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter ${stat.color} mb-3 drop-shadow-sm`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm sm:text-base font-bold text-slate-700 leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
