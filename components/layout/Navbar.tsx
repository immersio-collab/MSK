"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { NAV_LINKS, SCHOOL_INFO } from "@/lib/data/site-content";
import { BrandLogo } from "@/components/common/BrandLogo";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { MorphButton } from "@/components/motion/MorphButton";

// Un seul trait dessiné à la main, partout — le site en essayait cinq
// (boucle, zigzag, double courbe...), et le résultat était illisible au
// survol. Cette vague simple est la seule gardée.
const UNDERLINE_SHAPE = {
  viewBox: "0 0 100 12",
  d: "M 2 7 C 22 2, 48 11, 74 5 C 86 2, 94 6, 98 5.5",
  height: "h-2.5",
  bottom: "-bottom-1",
  strokeWidth: 4.5,
};

/**
 * Le trio du logo — corail, jaune, bleu — redistribué sur les entrées du menu
 * mobile. Les pastilles reprennent les lettres M, S et K dans l'ordre ; la
 * bordure des sous-entrées suit la même roue. `%3` et non une couleur par
 * rubrique : la liste peut grandir sans qu'on ait à choisir une teinte.
 */
const TRIO_DOT = ["bg-msk-coral-500", "bg-msk-sun-500", "bg-msk-blue-500"];
const TRIO_EDGE = ["border-msk-coral-400", "border-msk-sun-400", "border-msk-blue-400"];

/**
 * Entrée en cascade du tiroir. Les enfants héritent de `show` du parent, donc
 * un seul `animate` sur la liste suffit à décaler toute la colonne.
 */
