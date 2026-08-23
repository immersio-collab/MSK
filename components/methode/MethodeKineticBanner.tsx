"use client";

import { SCHOOL_INFO } from "@/lib/data/site-content";

/**
 * The reference breaks a short slogan into oversized letters that drift across
 * the page. Here the same treatment carries SCHOOL_INFO.baseline — the six verbs
 * the method is named for.
 *
 * CSS-only on purpose: no IntersectionObserver, no framer-motion. The words are
 * real text that is visible before (and without) JavaScript, and the marquee is
 * a single compositor-friendly transform.
 */
export const MethodeKineticBanner = ({
  text = SCHOOL_INFO.baseline,
}: {
  /**
   * Full-stop separated phrase. Defaults to the method's own baseline; pages
   * with a different sequence pass their own, or the band ends up announcing
   * the wrong six words.
   */
  text?: string;
}) => {
  const words = text
    .split(".")
    .map((word) => word.trim())
    .filter(Boolean);

  // Alternating fills, cycling through the brand accents.
  const tone = [
    "text-msk-sun-400",
    "text-msk-coral-500",
    "text-msk-blue-400",
  ];

  const track = (
    <ul className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
      {words.map((word, index) => (
        <li key={word} className="flex items-center gap-6 md:gap-10">
          <span
            className={`font-display text-3xl font-bold uppercase leading-none tracking-tight md:text-5xl lg:text-6xl ${tone[index % tone.length]}`}
          >
            {word}
          </span>
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full bg-msk-cream-300 md:h-2.5 md:w-2.5"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="w-full overflow-hidden bg-msk-night-800 py-8 md:py-12">
      {/* The slogan is announced once here; both marquee tracks are decorative,
          so the repeated words are not read out twice. */}
      <h2 className="sr-only">{text}</h2>
      <div
        aria-hidden
        className="flex w-max animate-marquee motion-reduce:animate-none"
      >
        {track}
        {track}
      </div>
    </section>
  );
};
