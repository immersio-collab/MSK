"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

const PROFILES = [
  {
    id: "maternelle",
    title: "Maternelle (2-5 ans)",
    quote: "« Mon enfant ne parle pas encore comme les autres »",
    description: "Retard de langage, difficultés de socialisation, éveil sensoriel. Nous l'accueillons avec douceur.",
    link: "/programmes",
    image: "/maternelle1.jpg",
    gradient: "from-msk-coral-100 to-msk-coral-50",
    glow: "group-hover:shadow-msk-coral-500/25",
    textHover: "group-hover:text-msk-coral-600",
    badge: "bg-msk-coral-100 text-msk-coral-700",
  },
  {
    id: "primaire",
    title: "Primaire (6-11 ans)",
    quote: "« L'école classique ne lui convient plus »",
    description: "TDAH, dyslexie, dyscalculie, rejet scolaire. Nous reconstruisons sa confiance pas à pas.",
    link: "/programmes",
    image: "/primaire1.webp",
    gradient: "from-msk-sun-100 to-msk-sun-50",
    glow: "group-hover:shadow-msk-sun-500/25",
    textHover: "group-hover:text-msk-sun-600",
    badge: "bg-msk-sun-100 text-msk-sun-700",
  },
];

export const TargetAudienceSection = () => {
  const swiperRef = useRef<SwiperType>();

  return (
    <section id="programmes" className="py-20 md:py-28 relative z-10 bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Header and Custom Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <FadeUp>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                À qui s&apos;adresse MSK ?
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-msk-night-900 tracking-tight leading-tight">
                Chaque âge, chaque profil a sa place
              </h2>
            </FadeUp>
          </div>
          
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-msk-night-900 transition-colors"
                aria-label="Précédent"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 rounded-full bg-msk-night-900 flex items-center justify-center text-white hover:bg-msk-night-800 shadow-md transition-colors"
                aria-label="Suivant"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </FadeUp>
        </div>

        {/* Swiper Carousel */}
        <FadeUp delay={0.3} className="relative">
          <Swiper
            modules={[Pagination, Navigation, A11y]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 2, spaceBetween: 32 },
              1280: { slidesPerView: 2, spaceBetween: 32 },
            }}
            className="w-full pb-16 overflow-visible!"
          >
            {PROFILES.map((profile, index) => (
              <SwiperSlide key={profile.id} className="h-auto">
                <Link href={profile.link} className="group block h-full">
                  <div className={`h-full flex flex-col rounded-3xl bg-linear-to-b ${profile.gradient} p-1 shadow-xs transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl ${profile.glow}`}>
                    <div className="h-full flex flex-col rounded-[1.4rem] bg-white overflow-hidden">
                      {/* Image Top */}
                      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-msk-night-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <Image
                          src={profile.image}
                          alt={profile.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${profile.badge} backdrop-blur-xs shadow-xs`}>
                            {profile.title}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content Bottom */}
                      <div className="flex flex-col flex-1 p-6 md:p-8">
                        <h3 className="text-lg md:text-xl font-bold text-msk-night-900 mb-3 leading-snug">
                          {profile.quote}
                        </h3>
                        <p className="text-slate-600 text-sm md:text-base flex-1 mb-6">
                          {profile.description}
                        </p>
                        <div className={`inline-flex items-center font-bold text-sm transition-colors ${profile.textHover} text-slate-800`}>
                          Découvrir ce programme
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeUp>
      </div>
    </section>
  );
};
