"use client";

import { FadeUp } from "@/components/motion/FadeUp";
import { LottieMark } from "@/components/motion/LottieMark";
import { AccueilStepsRibbon } from "@/components/accueil/AccueilStepsRibbon";
import { METHODE_STEPS } from "@/lib/data/methode-steps";

/**
 * The method as a column of cards that stack against a heading which stays put.
 *
 * The heading column is `sticky` and holds its place for the whole section,
 * while each card on the right is itself `sticky` with a slightly larger `top`
 * than the one before it. So a card pins, the next slides up and covers all but
 * its top edge, and the offsets leave a visible ledge for every card already
 * dealt — the stack builds downward as you read.
 *
 * There is no JavaScript here. Later siblings paint over earlier ones, which is
 * what does the covering; the tilts and offsets are static CSS.
 *
 * Two things it depends on: the cards must be opaque, or the one underneath
 * shows through, and no ancestor may be a scroll container — `overflow: hidden`
 * anywhere above silently kills sticky. `app/page.tsx` uses `overflow-x-clip`
 * because `clip` does not create one.
 *
 * Cool, not cream: AccueilTroubles above it is msk-cream-100 and this was
 * msk-cream-50 — near-identical neighbours that read as one long cream run.
 * The page alternates warm and cold deliberately (see d429c86).
 *
 * Step identity (number + verb) comes from METHODE_STEPS; titles, copy and
 * presentation are this surface's own.
 */
/*
  LES PASTILLES NE SONT PAS DÉCORATIVES — elles servent de FOND MESURÉ.

  Les marques viennent du paquet de /la-methode (MethodeStepsSection) et sont
  appariées par index : METHODE_STEPS pilote les deux surfaces, donc l'étape N
  d'ici porte la Lottie de la carte N là-bas. Même verbe, même dessin.

  Mais un Lottie porte ses couleurs EN DUR : il n'hérite pas de son conteneur
  (voir l'en-tête de LottieMark). Or /la-methode a choisi le fond de chaque
  carte contre le dessin qu'elle porte, ratios à l'appui — quatre de ces six
  marques sont peintes en crème, jaune ou orange clair et DISPARAISSENT sur un
  fond pâle. Les cartes de l'accueil, elles, sont volontairement claires
  (coral-50 / blue-50 / sun-50, la grammaire de la page).

  D'où `mark` : une pastille qui reprend, telle quelle, la valeur déjà mesurée
  sur /la-methode. La carte reste claire, la marque garde son contraste. Ne pas
  repasser ces pastilles en pastel « pour l'harmonie » sans refaire la mesure —
  c'est exactement l'erreur que les commentaires de MethodeStepsSection
  documentent.
*/
const DETAILS = [
  {
    title: "L'observation bienveillante",
    description:
      "Observer l'enfant en situation réelle et reprendre son parcours scolaire, sans jugement ni étiquette.",
    bg: "bg-msk-coral-50",
    // Rouges et verts sombres : la seule marque du paquet qui exige du CLAIR.
    lottie: "/methode/lottie/eyes-book.json",
    mark: "bg-msk-cream-50",
  },
  {
    title: "L'analyse pluridisciplinaire",
    description:
      "Croiser les regards de l'équipe et le vôtre, pour cerner son niveau réel et les contraintes à respecter.",
    bg: "bg-msk-blue-50",
    // Jaune (68 %) et orange : il faut du sombre.
    lottie: "/methode/lottie/card2.json",
    mark: "bg-msk-coral-900",
  },
  {
    title: "Le groupe sur-mesure",
    description:
      "Un groupe de cinq formé par taille et niveau de développement, jamais par âge, qui tourne d'une salle à l'autre.",
    bg: "bg-msk-sun-50",
    // Le dessin le plus lumineux du paquet : il appelle le fond le plus noir.
    lottie: "/methode/lottie/card5.json",
    mark: "bg-msk-night-950",
  },
  {
    title: "La remédiation & la Neuro-Gym",
    description:
      "Reprendre les bases manquantes avec du matériel concret ; la Neuro-Gym soutient l'attention et la régulation.",
    bg: "bg-msk-coral-50",
    // Le cas difficile : verts moyen + très sombre, maximum 2,86 et c'est sur
    // BLANC. Aucun fond de la palette ne fait mieux — la limite vient de la
    // marque, pas du choix.
    lottie: "/methode/lottie/desc.json",
    mark: "bg-white",
  },
  {
    title: "Le lien continu avec la famille",
    description:
      "Des bilans réguliers, et selon les cas le suivi des démarches ou la journée organisée autour de sa santé.",
    bg: "bg-msk-blue-50",
    // Crème très clair (68 %) et jaune : n'importe quel fond sombre le sert.
    lottie: "/methode/lottie/card8.json",
    mark: "bg-msk-blue-900",
  },
  {
    title: "Reprendre sa place",
    description:
      "Tenir sa place dans sa classe et parmi les autres, jusqu'au jour où son école lui suffit.",
    bg: "bg-msk-sun-50",
    // Orange (51 %) et jaune : l'orange plafonne, night-800 garde de la marge.
    lottie: "/methode/lottie/card3.json",
    mark: "bg-msk-night-800",
  },
];

