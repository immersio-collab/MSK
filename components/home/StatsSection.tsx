"use client";

import React from "react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/data/site-content";

export const StatsSection: React.FC = () => {
  return (
    <section className="relative -mt-8 z-20 container mx-auto px-4 md:px-6 max-w-7xl">
      <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl border border-msk-forest-100 ring-1 ring-black/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-msk-forest-100">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`flex flex-col items-center text-center ${idx !== 0 ? "pt-4 md:pt-0 md:pl-6" : ""}`}
            >
              <span className="text-3xl md:text-4xl font-extrabold text-msk-forest-700 tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-msk-forest-900 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-msk-slate-500 mt-0.5 max-w-[200px]">
                {stat.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
