"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { MethodeLottie } from "@/components/methode/MethodeLottie";

gsap.registerPlugin(ScrollTrigger);

export interface DeckCard {
  id: string;
  title: string;
  description: string;
  /** Card fill, its title colour, and its body colour — all brand tokens. */
  card: string;
  titleTone: string;
  bodyTone: string;
  /** Fill of the section behind the deck while this card is in front. */
  stage: string;
  /** Animated mark for this card, from public/methode/lottie. */
  lottie: string;
}

interface ScrollCardDeckProps {
  steps: DeckCard[];
  /** Anchor id for the section, so a hero chevron can jump to it. */
  id: string;
  stepLabel?: string;
  countLabel?: string;
}

/**
 * Scroll-pinned deck of cards: the front one sits square-on, the rest fan
 * behind it, and each is carried up and out of the frame as the scroll advances.
 *
 * Extracted from the method page when the admissions page became its second
 * consumer. The scroll maths is the part worth sharing — the overlapping exit
 * windows and the damped follow are easy to get subtly wrong, and two copies
 * would drift.
 *
 * Card fills must be chosen against what each Lottie mark is painted from:
 * black-dominant marks need a light card, yellow/cream/red marks a deep one.
 */
/** Scroll distance, in vh, that each card holds the stage. */
const STEP_VH = 62;

/**
 * Resting tilt per card. Kept small: the reference fans harder, but these cards
 * carry four to six lines of French copy and tilted body text at that length is
 * markedly harder to read.
 */
const FAN_ANGLES = [0, 6, -5, 7, -6, 4];

/** Direction each card tips as it leaves, alternating so exits do not all lean the same way. */
const EXIT_SIGN = [1, -1, 1, -1, 1, -1];

/**
 * How wide each card's exit window is, measured in slots.
 *
 * At 1 the windows would butt up against each other and the deck would step
 * card-by-card. At 1.5 consecutive exits overlap by half a slot, so one card is
 * always beginning to leave before the last has finished — which is what makes
 * the sequence read as continuous rather than as six discrete swaps.
 */
const EXIT_WINDOW = 1.5;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const ScrollCardDeck = ({
  steps,
  id,
  stepLabel = "Étape",
  countLabel = "étapes",
}: ScrollCardDeckProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tiltRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // The deck fans open when it arrives rather than sitting pre-fanned.
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { rotate: 0 },
          {
            rotate: FAN_ANGLES[index] ?? 0,
            delay: 0.5,
            duration: 1.2,
            ease: "elastic.out(2, 0.8)",
            scrollTrigger: { trigger: root, start: "top 80%" },
          },
        );
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const n = steps.length;

          steps.forEach((_, index) => {
            const from = index / n;
            const to = (index + EXIT_WINDOW) / n;
            const local = clamp01((p - from) / (to - from));

            // gsap.to on every update, rather than writing the value straight
            // in, so each card *damps toward* the scrub position. That lag is
            // where the springiness comes from — setting it directly would feel
            // rigidly welded to the scrollbar.
            gsap.to(cardRefs.current[index], {
              yPercent: -local * 170,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              overwrite: "auto",
            });
            gsap.to(tiltRefs.current[index], {
              rotate: local * 40 * (EXIT_SIGN[index] ?? 1),
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              overwrite: "auto",
            });
          });

          setActive(Math.min(n - 1, Math.floor(p * n)));
        },
      });
    }, root);

    return () => ctx.revert();
  }, [steps]);

  return (
    <section id={id} className="relative w-full bg-msk-cream-100">
      {/* ---------- Scrubbed deck (lg and up) ---------- */}
      <div
        ref={scrollRef}
        data-cloud-scope
        className="relative hidden lg:block"
        style={{ height: `${steps.length * STEP_VH}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* One full climb per card, then round again from below. Offset in
              phase so the two are never at the same height. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <MethodeCloud
              motion="rise"
              shape="b"
              cycles={steps.length}
              className="absolute left-[8%] top-1/2 w-44 text-white drop-shadow-md xl:w-60"
            />
            <MethodeCloud
              motion="rise"
              shape="a"
              cycles={steps.length}
              phase={0.45}
              className="absolute right-[7%] top-1/2 w-40 text-white drop-shadow-md xl:w-56"
            />
          </div>

          <div className="absolute left-10 top-1/2 -translate-y-1/2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-night-700">
            <span className="block text-6xl leading-none text-msk-night-900">
              {steps[active].id}
            </span>
            <span className="mt-2 block">/ {steps.length} {countLabel}</span>
          </div>

          <div className="relative h-[32rem] w-[28rem]">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="absolute inset-0"
                style={{ zIndex: steps.length - index }}
              >
                <article
                  ref={(node) => {
                    tiltRefs.current[index] = node;
                  }}
                  className={`flex h-full w-full flex-col items-center justify-between rounded-[1.75rem] p-8 text-center shadow-2xl ${step.card}`}
                >
                  <div>
                    {/* Body tone, not titleTone: at 14px this is normal-size
                        text and needs 4.5:1, which the title colours miss on
                        the lighter fills. */}
                    <span
                      className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${step.bodyTone}`}
                    >
                      {stepLabel} {step.id}
                    </span>
                    <h3
                      className={`mt-2 font-display text-[1.75rem] font-bold leading-[1.15] ${step.titleTone}`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <MethodeLottie src={step.lottie} className="h-44 w-44" />

                  <p
                    className={`text-[0.95rem] font-medium leading-snug ${step.bodyTone}`}
                  >
                    {step.description}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Plain stack (below lg) ---------- */}
      <div className="mx-auto max-w-md px-6 py-20 sm:px-10 lg:hidden">
        <ul className="flex flex-col gap-6">
          {steps.map((step) => (
            <li
              key={step.id}
              className={`flex flex-col items-center gap-6 rounded-[1.75rem] p-8 text-center shadow-lg ${step.card}`}
            >
              <div>
                <span
                  className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${step.bodyTone}`}
                >
                  {stepLabel} {step.id}
                </span>
                <h3
                  className={`mt-2 font-display text-[1.75rem] font-bold leading-[1.15] ${step.titleTone}`}
                >
                  {step.title}
                </h3>
              </div>

              <MethodeLottie src={step.lottie} className="h-32 w-32" />

              <p
                className={`text-[0.95rem] font-medium leading-snug ${step.bodyTone}`}
              >
                {step.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
