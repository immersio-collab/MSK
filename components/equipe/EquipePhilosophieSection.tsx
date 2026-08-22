import React from "react";
import Image from "next/image";

export const EquipePhilosophieSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative large quote mark */}
      <div className="absolute top-10 left-10 text-[20rem] leading-none text-msk-cream-100 font-serif z-0 select-none">
        &ldquo;
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left side: Text & Quote */}
          <div className="flex-1 space-y-8">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-msk-coral-500 mb-2 block">
                Notre Philosophie
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-msk-night-900">
                La neurodiversité n'est pas un obstacle, c'est un autre chemin.
              </h2>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-msk-night-700/80 italic border-l-4 border-msk-sun-400 pl-6 leading-relaxed">
              "L'école classique demande à l'enfant de s'adapter à une méthode unique. Chez MSK, c'est notre méthode qui s'adapte à l'enfant. Nous croyons profondément qu'avec le bon environnement, chaque étincelle peut devenir une grande lumière."
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
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
                alt="Khadija en action"
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
