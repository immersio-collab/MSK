"use client";

import { useRef } from "react";
import { MorphButton } from "@/components/motion/MorphButton";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Full-viewport "sky" hero: centred two-tone display headline on a light blue
 * band, surrounded by hand-drawn SVG characters (smiling clouds, a sun, a
 * coral caterpillar peeking from the right edge).
 *
 * Le ciel bleu-100 est la première image du site et son moment d'accroche : il
 * ne suit PAS le fond crème-100 des héros intérieurs, et c'est délibéré
 * (/contact, l'autre héros sur mesure, partage ce même ciel).
 *
 * Motion is layered per decoration: an outer wrapper carries the scroll
 * parallax (useScroll/useTransform, each element at its own rate) and an inner
 * wrapper carries the infinite idle loop (sun bob/tilt, cloud drift, wandering
 * pupils). Both layers no-op under prefers-reduced-motion, leaving the static
 * SVGs visible.
 *
 * Every fill references a --color-msk-* token from @theme — the palette is
 * closed, no new colours.
 */
const RAY_ANGLES = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];

const WhiteCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 50" className={className} aria-hidden>
    <ellipse cx="30" cy="34" rx="22" ry="14" fill="white" />
    <ellipse cx="55" cy="26" rx="24" ry="16" fill="white" />
    <ellipse cx="76" cy="36" rx="18" ry="12" fill="white" />
  </svg>
);

const SmileCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 80" className={className} aria-hidden>
    <circle cx="34" cy="46" r="20" fill="var(--color-msk-blue-300)" />
    <circle cx="58" cy="32" r="24" fill="var(--color-msk-blue-300)" />
    <circle cx="86" cy="46" r="19" fill="var(--color-msk-blue-300)" />
    <circle cx="48" cy="56" r="18" fill="var(--color-msk-blue-300)" />
    <circle cx="72" cy="56" r="18" fill="var(--color-msk-blue-300)" />
    <circle cx="48" cy="40" r="5" fill="var(--color-msk-night-900)" />
    <circle cx="50" cy="38" r="1.6" fill="white" />
    <circle cx="72" cy="40" r="5" fill="var(--color-msk-night-900)" />
    <circle cx="74" cy="38" r="1.6" fill="white" />
    <circle cx="38" cy="50" r="4" fill="var(--color-msk-blue-400)" />
    <circle cx="82" cy="50" r="4" fill="var(--color-msk-blue-400)" />
    <path d="M52 49 A 8 6 0 0 0 68 49 Z" fill="var(--color-msk-night-900)" />
  </svg>
);

