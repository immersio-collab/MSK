"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { Eyebrow } from "@/components/common/Eyebrow";
import { cn } from "@/lib/utils";

/**
 * The site's FAQ band: a sticky rail on the left (eyebrow pill, display
 * heading, one line of copy, one MorphButton) and hairline-ruled rows on the
 * right that open one at a time.
 *
 * Every route carries one, sitting immediately before that page's closing CTA,
 * so the structure lives here exactly once. Seul le contenu change de page en
 * page — la palette est FIXE depuis le système de couleurs 2026-08-25 : toutes
 * les pages se terminent par la même séquence FAQ cream-100 → CTA night-800 →
 * footer night-900. Les questions viennent de lib/data/faq.ts.
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
 * Palette FIXE — l'ancien système de `tones` par page a été retiré avec le
 * système de couleurs 2026-08-25. Le champ est cream-100 partout : c'est la
 * teinte que la page-référence /contact (restée intacte) utilisait déjà.
 *
 * Written out in full, never composed from fragments: Tailwind v4 only emits
 * the classes it reads literally in the source, so a template-built class name
 * produces no CSS and the element silently inherits its parent's colour.
 *
 * Décisions héritées de l'audit des coutures, toujours valables :
 * - `accent` est coral-800, jamais coral-700 : le mot accentué vit dans le
 *   <h2>, donc texte de titre qui doit tenir 7:1 — coral-700 plafonne sous
 *   6.3:1. `icon` peut rester coral-700 : un glyphe n'exige que 3:1.
 * - La couture HAUTE (souvent white ou cream-50 contre cream-100) est douce,
 *   et c'est assumé : c'est l'alternance neutre du socle. La rupture forte
 *   arrive juste en dessous, avec la bande night-800 de la CTA finale.
 */
const TONE = {
  background: "bg-msk-cream-100",
  pillBg: "bg-white",
  pillText: "text-msk-coral-700",
  heading: "text-msk-night-900",
  accent: "text-msk-coral-800",
  body: "text-msk-night-700",
  rule: "border-msk-night-900/15",
  icon: "text-msk-coral-700",
} as const;

/**
 * Le bouton — coral-600, l'accent primaire, blanc dessus (4.9:1). La règle
 * historique tient toujours : il doit différer du bouton PRINCIPAL de la CTA
 * juste en dessous, qui est désormais blanc partout. Hover baked into the same
 * string: the render site passes this straight to MorphButton's
 * `fillClassName`, and a separate hover key would simply never be read.
 */
const BUTTON = {
  fill: "bg-msk-coral-600",
  shadow: "shadow-lg shadow-msk-coral-600/25",
  text: "text-white",
} as const;

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
  id,
}: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelId = useId();
  const t = TONE;
  const b = BUTTON;

  return (
    <section id={id} className={cn("w-full py-24 md:py-32", t.background)}>
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <div className="lg:sticky lg:top-28">
              <Eyebrow className={cn("shadow-sm", t.pillBg, t.pillText)}>
                {eyebrow}
              </Eyebrow>
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
