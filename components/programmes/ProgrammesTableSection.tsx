"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export const ProgrammesTableSection: React.FC = () => {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const columns = [
    { title: "Critères", color: "text-msk-night-900", bg: "bg-transparent" },
    { title: "Maternelle", color: "text-msk-coral-600", bg: "bg-msk-coral-50", hoverBg: "hover:bg-msk-coral-50/80" },
    { title: "Primaire", color: "text-msk-sun-600", bg: "bg-msk-sun-50", hoverBg: "hover:bg-msk-sun-50/80" }
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
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-msk-night-900 mb-4">
            Comparatif des Programmes
          </h2>
          <p className="text-lg text-msk-night-700/80 max-w-2xl mx-auto">
            Un aperçu rapide de ce qui est inclus ou adapté selon l'âge de l'enfant.
          </p>
        </div>

        <div className="overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="min-w-[600px] w-full border border-msk-cream-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            {/* Header Row */}
            <div className="grid grid-cols-3 border-b border-msk-cream-200 bg-[#FAF8F5]">
              {columns.map((col, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 text-center font-bold text-lg ${col.color} border-r last:border-r-0 border-msk-cream-200/50 transition-colors duration-300 ${hoveredCol === idx && idx > 0 ? col.bg : ''}`}
                  onMouseEnter={() => setHoveredCol(idx)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  {col.title}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {rows.map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-3 border-b last:border-b-0 border-msk-cream-200/50 hover:bg-gray-50/50 transition-colors">
                {/* Row Label */}
                <div 
                  className="p-4 md:p-6 text-left font-semibold text-msk-night-800 border-r border-msk-cream-200/50 flex items-center"
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
                      className={`p-4 md:p-6 text-center border-r last:border-r-0 border-msk-cream-200/50 flex items-center justify-center transition-colors duration-300 ${hoveredCol === colIdx ? columns[colIdx].bg : ''}`}
                      onMouseEnter={() => setHoveredCol(colIdx)}
                      onMouseLeave={() => setHoveredCol(null)}
                    >
                      {val === true ? (
                        <div className={`w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center border border-msk-cream-200 ${columns[colIdx].color}`}>
                          <Check className="w-5 h-5" />
                        </div>
                      ) : val === "—" ? (
                        <span className="text-gray-300 font-bold">—</span>
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
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};