const STEPS = METHODE_STEPS.map((step, index) => ({
  ...step,
  ...DETAILS[index],
}));

/**
 * Resting tilt per card, so the stack reads as dealt rather than filed. Small
 * and alternating; the first sits square so the section does not open crooked.
 */
const TILTS = [0, 2.2, -2.4, 1.8, -1.6, 2];

/** Extra `top` per card, in rem. This is what leaves each ledge visible. */
const LEDGE_REM = 0.75;

export const AccueilSteps = () => {
  return (
    <section
      id="methode"
      className="relative w-full overflow-x-clip bg-msk-blue-50 py-24 md:py-32"
    >
      {/*
        Decorative ribbon behind the section, drawn on scroll.

        Deliberately NOT `overflow-hidden` on the section: that creates a scroll
        container and silently kills every sticky card inside. `overflow-x-clip`
        is safe — `clip` never creates one — and is enough, since the Lottie's
        strands run wider than its own comp.
      */}
      <AccueilStepsRibbon className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/*
          `--stack-top` is the offset the first card pins at, and every card
          derives its own from it. A custom property rather than a literal
          because the value has to differ by breakpoint — the cards' `top` is an
          inline style, and inline styles cannot carry a media query.
        */}
        <div className="grid grid-cols-1 gap-12 [--stack-top:6rem] lg:grid-cols-[1fr_27.8125rem] lg:gap-16 lg:[--stack-top:35vh]">
          {/* `self-start` matters: a stretched grid item is as tall as the row
              and would have nothing left to scroll within, so it never sticks. */}
          <div className="lg:sticky lg:top-[35vh] lg:self-start">
            <FadeUp>
              <span className="inline-block rounded-[0.4rem] bg-msk-sun-200 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
                Notre pédagogie
              </span>
              <h2 className="mt-6 max-w-2xl font-display text-[1.875rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2.5rem] lg:text-[3rem]">
                La méthode en 6 étapes
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-msk-night-800 md:text-lg">
                Un cheminement structuré pour accompagner l&apos;enfant de ses
                premiers blocages jusqu&apos;à son autonomie.
              </p>
            </FadeUp>
          </div>

          <ol className="flex flex-col gap-8">
            {STEPS.map((step, index) => (
              /*
                The sticky element must be the DIRECT child of the tall column,
                not wrapped: a sticky box sticks within its containing block,
                and a wrapper that is exactly card-height leaves it nothing to
                travel in, so it just scrolls away. Wrapping these in <li>
                elements did exactly that.
              */
              <li
                key={step.number}
                className={`sticky rounded-[1.5rem] border border-msk-cream-300 p-7 shadow-sm sm:p-9 ${step.bg}`}
                style={{
                  top: `calc(var(--stack-top) + ${index * LEDGE_REM}rem)`,
                  rotate: `${TILTS[index]}deg`,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* `overflow-hidden` n'est pas cosmétique : LottieMark
                      redimensionne son hôte en ligne après mesure et peut aller
                      jusqu'à 1,6× la largeur du cadre. La pastille le borne. */}
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] sm:h-20 sm:w-20 ${step.mark}`}
                  >
                    <LottieMark src={step.lottie} className="h-12 w-12 sm:h-14 sm:w-14" />
                  </span>
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-700">
                    Étape {step.number} · {step.verb}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[1.375rem] font-bold uppercase leading-[1.1] text-msk-night-950 sm:text-[1.625rem]">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-msk-night-800">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
