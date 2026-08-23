"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * An oversized statement on a flat colour field — the reference's way of
 * letting one line hold a whole screen.
 *
 * Used twice on the home page with different backgrounds, so the colour and the
 * optional CTA are props rather than baked in.
 */
interface AccueilStatementProps {
  quote: string;
  /** Tailwind background utility for the band, e.g. `bg-msk-blue-200`. */
  background: string;
  cta?: { href: string; label: string };
}

export const AccueilStatement = ({
  quote,
  background,
  cta,
}: AccueilStatementProps) => {
  return (
    <section className={`w-full py-24 text-center md:py-32 ${background}`}>
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <FadeUp>
          <p className="font-condensed text-[2.5rem] uppercase leading-[0.9] text-msk-night-950 sm:text-[3.25rem] lg:text-[4rem]">
            {quote}
          </p>
        </FadeUp>

        {cta ? (
          <FadeUp delay={0.15}>
            <Link
              href={cta.href}
              className="mt-12 inline-flex items-center gap-2 rounded-full bg-msk-night-950 px-7 py-4 font-body text-sm font-semibold text-white transition-colors hover:bg-msk-night-800"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </FadeUp>
        ) : null}
      </div>
    </section>
  );
};