const SunCharacter = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g transform="translate(100 100)">
        {RAY_ANGLES.map((angle) => (
          <path
            key={angle}
            d="M0,-94 L15,-56 L-15,-56 Z"
            fill="var(--color-msk-sun-500)"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle r="60" fill="var(--color-msk-sun-400)" />
        <ellipse cx="-20" cy="-10" rx="9" ry="10" fill="white" />
        <ellipse cx="20" cy="-10" rx="9" ry="10" fill="white" />
        <motion.g
          animate={reduce ? undefined : { x: [0, 3, -3, 0], y: [0, -2, 1.5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.4,
          }}
        >
          <circle cx="-20" cy="-10" r="4" fill="var(--color-msk-night-900)" />
          <circle cx="20" cy="-10" r="4" fill="var(--color-msk-night-900)" />
        </motion.g>
        <ellipse cx="0" cy="8" rx="7" ry="5" fill="var(--color-msk-coral-500)" />
        <path
          d="M-16 20 Q0 32 16 20"
          stroke="var(--color-msk-night-900)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

const Caterpillar = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 160 220" className={className} aria-hidden>
      <path
        d="M148,230 C148,120 130,55 85,55 C50,55 42,85 42,118"
        stroke="var(--color-msk-coral-400)"
        strokeWidth="40"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="148" cy="190" r="6" fill="var(--color-msk-sun-400)" />
      <circle cx="142" cy="130" r="5" fill="var(--color-msk-sun-400)" />
      <circle cx="122" cy="80" r="5" fill="var(--color-msk-sun-400)" />
      <circle cx="90" cy="57" r="5" fill="var(--color-msk-sun-400)" />
      <circle cx="42" cy="118" r="27" fill="var(--color-msk-coral-400)" />
      <circle cx="32" cy="110" r="8" fill="white" />
      <circle cx="53" cy="110" r="8" fill="white" />
      <motion.g
        animate={
          reduce ? undefined : { x: [0, 2.5, -2.5, 0, 0], y: [0, 1.5, -1, -2, 0] }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.6,
        }}
      >
        <circle cx="32" cy="110" r="3.5" fill="var(--color-msk-night-900)" />
        <circle cx="53" cy="110" r="3.5" fill="var(--color-msk-night-900)" />
      </motion.g>
      <ellipse cx="42" cy="130" rx="5" ry="6" fill="var(--color-msk-coral-700)" />
    </svg>
  );
};

export const AccueilHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Ground characters sink, sky elements rise — each at its own rate.
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sunRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const catY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const cloudAY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cloudBY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const cloudCY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const puffAY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const puffBY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const puffCY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const puffFrontY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-msk-blue-100 px-6 pb-44 pt-28 sm:px-10 md:pt-32"
    >
      <motion.div
        style={reduce ? undefined : { y: puffAY }}
        className="absolute left-[38%] top-[12%] z-0 w-16 sm:w-20"
      >
        <WhiteCloud />
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: puffBY }}
        className="absolute right-[4%] top-[36%] z-0 w-20 sm:w-24"
      >
        <WhiteCloud />
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: puffCY }}
        className="absolute bottom-[26%] left-[4%] z-0 w-24 sm:w-28"
      >
        <WhiteCloud />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <FadeUp>
          {/* coral-700 et non 600 : sur le bleu-100, le 600 ne tient que
              4.2:1 pour un texte de 12-14px. */}
          <p className="font-display text-xs font-semibold uppercase tracking-[0.08em] text-msk-coral-700 sm:text-sm">
            +200 familles · 15 ans d&apos;expérience · Casablanca
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1 className="mt-4">
            <span className="block font-display text-[2.1rem] font-semibold leading-[1.02] text-msk-night-900 sm:text-5xl lg:text-[4rem]">
              l&apos;école où chaque enfant
            </span>
            <span className="block font-display text-[3.4rem] font-semibold leading-[1.05] text-msk-sun-500 sm:text-7xl lg:text-[7rem]">
              s&apos;éveille
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.18}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-msk-night-700 md:text-lg">
            Le seul centre thérapeutique et éducatif Montessori au Maroc.
            Quelques jours par semaine, en complément de son école, pour ce
            qu&apos;elle ne peut pas lui apporter seule.
          </p>
        </FadeUp>

        <FadeUp delay={0.28}>
          <MorphButton
            href="/contact"
            size="sm"
            className="mt-8 text-sm font-semibold text-white"
            fillClassName="bg-msk-night-950"
          >
            Prendre rendez-vous
            <ArrowRight className="h-4 w-4" aria-hidden />
          </MorphButton>
        </FadeUp>
      </div>

      <motion.div
        style={reduce ? undefined : { y: cloudAY }}
        className="absolute left-[8%] top-[32%] z-20 w-24 lg:w-32"
      >
        <motion.div
          animate={reduce ? undefined : { x: [0, 10, 0], y: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <SmileCloud />
        </motion.div>
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: cloudBY }}
        className="absolute right-[10%] top-[20%] z-20 w-20 lg:w-28"
      >
        <motion.div
          animate={reduce ? undefined : { x: [0, -12, 0], y: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <SmileCloud />
        </motion.div>
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: cloudCY }}
        className="absolute bottom-[16%] left-[24%] z-20 hidden w-16 sm:block lg:w-20"
      >
        <motion.div
          animate={reduce ? undefined : { x: [0, 8, 0], y: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <SmileCloud />
        </motion.div>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: sunY, rotate: sunRotate }}
        className="absolute -bottom-14 -left-12 z-10 w-44 sm:w-56 lg:w-64"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <SunCharacter />
        </motion.div>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: catY }}
        className="absolute -right-8 bottom-0 z-10 w-36 sm:w-44 lg:w-52"
      >
        <Caterpillar />
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: puffFrontY }}
        className="absolute -bottom-4 right-24 z-20 w-32 sm:w-40"
      >
        <WhiteCloud />
      </motion.div>
    </section>
  );
};
