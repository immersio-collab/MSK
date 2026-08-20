"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { FadeUp } from "@/components/magicui/fade-up";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
interface CtaFinalSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export const CtaFinalSection = ({
  title = "Votre enfant mérite un accompagnement qui lui ressemble.",
  subtitle = "Prenez rendez-vous pour un bilan d'évaluation gratuit et sans engagement.",
  buttonText = "Réserver un bilan gratuit"
}: CtaFinalSectionProps) => {
  return (
    <section id="cta-contact" className="relative w-full py-24 md:py-32 overflow-hidden bg-linear-to-br from-msk-coral-500 to-msk-sun-400">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-msk-sun-500/30 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 text-center relative z-10 flex flex-col items-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6 drop-shadow-md">
            {title}
          </h2>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
            {subtitle}
          </p>
        </FadeUp>
        
        <FadeUp delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          {/* Main CTA */}
          <Link href="/contact" className="shrink-0 w-full sm:w-auto">
            <MagneticButton
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-msk-coral-600 font-bold text-sm tracking-wider uppercase rounded-2xl shadow-xl shadow-black/10 border-0"
              size="lg"
            >
              {buttonText}
            </MagneticButton>
          </Link>

          {/* Phone CTA */}
          <a href="tel:+212522000000" className="shrink-0 w-full sm:w-auto">
            <MagneticButton
              className="w-full sm:w-auto flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 hover:border-white/50 text-white font-bold text-sm tracking-wider uppercase rounded-2xl shadow-lg"
              size="lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+212 5 22 XX XX XX</span>
            </MagneticButton>
          </a>
        </FadeUp>
      </div>
    </section>
  );
};
