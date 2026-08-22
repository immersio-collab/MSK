"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";

export const ProgrammesTableSection: React.FC = () => {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const columns = [
    { title: "Critères", color: "text-msk-night-900", bg: "bg-transparent" },
    { title: "Maternelle", color: "text-msk-coral-600", bg: "bg-msk-coral-50" },
    { title: "Primaire", color: "text-msk-sun-600", bg: "bg-msk-sun-50" }
  ];

  const rows = [
    { label: "Âge", values: ["2-5 ans", "6-11 ans"] },
    { label: "Pédagogie Montessori", values: [true, true] },
    { label: "Séances Neuro-Gym", values: [true, true] },
    { label: "Orthophonie", values: [true, true] },
    { label: "Intégration scolaire", values: ["—", true] },
    { label: "Soutien Psychologique", values: ["Parents", "Enfant & Parents"] },
    { label: "Coaching / Orientation", values: ["—", "—"] }
  ];

  return (
    <section className="relative bg-msk-cream-100 py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <FadeUp>
          <div className="mb-16 text-center">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-msk-coral-600">
              Vue d&apos;ensemble
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-msk-night-900 md:text-5xl">
              Comparatif des Programmes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-msk-night-700">
              Un aperçu rapide de ce qui est inclus ou adapté selon l&apos;âge de l&apos;enfant.
            </p>
          </div>
        </FadeUp>

        <div className="-mx-6 hide-scrollbar overflow-x-auto pb-8 px-6 sm:mx-0 sm:px-0">
          <div className="min-w-[600px] w-full overflow-hidden rounded-2xl border border-msk-cream-300 bg-white shadow-xs">
            {/* Header Row */}
            <div className="grid grid-cols-3 border-b border-msk-cream-300 bg-msk-cream-100">
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  className={`border-r border-msk-cream-300/50 p-6 text-center text-lg font-bold last:border-r-0 transition-colors duration-300 ${col.color} ${hoveredCol === idx && idx > 0 ? col.bg : ""}`}
                  onMouseEnter={() => setHoveredCol(idx)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  {col.title}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {rows.map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-3 border-b border-msk-cream-300/50 last:border-b-0 transition-colors hover:bg-msk-cream-100/50">
                {/* Row Label */}
                <div
                  className="flex items-center border-r border-msk-cream-300/50 p-4 text-left font-semibold text-msk-night-800 md:p-6"
                  onMouseEnter={() => setHoveredCol(0)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  {row.label}
                </div>

                {/* Values */}
                {row.values.map((val, vIdx) => {
                  const colIdx = vIdx + 1;
                  return (
                    <div
                      key={vIdx}
                      className={`flex items-center justify-center border-r border-msk-cream-300/50 p-4 last:border-r-0 transition-colors duration-300 md:p-6 ${hoveredCol === colIdx ? columns[colIdx].bg : ""}`}
                      onMouseEnter={() => setHoveredCol(colIdx)}
                      onMouseLeave={() => setHoveredCol(null)}
                    >
                      {val === true ? (
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border border-msk-cream-300 bg-white shadow-xs ${columns[colIdx].color}`}>
                          <Check className="h-5 w-5" />
                        </div>
                      ) : val === "—" ? (
                        <span className="font-bold text-msk-cream-300">—</span>
                      ) : (
                        <span className="font-medium text-msk-night-700">{val}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