const DRAWER_LIST = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};
const DRAWER_ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: "easeOut" as const } },
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleMouseEnter = (label: string) => setHoveredLink(label);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Le tiroir mobile couvre tout l'écran : sans ce verrou, le doigt fait défiler
  // la page DERRIÈRE le menu, qui reste immobile — on rouvre sur une autre
  // section que celle qu'on avait quittée.
  // La classe sert au CSS qui retire le bouton WhatsApp flottant : il passe
  // au-dessus du tiroir et doublonnait son propre raccourci. Une classe posée
  // ici plutôt qu'un `:has()` seul — le sélecteur marche, mais faire dépendre
  // la correction d'une fonctionnalité CSS récente n'apporte rien.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-mobile-ouvert");
    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove("menu-mobile-ouvert");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Le tiroir est un FRÈRE du header, jamais son enfant. Le header porte un
    // `backdrop-blur`, et un backdrop-filter fait de l'élément le bloc conteneur
    // de ses descendants `fixed` : le tiroir résolvait alors son `bottom-0`
    // contre une barre de 60px et sortait à une hauteur de zéro — visible nulle
    // part, sans la moindre erreur.
    <>
      <header
        // Le tiroir mobile force le fond opaque : sa nappe crème descend jusqu'en
        // bas de l'écran, et une barre restée transparente laissait voir la bande
        // colorée du héros derrière le logo — une couture en haut du menu.
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-msk-cream-50/95 backdrop-blur-md shadow-2xs py-2 md:py-3 border-b border-msk-cream-200"
            : "bg-transparent py-3 md:py-4"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Large, Friendly Brand Logo */}
          <BrandLogo />

          {/* Minimal, Airy, Larger Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link, lIdx) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              const isHovered = hoveredLink === link.label;
              const shape = UNDERLINE_SHAPE;

              // Alternating joyful squiggle colors (kept exactly as before)
              const squiggleColor =
                lIdx % 3 === 0
                  ? "text-msk-coral-500"
                  : lIdx % 3 === 1
                  ? "text-msk-blue-500"
                  : "text-msk-sun-500";

              if (link.children) {
                return (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => {
                      setDropdownOpen(true);
                      handleMouseEnter(link.label);
                    }}
                    onMouseLeave={() => {
                      setDropdownOpen(false);
                      setHoveredLink(null);
                    }}
                  >
                    <button
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className="relative flex items-center gap-1.5 text-base lg:text-[17px] font-semibold text-msk-night-900 hover:text-msk-coral-600 transition-colors py-1.5 group"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-msk-night-700/60 transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180 text-msk-coral-600" : "group-hover:text-msk-coral-600"
                        }`}
                      />

                      {/* Playful distinct squiggle underline */}
                      <AnimatePresence>
                        {(isActive || isHovered || dropdownOpen) && (
                          <motion.svg
                            key={`nav-underline-${link.label}`}
                            className={`absolute ${shape.bottom} left-0 w-full ${shape.height} ${squiggleColor} pointer-events-none`}
                            viewBox={shape.viewBox}
                            fill="none"
                            preserveAspectRatio="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <motion.path
                              d={shape.d}
                              stroke="currentColor"
                              strokeWidth={shape.strokeWidth}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              exit={{ pathLength: 0 }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                            />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </button>

                    {/* Soft & Floating Dropdown */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 z-50"
                        >
                          <div className="rounded-3xl bg-white p-3.5 shadow-2xl border border-msk-cream-200">
                            {link.children.map((child, idx) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setDropdownOpen(false)}
                                className="group flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-bold text-msk-night-900 hover:text-msk-coral-700 hover:bg-msk-cream-50 transition-colors"
                              >
                                <span className={`h-2.5 w-2.5 rounded-full ${
                                  idx === 0 ? "bg-msk-coral-500" :
                                  idx === 1 ? "bg-msk-sun-500" :
                                  idx === 2 ? "bg-msk-blue-500" : "bg-msk-blue-700"
                                } transition-transform group-hover:scale-125`} />
                                <span>{child.title}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative text-base lg:text-[17px] font-semibold text-msk-night-900 hover:text-msk-coral-600 transition-colors py-1.5 group"
                >
                  <span>{link.label}</span>

                  {/* Playful distinct squiggle underline */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.svg
                        key={`nav-underline-${link.label}`}
                        className={`absolute ${shape.bottom} left-0 w-full ${shape.height} ${squiggleColor} pointer-events-none`}
                        viewBox={shape.viewBox}
                        fill="none"
                        preserveAspectRatio="none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <motion.path
                          d={shape.d}
                          stroke="currentColor"
                          strokeWidth={shape.strokeWidth}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          exit={{ pathLength: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-2xl text-msk-night-900 hover:bg-msk-cream-100 transition-colors"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="menu-mobile"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer — plein écran. L'ancienne nappe s'arrêtait sous la
          dernière entrée et laissait un grand vide sur la moitié basse. */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            // `inset-0` plutôt qu'un `top-[76px]` : la barre mesure 60,8px une
            // fois opaque, et tout écart entre les deux valeurs laissait voir
            // une lichette de la page entre le header et le tiroir. La nappe
            // part donc du haut de l'écran et passe SOUS le header (z-40 contre
            // z-50), qui garde son propre fond crème. `pt` réserve sa hauteur.
            // `overflow-x-hidden` n'est pas décoratif : le nuage du pied déborde
            // volontairement à droite, et en CSS un seul axe non-`visible` fait
            // passer l'autre en `auto` — le débord sortait donc une barre de
            // défilement horizontale sur toute la largeur du menu.
            className="md:hidden fixed inset-0 z-40 flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain bg-msk-cream-50 pt-[68px]"
          >
            {/* Le nuage du logo, repris en filigrane au pied du tiroir : il
                occupe le vide sous la navigation sans rien dire. */}
            <svg
              viewBox="26 6 204 104"
              aria-hidden
              className="pointer-events-none absolute -right-10 bottom-16 w-64 text-msk-cream-200"
              fill="currentColor"
            >
              <path d="M26 66a44 44 0 1 1 88 0a44 44 0 1 1-88 0ZM93 58a52 52 0 1 1 104 0a52 52 0 1 1-104 0ZM170 80a30 30 0 1 1 60 0a30 30 0 1 1-60 0ZM26 66H230V110H26Z" />
            </svg>

            <motion.nav
              variants={DRAWER_LIST}
              initial="hidden"
              animate="show"
              className="relative flex-1 px-7 pt-6"
            >
              {NAV_LINKS.map((link, lIdx) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                // Le décalage `shape.bottom` est IGNORÉ ici : calé sur les 17px
                // du menu desktop, il collait le trait aux lettres à 25,6px.
                // Ancré par le HAUT (`top-full`) et non par le bas.
                const shape = UNDERLINE_SHAPE;

                return (
                  // `mb-5` et pas `mb-6` : à 24px l'écart, la colonne dépassait
                  // de 12px sur un écran de 667px et sortait une barre de
                  // défilement pour rien.
                  <motion.div key={link.label} variants={DRAWER_ITEM} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-3.5">
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${TRIO_DOT[lIdx % 3]}`}
                      />
                      {/* L'entrée à tiroir n'est pas un lien : ses quatre pages
                          sont juste en dessous, un lien de plus ferait doublon. */}
                      {link.children ? (
                        <span className="relative font-display text-[1.6rem] font-semibold leading-none text-msk-night-900">
                          {link.label}
                          {isActive && (
                            <svg
                              viewBox={shape.viewBox}
                              aria-hidden
                              className={`absolute inset-x-0 top-full mt-1.5 ${shape.height} w-full text-msk-coral-500`}
                              fill="none"
                              preserveAspectRatio="none"
                            >
                              <path
                                d={shape.d}
                                stroke="currentColor"
                                strokeWidth={shape.strokeWidth}
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </span>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="relative font-display text-[1.6rem] font-semibold leading-none text-msk-night-900"
                        >
                          {link.label}
                          {isActive && (
                            <svg
                              viewBox={shape.viewBox}
                              aria-hidden
                              className={`absolute inset-x-0 top-full mt-1.5 ${shape.height} w-full text-msk-coral-500`}
                              fill="none"
                              preserveAspectRatio="none"
                            >
                              <path
                                d={shape.d}
                                stroke="currentColor"
                                strokeWidth={shape.strokeWidth}
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </Link>
                      )}
                    </div>

                    {link.children && (
                      <div className="mt-4 ml-6 space-y-2">
                        {link.children.map((child, cIdx) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              aria-current={childActive ? "page" : undefined}
                              className={`block rounded-r-xl border-l-[3px] px-4 py-2.5 text-sm font-semibold transition-colors ${
                                TRIO_EDGE[cIdx % 3]
                              } ${
                                childActive
                                  ? "bg-msk-coral-50 text-msk-coral-700"
                                  : "bg-white text-msk-night-700"
                              }`}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Pied du tiroir : le menu mobile n'offrait aucune action, il
                fallait retraverser la page pour trouver un bouton. */}
            <motion.div
              variants={DRAWER_ITEM}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.34 }}
              className="relative mt-6 px-7 pb-8"
            >
              <MorphButton
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                maxDiameter="13rem"
                className="w-full font-display text-base font-semibold text-msk-cream-50"
                fillClassName="bg-msk-night-900"
              >
                Prendre rendez-vous
              </MorphButton>

              <div className="mt-4 flex items-center justify-center gap-7 font-display text-sm font-medium text-msk-night-700">
                <a
                  href={`tel:${SCHOOL_INFO.phoneRaw}`}
                  className="inline-flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-msk-coral-600" aria-hidden />
                  Appeler
                </a>
                <a
                  href={SCHOOL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <WhatsAppIcon className="h-4 w-4 text-msk-coral-600" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
