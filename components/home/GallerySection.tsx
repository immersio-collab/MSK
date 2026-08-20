"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Play, X, Maximize2 } from "lucide-react";
import { FadeUp } from "@/components/magicui/fade-up";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Dummy Video Data
const VIDEOS = [
  {
    id: 1,
    title: "Séance Neuro-Gym",
    thumbnail: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
    videoSrc: "#", // Placeholder
  },
  {
    id: 2,
    title: "Atelier Montessori",
    thumbnail: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
    videoSrc: "#",
  },
  {
    id: 3,
    title: "Éveil Sensoriel",
    thumbnail: "https://images.unsplash.com/photo-1544640808-32cb961a89c3?auto=format&fit=crop&w=600&q=80",
    videoSrc: "#",
  },
  {
    id: 4,
    title: "Motricité fine",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    videoSrc: "#",
  },
];

// Dummy Photo Data for Masonry
const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", alt: "Classe Primaire MSK", aspect: "aspect-[4/3]" },
  { id: 2, src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", alt: "Matériel Montessori", aspect: "aspect-[3/4]" },
  { id: 3, src: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=800&q=80", alt: "Salle de rééducation", aspect: "aspect-[4/5]" },
  { id: 4, src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80", alt: "Neuro-Gym", aspect: "aspect-square" },
  { id: 5, src: "https://images.unsplash.com/photo-1536640712-4d4c36ef0e47?auto=format&fit=crop&w=800&q=80", alt: "Espace détente", aspect: "aspect-[3/4]" },
  { id: 6, src: "https://images.unsplash.com/photo-1564424224827-cd24b8915874?auto=format&fit=crop&w=800&q=80", alt: "Travail en petit groupe", aspect: "aspect-video" },
  { id: 7, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", alt: "Intervention orthophoniste", aspect: "aspect-square" },
];

export const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<{src: string, alt: string} | null>(null);

  const openLightbox = (photo: {src: string, alt: string}) => {
    setActivePhoto(photo);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setActivePhoto(null), 300);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="galerie" className="py-20 md:py-32 relative z-10 bg-white overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-widest text-msk-coral-500 mb-3">
              Vie au centre
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-msk-night-900 tracking-tight leading-tight mb-6">
              L&apos;immersion dans notre quotidien
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg text-slate-600">
              Découvrez nos espaces conçus pour l&apos;épanouissement, l&apos;apprentissage actif et la rééducation neuro-motrice.
            </p>
          </FadeUp>
        </div>

        {/* Video Carousel (Shorts) */}
        <FadeUp delay={0.3} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-msk-night-900">En Action</h3>
            <span className="text-sm font-bold text-msk-coral-600 bg-msk-coral-50 px-3 py-1 rounded-full">Vidéos</span>
          </div>
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            freeMode={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3.5, spaceBetween: 24 },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full !overflow-visible"
          >
            {VIDEOS.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer shadow-md bg-slate-100">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-msk-night-900/20 group-hover:bg-msk-night-900/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-msk-night-900/80 to-transparent">
                    <p className="text-white font-bold text-lg leading-tight">{video.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeUp>

        {/* Masonry Photo Grid */}
        <FadeUp delay={0.4}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-msk-night-900">Nos Espaces</h3>
            <span className="text-sm font-bold text-msk-blue-600 bg-msk-blue-50 px-3 py-1 rounded-full">Photos</span>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {PHOTOS.map((photo) => (
              <div 
                key={photo.id} 
                className={`relative w-full rounded-2xl overflow-hidden group cursor-zoom-in break-inside-avoid ${photo.aspect}`}
                onClick={() => openLightbox(photo)}
              >
                <Image 
                  src={photo.src} 
                  alt={photo.alt} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-msk-night-900/0 group-hover:bg-msk-night-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-8 h-8 text-white mb-4" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-msk-night-900/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-sm tracking-wide">{photo.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Lightbox */}
      <div 
        className={`fixed inset-0 z-[100] bg-msk-night-950/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center ${
          lightboxOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeLightbox}
      >
        <button 
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[110]"
          onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
        >
          <X className="w-6 h-6" />
        </button>
        
        {activePhoto && (
          <div className="relative w-full max-w-5xl h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <p className="absolute -bottom-10 left-0 right-0 text-center text-white/70 font-medium">
              {activePhoto.alt}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
