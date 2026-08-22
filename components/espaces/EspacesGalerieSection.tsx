"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Maximize2, Trees, Sparkles, BookOpen, Smile, Gamepad2, Brain, Palette } from "lucide-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { cn } from "@/lib/utils";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Category = "Tous" | "Éducatif" | "Sensoriel & Moteur" | "Loisirs & Créativité";

interface GalleryImage {
  id: number;
  src: string;
  alt: string; 
  title: string;
  description: string; 
  category: Category;
  width: number;
  height: number;
  icon: React.ComponentType<any>;
}

const images: GalleryImage[] = [
  { 
    id: 1, 
    category: "Loisirs & Créativité", 
    src: "/park exterieur.jpg", 
    title: "Le Parc Extérieur",
    description: "Un vaste espace de plein air sécurisé et verdoyant, conçu pour permettre aux enfants de se ressourcer, de courir et de jouer en toute liberté. C'est le lieu idéal pour développer la motricité globale à travers des jeux collectifs, des parcours d'obstacles naturels et des activités d'exploration sensorielle en contact direct avec la nature.",
    alt: "Le Parc Extérieur", 
    width: 800, 
    height: 600,
    icon: Trees
  },
  { 
    id: 2, 
    category: "Sensoriel & Moteur", 
    src: "/salel sensorielle.jpg", 
    title: "Salle Sensorielle",
    description: "Inspirée de l'approche Snoezelen, cette salle est un havre de paix conçu pour stimuler les sens de manière douce ou pour offrir un espace de relaxation profonde. Équipée de colonnes à bulles, de fibres optiques lumineuses et de projections visuelles apaisantes, elle aide les enfants à réguler leurs émotions et à explorer leurs perceptions sensorielles.",
    alt: "Salle Sensorielle", 
    width: 800, 
    height: 1066,
    icon: Sparkles
  },
  { 
    id: 3, 
    category: "Éducatif", 
    src: "/brain exercises.webp", 
    title: "Salle d'Étude",
    description: "Un espace calme, épuré et propice à la concentration individuelle et au soutien scolaire personnalisé. Cet environnement est structuré pour minimiser les distractions visuelles et auditives, permettant à chaque enfant de consolider ses apprentissages académiques et de développer des méthodes de travail autonomes et efficaces.",
    alt: "Salle d'Étude", 
    width: 800, 
    height: 800,
    icon: BookOpen
  },
  { 
    id: 4, 
    category: "Éducatif", 
    src: "/espace montesori.jpeg", 
    title: "Espace Montessori",
    description: "Aménagé selon les principes de Maria Montessori, cet espace met à disposition un matériel pédagogique scientifique et auto-correcteur unique. Chaque élément est placé à hauteur d'enfant pour encourager le libre choix des activités, favorisant ainsi l'autonomie, la motricité fine, la coordination oculo-manuelle et la confiance en soi.",
    alt: "Espace Montessori", 
    width: 800, 
    height: 1000,
    icon: Smile
  },
  { 
    id: 5, 
    category: "Loisirs & Créativité", 
    src: "/espace détente.avif", 
    title: "Salle de Jeux",
    description: "Un lieu chaleureux et interactif où le jeu est le moteur principal de l'apprentissage et du développement social. À travers des jeux de rôle, des puzzles collaboratifs et des ateliers ludiques, les enfants apprennent à interagir avec leurs pairs, à exprimer leurs émotions et à développer leur langage en s'amusant.",
    alt: "Salle de Jeux", 
    width: 800, 
    height: 450,
    icon: Gamepad2
  },
  { 
    id: 6, 
    category: "Sensoriel & Moteur", 
    src: "/salle de réeducation.jpg", 
    title: "Salle Neuro-Gym",
    description: "Une salle équipée d'un matériel thérapeutique de pointe dédié à la rééducation neuro-motrice et à l'intégration motrice. Sous la supervision de professionnels, les enfants travaillent leur équilibre, leur tonus musculaire, leur planification motrice et leur proprioception à l'aide de ballons de thérapie, de trampolines et de parcours de motricité.",
    alt: "Salle Neuro-Gym", 
    width: 800, 
    height: 800,
    icon: Brain
  },
  { 
    id: 7, 
    category: "Loisirs & Créativité", 
    src: "/atelier creatif.jpg", 
    title: "Atelier Créatif",
    description: "Un espace vibrant d'expression artistique où l'imagination des enfants prend vie à travers la peinture, le modelage, le découpage et le dessin. Ces activités manuelles variées sont spécialement conçues pour affiner la motricité fine, renforcer la force des doigts et stimuler la pensée créative de manière ludique.",
    alt: "Atelier Créatif", 
    width: 800, 
    height: 1066,
    icon: Palette
  },
];

