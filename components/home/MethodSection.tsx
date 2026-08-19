"use client";

import React from "react";
import { METHOD_STEPS } from "@/lib/data/site-content";
import { FadeUp } from "@/components/magicui/fade-up";
import { Eye, Brain, Sliders, Zap, Users, GraduationCap } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Eye": return <Eye className="h-7 w-7" />;
    case "Brain": return <Brain className="h-7 w-7" />;
    case "Sliders": return <Sliders className="h-7 w-7" />;
    case "Zap": return <Zap className="h-7 w-7" />;
    case "Users": return <Users className="h-7 w-7" />;
    case "GraduationCap": return <GraduationCap className="h-7 w-7" />;
    default: return <Eye className="h-7 w-7" />;
  }
};

const getColorThemes = (index: number) => {
  const themes = [
    "bg-msk-coral-50 text-msk-coral-600 border-msk-coral-200",
    "bg-msk-sun-50 text-msk-sun-600 border-msk-sun-200",
    "bg-msk-blue-50 text-msk-blue-600 border-msk-blue-200",
  ];
  return themes[index % themes.length];
};

export const MethodSection: React.FC = () => {
  return (
    <section id="methode" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Soft Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-msk-sun-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-msk-coral-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <FadeUp>
            <span className="inline-flex items-center justify-center rounded-full bg-msk-blue-100 text-msk-blue-700 px-4 py-1.5 text-sm font-bold uppercase tracking-widest mb-6">
              Notre Pédagogie
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-msk-night-900 tracking-tight leading-tight mb-6">
              La Méthode en 6 Étapes
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
              Un cheminement bienveillant et structuré pour accompagner l&apos;enfant 
              de ses premiers blocages jusqu&apos;à son insertion réussie.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {METHOD_STEPS.map((step, idx) => {
            const theme = getColorThemes(idx);
            return (
              <FadeUp key={step.number} delay={0.1 * idx} y={30} duration={0.6}>
                <div className={`relative h-full flex flex-col p-8 rounded-[2rem] border-2 bg-white shadow-xl shadow-slate-200/40 transition-transform duration-300 hover:-translate-y-2 group overflow-hidden ${theme.split(" ")[2]}`}>
                  
                  {/* Watermark Number */}
                  <span className={`absolute -right-4 -bottom-4 text-[120px] font-black opacity-[0.04] pointer-events-none ${theme.split(" ")[1]}`}>
                    {step.number}
                  </span>

                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${theme.split(" ")[0]} ${theme.split(" ")[1]}`}>
                    {getIcon(step.icon)}
                  </div>
                  
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className={`text-sm font-black uppercase tracking-widest ${theme.split(" ")[1]}`}>
                      Étape {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-msk-night-900 mb-4 leading-snug">
                    {step.title}
                  </h3>
                  
                  <p className="text-slate-600 font-medium leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};
