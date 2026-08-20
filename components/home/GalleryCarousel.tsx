"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const GalleryCarousel = () => {
  // Using high-quality placeholder images of schools/children for now
  const images = [
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      alt: "Enfants en classe d'apprentissage",
    },
    {
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
      alt: "Activité Montessori",
    },
    {
      src: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop",
      alt: "École inclusive",
    },
    {
      src: "https://images.unsplash.com/photo-1610113824043-f2275e0dcde8?q=80&w=800&auto=format&fit=crop",
      alt: "Jeux éducatifs",
    },
    {
      src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
      alt: "Récréation et éveil",
    },
    {
      src: "https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=800&auto=format&fit=crop",
      alt: "Développement moteur",
    },
  ];

  return (
    <div className="flex flex-col h-full w-full items-center justify-center overflow-hidden bg-[#FDFBF7] py-24">
      <div className="text-center mb-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-msk-night-900 tracking-tight mb-4">
          Galerie & Vie au Centre
        </h2>
        <p className="text-lg md:text-xl text-slate-600 font-medium">
          Découvrez en images le quotidien de nos élèves : entre apprentissage Montessori, moments de joie et épanouissement personnel.
        </p>
      </div>
      
      <Carousel_001 className="w-full max-w-7xl mx-auto" images={images} showPagination loop autoplay />
    </div>
  );
};

export { GalleryCarousel };

const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_001 {
    padding-bottom: 50px !important;
  }
  .swiper-pagination-bullet {
    background: #0ea5e9 !important; 
    opacity: 0.5;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #0284c7 !important;
  }
  `;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: 0.2,
      }}
      className={cn("relative", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 20 },
          640: { slidesPerView: 1.8, spaceBetween: 30 },
          1024: { slidesPerView: 2.43, spaceBetween: 40 }
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="Carousal_001"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!h-[280px] md:!h-[400px] w-full border-4 border-white rounded-3xl shadow-xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden bg-white/50 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <ChevronRightIcon className="h-6 w-6 text-slate-800" />
            </div>
            <div className="swiper-button-prev after:hidden bg-white/50 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <ChevronLeftIcon className="h-6 w-6 text-slate-800" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_001 };