const SpaceCharacter = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.45],
    [distanceFromCenter * 40, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.45],
    [distanceFromCenter * 40, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-msk-blue-600 font-black uppercase tracking-tighter", isSpace ? "w-4 md:w-8" : "")}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};

export const EspacesGalerieSection: React.FC = () => {
  const [activeId, setActiveId] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const lightboxIndex = images.findIndex(img => img.id === activeId);

  // Animating the short header text over a full section height scroll
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"]
  });

  const animatedText = "Explorez nos espaces. Un univers conçu pour chaque enfant.";
  const words = animatedText.split(" ");
  const characters = animatedText.split("");
  const centerIndex = Math.floor(characters.length / 2);

  let globalIndex = 0;
  const wordElements = words.map((word) => {
    const chars = word.split("").map((char) => ({ char, index: globalIndex++ }));
    const space = { char: " ", index: globalIndex++ };
    return { chars, space };
  });

  const stickyContent = images.map((photo) => ({
    title: photo.title,
    description: photo.description,
    content: (
      <div 
        className="relative w-full h-full cursor-zoom-in group" 
        onClick={() => {
          setActiveId(photo.id);
          setLightboxOpen(true);
        }}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-msk-night-900/0 group-hover:bg-msk-night-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Maximize2 className="w-8 h-8 text-white" />
        </div>
      </div>
    ),
    mobileImage: (
      <div 
        className="relative w-full h-full cursor-zoom-in" 
        onClick={() => {
          setActiveId(photo.id);
          setLightboxOpen(true);
        }}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    )
  }));

  return (
    <section id="galerie" className="bg-white relative">
      
      {/* Full Section Height Typographic Scroll Section */}
      <div className="w-full bg-msk-cream-50">
        <div 
          ref={headerRef} 
          className="relative box-border flex h-[calc(100vh-80px)] items-center justify-center gap-[2vw] overflow-hidden bg-msk-cream-50 p-[2vw]"
        >
          <div
            className="w-full max-w-5xl text-center text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-msk-night-900 flex flex-wrap justify-center gap-y-2 md:gap-y-4"
            style={{ perspective: "500px" }}
          >
            {wordElements.map((wordObj, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {wordObj.chars.map((c) => (
                  <SpaceCharacter
                    key={c.index}
                    char={c.char}
                    index={c.index}
                    centerIndex={centerIndex}
                    scrollYProgress={headerScroll}
                  />
                ))}
                {wordIndex !== wordElements.length - 1 && (
                  <SpaceCharacter
                    key={wordObj.space.index}
                    char={wordObj.space.char}
                    index={wordObj.space.index}
                    centerIndex={centerIndex}
                    scrollYProgress={headerScroll}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Scroll Reveal Layout (Outside container for full horizontal width) */}
      <div className="w-full">
        <StickyScroll content={stickyContent} />
      </div>

      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        close={() => setLightboxOpen(false)}
        slides={images.map(img => ({ src: img.src, title: img.title, description: img.description }))}
      />
    </section>
  );
};
