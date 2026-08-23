"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { FadeUp } from "@/components/motion/FadeUp";
import { MorphButton } from "@/components/motion/MorphButton";

interface NextStepSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  svgSrc: string;
  svgAlt?: string;
  svgWidth?: number;
  svgHeight?: number;
  bgColor: string;
  cloudColor: string;
  textColor: string;
  buttonTextColor: string;
  eyebrowColor?: string;
  imageContainerClassName?: string;
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
  svgSrc,
  svgAlt = "Illustration",
  svgWidth = 700,
  svgHeight = 700,
  bgColor,
  cloudColor,
  textColor,
  buttonTextColor,
  eyebrowColor = "text-msk-sun-300",
  imageContainerClassName,
}: NextStepSectionProps) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden pt-16 pb-4 text-center md:pt-24 md:pb-8",
        bgColor
      )}
    >
      {/* Decorative clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <MethodeCloud
          shape="a"
          motion="float"
          speed={120}
          phase={0.2}
          className={cn("absolute top-[10%] w-44 xl:w-60", cloudColor)}
        />
        <MethodeCloud
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
        <MethodeCloud
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

          <h2 className="mt-4 font-display text-[2.5rem] font-bold uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl">
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
                fillClassName="bg-white"
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
            </div>
          </FadeUp>
        </FadeUp>

        <div
          className={cn(
            "relative z-10 mx-auto pointer-events-none flex w-full justify-center",
            imageContainerClassName || "-mt-8 sm:-mt-12 md:-mt-20 max-w-2xl"
          )}
        >
          {/* Plain <img> plutôt que le composant Image : l'optimiseur d'images
              refuse les SVG locaux tant que `dangerouslyAllowSVG` n'est pas
              activé — il répond 400 « The requested resource isn't a valid
              image » et l'illustration ne s'affiche jamais. Or les cinq pages
              qui utilisent cette section passent toutes un .svg. Un <img> les
              sert tels quels et préserve au passage leurs animations SMIL,
              qu'un pipeline d'optimisation aplatirait. Même parti pris que
              pour /methode/sun-cloud.svg et /Sunny.svg. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={svgSrc}
            alt={svgAlt}
            width={svgWidth}
            height={svgHeight}
            loading="lazy"
            decoding="async"
            className="h-[220px] sm:h-[280px] md:h-[360px] w-full object-contain object-top"
          />
        </div>
      </div>
    </section>
  );
};
