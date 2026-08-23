"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FadeUp } from "@/components/motion/FadeUp";

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
 * Copy is the same eight entries as `/notre-centre/troubles-accompagnes`.
 */
const TROUBLES = [
  {
    title: "TDAH",
    description: "Difficulté d'attention, hyperactivité, impulsivité.",
    solution: "Neuro-Gym + environnement structuré + rythme adapté.",
    card: "bg-msk-coral-100",
  },
  {
    title: "Dyslexie",
    description: "Difficulté de lecture et d'écriture.",
    solution: "Matériel Montessori sensoriel + remédiation phonologique.",
    card: "bg-msk-blue-200",
  },
  {
    title: "Dyspraxie",
    description: "Coordination motrice altérée.",
    solution: "Psychomotricité + exercices neuro-moteurs ciblés.",
    card: "bg-msk-coral-300",
  },
  {
    title: "Dyscalculie",
    description: "Difficulté avec les nombres et le calcul.",
    solution: "Manipulation concrète Montessori + raisonnement logique.",
    card: "bg-msk-blue-100",
  },
  {
    title: "TSA (Autisme)",
    description: "Spectre autistique, difficultés sociales.",
    solution:
      "Environnement prévisible + supports visuels + socialisation progressive.",
    card: "bg-msk-cream-100",
  },
  {
    title: "Troubles du langage",
    description: "Retard ou trouble du langage oral.",
    solution: "Orthophonie intégrée + stimulation langagière quotidienne.",
    card: "bg-msk-coral-200",
  },
  {
    title: "Troubles du comportement",
    description: "Opposition, colères, anxiété.",
    solution: "Régulation émotionnelle + cadre bienveillant + Neuro-Gym.",
    card: "bg-msk-sun-200",
  },
  {
    title: "Difficultés scolaires",
    description: "Échec scolaire, décrochage, phobie scolaire.",
    solution:
      "Remédiation + restauration de la confiance + insertion progressive.",
    card: "bg-msk-blue-50",
  },
];

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
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10">
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
                  className={`flex h-full flex-col justify-between rounded-[0.75rem] p-7 ${trouble.card}`}
                >
                  <h3 className="font-condensed text-[1.5rem] uppercase leading-[0.95] text-msk-night-950">
                    {trouble.title}
                  </h3>
                  <div className="mt-10">
                    <p className="font-body text-sm leading-snug text-msk-night-800">
                      {trouble.description}
                    </p>
                    <p className="mt-3 font-body text-sm font-semibold leading-snug text-msk-night-950">
                      {trouble.solution}
                    </p>
                  </div>
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

              56% rather than dead centre: on a 673px-tall laptop the heading is
              318px and the fan 444px, so they cannot both fit and the overlap
              is unavoidable. Six points of nudge buys back a line of the title
              while keeping the fan clear of the bottom edge.
            */}
            <div ref={circlesRef} className="absolute inset-0">
              {TROUBLES.map((trouble, index) => {
                const angle = angleAt(index);

                return (
                  <div
                    key={trouble.title}
                    className="js-trouble-circle absolute left-1/2 top-[56%] h-[250vw] w-[250vw] rounded-full"
                    style={{
                      transform: `translate(-50%, 0) rotate(${angle}deg)`,
                    }}
                  >
                    <div
                      className={`js-trouble-card absolute left-1/2 top-0 flex aspect-[0.75] w-[18vw] flex-col justify-between rounded-[0.6vw] p-[1.6vw] ${trouble.card}`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      }}
                    >
                      <h3 className="font-condensed text-[1.25rem] uppercase leading-[0.95] text-msk-night-950 xl:text-[1.5rem]">
                        {trouble.title}
                      </h3>
                      <div>
                        <p className="font-body text-xs leading-snug text-msk-night-800 xl:text-sm">
                          {trouble.description}
                        </p>
                        <p className="mt-2 font-body text-xs font-semibold leading-snug text-msk-night-950 xl:text-sm">
                          {trouble.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
