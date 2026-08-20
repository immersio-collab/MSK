import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { WordPullUp } from "@/components/magicui/word-pull-up";
import { FadeUp } from "@/components/magicui/fade-up";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import { MethodSection } from "@/components/home/MethodSection";
import { ParentFAQSection } from "@/components/home/ParentFAQSection";
import { ScrollStrokePath } from "@/components/ui/ScrollStrokePath";


export const metadata: Metadata = {
  title: "Accueil | MSK Montessori School Casablanca",
  description: "MSK Montessori School - École Inclusive & Réadaptation à Casablanca.",
};

export default function HomePage() {
  const sections = [
    { id: "methode", title: "La Méthode en 6 Étapes (Observer • Comprendre • Adapter • Rééduquer • Accompagner • Insérer)", color: "text-msk-blue-600 border-msk-blue-200 bg-msk-blue-50/40" },
    { id: "programmes", title: "Programmes & Classes (Petite Enfance, Primaire, Adolescents, Adultes)", color: "text-msk-coral-600 border-msk-coral-200 bg-msk-coral-50/40" },
    { id: "neuro-gym", title: "Pôle Neuro-Gym & Réadaptation Motrice", color: "text-msk-sun-600 border-msk-sun-200 bg-msk-sun-50/40" },
    { id: "faq-parents", title: "Réponses aux Hésitations des Parents (FAQ)", color: "text-msk-blue-600 border-msk-blue-200 bg-msk-blue-50/40" },
    { id: "temoignages", title: "Témoignages des Familles", color: "text-msk-coral-600 border-msk-coral-200 bg-msk-coral-50/40" },
    { id: "galerie", title: "Galerie & Vie au Centre", color: "text-msk-sun-600 border-msk-sun-200 bg-msk-sun-50/40" },
    { id: "cta-contact", title: "Inscriptions & Contact", color: "text-msk-blue-600 border-msk-blue-200 bg-msk-blue-50/40" },
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-[#FDFBF7] overflow-hidden">
      {/* Interactive Background Scroll Stroke flowing from Hero down to Footer */}
      <ScrollStrokePath />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 lg:pt-24 pb-12 lg:pb-16 min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center overflow-hidden">

        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-6 lg:py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8">
              <WordPullUp 
                text="L'école où chaque enfant s'éveille."
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[60px] font-black text-msk-night-900 tracking-tight leading-[1.1] text-left"
              />

              <FadeUp delay={0.4}>
                <p className="text-xl sm:text-2xl text-slate-600 font-medium max-w-xl leading-relaxed">
                  Pédagogie Montessori, Neuro-Gym et accompagnement sur-mesure à Casablanca.
                </p>
              </FadeUp>

              <FadeUp delay={0.6}>
                <div className="pt-2">
                  <Link href="/notre-approche">
                    <MagneticButton
                      className="bg-msk-coral-500 hover:bg-msk-coral-600 text-white font-bold text-sm tracking-wider uppercase rounded-2xl shadow-lg shadow-msk-coral-500/25 border-0"
                      size="lg"
                    >
                      DÉCOUVRIR
                    </MagneticButton>
                  </Link>
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

      {/* 2nd Section — Virtual 3D Tour */}
      <section className="relative z-10 w-full min-h-[100dvh] flex flex-col py-16 md:py-24 border-b border-msk-cream-200/60">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col h-full flex-1">
          {/* Section Title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-msk-night-900 tracking-tight">
              Visitez notre école à distance
            </h2>
            <p className="text-slate-600 font-medium mt-4 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Découvrez l&apos;intérieur de nos classes et installations. <br className="hidden sm:block" />
              Cliquez sur les cercles au sol pour vous déplacer dans l&apos;école.
            </p>
          </div>
          
          {/* Virtual Tour Container with Gradient Border */}
          <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col rounded-[2rem] p-1.5 bg-gradient-to-tr from-msk-coral-400 via-msk-sun-400 to-msk-blue-400 shadow-2xl shadow-msk-sun-500/15 min-h-[500px]">
            <div className="flex-1 w-full relative rounded-[1.6rem] overflow-hidden bg-[#FDFBF7]">
              <iframe 
                src="https://immersio.ma/visite/cabinet_dr_benahsin" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <MethodSection />

      {/* Other Sections Placeholder with Reduced Padding-X and Airy Design */}
      {sections.filter(s => s.id !== "methode" && s.id !== "faq-parents").map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-16 md:py-24 relative z-10 border-b border-msk-cream-200/60 ${
            idx % 2 === 0 ? "bg-white/40 backdrop-blur-[2px]" : "bg-transparent"
          }`}
        >
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className={`rounded-3xl border-2 border-dashed p-12 md:p-16 text-center transition-all bg-white/70 shadow-sm ${section.color}`}>
              <span className="text-xs font-bold uppercase tracking-widest block mb-2 opacity-80">
                Section {idx + 4}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-msk-night-900">
                {section.title}
              </h2>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ Section */}
      <ParentFAQSection />
    </div>
  );
}
