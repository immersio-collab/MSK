"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LottieMark } from "@/components/motion/LottieMark";

gsap.registerPlugin(ScrollTrigger);

/**
 * Flat vector layers of the contact scene, transcribed from the reference.
 *
 * Two layers rather than one, because the animated artwork sits between them:
 * `ContactBackdrop` is the big cloud behind the figure, `ContactForeground` the
 * clouds, tree and striped hill in front of it. Both live here — the hero is
 * their only consumer.
 *
 * Both keep the original 1512x525 user space. That matters for the hill: its
 * stripes are `patternUnits="userSpaceOnUse"`, so cropping the viewBox to the
 * shape would shift the stripe phase. It is also why the hill reads flat along
 * the bottom — its base is below y=525 and the viewBox cuts it.
 */

const HILL =
  "M922.442 541.642C908.603 508.399 875.796 485.032 837.522 485.032C821.555 485.032 806.537 489.103 793.462 496.252C761.659 441.366 702.288 404.423 634.251 404.423C548.774 404.423 476.939 462.692 456.301 541.642H922.442Z";

/** Stripe wave, one repeat per 191.972 units. */
const WAVE =
  "M0 12C47.993 12 47.993 25.6499 95.9861 25.6499C143.979 25.6499 143.979 12 191.972 12C239.965 12 239.965 25.6499 287.958 25.6499C335.951 25.6499 335.951 12 383.944 12C431.937 12 431.937 25.6499 479.944 25.6499C527.951 25.6499 527.937 12 575.944 12";

/**
 * Vertical travel of the pattern rect across the scroll.
 *
 * This is the only thing that animates on the hill — the shape itself holds
 * still (its width measures constant across the reference recording), and the
 * stripes slide through the clip. Endpoints are the values observed in the
 * source markup at different scroll positions; the midpoint is the resting
 * state used before the trigger fires.
 */
const PATTERN_FROM = 450.72;
/**
 * Three full tiles of travel (3 x 33). A whole number of tiles keeps the
 * stripes continuous across the range, and three is enough to actually read as
 * movement — the ~83 units between the sampled values barely shifted.
 */
const PATTERN_TO = PATTERN_FROM + 99;
const PATTERN_SHIFT = 482.83;

const VIEWBOX = "0 0 1512 525";

/**
 * Nudge for the hill, in the scene's own user units (1512x525).
 *
 * Applied to the whole hill group — silhouette, clip and pattern rect — so the
 * stripes travel with the shape instead of sliding against it.
 *
 * Negative Y is safe up to about 66 units: the hill's base sits at 541.6 and
 * the band crops the scene at roughly 475 units, so the flat bottom edge stays
 * hidden. Past that it would lift into view and float.
 */
const HILL_OFFSET = { x: -40, y: -24 };

/**
 * Nudge for the tree, same units. Trunk and canopy move as one so the trunk
 * stays under the canopy; the trunk runs to y=596, below the 525 viewBox, so it
 * keeps reading as grounded however far it slides sideways.
 */
const TREE_OFFSET = { x: -40, y: 0 };

