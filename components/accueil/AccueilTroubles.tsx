"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";
import { ICONS } from "@/components/troubles/trouble-look";
import { TROUBLES } from "@/lib/data/troubles";

gsap.registerPlugin(ScrollTrigger);

/**
 * The troubles MSK accompagne, dealt out as a fan of cards.
 *
 * The fan is not a set of hand-placed rotations. Each card is pinned to the rim
 * of a giant circle (250vw across, so a radius of 125vw), and rotating that
 * circle sweeps its card along an arc — which both moves it sideways and tilts
 * it, in one transform. Rotating circle N by N × STEP_DEG therefore lays the
 * cards out in an even arc without any per-card positioning.
 *
 * Angles are symmetric about zero, so the fan is centred whatever the count:
 * eight cards run -10.5° … +10.5°.
 *
 * The markup's resting state is the assembled fan, written as an inline
 * transform, so a page that never runs this module still renders a correct
 * static fan. gsap collapses the deck to its pre-deal state itself, on mount,
 * and scrubs it back out — see the `gsap.set` below for why that split matters.
 *
 * Copy and icon keys come from `lib/data/troubles.ts`, the same source
 * `/notre-centre/troubles-accompagnes` renders, so the two cannot drift apart;
 * this file previously carried its own copy of all eight entries. Card colours
 * are local — see CARD_TONES for why the shared tones do not suit a fan.
 */

/** Degrees between adjacent cards on the arc. */
const STEP_DEG = 3;

/** Arc angle for card `i`, symmetric about zero. */
const angleAt = (i: number) =>
  -(STEP_DEG * (TROUBLES.length - 1)) / 2 + STEP_DEG * i;

const Heading = () => (
  <>
    <span className="inline-block rounded-[0.4rem] bg-msk-blue-200 px-3 py-1.5 font-condensed text-sm uppercase tracking-wide text-msk-night-950">
      À qui s&apos;adresse MSK ?
    </span>
    {/* Capped measure: at 5.5rem this line is ~1330px of Anton and the
        section's overflow-hidden clipped the last word. */}
    <h2 className="mx-auto mt-6 max-w-[19ch] font-condensed text-[2.75rem] uppercase leading-[0.86] text-msk-night-950 sm:text-[4rem] lg:text-[4.5rem]">
      Chaque âge, chaque profil a sa place
    </h2>
    <p className="mt-5 font-condensed text-base uppercase leading-tight text-msk-coral-600 sm:text-lg">
      Les troubles que nous accompagnons au quotidien
    </p>
  </>
);

/** Where the section's single CTA sends the reader. The troubles grid opens
 *  its detail in a dialog, so there is no per-slug route — only the section. */
const TROUBLES_HREF = "/notre-centre/troubles-accompagnes#troubles";

/**
 * One background per card, all eight distinct.
 *
 * Deliberately NOT `LOOKS[trouble.tone]`: that table has four tones for eight
 * troubles, so the fan repeated its whole palette halfway through and the
 * right-hand cards looked like a second copy of the left-hand ones. Tone is the
 * right key on the troubles page, where cards are read one at a time; here all
 * eight are visible at once and the fan needs eight readings.
 *
 * Indexed by position in the fan, so it is presentation and shadows no shared
 * constant. Classes are written in full — Tailwind only emits what it reads
 * literally. Body text is measured against each background in the audit.
 */
