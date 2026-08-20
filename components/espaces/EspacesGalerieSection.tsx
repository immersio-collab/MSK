"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Tous" | "Classes Montessori" | "Salle Neuro-Gym" | "Espaces Créatifs" | "Extérieurs";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Category;
}

const images: GalleryImage[] = [
  { id: 1, category: "Classes Montessori", src: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&q=80&w=800", alt: "Classe primaire lumineuse" },
  { id: 2, category: "Salle Neuro-Gym", src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800", alt: "Matériel de psychomotricité" },
  { id: 3, category: "Classes Montessori", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", alt: "Matériel Montessori bois" },
  { id: 4, category: "Espaces Créatifs", src: "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?auto=format&fit=crop&q=80&w=800", alt: "Atelier peinture" },
  { id: 5, category: "Extérieurs", src: "https://images.unsplash.com/photo-1595844730298-b960fad9722a?auto=format&fit=crop&q=80&w=800", alt: "Cour de récréation verte" },
  { id: 6, category: "Classes Montessori", src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800", alt: "Enfants au travail" },
  { id: 7, category: "Salle Neuro-Gym", src: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?auto=format&fit=crop&q=80&w=800", alt: "Parcours d'équilibre" },
  { id: 8, category: "Espaces Créatifs", src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800", alt: "Dessin et arts plastiques" },
];

const categories: Category[] = ["Tous", "Classes Montessori", "Salle Neuro-Gym", "Espaces Créatifs", "Extérieurs"];

export const EspacesGalerieSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>("Tous");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = images.filter(img => activeTab === "Tous" || img.category === activeTab);

  return (
    <section id="galerie" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-msk-forest-950 mb-4">
            Galerie Immersive
          </h2>
          <p className="text-lg text-msk-forest-700/80 max-w-2xl mx-auto">
            Explorez nos différents espaces conçus spécifiquement pour répondre aux besoins de chaque enfant.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
                activeTab === cat 
                  ? "text-white" 
                  : "text-msk-forest-600 hover:bg-msk-forest-50"
              }`}
            >
              {activeTab === cat && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-msk-coral-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Masonry Grid Simulation using columns */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: img.id % 3 === 0 ? "4/5" : img.id % 2 === 0 ? "1/1" : "3/2" }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-msk-forest-950/0 group-hover:bg-msk-forest-950/20 transition-colors duration-300"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-msk-forest-950/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video md:aspect-auto md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking on image
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xl font-bold">{selectedImage.alt}</p>
                <p className="text-msk-sun-300 text-sm font-medium">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
