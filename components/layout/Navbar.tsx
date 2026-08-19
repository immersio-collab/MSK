"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/data/site-content";
import { BrandLogo } from "@/components/common/BrandLogo";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
          ? "bg-[#FDFBF7]/92 backdrop-blur-md shadow-xs py-3.5 border-b border-msk-cream-200"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo />

        {/* Minimal, Airy & Playful Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {NAV_LINKS.map((link, lIdx) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            const isHovered = hoveredLink === link.label;

            // Alternating joyful squiggle colors
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
                    setHoveredLink(link.label);
                  }}
                  onMouseLeave={() => {
                    setDropdownOpen(false);
                    setHoveredLink(null);
                  }}
                >
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="relative flex items-center gap-1 text-[15px] font-semibold text-msk-night-900 hover:text-msk-coral-600 transition-colors py-1 group"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-msk-night-700/60 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180 text-msk-coral-600" : "group-hover:text-msk-coral-600"
                      }`}
                    />

                    {/* Playful squiggle line on active or hover */}
                    {(isActive || isHovered || dropdownOpen) && (
                      <motion.svg
                        layoutId="navSquiggle"
                        className={`absolute -bottom-1.5 left-0 w-full h-2 ${squiggleColor}`}
                        viewBox="0 0 50 6"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M1 3.5C8 1 15 6 22 3.5C29 1 36 6 43 3.5C46 2.5 48 3.5 49 3.5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    )}
                  </button>

                  {/* Soft & Floating Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 z-50"
                      >
                        <div className="rounded-3xl bg-white p-3 shadow-xl border border-msk-cream-200">
                          {link.children.map((child, idx) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setDropdownOpen(false)}
                              className="group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-msk-night-900 hover:text-msk-coral-700 hover:bg-msk-cream-50 transition-colors"
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
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative text-[15px] font-semibold text-msk-night-900 hover:text-msk-coral-600 transition-colors py-1 group"
              >
                <span>{link.label}</span>

                {/* Playful squiggle line on active or hover */}
                {(isActive || isHovered) && (
                  <motion.svg
                    layoutId="navSquiggle"
                    className={`absolute -bottom-1.5 left-0 w-full h-2 ${squiggleColor}`}
                    viewBox="0 0 50 6"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M1 3.5C8 1 15 6 22 3.5C29 1 36 6 43 3.5C46 2.5 48 3.5 49 3.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
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
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="md:hidden fixed inset-x-0 top-[70px] bg-[#FDFBF7]/98 backdrop-blur-xl border-b border-msk-cream-200 shadow-xl px-6 py-6"
          >
            <div className="space-y-4">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-bold text-msk-night-900 hover:text-msk-coral-600 py-1"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 pt-2 space-y-2 border-l-2 border-msk-coral-200 ml-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs font-semibold text-msk-night-700 hover:text-msk-coral-600 py-1"
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
