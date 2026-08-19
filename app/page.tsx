import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Brain, Sun } from "lucide-react";
import { WordPullUp } from "@/components/magicui/word-pull-up";
import { FadeUp } from "@/components/magicui/fade-up";
import { MethodSection } from "@/components/home/MethodSection";
import { ParentFAQSection } from "@/components/home/ParentFAQSection";

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
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative pt-[100px] sm:pt-[120px] pb-16 md:pb-24 min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8">
              <WordPullUp 
                text="L'école où chaque enfant s'éveille."
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black text-msk-night-900 tracking-tight leading-[1.08] text-left"
              />

              <FadeUp delay={0.4}>
                <p className="text-xl sm:text-2xl text-slate-600 font-medium max-w-xl leading-relaxed">
                  Pédagogie Montessori, Neuro-Gym et accompagnement sur-mesure à Casablanca.
                </p>
              </FadeUp>

              <FadeUp delay={0.6}>
                <div className="pt-2">
                  <Link
                    href="/notre-approche"
                    className="inline-flex items-center justify-center rounded-2xl bg-msk-coral-500 hover:bg-msk-coral-600 text-white font-bold text-sm tracking-wider uppercase px-9 py-4 shadow-lg shadow-msk-coral-500/25 transition-all hover:scale-105 active:scale-95"
                  >
                    DÉCOUVRIR
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: Joyful, Magical 3D-Like Miniature World Placeholder */}
            <div className="lg:col-span-6 relative">
              <FadeUp delay={0.3} duration={0.8} y={20}>
                <div className="relative rounded-3xl bg-gradient-to-br from-msk-cream-100 via-white to-msk-blue-50/50 p-8 sm:p-12 border border-msk-cream-300 shadow-xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
                  {/* Soft ambient background circles */}
                  <div className="absolute top-6 right-6 w-36 h-36 rounded-full bg-msk-sun-300/30 blur-2xl pointer-events-none" />
                  <div className="absolute bottom-6 left-6 w-36 h-36 rounded-full bg-msk-coral-300/30 blur-2xl pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-msk-blue-200/40 blur-3xl pointer-events-none" />

                  {/* Playful School Visual Composition */}
                  <div className="relative z-10 text-center space-y-4 max-w-sm">
                    <div className="inline-flex items-center justify-center gap-3 p-4 rounded-3xl bg-white shadow-md border border-msk-cream-200">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-msk-coral-100 text-msk-coral-600">
                        <Heart className="h-6 w-6" />
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-msk-sun-100 text-msk-sun-700">
                        <Sun className="h-6 w-6" />
                      </span>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-msk-blue-100 text-msk-blue-600">
                        <Brain className="h-6 w-6" />
                      </span>
                    </div>

                    <div className="space-y-1 pt-2">
                      <h3 className="text-xl font-extrabold text-msk-night-900">
                        Un univers pensé pour l&apos;enfant
                      </h3>
                      <p className="text-sm text-slate-500">
                        Observation • Bienveillance • Mouvement
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* 2nd Section — Virtual 3D Tour */}
      <section className="relative w-full min-h-[100dvh] flex flex-col bg-[#FDFBF7] py-16 md:py-24 border-b border-msk-cream-200">
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
          className={`py-16 md:py-24 border-b border-msk-cream-200 ${
            idx % 2 === 0 ? "bg-white" : "bg-[#FDFBF7]"
          }`}
        >
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className={`rounded-3xl border-2 border-dashed p-12 md:p-16 text-center transition-all ${section.color}`}>
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
