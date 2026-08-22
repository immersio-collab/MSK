"use client";

import { MethodeAssetSlot } from "@/components/methode/MethodeAssetSlot";
import { MethodeLottie } from "@/components/methode/MethodeLottie";

export const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#E6F4F1] pt-24 pb-48 md:pt-32 md:pb-64 overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1400px] min-h-[30vh] md:min-h-[40vh] pointer-events-none">
        
        {/* Scène principale : Fille et Montagne 
            Très large pour remplir l'écran (w-[110%] sur desktop).
            translate-y-32 / md:translate-y-40 permet de la descendre
            suffisamment pour que sa base soit cachée par la carte blanche. */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180%] sm:w-[140%] md:w-[120%] lg:w-[110%] xl:w-[105%] max-w-[1600px] translate-y-32 md:translate-y-40 z-10">
          <MethodeLottie src="/contact.json" className="w-full h-auto" fit={false} />
        </div>

        {/* Plante : positionnée indépendamment à gauche.
            Largeur ajustée pour correspondre à la maquette.
            Aussi descendue pour se caler derrière la carte. */}
        <div className="absolute bottom-0 -left-12 md:-left-16 w-72 md:w-[32rem] lg:w-[38rem] translate-y-32 md:translate-y-40 z-20">
          <MethodeLottie src="/plant.json" className="w-full h-auto" fit={false} />
        </div>

      </div>
    </section>
  );
};
