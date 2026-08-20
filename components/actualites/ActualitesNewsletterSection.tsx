"use client";

import React from "react";
import { Send, BookOpen } from "lucide-react";

export const ActualitesNewsletterSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-msk-cream-200 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
          
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-msk-sun-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-msk-coral-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

          {/* Icon */}
          <div className="relative z-10 shrink-0">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-msk-coral-100 to-msk-sun-100 flex items-center justify-center shadow-inner">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                <BookOpen className="w-8 h-8 text-msk-coral-500" />
              </div>
            </div>
          </div>

          {/* Content & Form */}
          <div className="relative z-10 grow">
            <h2 className="text-2xl md:text-3xl font-bold text-msk-night-900 mb-3">
              Recevez nos ressources éducatives
            </h2>
            <p className="text-msk-night-700/90 mb-8 max-w-lg mx-auto md:mx-0">
              Inscrivez-vous à notre newsletter pour recevoir mensuellement des conseils d'experts, des astuces Montessori et des activités à faire à la maison.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="grow bg-[#FAF8F5] border-2 border-transparent rounded-xl px-5 py-4 text-msk-night-900 focus:outline-hidden focus:border-msk-coral-400 focus:bg-white transition-all"
                required
              />
              <button 
                type="submit"
                className="group inline-flex items-center justify-center gap-2 bg-msk-night-950 hover:bg-msk-night-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md shrink-0"
              >
                S'inscrire
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-4">
              En vous inscrivant, vous acceptez notre politique de confidentialité. Pas de spam, promis.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};