/** The large cloud that sits behind the figure. */
const ContactBackdrop = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox={VIEWBOX}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none ${className ?? ""}`.trim()}
  >
    <path
      d="M308.811 103.637C359.298 103.637 400.29 144.608 400.29 195.051V204.11C400.29 227.4 381.366 246.303 358.065 246.303H259.546C236.234 246.303 217.32 227.389 217.32 204.11V195.051C217.32 144.597 258.312 103.637 308.8 103.637H308.811Z"
      fill="white"
    />
    <path
      d="M414.151 190.533H203.47C164.05 190.533 132.083 222.467 132.083 261.877C132.083 301.287 164.05 333.221 203.47 333.221H414.141C453.572 333.221 485.528 301.276 485.528 261.877C485.528 222.478 453.561 190.533 414.141 190.533H414.151Z"
      fill="white"
    />
  </svg>
);

/** Clouds, tree and striped hill, drawn over the figure. */
const ContactForeground = ({ className }: { className?: string }) => {
  const stripes = useRef<SVGRectElement | null>(null);
  const uid = useId().replace(/:/g, "");
  const patternId = `hillPattern-${uid}`;
  const clipId = `hillClip-${uid}`;

  useEffect(() => {
    const el = stripes.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // immediateRender:false so the start value is only stamped once the
      // trigger fires — the `transform` attribute below stays the resting
      // state, and the stripes are never left parked somewhere odd if the
      // tween cannot run.
      gsap.fromTo(
        el,
        { y: PATTERN_FROM },
        {
          y: PATTERN_TO,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            // "top top", not "top bottom": the scene sits at the very top of
            // the page, so a range opening at the viewport's bottom edge is
            // already ~56% elapsed before the user scrolls at all — most of the
            // travel was unreachable, which is why it barely moved. Starting at
            // the top edge maps the whole range onto the scroll that actually
            // happens.
            trigger: el.ownerSVGElement ?? el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      aria-hidden
      viewBox={VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className ?? ""}`.trim()}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="189"
          height="33"
          patternUnits="userSpaceOnUse"
        >
          <rect width="189" height="33" fill="#FF5FDF" />
          <path
            d={WAVE}
            stroke="#BE5AFF"
            strokeWidth="13.6499"
            strokeMiterlimit="10"
          />
        </pattern>
        <clipPath id={clipId}>
          <path d={HILL} />
        </clipPath>
      </defs>

      {/* Tree: trunk then canopy. */}
      <g transform={`translate(${TREE_OFFSET.x}, ${TREE_OFFSET.y})`}>
        <path
          d="M1301.35 454.059H1243.32V596.103H1301.35V454.059Z"
          fill="#FD4401"
        />
        <path
          d="M1224.19 392.821C1202.38 386.098 1188 374.639 1188 361.662C1188 347.234 1205.72 334.738 1231.71 328.44C1218.17 321.576 1209.51 311.098 1209.51 299.355C1209.51 278.63 1236.44 261.866 1269.65 261.866C1302.86 261.866 1329.78 278.651 1329.78 299.355C1329.78 311.087 1321.13 321.587 1307.58 328.44C1333.57 334.716 1351.29 347.234 1351.29 361.662C1351.29 374.639 1336.93 386.076 1315.1 392.821C1336.91 399.544 1351.29 411.004 1351.29 423.98C1351.29 444.695 1314.74 461.469 1269.66 461.469C1224.57 461.469 1188.02 444.673 1188.02 423.98C1188.02 411.004 1202.4 399.566 1224.21 392.821H1224.18H1224.19Z"
          fill="#2668FD"
        />
      </g>

      {/* Cloud bank on the right. */}
      <path
        d="M1245.58 94H1184.14C1158.7 94 1138.08 114.605 1138.08 140.035C1138.08 165.475 1158.7 186.08 1184.14 186.08H1245.58C1271.02 186.08 1291.65 165.475 1291.65 140.046C1291.65 114.605 1271.02 94 1245.58 94Z"
        fill="white"
      />
      <path
        d="M1300.11 156.951H1185.3C1165 156.951 1148.56 173.387 1148.56 193.665C1148.56 213.943 1165 230.379 1185.3 230.379H1300.11C1320.41 230.379 1336.85 213.943 1336.85 193.665C1336.85 173.387 1320.41 156.951 1300.11 156.951Z"
        fill="white"
      />
      <path
        d="M1173.05 156.951H1124.06C1103.78 156.951 1087.32 173.387 1087.32 193.665C1087.32 213.943 1103.78 230.379 1124.06 230.379H1173.05C1193.33 230.379 1209.78 213.943 1209.78 193.665C1209.78 173.387 1193.33 156.951 1173.05 156.951Z"
        fill="white"
      />

      {/* Striped hill. */}
      <g transform={`translate(${HILL_OFFSET.x}, ${HILL_OFFSET.y})`}>
        <path d={HILL} fill="#FF5FDF" />
        <g clipPath={`url(#${clipId})`}>
          <rect
            ref={stripes}
            width="1000"
            height="1000"
            y="-500"
            fill={`url(#${patternId})`}
            transform={`matrix(1,0,0,1,0,${PATTERN_SHIFT})`}
          />
        </g>
      </g>
    </svg>
  );
};

/**
 * Contact scene, laid out as in the reference: a fixed-height band with four
 * stacked layers.
 *
 * Le champ est bleu-100 — le même ciel que le héros de l'accueil, les deux
 * seuls héros sur mesure du site. Le menthe #cff2f1 reste la couleur du CORPS
 * de la page (app/contact/page.tsx), sous la scène.
 *
 * Order matters and is the whole trick — the animated figure sits *between* two
 * vector layers, so the hill and tree overlap it while the big cloud stays
 * behind. Percentages and z-indices are transcribed rather than eyeballed.
 *
 * The band's own height is what crops the hill flat along the bottom; the form
 * panel below then overlaps that edge.
 */
export const ContactHeroSection: React.FC = () => {
  // Top padding below `lg` only — on desktop the scene runs to the very top and
  // the fixed navbar floats over it, as in the reference. Applying the padding
  // at every width is what pushed the whole scene down and left a band of empty
  // mint above it.
  return (
    <section className="w-full overflow-hidden bg-msk-blue-100 max-lg:pt-[4.0625rem]">
      <div className="w-full lg:h-[35.5625rem]">
        <div className="relative h-auto w-full overflow-hidden lg:h-full lg:w-auto">
          {/* 1 — cloud behind the figure */}
          <ContactBackdrop className="absolute z-10 h-auto w-full lg:h-full lg:w-auto" />

          {/* 2 — the figure */}
          <div className="absolute top-0 left-[-4.5%] z-10 h-auto w-[113%]">
            <LottieMark
              src="/contact.json"
              className="h-full w-full"
              fit={false}
            />
          </div>

          {/* 3 — clouds, tree and striped hill, over the figure */}
          <ContactForeground className="relative z-12 h-auto w-full lg:h-full lg:w-auto" />

          {/* 4 — plant, nearest the viewer */}
          <div className="absolute top-[21%] left-[-13%] z-[14] h-auto w-[44%]">
            <LottieMark
              src="/plant.json"
              className="h-full w-full"
              fit={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
