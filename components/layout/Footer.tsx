import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { BrandLogo } from "@/components/common/BrandLogo";
import { NAV_LINKS, SCHOOL_INFO } from "@/lib/data/site-content";
import { FooterOceanBackground } from "./FooterOceanBackground";
import { FooterWaveTransition } from "./FooterWaveTransition";

/**
 * Les deux colonnes de navigation SORTENT de `NAV_LINKS` — elles ne sont plus
 * recopiées à la main (2026-08-27). Recopiées, elles avaient dérivé : le pied
 * de page disait encore « La méthode » quand le menu disait « Notre méthode »,
 * oubliait « Notre fondatrice » et « Actualités », et affichait un
 * « Admissions » qui menait à /contact — le lien juste en dessous.
 */
const NOTRE_CENTRE = NAV_LINKS.find((lien) => lien.children)?.children ?? [];

/**
 * Les entrées de premier niveau, sauf Contact : la troisième colonne EST le
 * contact, l'y répéter ferait le doublon qu'on vient de retirer.
 */
const PAGES = NAV_LINKS.filter((lien) => !lien.children && lien.href !== "/contact");

export const Footer: React.FC = () => {
  return (
    <footer className="bg-msk-night-950 text-white pt-20 pb-16 md:pb-20 relative">
      {/* Subtly animated ocean wave surface transition */}
      <FooterWaveTransition />

      {/* Full-width responsive deep night ocean Lottie animation */}
      <FooterOceanBackground />


      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 lg:gap-16 pb-12 border-b border-msk-night-800/80">
          
          {/* Brand & Location & Socials */}
          <div className="space-y-4 max-w-sm">
            <BrandLogo variant="plain" />
            <p className="text-base text-slate-300 leading-relaxed pt-1">
              École inclusive & réadaptation comportementale à Casablanca.
            </p>
            <p className="text-sm text-slate-400 flex items-start gap-2">
              <MapPin className="h-4 w-4 text-msk-coral-400 shrink-0 mt-0.5" />
              <span>{SCHOOL_INFO.address}</span>
            </p>

            {/* Social media buttons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SCHOOL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MSK sur Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-msk-night-800 text-slate-300 hover:text-msk-coral-300 hover:bg-msk-night-700 transition-colors border border-msk-night-700"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SCHOOL_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MSK sur Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-msk-night-800 text-slate-300 hover:text-msk-blue-300 hover:bg-msk-night-700 transition-colors border border-msk-night-700"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SCHOOL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MSK sur WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-msk-night-800 text-slate-300 hover:text-green-400 hover:bg-msk-night-700 transition-colors border border-msk-night-700"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SCHOOL_INFO.email}`}
                aria-label="Écrire à MSK par email"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-msk-night-800 text-slate-300 hover:text-msk-sun-300 hover:bg-msk-night-700 transition-colors border border-msk-night-700"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links with generous sizing and child-friendly hover colors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-msk-coral-400 block">
                Notre centre
              </span>
              <ul className="space-y-2.5">
                {NOTRE_CENTRE.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-base font-medium text-slate-200 hover:text-msk-coral-300 transition-colors">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Remplace l'ancienne colonne « Cycles » : ses deux entrées,
                Maternelle et Primaire, menaient à la MÊME adresse (/programmes)
                — deux liens pour une seule page. Les onglets du sélecteur n'ont
                pas d'ancre propre, il n'y avait donc rien à distinguer. */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-msk-sun-400 block">
                Le site
              </span>
              <ul className="space-y-2.5">
                {PAGES.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-base font-medium text-slate-200 hover:text-msk-sun-300 transition-colors">
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-msk-blue-400 block">
                Contact
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/contact" className="text-base font-medium text-slate-200 hover:text-msk-blue-300 transition-colors">
                    Formulaire de contact
                  </Link>
                </li>
                <li>
                  <a href={`tel:${SCHOOL_INFO.phoneRaw || SCHOOL_INFO.phone}`} className="text-base font-medium text-slate-200 hover:text-msk-blue-300 transition-colors">
                    {SCHOOL_INFO.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SCHOOL_INFO.email}`} className="text-base font-medium text-slate-200 hover:text-msk-blue-300 transition-colors">
                    {SCHOOL_INFO.email}
                  </a>
                </li>
                {/* Pas de ligne d'adresse ici : « Gauthier, Casablanca »
                    répétait, en plus court et moins utile, l'adresse complète
                    déjà affichée avec son repère dans la colonne de gauche. */}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} MSK Montessori. Réalisé par{" "}
            <a
              href="https://immersio.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors underline underline-offset-4 decoration-slate-600 hover:decoration-white"
            >
              immersio.ma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

