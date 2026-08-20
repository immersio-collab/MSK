"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Category = "Tous" | "Classes Montessori" | "Salle Neuro-Gym" | "Espaces Créatifs" | "Extérieurs";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Category;
  width: number;
  height: number;
}

const images: GalleryImage[] = [
  { id: 1, category: "Classes Montessori", src: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&q=80&w=800", alt: "Classe primaire lumineuse", width: 800, height: 1000 },
  { id: 2, category: "Salle Neuro-Gym", src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800", alt: "Matériel de psychomotricité", width: 800, height: 800 },
  { id: 3, category: "Classes Montessori", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", alt: "Matériel Montessori bois", width: 800, height: 533 },
  { id: 4, category: "Espaces Créatifs", src: "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?auto=format&fit=crop&q=80&w=800", alt: "Atelier peinture", width: 800, height: 1000 },
  { id: 5, category: "Extérieurs", src: "https://images.unsplash.com/photo-1595844730298-b960fad9722a?auto=format&fit=crop&q=80&w=800", alt: "Cour de récréation verte", width: 800, height: 800 },
  { id: 6, category: "Classes Montessori", src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800", alt: "Enfants au travail", width: 800, height: 533 },
  { id: 7, category: "Salle Neuro-Gym", src: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?auto=format&fit=crop&q=80&w=800", alt: "Parcours d'équilibre", width: 800, height: 1000 },
  { id: 8, category: "Espaces Créatifs", src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800", alt: "Dessin et arts plastiques", width: 800, height: 800 },
];

const categories: Category[] = ["Tous", "Classes Montessori", "Salle Neuro-Gym", "Espaces Créatifs", "Extérieurs"];

export const EspacesGalerieSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>("Tous");
  const [index, setIndex] = useState(-1);

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

        {/* Masonry Grid via react-photo-album */}
        <motion.div layout className="relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PhotoAlbum
                layout="masonry"
                photos={filteredImages}
                columns={(containerWidth: number) => {
                  if (containerWidth < 640) return 1;
                  if (containerWidth < 1024) return 2;
                  return 3;
                }}
                spacing={16}
                onClick={({ index }: { index: number }) => setIndex(index)}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={filteredImages}
      />
    </section>
  );
};
