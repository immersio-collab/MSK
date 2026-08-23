"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Parent testimonials as flat colour cards.
 *
 * No audio players: the files the previous build pointed at
 * (/audio/temoignage-*.mp3) are not in public/ and returned 404 on every home
 * page load. Quotes, names and roles are unchanged — restore the players
 * together with the recordings, not before.
 */
const TESTIMONIALS = [
  {
    id: 1,
    quote: "En 6 mois, mon fils a retrouvé le sourire et l'envie d'apprendre.",
    author: "Salma B.",
    role: "maman de Ryan (7 ans, TDAH)",
    tag: "Primaire",
    card: "bg-msk-coral-100",
  },
  {
    id: 2,
    quote:
      "Lina va à l'école avec enthousiasme. L'approche Montessori combinée à l'inclusion est une merveille.",
    author: "Karim & Yasmine T.",
    role: "parents de Lina (4 ans)",
    tag: "Petite Enfance",
    card: "bg-msk-blue-100",
  },
  {
    id: 3,
    quote:
      "On nous avait dit qu'il ne pourrait jamais suivre un cursus normal. Aujourd'hui il est en CM1 dans une école classique.",
    author: "Nadia M.",
    role: "maman de Adam (9 ans)",
    tag: "Primaire",
    card: "bg-msk-sun-100",
  },
];

export const AccueilTemoignages = () => {
  return (
    <section className="w-full bg-msk-cream-50 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <FadeUp>
          <span className="inline-block rounded-[0.4rem] bg-msk-coral-200 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
            Paroles de parents
          </span>
          <h2 className="mt-6 max-w-3xl font-display text-[1.75rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2.25rem] lg:text-[2.75rem]">
            Ce que les familles racontent
          </h2>
        </FadeUp>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <li key={t.id}>
              <FadeUp
                delay={0.1 * index}
                className={`flex h-full flex-col justify-between rounded-[1.25rem] p-8 ${t.card}`}
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-msk-night-800 opacity-70">
                    {t.tag}
                  </span>
                  <blockquote className="mt-4 font-display text-lg font-bold uppercase leading-snug text-msk-night-950">
                    {t.quote}
                  </blockquote>
                </div>
                <footer className="mt-8 text-sm leading-snug text-msk-night-800">
                  <p className="font-semibold">{t.author}</p>
                  <p className="opacity-75">{t.role}</p>
                </footer>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
