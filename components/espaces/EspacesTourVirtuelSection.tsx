"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

export const EspacesTourVirtuelSection: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false);

  return (
    <section id="tour-virtuel" className="relative z-10 w-full flex flex-col py-16 md:py-24 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-msk-night-900 tracking-tight">
            Visitez notre école à distance
          </h2>
          <p className="text-msk-night-700/80 font-medium mt-4 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Découvrez l'intérieur de nos classes et installations. <br className="hidden sm:block" />
            Naviguez dans l'école comme si vous y étiez.
          </p>
        </div>
        
        {/* Virtual Tour Container with Gradient Border */}
        <div className="w-full rounded-4xl p-1.5 bg-linear-to-tr from-msk-coral-400 via-msk-sun-400 to-msk-blue-400 shadow-2xl shadow-msk-sun-500/15">
          <div className="w-full relative rounded-[1.6rem] overflow-hidden bg-msk-cream-50 min-h-[500px] flex items-center justify-center">
            
            {isActivated ? (
              // Replace this iframe src with actual Matterport / Google Street View link
              <iframe 
                src="https://www.google.com/maps/embed?pb=!4v1690000000000!6m8!1m7!1sCAoSLEFGMVFpcE5KV3V6eU5PdkJ0U2k1ZV95WW5qZzJwNlp5Y0dXZ0xYeVJ2Z19U!2m2!1d33.589886!2d-7.603869!3f30!4f0!5f0.7820865974627469" 
                width="100%" 
                height="500" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[500px]"
              ></iframe>
            ) : (
              <div 
                className="absolute inset-0 cursor-pointer group flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=1600')" }}
                onClick={() => setIsActivated(true)}
              >
                <div className="absolute inset-0 bg-msk-night-950/40 transition-colors group-hover:bg-msk-night-950/30"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                    <Play className="w-8 h-8 text-white ml-1 fill-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">
                    Lancer la visite 360°
                  </h3>
                  <p className="text-white/90 text-sm mt-2 font-medium drop-shadow-md">
                    Cliquez pour explorer
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
