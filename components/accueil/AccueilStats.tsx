"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Key figures, set in the condensed display face so the numbers carry the
 * section on their own — the reference's habit of letting oversized type do
 * the work rather than adding chrome around it.
 *
 * Figures follow the hero badge (15 ans, +200 familles) rather than the older
 * 10+/40+ pair that used to sit here; the two disagreed.
 */
const STATS = [
  { value: "15", unit: "ans", label: "D'expérience à Casablanca" },
  { value: "200", unit: "+", label: "Familles accompagnées" },
  { value: "6", unit: "", label: "Étapes de la méthode MSK" },
  { value: "100", unit: "%", label: "Programme individualisé" },
];

export const AccueilStats = () => {
  return (
    <section className="w-full bg-msk-coral-50 py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <li key={stat.label}>
              <FadeUp delay={0.08 * index}>
                <p className="font-condensed text-[3.25rem] uppercase leading-none text-msk-night-950 sm:text-[4.5rem]">
                  {stat.value}
                  {stat.unit ? (
                    <span className="text-[0.45em] text-msk-coral-600">
                      {stat.unit}
                    </span>
                  ) : null}
                </p>
                <p className="mt-3 max-w-[14rem] font-body text-sm font-medium leading-snug text-msk-night-800">
                  {stat.label}
                </p>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
