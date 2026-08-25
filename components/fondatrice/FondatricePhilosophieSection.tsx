import React from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/common/Eyebrow";

export const FondatricePhilosophieSection: React.FC = () => {
  return (
    // coral-50 : la respiration signature de la page — la citation est le
    // temps fort de la fondatrice.
    //
    // `lg:screen-section` : à partir de lg la section fait exactement une
    // fenêtre, contenu centré dedans. Mesurée à 741px avec ses 96px de marge
    // haut/bas, elle dépassait de 21px un écran de 720. La marge suit donc la
    // fenêtre — sous hauteur fixe, une marge figée ne respire plus, elle vole
    // de la place au contenu.
    <section className="relative overflow-hidden bg-msk-coral-50 py-[clamp(3rem,7svh,6rem)] lg:screen-section">
      {/* Decorative large quote mark */}
      <div className="absolute top-10 left-10 text-[20rem] leading-none text-msk-coral-100 font-serif z-0 select-none">
        &ldquo;
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left side: Text & Quote */}
          <div className="flex-1 space-y-8">
            <div>
              <Eyebrow variant="bare" className="mb-2 block text-msk-coral-500">
                Notre Philosophie
              </Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-msk-night-900">
                La neurodiversité n&apos;est pas un obstacle, c&apos;est un autre chemin.
              </h2>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-msk-night-700/80 italic border-l-4 border-msk-coral-400 pl-6 leading-relaxed">
              &laquo;&nbsp;L&apos;école classique demande à l&apos;enfant de s&apos;adapter à une méthode unique. Chez MSK, c&apos;est notre méthode qui s&apos;adapte à l&apos;enfant. Nous croyons profondément qu&apos;avec le bon environnement, chaque étincelle peut devenir une grande lumière.&nbsp;&raquo;
            </blockquote>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image 
                  src="/fondatrice.webp"
                  alt="Khadija Elabaya"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-msk-night-900">Khadija Elabaya</p>
                <p className="text-sm text-msk-night-700">Fondatrice de MSK Montessori</p>
              </div>
            </div>
          </div>

          {/* Right side: Video Placeholder or Team Image */}
          <div className="flex-1 w-full">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-msk-cream-200">
              <Image 
                src="/espace montesori.jpeg"
                alt="L'espace Montessori du centre MSK"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-msk-night-950/30 flex items-center justify-center transition-colors group-hover:bg-msk-night-950/40">
                {/* Play button UI */}
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-0 h-0 border-t-10 border-t-transparent border-l-16 border-l-white border-b-10 border-b-transparent ml-2"></div>
                </div>
              </div>
              
              {/* Optional: label indicating video */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-msk-night-900 shadow-xs">
                ▶ Présentation de la fondatrice (0:45)
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
