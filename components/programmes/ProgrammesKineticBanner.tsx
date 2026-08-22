"use client";

/**
 * Bannière marquee CSS-only calquée sur MethodeKineticBanner.
 *
 * Texte : les 4 niveaux/programmes du centre.
 * Fond sombre msk-night-950, même traitement typographique oversized.
 * CSS-only : pas d'IntersectionObserver, pas de GSAP. Les mots sont du vrai
 * texte visible avant et sans JavaScript.
 */
export const ProgrammesKineticBanner = () => {
  const words = ["Maternelle", "Primaire", "Neuro-Gym", "Insertion"];

  // Alternance des couleurs brand, cycle identique à la méthode.
  const tone = [
    "text-msk-coral-400",
    "text-msk-sun-400",
    "text-msk-blue-400",
  ];

  const track = (
    <ul className="flex shrink-0 items-center gap-8 pr-8 md:gap-14 md:pr-14">
      {words.map((word, index) => (
        <li key={word} className="flex items-center gap-8 md:gap-14">
          <span
            className={`font-display text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl lg:text-8xl ${tone[index % tone.length]}`}
          >
            {word}
          </span>
          <span
            aria-hidden
            className="h-3 w-3 shrink-0 rounded-full bg-msk-cream-300 md:h-4 md:w-4"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="w-full overflow-hidden bg-msk-night-950 py-14 md:py-20">
      <h2 className="sr-only">Maternelle, Primaire, Neuro-Gym, Insertion</h2>
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
