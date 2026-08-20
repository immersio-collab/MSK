"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const STEPS = [
  {
    id: "01",
    title: "Observer",
    description: "Avant toute chose, nous observons. Pas de tests standardisés froids. Nos éducateurs passent du temps avec votre enfant dans un environnement naturel pour identifier ses forces, ses sensibilités sensorielles et son style d'apprentissage unique.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    color: "bg-msk-blue-500",
    textColor: "text-msk-blue-600",
    lightBg: "bg-msk-blue-50",
  },
  {
    id: "02",
    title: "Comprendre",
    description: "Notre équipe pluridisciplinaire — éducateurs Montessori, psychomotriciens, orthophonistes — croise ses observations avec votre témoignage de parent. Ensemble, nous construisons un portrait complet et bienveillant de votre enfant.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    color: "bg-msk-blue-600",
    textColor: "text-msk-blue-700",
    lightBg: "bg-msk-blue-100",
  },
  {
    id: "03",
    title: "Adapter",
    description: "L'environnement, le matériel, le rythme : tout est ajusté. Le matériel sensoriel Montessori est personnalisé, les séances sont calibrées, les supports pédagogiques sont conçus sur-mesure.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    color: "bg-msk-coral-500",
    textColor: "text-msk-coral-600",
    lightBg: "bg-msk-coral-50",
  },
  {
    id: "04",
    title: "Rééduquer",
    description: "Grâce à la Neuro-Gym et à la rééducation ciblée, nous stimulons les connexions neuro-motrices, régulons l'attention et libérons le potentiel cognitif. Des exercices concrets, mesurables, qui changent la vie.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    color: "bg-msk-coral-600",
    textColor: "text-msk-coral-700",
    lightBg: "bg-msk-coral-100",
  },
  {
    id: "05",
    title: "Accompagner",
    description: "Vous n'êtes jamais seuls. Des bilans réguliers, un dialogue transparent, une équipe disponible. Nous co-construisons chaque progrès avec vous, au quotidien.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    color: "bg-msk-sun-500",
    textColor: "text-msk-sun-600",
    lightBg: "bg-msk-sun-50",
  },
  {
    id: "06",
    title: "Insérer",
    description: "L'objectif final : l'autonomie. Que ce soit l'intégration dans une école classique, une formation professionnelle ou simplement la confiance en soi — nous préparons votre enfant à voler de ses propres ailes.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    color: "bg-msk-sun-600",
    textColor: "text-msk-sun-700",
    lightBg: "bg-msk-sun-100",
  },
];

const TimelineStep = ({ step, index }: { step: any; index: number }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const isNodeInView = useInView(ref, { once: false, margin: "-50% 0px" });

  return (
    <div ref={ref} className="relative z-10 w-full mb-24 md:mb-32 last:mb-0">
      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 ${isEven ? "" : "md:flex-row-reverse"}`}>
        
        {/* Central Node for Desktop (hidden on mobile, handled separately) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 z-20">
          <motion.div 
            className={`w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center ${step.color}`}
            initial={{ scale: 0 }}
            animate={isNodeInView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isNodeInView && (
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-white/50"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        {/* Content (Text) */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col justify-center relative"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Mobile Node (visible only on mobile) */}
          <div className="flex md:hidden items-center gap-4 mb-4">
            <div className={`w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-sm ${step.color}`}>
              {step.id}
            </div>
            <span className={`text-sm font-bold uppercase tracking-widest ${step.textColor}`}>
              Étape {step.id}
            </span>
          </div>

          <div className={`hidden md:inline-block px-4 py-1.5 rounded-full ${step.lightBg} ${step.textColor} font-bold text-sm tracking-widest uppercase mb-6 w-max`}>
            Étape {step.id}
          </div>
          
          <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-6 ${step.textColor} tracking-tight`}>
            {step.title}
          </h3>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            {step.description}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div 
          className="w-full md:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${step.color} z-10 transition-opacity duration-500 hover:opacity-0`}></div>
          <Image 
            src={step.image} 
            alt={step.title} 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

      </div>
    </div>
  );
};

export const MethodeTimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-24 md:py-40 bg-white overflow-hidden" ref={containerRef}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 relative">
        
        {/* Background Vertical Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 bg-slate-100 rounded-full">
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-msk-blue-500 via-msk-coral-500 to-msk-sun-500 rounded-full"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Background Vertical Line (Mobile) */}
        <div className="block md:hidden absolute left-11 top-0 bottom-0 w-1 bg-slate-100 rounded-full z-0">
           <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-msk-blue-500 via-msk-coral-500 to-msk-sun-500 rounded-full"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="relative z-10 pt-10 pb-10">
          {STEPS.map((step, index) => (
            <TimelineStep key={step.id} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};
