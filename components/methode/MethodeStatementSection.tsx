"use client";

import { MethodeTiltedDuo } from "@/components/methode/MethodeTiltedDuo";
import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { SCHOOL_INFO } from "@/lib/data/site-content";

/**
 * The reference's "THE FIRST YEARS MATTER MOST" beat: an oversized display
 * statement filling the left half, with supporting copy, a round link and a
 * photograph stacked down the right.
 *
 * The statement is SCHOOL_INFO.coreQuote — the line the whole method rests on —
 * rather than anything newly written.
 */
export const MethodeStatementSection = () => {
  // `overflow-x-clip`, not `overflow-hidden`: the cat is wider than the column
  // it is anchored in and would otherwise push a horizontal scrollbar onto the
  // whole page on narrow screens. `clip` trims it without making this section a
  // scroll container, which `hidden` would — and a scroll container here would
  // break the sticky and scroll-triggered work elsewhere on the page.
  return (
    <section className="flex min-h-[100dvh] w-full items-center overflow-x-clip bg-msk-cream-200 py-16 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/*
          The grid stretches this cell to the right column's height, so the
          statement is centred in it and sized to fill it: the right column runs
          paragraph + button + the tilted duo, roughly 640px at max width, and a
          24-word line only reaches that at ~5rem. `clamp` ties the size to the
          viewport so the two columns stay level as the grid resizes, instead of
          the text stranding a hole under itself at one breakpoint.
        */}
        <FadeUp className="flex h-full flex-col justify-center">
          <div className="relative">
            {/*
              Poster treatment, with one concession to the sentence itself:
              still sentence case, not the reference's all-caps. That poster
              sets three short words; this is a 24-word sentence, and capitals
              flatten the word shapes readers scan by. Weight, scale and colour
              carry the poster feel instead, and leading stays open enough to
              read.
            */}
            <h2 className="relative z-20 text-balance font-display text-5xl font-bold leading-[1.25] tracking-[-0.02em] text-msk-coral-600 sm:text-6xl lg:text-[clamp(3.5rem,5vw,6rem)]">
              {SCHOOL_INFO.coreQuote}
            </h2>

            {/*
              Decorative marks, echoing the reference's stickers. Both SVGs
              animate themselves through SMIL, which keeps playing in an `img`
              and costs no JavaScript — so they stay plain `img` rather than
              `next/image`, whose optimiser would flatten the animation out.

              They sit *behind* the statement (`z-0` against the heading's
              `z-20`), and are anchored outside the text block rather than over
              it. The reference poster puts its stickers in front, but it only
              has to clear three words; here they would land mid-sentence, and
              the sun in particular ate a word whole. Behind and pushed outward,
              they can grow without ever costing a letter.
            */}
            <img
              src="/methode/sun-cloud.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-16 z-0 w-40 sm:w-52 lg:-right-12 lg:-top-24 lg:w-64"
            />
            <img
              src="/methode/running-cat.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-24 z-0 w-[26rem] sm:w-[34rem] lg:-bottom-44 lg:-left-40 lg:w-[44rem]"
            />
          </div>
        </FadeUp>

        <div className="flex h-full flex-col justify-center gap-10">
          <FadeUp delay={0.1}>
            <p className="text-lg font-medium leading-relaxed text-msk-night-800">
              Notre méthode ne corrige pas l&apos;enfant : elle ajuste ce qui
              l&apos;entoure. Chaque étape — de la première observation à
              l&apos;insertion — est menée par une équipe pluridisciplinaire et
              recalibrée aussi souvent que nécessaire, au rythme de votre enfant.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <MorphButton
              href="/notre-centre/troubles-accompagnes"
              className="w-full sm:w-fit font-display text-sm font-semibold uppercase tracking-[0.14em] text-white"
              fillClassName="bg-msk-blue-700"
            >
              Troubles accompagnés
            </MorphButton>
          </FadeUp>

          {/*
            Capped, because the duo is the section's height driver: it is a
            10/7 box, so its height tracks the column width and at full width it
            pushed the section past the viewport. 26rem holds the whole section
            to roughly 730px, which fits a standard laptop viewport.
          */}
          <MethodeTiltedDuo
            src="/accompagnement.jpeg"
            alt="Séance d'accompagnement"
            className="mx-auto mt-4 w-full max-w-[34rem]"
          />
        </div>
      </div>
    </section>
  );
};
