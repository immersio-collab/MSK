"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/data/site-content";
import { BrandLogo } from "@/components/common/BrandLogo";

// Unique hand-drawn underline shapes for each navbar item
const UNDERLINE_SHAPES = [
  // 0: Accueil - Double bouncy curve
  {
    viewBox: "0 0 100 12",
    d: "M 2 8 C 18 2, 34 11, 50 6 C 66 1, 82 10, 98 4",
    height: "h-2.5",
    bottom: "-bottom-1",
    strokeWidth: 4.5, // Bolder
  },
  // 1: Notre centre - Cursive loop doodle (from user ref)
  {
    viewBox: "0 0 100 18",
    d: "M 2 6 C 24 5.5, 46 5.5, 64 5 C 76 4.5, 85 9, 80 14 C 75 18, 58 15, 63 8 C 66 4, 78 5.5, 98 6.5",
    height: "h-3.5",
    bottom: "-bottom-2",
    strokeWidth: 4.0, // Bolder
  },
  // 2: Programmes - Smooth gentle wave (from user ref)
  {
    viewBox: "0 0 100 12",
    d: "M 2 7 C 22 2, 48 11, 74 5 C 86 2, 94 6, 98 5.5",
    height: "h-2.5",
    bottom: "-bottom-1",
    strokeWidth: 4.5, // Bolder
  },
  // 3: Actualités - Sharp zigzag folded lightning line (from user ref)
  {
    viewBox: "0 0 100 14",
    d: "M 3 11 C 15 11, 28 11, 40 11 C 43 11, 44 9, 39 7 L 18 3.5 C 13 2.5, 16 1.5, 22 1.5 L 97 2.5",
    height: "h-3",
    bottom: "-bottom-1.5",
    strokeWidth: 4.2, // Bolder
  },
  // 4: Contact - Multi-wave ripple squiggle (from user ref)
  {
    viewBox: "0 0 100 10",
    d: "M 2 5 C 9 1, 15 9, 22 5 C 29 1, 35 9, 42 5 C 49 1, 55 9, 62 5 C 69 1, 75 9, 82 5 C 89 1, 95 9, 98 5",
    height: "h-2.5",
    bottom: "-bottom-1",
    strokeWidth: 4.5, // Bolder
  },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeShapes, setActiveShapes] = useState<Record<string, number>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleMouseEnter = (label: string) => {
    setHoveredLink(label);
    // Assign a new random shape index whenever hovered
    setActiveShapes((prev) => ({
      ...prev,
      [label]: Math.floor(Math.random() * UNDERLINE_SHAPES.length),
    }));
  };

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
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
            // Use randomly assigned shape from hover, fallback to lIdx for initial render
            const shape = UNDERLINE_SHAPES[activeShapes[link.label] ?? (lIdx % UNDERLINE_SHAPES.length)];

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
        >
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[76px] bg-msk-cream-50/95 backdrop-blur-xl border-b border-msk-cream-200 shadow-2xl px-8 py-8"
          >
            <div className="space-y-5">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <span className="block text-xl font-bold text-msk-night-900 py-1">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-xl font-bold text-msk-night-900 hover:text-msk-coral-600 py-1"
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.children && (
                    <div className="pl-4 pt-2 space-y-2.5 border-l-2 border-msk-coral-200 ml-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm font-semibold text-msk-night-700 hover:text-msk-coral-600 py-1"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
