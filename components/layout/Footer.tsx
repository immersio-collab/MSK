import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { SCHOOL_INFO } from "@/lib/data/site-content";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-msk-night-900 text-white border-t border-msk-night-800 py-16 md:py-20 relative overflow-hidden">
      {/* Soft warm magical ambient glows */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-msk-sun-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-msk-coral-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 lg:gap-16 pb-12 border-b border-msk-night-800/80">
          
          {/* Brand & Location */}
          <div className="space-y-4 max-w-sm">
            <BrandLogo variant="white" />
            <p className="text-base text-slate-300 leading-relaxed pt-1">
              École inclusive & réadaptation comportementale à Casablanca.
            </p>
            <p className="text-sm text-slate-400">
              {SCHOOL_INFO.address}
            </p>
          </div>

          {/* Navigation Links with generous sizing and child-friendly hover colors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-msk-coral-400 block">
                L&apos;École
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/notre-approche" className="text-base font-medium text-slate-200 hover:text-msk-coral-300 transition-colors">
                    Notre approche
                  </Link>
                </li>
                <li>
                  <Link href="/vie-scolaire" className="text-base font-medium text-slate-200 hover:text-msk-coral-300 transition-colors">
                    Vie scolaire
                  </Link>
                </li>
                <li>
                  <Link href="/admissions" className="text-base font-medium text-slate-200 hover:text-msk-coral-300 transition-colors">
                    Admissions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-msk-sun-400 block">
                Cycles
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/programmes/petite-enfance" className="text-base font-medium text-slate-200 hover:text-msk-sun-300 transition-colors">
                    Petite enfance
                  </Link>
                </li>
                <li>
                  <Link href="/programmes/primaire" className="text-base font-medium text-slate-200 hover:text-msk-sun-300 transition-colors">
                    Primaire
                  </Link>
                </li>
                <li>
                  <Link href="/programmes/adolescents" className="text-base font-medium text-slate-200 hover:text-msk-sun-300 transition-colors">
                    Adolescents
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-msk-blue-400 block">
                Contact
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/contact" className="text-base font-medium text-slate-200 hover:text-msk-blue-300 transition-colors">
                    Nous écrire
                  </Link>
                </li>
                <li>
                  <a href={`tel:${SCHOOL_INFO.phone}`} className="text-base font-medium text-slate-200 hover:text-msk-blue-300 transition-colors">
                    {SCHOOL_INFO.phone}
                  </a>
                </li>
                <li>
                  <span className="text-sm text-slate-400 block pt-1">
                    Casablanca, Maroc
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} MSK Montessori School Casablanca.</p>
          <div className="flex items-center gap-6">
            <Link href="/admissions" className="hover:text-white transition-colors">
              Inscriptions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Plan d&apos;accès
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
