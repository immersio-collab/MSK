"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ChevronLeft, Clock } from "lucide-react";

const schedule = [
  { time: "08:30", title: "Accueil & Rituel", description: "Accueil individualisé et rituel du matin pour bien démarrer la journée.", icon: "🌅" },
  { time: "09:00", title: "Ateliers Montessori", description: "Manipulation, langage, et mathématiques en autonomie dirigée.", icon: "🧩" },
  { time: "10:30", title: "Pause Sensorielle", description: "Collation saine et moment de retour au calme.", icon: "🍎" },
  { time: "11:00", title: "Séances Thérapeutiques", description: "Neuro-Gym, orthophonie, ou psychomotricité selon les besoins.", icon: "🧠" },
  { time: "12:30", title: "Déjeuner & Temps Calme", description: "Repas convivial suivi d'un temps de repos ou de lecture.", icon: "🍱" },
  { time: "14:00", title: "Activités Créatives", description: "Arts plastiques, musique ou motricité globale.", icon: "🎨" },
  { time: "15:30", title: "Bilan Quotidien", description: "Cercle de fin de journée et échange rapide avec les parents.", icon: "💬" },
  { time: "16:00", title: "Sortie", description: "Fin de la journée d'école.", icon: "👋" },
];

export const EspacesJourneeTypeSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // A subtle parallax effect for the background element
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="journee-type" className="py-24 bg-msk-forest-950 relative overflow-hidden" ref={containerRef}>
      {/* Decorative Background */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-msk-forest-900/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Une Journée Type chez MSK
            </h2>
            <p className="text-lg text-msk-forest-200">
              Un rythme pensé pour respecter la chronobiologie de l'enfant, alternant concentration, apprentissage et détente.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-msk-forest-700 text-white flex items-center justify-center hover:bg-msk-forest-800 transition-colors"
              aria-label="Défiler à gauche"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-msk-forest-700 text-white flex items-center justify-center hover:bg-msk-forest-800 transition-colors bg-msk-coral-500 border-none"
              aria-label="Défiler à droite"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* The connecting line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-msk-forest-800 hidden md:block"></div>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {schedule.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-none w-[280px] md:w-[320px] snap-center relative"
              >
                {/* Node on the line */}
                <div className="hidden md:flex absolute top-20 left-6 w-4 h-4 rounded-full bg-msk-sun-400 border-4 border-msk-forest-950 z-10"></div>
                
                <div className="bg-msk-forest-900 border border-msk-forest-800 rounded-3xl p-8 h-full transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-msk-sun-500/10 group">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  
                  <div className="flex items-center gap-2 text-msk-sun-400 mb-3 font-bold">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-msk-coral-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-msk-forest-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
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
