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
    <span className="inline-block rounded-[0.4rem] bg-msk-blue-200 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
      À qui s&apos;adresse MSK ?
    </span>
    {/* Capped measure: unbounded, this line overran the section's
        overflow-hidden and the last word was clipped. */}
    <h2 className="mx-auto mt-6 max-w-[19ch] font-display text-[1.875rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2.5rem] lg:text-[2.75rem]">
      Chaque âge, chaque profil a sa place
    </h2>
    <p className="mt-5 font-display text-sm font-semibold uppercase leading-snug text-msk-coral-600 sm:text-base">
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
 * Titles use the same rounded display face as the rest of the site.
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
        className={`font-display font-bold uppercase leading-tight ${tone.title} ${
          compact ? "text-lg" : "text-sm xl:text-base"
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
        className={`leading-snug ${tone.body} ${
          compact ? "text-sm" : "text-[0.7rem] xl:text-xs"
        }`}
      >
        {trouble.short}
      </p>
    </>
  );
};

/** The section's one call to action, below the deck rather than on every card.
 *
 *  `compact` drops the vertical padding: on desktop this sits inside the pinned
 *  viewport-height frame, where every pixel is budgeted, rather than in normal
 *  flow below it. */
const TroublesCta = ({ compact }: { compact?: boolean }) => (
  <div
    className={`flex justify-center px-6 sm:px-10 ${
      compact ? "pb-8 pt-0" : "pb-24 pt-20"
    }`}
  >
    <Link
      href={TROUBLES_HREF}
      className="inline-flex items-center gap-2 rounded-full bg-msk-night-950 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-msk-night-800"
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
        // `invalidateOnRefresh` — the display face loads after first paint and changes the
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
            <div className="absolute inset-x-0 top-0 px-6 pt-16 text-center lg:px-16">
              <Heading />
            </div>

            {/*
              The deck sits below the heading, and everything — heading plus
              fan — has to fit inside the one pinned viewport-height frame.
              That makes the frame's HEIGHT the binding constraint, so the
              deck is sized and placed in vh, not vw. Anchored in vw it
              overran a short laptop and, before that, was pulled up over the
              title.

              `top-[280px]` is the top edge of the circle. The cards are translated
              `-50%, 0`, which means their top edge sits exactly at this 280px mark.
              The heading ends around 250px, so this fixed placement guarantees a tight,
              consistent 30px gap under the title across all screen sizes, eliminating 
              the excess space we saw when centering them vertically with 50vh.

              Card width is `min(20vw, (100vh - 380px) * 0.75)`. Since the cards are
              anchored at 280px and the CTA takes ~100px at the bottom, the space
              remaining for the cards is roughly `100vh - 380px`. We use `0.75`
              (inverse of aspect ratio) to size the width so the height fits the space.

              The circles are `pointer-events-none`: each is 250vw across and
              covers the whole frame, so hit-testing reached them instead of
              the heading and no text in this section could be selected. The
              cards re-enable pointer events for themselves.
            */}
            <div ref={circlesRef} className="pointer-events-none absolute inset-0">
              {TROUBLES.map((trouble, index) => {
                const angle = angleAt(index);

                return (
                  <div
                    key={trouble.title}
                    className="js-trouble-circle absolute left-1/2 top-[280px] h-[250vw] w-[250vw] rounded-full"
                    style={{
                      transform: `translate(-50%, 0) rotate(${angle}deg)`,
                    }}
                  >
                    <div
                      className={`js-trouble-card pointer-events-auto absolute left-1/2 top-0 flex aspect-[0.75] w-[min(20vw,calc((100vh-380px)*0.75))] flex-col justify-between rounded-[0.9vw] p-[1.4vh] shadow-lg ${
                        CARD_TONES[index % CARD_TONES.length].card
                      }`}
                      style={{
                        transform: `translate(-50%, 0) rotate(${angle}deg)`,
                      }}
                    >
                      <TroubleCard trouble={trouble} index={index} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The CTA lives INSIDE the pinned frame on desktop, anchored to
                its bottom edge. Rendered after the 400vh track it could never
                share a screen with the heading, so the reader had to scroll
                past the deck to find it and the section never read as one
                composition. Inside the frame, heading + fan + button are the
                one viewport-height screen the pin holds. */}
            <div className="absolute inset-x-0 bottom-0">
              <TroublesCta compact />
            </div>
          </div>
        </div>
      </div>

      {/* Below lg there is no pin, so the CTA follows the card stack in normal
          flow. The desktop copy is inside the frame above. */}
      <div className="lg:hidden">
        <TroublesCta />
      </div>
    </section>
  );
};
