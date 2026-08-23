"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { cn } from "@/lib/utils";

/**
 * The site's FAQ band: a sticky rail on the left (eyebrow pill, display
 * heading, one line of copy, one MorphButton) and hairline-ruled rows on the
 * right that open one at a time.
 *
 * Every route carries one, sitting immediately before that page's closing CTA,
 * so the structure lives here exactly once. Only the palette and the copy
 * change per page — pages pick a `tone` plus a `button` and pass their own
 * questions from lib/data/faq.ts.
 *
 * Visual vocabulary is the /notre-centre one: white rounded-full pill with a
 * coral label, `font-display` uppercase heading with a single accented word,
 * and the shared MorphButton. Questions render at `font-medium`, not bold —
 * Fredoka is only loaded at 500/600/700 in app/layout.tsx, so 500 is the
 * lightest weight that actually exists; asking for 400 renders 500 anyway
 * while implying a weight the page never loaded.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * The field a section sits on: background plus every colour that has to be
 * legible against it.
 *
 * Written out in full, never composed from fragments: Tailwind v4 only emits
 * the classes it reads literally in the source, so a template-built class name
 * produces no CSS and the element silently inherits its parent's colour.
 *
 * Two rules govern every entry, both learned from an audit of the real seams:
 *
 * 1. A tone is picked so its background differs in LIGHTNESS, not only hue,
 *    from the section above and the CTA below. Two pale fields at the same
 *    luminance (cream-200 against blue-100 measures 1.01:1) read as one
 *    continuous band to anyone with reduced colour discrimination.
 * 2. `accent` is `coral-800`, never `coral-700`. The accented word renders
 *    inside the `<h2>`, so it is heading text and has to clear 7:1 — coral-700
 *    clears only 5.7–6.3:1 on every background used here. `icon` may stay at
 *    coral-700: a glyph needs 3:1.
 *
 * Keys are deliberately NOT named after colour families. `msk-sky` and
 * `msk-rose` are among the invented family names this codebase had to purge,
 * and a tone called `sky` invites the next reader to write `bg-msk-sky-100`,
 * which would emit no CSS at all.
 */
const TONES = {
  /** blue-50 — palest sky. */
  blueLight: {
    background: "bg-msk-blue-50",
    pillBg: "bg-white",
    pillText: "text-msk-coral-700",
    heading: "text-msk-night-900",
    accent: "text-msk-coral-800",
    body: "text-msk-night-700",
    rule: "border-msk-night-900/15",
    icon: "text-msk-coral-700",
  },
  /** blue-100 — one step deeper, for pages that arrive off a long cream run. */
  blueMid: {
    background: "bg-msk-blue-100",
    pillBg: "bg-white",
    pillText: "text-msk-coral-700",
    heading: "text-msk-night-900",
    accent: "text-msk-coral-800",
    body: "text-msk-night-700",
    rule: "border-msk-night-900/15",
    icon: "text-msk-coral-700",
  },
  /** blue-200 — deep enough to break a seam against cream by lightness. */
  blueDeep: {
    background: "bg-msk-blue-200",
    pillBg: "bg-white",
    pillText: "text-msk-coral-700",
    heading: "text-msk-night-900",
    accent: "text-msk-coral-800",
    body: "text-msk-night-700",
    rule: "border-msk-night-900/15",
    icon: "text-msk-coral-700",
  },
  /** sun-100 — the warm field, for the pages whose accent story is yellow. */
  sunLight: {
    background: "bg-msk-sun-100",
    pillBg: "bg-white",
    pillText: "text-msk-coral-700",
    heading: "text-msk-night-900",
    accent: "text-msk-coral-800",
    body: "text-msk-night-700",
    rule: "border-msk-night-900/15",
    icon: "text-msk-coral-700",
  },
  /**
   * coral-100 — pink field. The pill label turns night-900: a coral label on a
   * coral ground goes monochrome and the pill stops reading as a pill.
   */
  coralLight: {
    background: "bg-msk-coral-100",
    pillBg: "bg-white",
    pillText: "text-msk-night-900",
    heading: "text-msk-night-900",
    accent: "text-msk-coral-800",
    body: "text-msk-night-700",
    rule: "border-msk-night-900/15",
    icon: "text-msk-coral-700",
  },
  /** cream-100 — the site's warm neutral, for a page with no CTA after it. */
  creamLight: {
    background: "bg-msk-cream-100",
    pillBg: "bg-white",
    pillText: "text-msk-coral-700",
    heading: "text-msk-night-900",
    accent: "text-msk-coral-800",
    body: "text-msk-night-700",
    rule: "border-msk-night-900/15",
    icon: "text-msk-coral-700",
  },
} as const;

