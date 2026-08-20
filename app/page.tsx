import type { Metadata } from "next";
import Link from "next/link";
import { WordPullUp } from "@/components/motion/WordPullUp";
import { FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MethodSection } from "@/components/home/MethodSection";
import { ParentFAQSection } from "@/components/home/ParentFAQSection";
import { ScrollStrokePath } from "@/components/motion/ScrollStrokePath";
import { ScrollEffectSection } from "@/components/home/ScrollEffectSection";
import ScrollExpand from "@/components/motion/ScrollExpand";
import { GallerySection } from "@/components/home/GallerySection";
import { ConfettiParticles } from "@/components/motion/ConfettiParticles";
import { StatsSection } from "@/components/home/StatsSection";
import { TargetAudienceSection } from "@/components/home/TargetAudienceSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaFinalSection } from "@/components/home/CtaFinalSection";

export const metadata: Metadata = {
  title: "Accueil | MSK Montessori School Casablanca",
  description: "MSK Montessori School - École Inclusive & Réadaptation à Casablanca.",
};

export default function HomePage() {

  return (
    <div className="relative flex flex-col min-h-screen bg-msk-cream-50 overflow-hidden">
      {/* Interactive Background Scroll Stroke flowing from Hero down to Footer */}
      {/* <ScrollStrokePath /> */}

      {/* Hero Section */}
      <section className="relative z-10 pt-20 lg:pt-24 pb-12 lg:pb-16 min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
        {/* Soft child-friendly confetti particles in the background */}
        <ConfettiParticles className="opacity-80" count={40} />

        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-6 lg:py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8">
              {/* Badge de confiance */}
              <FadeUp delay={0.2}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-msk-coral-50/70 border border-msk-coral-100/50 rounded-full text-xs sm:text-sm font-bold text-msk-coral-600 shadow-xs backdrop-blur-xs select-none">
                  <span className="flex h-2 w-2 rounded-full bg-msk-coral-500 animate-ping" />
                  <span className="flex h-2 w-2 -ml-4 rounded-full bg-msk-coral-600" />
                  <span>+200 familles accompagnées · 15 ans d'expérience · Casablanca</span>
                </div>
              </FadeUp>

              <WordPullUp 
                text="L'école où chaque enfant s'éveille."
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[60px] font-black text-msk-night-900 tracking-tight leading-[1.1] text-left"
              />

              <FadeUp delay={0.4}>
                <p className="text-xl sm:text-2xl text-slate-600 font-medium max-w-xl leading-relaxed">
                  Le seul centre thérapeutique et éducatif Montessori au Maroc. Accompagnement sur-mesure pour enfants avec difficultés d'apprentissage, de langage ou de comportement.
                </p>
              </FadeUp>

              <FadeUp delay={0.6}>
                <div className="flex flex-row items-center gap-0 sm:gap-2 pt-2 -ml-5">
                  <Link href="/contact" className="shrink-0">
                    <MagneticButton
                      className="bg-msk-coral-500 hover:bg-msk-coral-600 text-white font-bold text-sm tracking-wider uppercase rounded-2xl shadow-lg shadow-msk-coral-500/25 border-0"
                      size="lg"
                    >
                      Prendre rendez-vous
                    </MagneticButton>
                  </Link>

                  <a href="#methode" className="shrink-0">
                    <MagneticButton
                      className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold text-sm tracking-wider uppercase rounded-2xl shadow-md"
                      size="lg"
                    >
                      Découvrir notre méthode
                    </MagneticButton>
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: 3D Character Video */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <FadeUp delay={0.3} duration={0.8} y={20}>
                <div className="relative z-10 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] flex items-center justify-center mx-auto">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-auto object-contain drop-shadow-xl pointer-events-none"
                  >
                    <source src="/0820_transparent.webm" type="video/webm" />
                  </video>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* Scroll Effect Section */}
      <ScrollEffectSection />

      {/* 3rd Section — Les Chiffres Qui Comptent */}
      <StatsSection />


      {/* Method Section */}
      <MethodSection />

      {/* Target Audience (Programmes) Section */}
      <TargetAudienceSection />

      {/* Neuro-Gym Section */}
      <section id="neuro-gym" className="relative z-10 w-full">
        <ScrollExpand
          src="/neuro-gym.jpg"
          alt="Neuro-Gym et Réadaptation"
          useWindowScroll
        >
          <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-xl mb-4">La Neuro-Gym : quand le corps libère l&apos;esprit</h2>
          <p className="text-lg text-white drop-shadow-lg font-medium">Des exercices ciblés de coordination neuro-motrice qui améliorent l&apos;attention, la mémoire et la régulation émotionnelle. Unique au Maroc.</p>
        </ScrollExpand>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Parent FAQ Section */}
      <ParentFAQSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* CTA Final Section */}
      <CtaFinalSection />
    </div>
  );
}
