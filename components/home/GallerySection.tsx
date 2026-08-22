"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Play, X, Maximize2, Trees, Sparkles, BookOpen, Smile, Gamepad2, Brain, Palette } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { motion, AnimatePresence } from "framer-motion";
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

// 7 Spaces requested by the client
const PHOTOS = [
  { 
    id: 1, 
    src: "/park exterieur.jpg", 
    title: "Le Parc Extérieur", 
    description: "Un espace de plein air pour se ressourcer et jouer librement.", 
    aspect: "aspect-4/3",
    icon: Trees
  },
  { 
    id: 2, 
    src: "/salel sensorielle.jpg", 
    title: "Salle Sensorielle", 
    description: "Un environnement apaisant conçu pour la stimulation et la détente.", 
    aspect: "aspect-3/4",
    icon: Sparkles
  },
  { 
    id: 3, 
    src: "/brain exercises.webp", 
    title: "Salle d'Étude", 
    description: "Un lieu calme dédié à la concentration et au soutien scolaire.", 
    aspect: "aspect-square",
    icon: BookOpen
  },
  { 
    id: 4, 
    src: "/espace montesori.jpeg", 
    title: "Espace Montessori", 
    description: "Matériel adapté favorisant l'autonomie et l'apprentissage à son rythme.", 
    aspect: "aspect-4/5",
    icon: Smile
  },
  { 
    id: 5, 
    src: "/espace détente.avif", 
    title: "Salle de Jeux", 
    description: "Où l'apprentissage passe par le divertissement et l'interaction sociale.", 
    aspect: "aspect-video",
    icon: Gamepad2
  },
  { 
    id: 6, 
    src: "/salle de réeducation.jpg", 
    title: "Salle Neuro-Gym", 
    description: "Équipements spécialisés pour la rééducation neuro-motrice.", 
    aspect: "aspect-square",
    icon: Brain
  },
  { 
    id: 7, 
    src: "/atelier creatif.jpg", 
    title: "Atelier Créatif", 
    description: "Pour l'expression artistique et le développement de la motricité fine.", 
    aspect: "aspect-3/4",
    icon: Palette
  },
];

export const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<{src: string, title: string, description: string} | null>(null);
  const [activeId, setActiveId] = useState(1);

  const openLightbox = (photo: {src: string, title: string, description: string}) => {
    setActivePhoto(photo);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setActivePhoto(null), 300);
    document.body.style.overflow = "auto";
  };

  const activePhotoObj = PHOTOS.find(p => p.id === activeId) || PHOTOS[0];

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
            className="w-full overflow-visible!"
          >
            {VIDEOS.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="group relative aspect-9/16 rounded-3xl overflow-hidden cursor-pointer shadow-md bg-slate-100">
                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-msk-night-900/20 group-hover:bg-msk-night-900/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-msk-night-900/80 to-transparent">
                    <p className="text-white font-bold text-lg leading-tight">{video.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeUp>

        {/* FeatureCard Interactive Layout */}
        <FadeUp delay={0.4}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-msk-night-900">Nos Espaces</h3>
            <span className="text-sm font-bold text-msk-blue-600 bg-msk-blue-50 px-3 py-1 rounded-full">Photos</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Feature Cards Stack */}
            <div className="order-2 lg:order-1 lg:col-span-6 space-y-4">
              {PHOTOS.map((photo) => {
                const IconComponent = photo.icon;
                const isActive = activeId === photo.id;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setActiveId(photo.id)}
                    className={`w-full text-left p-6 rounded-3xl transition-all duration-300 border flex gap-5 items-start cursor-pointer ${
                      isActive 
                        ? "bg-msk-cream-100 border-msk-coral-400 shadow-md scale-[1.01]" 
                        : "bg-[#fdfbf7]/50 border-msk-cream-200 hover:bg-msk-cream-50/50 hover:border-msk-cream-300"
                    }`}
                  >
                    <div className={`p-3.5 rounded-2xl shrink-0 transition-colors ${
                      isActive ? 'bg-msk-coral-500 text-white' : 'bg-msk-cream-200 text-msk-night-800'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg text-msk-night-900 leading-tight">
                        {photo.id}. {photo.title}
                      </h4>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Sticky Active Image */}
            <div className="order-1 lg:order-2 lg:col-span-6 lg:sticky lg:top-28">
              <div 
                className="relative aspect-4/3 rounded-4xl overflow-hidden shadow-xl border border-msk-cream-300 bg-msk-cream-50 group cursor-zoom-in"
                onClick={() => openLightbox(activePhotoObj)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activePhotoObj.src}
                      alt={activePhotoObj.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Maximize Icon on Hover */}
                <div className="absolute inset-0 bg-msk-night-900/0 group-hover:bg-msk-night-900/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Lightbox */}
      <div 
        className={`fixed inset-0 z-100 bg-msk-night-950/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center ${
          lightboxOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeLightbox}
      >
        <button 
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-110"
          onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
        >
          <X className="w-6 h-6" />
        </button>
        
        {activePhoto && (
          <div className="relative w-full max-w-5xl h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activePhoto.src}
              alt={activePhoto.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-white font-bold text-lg">
                {activePhoto.title}
              </p>
              <p className="text-white/70 font-medium text-sm">
                {activePhoto.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
