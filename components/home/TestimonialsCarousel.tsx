"use client";

import React from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  HeartHandshake,
} from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/site-content";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const TestimonialsCarousel: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="temoignages">
      <div className="container relative mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-msk-terracotta-50 px-4 py-1 text-xs font-bold text-msk-terracotta-700">
            <HeartHandshake className="h-3.5 w-3.5" />
            <span>Témoignages & Retours d&apos;expérience</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950 tracking-tight">
            Ce que disent les <span className="text-msk-forest-700">familles accompagnées</span>
          </h2>

          <p className="text-base md:text-lg text-msk-slate-600">
            La plus belle récompense de notre équipe est de voir chaque enfant s&apos;épanouir et retrouver le plaisir d&apos;apprendre.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-msk-forest-50/80 via-[#FAF8F5] to-msk-sand-100/60 p-8 md:p-14 border border-msk-forest-100 shadow-xl overflow-hidden">
          <div className="absolute top-8 right-8 text-msk-forest-200 z-0">
            <Quote className="h-16 w-16 opacity-50" />
          </div>

          <Swiper
            modules={[Autoplay, Parallax, Navigation, Pagination]}
            speed={800}
            parallax={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
              bulletClass: 'swiper-pagination-bullet bg-msk-forest-200 w-2.5 h-2.5 rounded-full inline-block mx-1 transition-all',
              bulletActiveClass: '!bg-msk-forest-700 !w-8',
            }}
            spaceBetween={30}
            className="w-full z-10"
          >
            {TESTIMONIALS.map((current, idx) => (
              <SwiperSlide key={current.id}>
                <div className="space-y-6">
                  {/* Stars & Tag */}
                  <div className="flex items-center gap-3" data-swiper-parallax="-100">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-msk-forest-800 border border-msk-forest-100 shadow-xs">
                      {current.tag}
                    </span>
                  </div>

                  {/* Quote Content */}
                  <blockquote className="text-lg md:text-2xl font-medium text-msk-forest-950 leading-relaxed italic" data-swiper-parallax="-300">
                    &laquo;&nbsp;{current.content}&nbsp;&raquo;
                  </blockquote>

                  {/* Author */}
                  <div className="pt-4 border-t border-msk-forest-100/80 flex items-center justify-between" data-swiper-parallax="-200">
                    <div>
                      <div className="font-extrabold text-msk-forest-900 text-base">
                        {current.name}
                      </div>
                      <div className="text-xs font-medium text-msk-slate-500">
                        {current.role} • Casablanca
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation & Pagination UI */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-msk-forest-100/60 relative z-20">
            <div className="swiper-pagination-custom flex items-center" />

            <div className="flex items-center gap-2">
              <button
                className="swiper-button-prev-custom p-3 rounded-full bg-white hover:bg-msk-forest-50 text-msk-forest-900 border border-msk-forest-200 shadow-sm transition-all active:scale-95"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="swiper-button-next-custom p-3 rounded-full bg-msk-forest-700 hover:bg-msk-forest-800 text-white shadow-md transition-all active:scale-95"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
