"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Camera, ArrowRight, Eye, X } from "lucide-react";
import { MagneticButton } from "@/components/lightswind/magnetic-button";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  accent: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Ambiance Montessori & Manipulation Concrète",
    category: "Pédagogie",
    description: "Matériel sensoriel adapté permettant à l'enfant d'explorer en autonomie.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    accent: "bg-emerald-600",
  },
  {
    id: 2,
    title: "Espace Neuro-Gym & Motricité Globale",
    category: "Neuro-Gym",
    description: "Parcours moteurs et stimulation proprioceptive pour réguler l'attention.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    accent: "bg-amber-600",
  },
  {
    id: 3,
    title: "Atelier Langage & Communication",
    category: "Petite Enfance",
    description: "Échanges interactifs, enrichissement du vocabulaire et expression sereine.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    accent: "bg-msk-terracotta-600",
  },
  {
    id: 4,
    title: "Concentration & Travail Individualisé",
    category: "Primaire",
    description: "Un temps dédié où chaque apprenant progresse selon son propre plan de travail.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    accent: "bg-teal-600",
  },
];

export const GalleryPreview: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden" id="galerie">
      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-msk-forest-100 px-4 py-1 text-xs font-bold text-msk-forest-800">
              <Camera className="h-3.5 w-3.5 text-msk-terracotta-500" />
              <span>Immersion au Quotidien</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-msk-forest-950 tracking-tight">
              La vie au centre <span className="text-msk-forest-700">MSK Casablanca</span>
            </h2>
            <p className="text-base md:text-lg text-msk-slate-600">
              Découvrez nos espaces conçus pour stimuler l&apos;autonomie, apaiser les sensibilités et favoriser l&apos;épanouissement de chaque enfant.
            </p>
          </div>

          <Link href="/notre-centre/nos-espaces" className="shrink-0">
            <MagneticButton 
              variant="outline"
              className="border-2 border-msk-forest-700 text-msk-forest-800 hover:bg-msk-forest-700 hover:text-white font-bold"
            >
              <span>Découvrir nos espaces</span>
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </Link>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-3xl overflow-hidden shadow-md bg-white border border-msk-forest-100 cursor-pointer"
            >
              {/* Image with next/image */}
              <div className="relative h-64 w-full overflow-hidden bg-msk-sand-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-msk-forest-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${item.accent} shadow-sm`}>
                    {item.category}
                  </span>
                </div>

                {/* Hover Quick View Icon */}
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-msk-forest-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-4 w-4" />
                </div>
              </div>

              {/* Card Footer Text */}
              <div className="p-5">
                <h3 className="font-bold text-msk-forest-950 text-sm group-hover:text-msk-forest-700 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-msk-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-3xl w-full rounded-3xl bg-white overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-96 w-full bg-slate-900">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${selectedImage.accent}`}>
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-bold text-msk-forest-950 mt-3">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-msk-slate-600 mt-2">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
