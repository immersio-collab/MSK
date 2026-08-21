"use client";

import Link from "next/link";
import { CornerDownRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { FadeUp } from "@/components/motion/FadeUp";

interface Stat {
  value: string;
  /** Rendered smaller and tucked against the value: "+", "%", "ans"… */
  unit: string;
  title: string;
  description: string;
  href: string;
}

const STATS: Stat[] = [
  {
    value: "15",
    unit: "ans",
    title: "D'expérience à Casablanca",
    description:
      "Quinze années passées à observer, comprendre et adapter l'accompagnement, bien avant que l'inclusion ne devienne un sujet.",
    href: "/notre-centre",
  },
  {
    value: "200",
    unit: "+",
    title: "Familles accompagnées",
    description:
      "Des parents qui nous ont confié leur enfant, du premier bilan jusqu'à l'insertion scolaire ou professionnelle.",
    href: "/notre-centre/equipe",
  },
  {
    value: "6",
    unit: "",
    title: "Étapes de la méthode MSK",
    description:
      "Observer, comprendre, adapter, rééduquer, accompagner, insérer. Un parcours structuré, jamais improvisé.",
    href: "/notre-centre/la-methode",
  },
  {
    value: "100",
    unit: "%",
    title: "Programme individualisé",
    description:
      "Aucun parcours type : c'est le cadre qui s'adapte à l'enfant, jamais l'inverse.",
    href: "/programmes",
  },
];

/**
 * Scroll distance, in vh, that each stat occupies. The pinned column is
 * `STATS.length * STEP_VH` tall and the sticky child is one viewport, so the
 * card travels `STATS.length * STEP_VH - 100` vh while pinned.
 */
const STEP_VH = 70;

/**
 * Vertical centre of the ghost numeral for stat `i`, in vh from the top of the
 * pinned column. The tile is pinned at the viewport's mid-line, so ghost 0 sits
 * half a viewport in and each subsequent ghost one step further, less the share
 * of the step the pinned column itself consumes. This is the single source of
 * truth for the rhythm: `sentinelBandVh` derives the switch points from it, so
 * a ghost is always dead centre behind the tile the moment its stat goes live.
 */
const ghostCenterVh = (index: number) =>
  index * (STEP_VH - 100 / STATS.length) + 50;

/**
 * Contiguous, non-overlapping bands — one per stat — used as IntersectionObserver
 * sentinels. Stat `i` is active while the viewport's mid-line sits inside band `i`,
 * and each band opens exactly where that stat's ghost reaches the mid-line, so the
 * tile switches at the instant the ghost lines up behind it.
 */
const sentinelBandVh = (index: number) => {
  const start = index === 0 ? 0 : ghostCenterVh(index);
  const end =
    index === STATS.length - 1
      ? STATS.length * STEP_VH
      : ghostCenterVh(index + 1);
  return { start, height: end - start };
};

const StatValue = ({ value, unit }: Pick<Stat, "value" | "unit">) => (
  <span className="font-heading font-black tracking-tighter leading-none">
    {value}
    {unit ? <span className="text-[0.45em]">{unit}</span> : null}
  </span>
);

export const StatsScrollSection = () => {
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = pinnedRef.current;
    if (!root) return;

    // Deliberately not a `scroll` listener. This page mounts Lenis (via
    // ScrollEffectSection), which owns scrolling; an observer measures where the
    // section actually is rather than assuming who moved it, so it behaves the
    // same under Lenis, anchor jumps, keyboard scroll and a restored scroll
    // position — and costs nothing while the section is off-screen.
    const observer = new IntersectionObserver(
      (entries) => {
        // A fast flick can coalesce several crossings into one callback, and
        // entry order is not chronological — take the most recent one that is
        // actually intersecting. The bands are disjoint, so it is unambiguous.
        let index = -1;
        let latest = -1;
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.time < latest) continue;
          latest = entry.time;
          index = Number((entry.target as HTMLElement).dataset.statIndex);
        }
        if (index < 0) return;
        setActive((current) => (current === index ? current : index));
      },
      // A hairline band across the vertical middle of the viewport. The extra
      // 0.1% keeps the root from collapsing to zero area, which some engines
      // treat as never intersecting.
      { rootMargin: "-50% 0px -49.9% 0px", threshold: 0 },
    );

    root
      .querySelectorAll<HTMLElement>("[data-stat-index]")
      .forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const trackStyle = { transform: `translateY(-${active * 100}%)` };

  return (
    <section
      id="chiffres"
      className="relative z-10 w-full bg-msk-cream-100"
    >
      <div className="container mx-auto max-w-7xl px-6 sm:px-10 pt-16 md:pt-24 pb-10 md:pb-14">
        <FadeUp>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-msk-coral-600">
            Les chiffres qui comptent
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-black text-msk-night-900 tracking-tight leading-[1.1]">
            Ce que quinze ans d&apos;accompagnement représentent.
          </h2>
        </FadeUp>
      </div>

      {/* ---------- Pinned column (lg and up) ---------- */}
      <div
        ref={pinnedRef}
        className="relative hidden lg:block"
        style={{ height: `${STATS.length * STEP_VH}vh` }}
      >
        {/* Scroll sentinels — see `sentinelBandVh`. No paint, geometry only. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {STATS.map((stat, index) => {
            const { start, height } = sentinelBandVh(index);
            return (
              <div
                key={stat.title}
                data-stat-index={index}
                className="absolute inset-x-0"
                style={{ top: `${start}vh`, height: `${height}vh` }}
              />
            );
          })}
        </div>

        {/* Oversized ghost numerals scrolling past behind the card. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="container mx-auto h-full max-w-7xl px-6 sm:px-10">
            <div className="grid h-full grid-cols-[22rem_minmax(0,1fr)] gap-10">
              <div className="relative">
                {STATS.map((stat, index) => (
                  <span
                    key={stat.title}
                    className="absolute inset-x-0 -translate-y-1/2 text-center text-white text-[6.5rem] xl:text-[7.5rem]"
                    style={{ top: `${ghostCenterVh(index)}vh` }}
                  >
                    <StatValue value={stat.value} unit={stat.unit} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 flex h-screen items-center">
          <div className="container mx-auto w-full max-w-7xl px-6 sm:px-10">
            <div className="grid min-h-[24rem] grid-cols-[22rem_minmax(0,1fr)] gap-10">
              {/* Blue tile: vertical track of numerals, clipped. */}
              <div className="relative overflow-hidden rounded-[2rem] bg-msk-blue-300">
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out"
                  style={trackStyle}
                >
                  {STATS.map((stat) => (
                    <div
                      key={stat.title}
                      className="flex h-full w-full items-center justify-center px-6 text-msk-blue-900 text-[6.5rem] xl:text-[7.5rem]"
                    >
                      <StatValue value={stat.value} unit={stat.unit} />
                    </div>
                  ))}
                </div>
              </div>

              {/* White card: heading + copy slide together, the CTA stays put. */}
              <div className="flex flex-col justify-between rounded-[2rem] border border-msk-cream-200 bg-white p-10">
                <div className="relative flex-1 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-out"
                    style={trackStyle}
                  >
                    {STATS.map((stat) => (
                      <div key={stat.title} className="h-full">
                        <h3 className="max-w-md text-3xl xl:text-4xl font-black text-msk-night-900 leading-[1.15]">
                          {stat.title}
                        </h3>
                        <p className="mt-5 max-w-md text-base text-slate-600 leading-relaxed">
                          {stat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={STATS[active].href}
                  className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-msk-night-900 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-msk-night-900/15 transition-colors hover:bg-msk-night-800"
                >
                  <CornerDownRight className="h-4 w-4" aria-hidden />
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Plain stack (below lg) ---------- */}
      <div className="container mx-auto max-w-7xl px-6 sm:px-10 pb-16 md:pb-24 lg:hidden">
        <div className="grid gap-6 sm:grid-cols-2">
          {STATS.map((stat, index) => (
            <FadeUp key={stat.title} delay={index * 0.1}>
              <div className="flex h-full flex-col rounded-[2rem] border border-msk-cream-200 bg-white overflow-hidden">
                <div className="flex items-center justify-center bg-msk-blue-300 py-10 text-msk-blue-900 text-6xl sm:text-7xl">
                  <StatValue value={stat.value} unit={stat.unit} />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-black text-msk-night-900 leading-tight">
                    {stat.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base text-slate-600 leading-relaxed">
                    {stat.description}
                  </p>
                  <Link
                    href={stat.href}
                    className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-msk-night-900 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-msk-night-800"
                  >
                    <CornerDownRight className="h-4 w-4" aria-hidden />
                    En savoir plus
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
