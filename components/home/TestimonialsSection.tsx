"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { Star, Quote, Play, Pause } from "lucide-react";
import { FadeUp } from "@/components/magicui/fade-up";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "En 6 mois, mon fils a retrouvé le sourire et l'envie d'apprendre.",
    author: "Salma B.",
    role: "maman de Ryan (7 ans, TDAH)",
    tag: "Primaire",
    tagColor: "bg-msk-sun-100 text-msk-sun-700",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    bgColor: "bg-white",
    audioSrc: "/audio/temoignage-1.mp3",
  },
  {
    id: 2,
    quote: "Lina va à l'école avec enthousiasme. L'approche Montessori combinée à l'inclusion est une merveille.",
    author: "Karim & Yasmine T.",
    role: "parents de Lina (4 ans)",
    tag: "Petite Enfance",
    tagColor: "bg-msk-coral-100 text-msk-coral-700",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    bgColor: "bg-msk-cream-50",
    audioSrc: "/audio/temoignage-2.mp3",
  },
  {
    id: 3,
    quote: "On nous avait dit qu'il ne pourrait jamais suivre un cursus normal. Aujourd'hui il est en CM1 dans une école classique.",
    author: "Nadia M.",
    role: "maman de Adam (9 ans)",
    tag: "Primaire",
    tagColor: "bg-msk-sun-100 text-msk-sun-700",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80",
    bgColor: "bg-white",
    audioSrc: "/audio/temoignage-3.mp3",
  },
];

const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={togglePlay} 
      className="flex items-center gap-2 px-3 py-1.5 bg-msk-cream-100 hover:bg-msk-cream-200 text-msk-night-800 rounded-full text-xs font-bold transition-colors shadow-xs border border-msk-cream-200"
      aria-label="Écouter le témoignage"
    >
      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      <span>{isPlaying ? "Pause" : "Écouter l'audio"}</span>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </button>
  );
};

export const TestimonialsSection = () => {
  return (
    <section id="temoignages" className="py-20 md:py-32 relative z-10 bg-linear-to-b from-[#FDFBF7] to-msk-coral-50/30 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-msk-sun-200/20 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text */}
          <div className="max-w-xl">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-msk-sun-500 fill-msk-sun-500" />
                Avis & Témoignages
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-msk-night-900 tracking-tight leading-tight mb-6">
                Ils nous ont fait confiance
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Parce que chaque victoire compte, découvrez les histoires de familles qui ont vu leurs enfants s&apos;épanouir grâce à un accompagnement qui croit en eux.
              </p>
            </FadeUp>
          </div>

          {/* Right Column: Cards Carousel */}
          <FadeUp delay={0.3} className="w-full max-w-sm mx-auto lg:max-w-md perspective-1000">
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards, Autoplay, Pagination]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="w-full pb-12"
            >
              {TESTIMONIALS.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className={`relative flex flex-col p-8 sm:p-10 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 ${testimonial.bgColor} h-full min-h-[380px]`}>
                    
                    {/* Quotes Icon */}
                    <div className="absolute top-8 right-8 text-msk-coral-100/60 pointer-events-none">
                      <Quote className="w-16 h-16 rotate-180" />
                    </div>

                    {/* Tag & Stars & Audio Player */}
                    <div className="flex flex-col gap-4 mb-8 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-msk-sun-500 fill-msk-sun-500" />
                          ))}
                        </div>
                        {testimonial.audioSrc && (
                          <AudioPlayer src={testimonial.audioSrc} />
                        )}
                      </div>
                      <span className={`inline-flex self-start px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${testimonial.tagColor}`}>
                        {testimonial.tag}
                      </span>
                    </div>

                    {/* Quote Text */}
                    <div className="flex-1 relative z-10">
                      <p className="text-xl sm:text-2xl font-bold text-msk-night-900 leading-snug">
                        « {testimonial.quote} »
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mt-8 relative z-10">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-msk-night-900 leading-tight">{testimonial.author}</h4>
                        <p className="text-sm font-medium text-slate-500 leading-snug mt-0.5">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeUp>
          
        </div>
      </div>
    </section>
  );
};