const CARD_TONES = [
  { card: "bg-msk-coral-600", title: "text-white", body: "text-msk-coral-50", icon: "text-msk-coral-600" },
  { card: "bg-msk-sun-400", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-sun-600" },
  { card: "bg-msk-blue-500", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-blue-600" },
  { card: "bg-msk-night-800", title: "text-msk-sun-300", body: "text-msk-cream-200", icon: "text-msk-night-800" },
  { card: "bg-msk-coral-400", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-coral-600" },
  { card: "bg-msk-sun-600", title: "text-msk-night-900", body: "text-msk-night-800", icon: "text-msk-sun-700" },
  { card: "bg-msk-blue-700", title: "text-white", body: "text-msk-blue-50", icon: "text-msk-blue-700" },
  { card: "bg-msk-coral-800", title: "text-white", body: "text-msk-coral-50", icon: "text-msk-coral-800" },
];

/**
 * The card face, shared by the fan and the mobile stack so the two cannot
 * drift: the title at the top, the trouble's lucide icon on a white disc
 * centred beneath it, and the one-line description at the foot.
 *
 * Titles stay in the condensed face rather than the rounded one the troubles
 * page uses — every other headline on the home page is Anton, and one rounded
 * card here reads as a stray.
 */
const TroubleCard = ({
  trouble,
  index,
  compact,
}: {
  trouble: (typeof TROUBLES)[number];
  index: number;
  compact?: boolean;
}) => {
  const tone = CARD_TONES[index % CARD_TONES.length];
  const Icon = ICONS[trouble.icon];

  return (
    <>
      <h3
        className={`font-condensed uppercase leading-[0.95] ${tone.title} ${
          compact ? "text-[1.5rem]" : "text-[1.15rem] xl:text-[1.35rem]"
        }`}
      >
        {trouble.title}
      </h3>

      {/* Between the title and the description, centred across the card. The
          card is a flex column with justify-between, so this lands mid-height. */}
      <span
        className={`flex shrink-0 items-center justify-center self-center rounded-full bg-white ${
          compact ? "h-12 w-12" : "h-10 w-10 xl:h-12 xl:w-12"
        }`}
      >
        <Icon
          aria-hidden
          className={`${compact ? "h-6 w-6" : "h-5 w-5 xl:h-6 xl:w-6"} ${tone.icon}`}
        />
      </span>

      <p
        className={`font-body leading-snug ${tone.body} ${
          compact ? "text-sm" : "text-[0.7rem] xl:text-xs"
        }`}
      >
        {trouble.short}
      </p>
    </>
  );
};

/** The section's one call to action, below the deck rather than on every card. */
const TroublesCta = () => (
  <div className="flex justify-center px-6 pb-24 pt-20 sm:px-10">
    <Link
      href={TROUBLES_HREF}
      className="inline-flex items-center gap-2 rounded-full bg-msk-night-950 px-7 py-4 font-body text-sm font-semibold text-white transition-colors hover:bg-msk-night-800"
    >
      Voir tous les troubles accompagnés
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  </div>
);

export const AccueilTroubles = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const ctx = gsap.context(() => {
      // Pinned scroll-jacking is desktop-only; below lg the same cards render
      // as a plain stack and this effect never runs.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const circles = gsap.utils.toArray<HTMLElement>(".js-trouble-circle");
        if (circles.length === 0) return;

        // One slot of scroll per card, across the runway left once the pinned
        // frame has taken its viewport height.
        //
        // A function, not a captured constant, and every trigger below is
        // `invalidateOnRefresh` — Anton loads after first paint and changes the
        // height of every heading above this section, so the section's document
        // position at mount is not where the reader actually meets it. With the
        // positions frozen at mount the deck stayed at progress 0 on the way
        // down and only came right once something else forced a refresh.
        const slot = () =>
          (pin.clientHeight - window.innerHeight) / circles.length;

        // A single pin, on one viewport-height frame that holds both the
        // heading and the deck.
        //
        // Pinning them separately meant each froze wherever it happened to be
        // when its own trigger fired, which stacked the heading's own top
        // padding on top of the frame's offset and parked it around mid-screen.
        // With one frame fixed at the viewport top, everything inside is
        // positioned against the viewport and can be reasoned about statically.
        //
        // `pin-height` is a fixed 400vh, so it already provides the runway and
        // the pin adds no spacing — pinSpacing:true would append another ~300vh
        // of blank page. Its fixed height is also why pinning a child out of
        // flow does not shrink the track.
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: "bottom bottom",
          pin: frameRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Slow drift of the whole group, so the fan is not welded to the frame.
        gsap.to(circlesRef.current, {
          y: "-5%",
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const cards = circles.map((circle) =>
          circle.querySelector<HTMLElement>(".js-trouble-card"),
        );

        // Collapse the deck to its pre-deal state: every circle unrotated, so
        // all cards sit on the same point of the arc, pushed below the frame.
        //
        // This is stamped by gsap rather than written into the markup, and that
        // is the whole point. The markup's resting transform is the *assembled*
        // fan, so if this module never executes — gsap chunk fails, an earlier
        // error, JS off — the section still renders a correct static fan
        // instead of an empty frame. Nothing is stranded off-screen by a
        // stylesheet; only code that has already proved it runs can hide them.
        //
        // A `from` tween cannot do this job: with a scrubbed trigger it does
        // not write its start values until the playhead first enters the
        // trigger's range, so the deck showed its finished state on the way in
        // and never dealt.
        gsap.set(circles, { rotation: 0 });
        gsap.set(cards.filter(Boolean), { rotation: 0, y: "55vh" });

        circles.forEach((circle, i) => {
          const card = cards[i];
          const angle = angleAt(i);

          // Built per tween rather than shared: each gets its own instance.
          const trigger = () => ({
            trigger: pin,
            start: () => `top top-=${slot() * i}`,
            end: () => `+=${slot()}`,
            scrub: true,
            invalidateOnRefresh: true,
          });

          gsap.to(circle, {
            rotation: angle,
            ease: "power1.out",
            scrollTrigger: trigger(),
          });

          if (card) {
            gsap.to(card, {
              rotation: angle,
              y: 0,
              ease: "power1.out",
              scrollTrigger: trigger(),
            });
          }
        });
      });

      return () => mm.revert();
    }, pinRef);

    // Recompute once the two things that move this section have settled: the
    // webfont swap and any remaining image loads.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    if (document.readyState !== "complete") {
      window.addEventListener("load", refresh);
    }

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-msk-cream-50">
      {/* ---------- Below lg: a plain stack, no pinning ---------- */}
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-24 sm:px-10">
          <FadeUp>
            <div className="text-center">
              <Heading />
            </div>
          </FadeUp>

          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TROUBLES.map((trouble, index) => (
              <li key={trouble.title}>
                <FadeUp
                  delay={0.06 * index}
                  className={`flex h-full flex-col justify-between gap-8 rounded-[1rem] p-7 ${
                    CARD_TONES[index % CARD_TONES.length].card
                  }`}
                >
                  <TroubleCard trouble={trouble} index={index} compact />
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- lg and up: the pinned fan ---------- */}
      <div className="hidden lg:block">
        <div ref={pinRef} className="relative h-[400vh]">
          {/*
            One viewport-height frame is what gets pinned. Both layers inside
            are absolutely positioned against it, so once it is fixed at the
            viewport top their positions are simply viewport coordinates.
          */}
          <div ref={frameRef} className="relative h-screen overflow-hidden">
            <div className="absolute inset-x-0 top-0 px-6 pt-24 text-center lg:px-16">
              <Heading />
            </div>

            {/*
              The deck is centred on the whole frame rather than on the strip
              below the heading. A card's rotated bounding box is taller than
              that strip on a laptop, so confining it there clipped the fan
              against the navbar and the bottom edge. Centred, it clears both
              and overlaps the foot of the heading — which is how the reference
              composes it too.

              The circle's top is anchored in rem+vw, NOT as a percentage of
              the frame. The heading above it is a fixed ~318px at every
              viewport height, so a percentage let the two drift apart: on a
              short laptop the fan overlapped the title as the reference does,
              but on a tall screen it sank clear of it and the cards no longer
              rose over the heading at all.

              A card's rotated half-height is 14.43vw and the arc pushes the
              outer cards down 2.09vw, so the fan's top edge sits at
              `10.5rem + 12.5vw - 12.34vw`, i.e. ~170px whatever the width.
              That lands mid-title, leaving the tops of the letters showing,
              and keeps the foot of the fan clear of the CTA below.
            */}
            <div ref={circlesRef} className="absolute inset-0">
              {TROUBLES.map((trouble, index) => {
                const angle = angleAt(index);

                return (
                  <div
                    key={trouble.title}
                    className="js-trouble-circle absolute left-1/2 top-[calc(10.5rem+12.5vw)] h-[250vw] w-[250vw] rounded-full"
                    style={{
                      transform: `translate(-50%, 0) rotate(${angle}deg)`,
                    }}
                  >
                    <div
                      className={`js-trouble-card absolute left-1/2 top-0 flex aspect-[0.75] w-[18vw] flex-col justify-between rounded-[0.9vw] p-[1.6vw] shadow-lg ${
                        CARD_TONES[index % CARD_TONES.length].card
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      }}
                    >
                      <TroubleCard trouble={trouble} index={index} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* One CTA for the section, below the deck — not repeated on every card.
          Sits outside both branches, so mobile and desktop share the one. */}
      <TroublesCta />
    </section>
  );
};
