"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, MessageCircle } from "lucide-react";

import { CloudDrift } from "@/components/motion/CloudDrift";
import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";
import { SCHOOL_INFO } from "@/lib/data/site-content";

interface NextStepSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  bgColor: string;
  cloudColor: string;
  textColor: string;
  buttonTextColor: string;
  eyebrowColor?: string;
  titleColor?: string;
  buttonBgColor?: string;
}

/**
 * A reusable CTA section that closes each page by handing the reader the next one.
 * Includes decorative clouds and a large floating SVG at the bottom.
 */
export const NextStepSection = ({
  eyebrow,
  title,
  description,
  buttonText,
  buttonHref,
  bgColor,
  cloudColor,
  textColor,
  buttonTextColor,
  eyebrowColor = "text-msk-sun-300",
  titleColor = "text-white",
  buttonBgColor = "bg-white",
}: NextStepSectionProps) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-20 text-center md:py-24",
        bgColor
      )}
    >
      {/* Decorative clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <CloudDrift
          shape="a"
          motion="float"
          speed={120}
          phase={0.2}
          className={cn("absolute top-[10%] w-44 xl:w-60", cloudColor)}
        />
        <CloudDrift
          shape="b"
          motion="float"
          speed={160}
          phase={0.6}
          delay={0.2}
          className={cn(
            "absolute top-[40%] w-48 xl:w-64",
            cloudColor
          )}
        />
        <CloudDrift
          shape="d"
          motion="float"
          speed={100}
          phase={0.9}
          className={cn(
            "absolute bottom-[10%] w-32 xl:w-48 opacity-70",
            cloudColor
          )}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 sm:px-10">
        <FadeUp className="relative z-20">
          <span
            className={cn(
              "font-display text-sm font-semibold uppercase tracking-[0.2em]",
              eyebrowColor
            )}
          >
            {eyebrow}
          </span>

          <h2 className={cn("mt-4 font-display text-[2.5rem] font-bold uppercase leading-[0.9] sm:text-6xl md:text-7xl", titleColor)}>
            {title}
          </h2>

          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-lg font-medium leading-snug",
              textColor
            )}
          >
            {description}
          </p>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MorphButton
                href={buttonHref}
                className={cn(
                  "text-sm font-semibold uppercase tracking-[0.14em]",
                  buttonTextColor
                )}
                fillClassName={buttonBgColor}
              >
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </MorphButton>
              {buttonHref !== "/contact" && (
                <MorphButton
                  href="/contact"
                  className="text-sm font-semibold uppercase tracking-[0.14em] text-white"
                  fillClassName="bg-msk-coral-500 shadow-md group-hover:bg-msk-coral-400"
                >
                  Nous contacter
                </MorphButton>
              )}
              <MorphButton
                href={SCHOOL_INFO.whatsapp}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-msk-night-900"
                fillClassName="bg-white shadow-md group-hover:bg-msk-cream-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </MorphButton>
            </div>
          </FadeUp>
        </FadeUp>
      </div>
    </section>
  );
};