/**
 * The CTA fill, chosen separately from the field.
 *
 * It has to differ from whatever button the CTA section directly below fires,
 * or the two stack up as duplicates and the FAQ's button reads as the page's
 * real call to action. Hover is baked into the same string: the render site
 * passes this straight to MorphButton's `fillClassName`, and a separate hover
 * key would simply never be read.
 */
const BUTTONS = {
  /** White on coral-600 — 4.9:1. The site default. */
  coral: {
    fill: "bg-msk-coral-600 group-hover:bg-msk-coral-700",
    shadow: "shadow-lg shadow-msk-coral-600/25",
    text: "text-white",
  },
  /** White on night-900 — 16:1. For pages whose CTA below is already coral. */
  night: {
    fill: "bg-msk-night-900 group-hover:bg-msk-night-800",
    shadow: "shadow-lg shadow-msk-night-900/20",
    text: "text-white",
  },
  /** White on blue-700 — 5.1:1. Matches the buttons on /la-methode. */
  blue: {
    fill: "bg-msk-blue-700 group-hover:bg-msk-blue-800",
    shadow: "shadow-lg shadow-msk-blue-900/20",
    text: "text-white",
  },
} as const;

export type FaqTone = keyof typeof TONES;
export type FaqButton = keyof typeof BUTTONS;

interface FaqSectionProps {
  /** Small pill above the heading. */
  eyebrow?: string;
  /** Heading, minus its final accented word. */
  title: string;
  /** The one word of the heading that takes the accent colour. */
  titleAccent: string;
  /** One line under the heading, above the button. */
  description: string;
  items: FaqItem[];
  ctaLabel: string;
  ctaHref: string;
  tone?: FaqTone;
  button?: FaqButton;
  /** Anchor target, when a page needs to link to its own FAQ. */
  id?: string;
}

export const FaqSection = ({
  eyebrow = "Vos questions",
  title,
  titleAccent,
  description,
  items,
  ctaLabel,
  ctaHref,
  tone = "blueLight",
  button = "coral",
  id,
}: FaqSectionProps) => {
  // Every row starts closed: the section opens as a plain list of questions
  // and nothing is pre-answered for the reader.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelId = useId();
  const t = TONES[tone];
  const b = BUTTONS[button];

  return (
    <section id={id} className={cn("w-full py-24 md:py-32", t.background)}>
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <div className="lg:sticky lg:top-28">
              <span
                className={cn(
                  "inline-block rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] shadow-sm",
                  t.pillBg,
                  t.pillText,
                )}
              >
                {eyebrow}
              </span>
              <h2
                className={cn(
                  "mt-5 font-display text-[2rem] font-bold uppercase leading-[0.95] sm:text-[2.5rem]",
                  t.heading,
                )}
              >
                {title} <span className={t.accent}>{titleAccent}</span>
              </h2>
              <p
                className={cn(
                  "mt-5 max-w-sm text-base leading-relaxed md:text-lg",
                  t.body,
                )}
              >
                {description}
              </p>
              <div className="mt-7">
                <MorphButton
                  href={ctaHref}
                  maxDiameter="15rem"
                  className={cn("font-semibold", b.text)}
                  fillClassName={cn(b.fill, b.shadow)}
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </MorphButton>
              </div>
            </div>
          </FadeUp>

          <div className={cn("border-t", t.rule)}>
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.question} className={cn("border-b", t.rule)}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`${panelId}-${index}`}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-base font-medium uppercase leading-tight sm:text-lg",
                          t.heading,
                        )}
                      >
                        {item.question}
                      </span>
                      <Plus
                        aria-hidden
                        className={cn(
                          "mt-1 h-5 w-5 shrink-0 transition-transform duration-300",
                          t.icon,
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="panel"
                        id={`${panelId}-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p
                          className={cn(
                            "max-w-2xl pb-6 text-base leading-relaxed",
                            t.body,
                          )}
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
