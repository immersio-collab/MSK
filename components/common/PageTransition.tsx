"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { openCurtain, raiseCurtain } from "@/lib/curtain";

/**
 * Balayage de page en trois calques.
 *
 * Deux éventails triangulaires s'ouvrent depuis un apex situé SOUS le viewport,
 * puis un carré grandit en tournant jusqu'à couvrir l'écran. La navigation a
 * lieu pendant la couverture, puis les trois calques se retirent en cascade
 * (carré, puis éventail moyen, puis éventail clair) pour révéler la page.
 *
 * Timings mesurés en 1280x720 : le carré paraît à 261 ms, couvre entièrement
 * l'écran à 599 ms, y reste 258 ms, et tout est terminé à 1720 ms.
 *
 * Le retrait ne part PAS sur un minuteur : la séquence se fige au point de
 * couverture totale tant que la page demandée n'est pas montée. Sans ce gel, le
 * rideau se rouvrait sur l'ANCIENNE page dès que la navigation dépassait le
 * budget de couverture, et le changement se voyait à découvert une seconde plus
 * tard. Mesuré : la compilation à la demande d'une route en dev coûte de 550 ms
 * à 9 s, là où la couverture ne dure que 760 ms après le départ de la
 * navigation. En production le payload arrive en 17 à 54 ms et le gel ne se
 * déclenche pratiquement jamais — il n'existe que pour les cas lents.
 *
 * Deux points de géométrie qui ne sont pas cosmétiques :
 *  - l'apex des éventails est à 88% de la hauteur SOUS le bas de l'écran. Au ras
 *    du bord, le triangle n'y ferait que ~17px de large et les deux coins bas
 *    laisseraient voir la page en dessous ;
 *  - le carré fait exactement la taille minimale qui couvre un viewport w×h une
 *    fois tourné de 24°, soit max(w·cos+h·sin, w·sin+h·cos). Plus gros, il
 *    couvrirait bien avant la fin de sa courbe et le « remplissage » paraîtrait
 *    trop tôt.
 *
 * Pourquoi l'API Web Animations et pas framer-motion, qui est la norme ailleurs
 * dans ce projet : cette séquence a besoin d'une easing DIFFÉRENTE par segment
 * (entrée, tenue, sortie). Sur ce type de keyframes framer-motion abandonne le
 * chemin WAAPI et repasse sur son moteur JS en requestAnimationFrame — donc
 * trois calques plein écran animés sur le thread principal. `element.animate`
 * reste sur le compositeur. Ce n'est pas une dépendance de plus, c'est la
 * plateforme : framer-motion reste la norme pour tout le reste.
 */

const MIN_SCALE = 0.004;

/** Durée totale, et instant où la route change (sous la couverture). */
const TOTAL = 1720;
const COVER_AT = 640;

/**
 * Instant du gel. Le carré couvre la totalité de l'écran de 622 ms à 820 ms :
 * ce point doit rester dans cette fenêtre, sinon on fige sur une image où la
 * page transparaît. 750 ms laisse ~130 ms de marge avant, ~70 ms après.
 */
const HOLD_AT = 750;

/**
 * Filet de sécurité : passé ce délai sans navigation, le rideau repart quand
 * même. Un overlay plein écran bloqué serait bien pire que la couture qu'il
 * masque.
 */
const MAX_WAIT = 5000;

const EASE_IN = "cubic-bezier(.66,0,.24,1)";
const EASE_OUT = "cubic-bezier(.76,0,.24,1)";
const EASE_SQUARE = "cubic-bezier(.42,0,.28,1)";

const t = (ms: number) => ms / TOTAL;

/** Éventail : sliver vertical -> grand ouvert -> tenue -> refermeture. */
function fanKeyframes(max: number, inStart: number, inEnd: number, outStart: number, outEnd: number): Keyframe[] {
  const closed = `scaleX(${MIN_SCALE})`;
  const open = `scaleX(${max})`;
  const frames: Keyframe[] = [{ offset: 0, transform: closed }];
  if (inStart > 0) frames.push({ offset: t(inStart), transform: closed, easing: EASE_IN });
  else frames[0].easing = EASE_IN;
  frames.push(
    { offset: t(inEnd), transform: open },
    { offset: t(outStart), transform: open, easing: EASE_OUT },
    { offset: t(outEnd), transform: closed },
    { offset: 1, transform: closed },
  );
  return frames;
}

const SQUARE_KEYFRAMES: Keyframe[] = [
  { offset: 0, transform: "rotate(0deg) scale(0)" },
  { offset: t(254), transform: "rotate(0deg) scale(0)", easing: EASE_SQUARE },
  { offset: t(622), transform: "rotate(24deg) scale(1)" },
  { offset: t(820), transform: "rotate(24deg) scale(1)", easing: EASE_OUT },
  { offset: t(1400), transform: "rotate(48deg) scale(0)" },
  { offset: 1, transform: "rotate(48deg) scale(0)" },
];

const TIMING: KeyframeAnimationOptions = { duration: TOTAL, easing: "linear" };

type Palette = { near: string; mid: string; square: string };

const token = (name: string) => `var(--color-msk-${name})`;

/**
 * Chaque route a sa propre teinte : le balayage annonce la couleur de la page
 * vers laquelle on va. Uniquement des tokens de `@theme` — la palette reste la
 * seule source de vérité, et aucune classe Tailwind dynamique n'est générée.
 */
/**
 * Règle de composition, valable pour chaque route :
 *  - les deux éventails partagent UNE famille, en deux nuances (claire puis
 *    moyenne) : ils se lisent comme un seul rideau qui s'épaissit ;
 *  - le carré vient d'une AUTRE famille, pour trancher au moment où il remplit.
 * Chaque route a sa propre combinaison, et les dix carrés sont tous distincts.
 */
const p = (fanFamily: string, near: number, mid: number, square: string): Palette => ({
  near: token(`${fanFamily}-${near}`),
  mid: token(`${fanFamily}-${mid}`),
  square: token(square),
});

/*
 * Les familles d'éventails suivent la BANDE DU HÉROS de chaque page, pas sa
 * signature de contenu — les deux ont divergé le 2026-08-26 sur /actualites,
 * dont la bande est passée en sun-400 alors que ses accents restent coral.
 * C'est la bande qui compte ici : c'est elle que le visiteur voit à l'arrivée.
 * coral = méthode, fondatrice · blue = troubles, galerie, programmes ·
 * sun = actualités.
 */
const ROUTE_PALETTES: ReadonlyArray<readonly [string, Palette]> = [
  ["/notre-centre/notre-methode", p("coral", 100, 300, "blue-500")],
  ["/notre-centre/enfants-accueillis", p("blue", 50, 300, "sun-400")],
  ["/notre-centre/notre-fondatrice", p("coral", 200, 400, "sun-300")],
  ["/notre-centre/nos-espaces", p("blue", 100, 300, "coral-600")],
  ["/programmes", p("blue", 200, 400, "coral-400")],
  // Bande du héros en sun-400 depuis 2026-08-26 : l'éventail doit suivre,
  // sinon la transition s'ouvre en corail et atterrit sur du jaune.
  ["/actualites", p("sun", 100, 400, "coral-600")],
  // /contact et l'accueil ont le même ciel bleu-100 en tête de page : leurs
  // éventails sont bleus, seuls leurs carrés les distinguent.
  ["/contact", p("blue", 100, 400, "coral-700")],
];

const HOME_PALETTE: Palette = p("blue", 100, 300, "coral-500");

function paletteFor(pathname: string): Palette {
  for (const [prefix, palette] of ROUTE_PALETTES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return palette;
  }
  return HOME_PALETTE;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const nearFan = useRef<HTMLDivElement>(null);
  const midFan = useRef<HTMLDivElement>(null);
  const square = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const running = useRef<Animation[]>([]);
  const timers = useRef<number[]>([]);
  /** Vrai entre le clic et l'arrivée de la page demandée. */
  const awaiting = useRef(false);

  /** La page est arrivée (ou on renonce à l'attendre) : le rideau repart. */
  const release = useCallback(() => {
    if (!awaiting.current) return;
    awaiting.current = false;
    running.current.forEach((animation) => {
      if (animation.playState === "paused") animation.play();
    });
    // Le retrait commence : libère les apparitions que la nouvelle page
    // retenait (héros en mode mount, sections déjà dans le viewport).
    openCurtain();
  }, []);

  const run = useCallback(
    (href: string, target: string) => {
      const layers = [overlay.current, nearFan.current, midFan.current, square.current];
      if (busy.current || layers.some((el) => el === null)) return false;
      busy.current = true;
      awaiting.current = true;
      // Les apparitions de la page d'arrivée attendront l'ouverture du rideau.
      raiseCurtain();

      const palette = paletteFor(target);
      nearFan.current!.style.background = palette.near;
      midFan.current!.style.background = palette.mid;
      square.current!.style.background = palette.square;
      overlay.current!.style.visibility = "visible";

      // L'éventail clair est plus large que le moyen : il couvre les deux coins
      // bas que le moyen laisse, de sorte que la page n'est jamais visible.
      running.current = [
        nearFan.current!.animate(fanKeyframes(2.3, 0, 680, 1060, 1660), TIMING),
        midFan.current!.animate(fanKeyframes(1.27, 90, 770, 940, 1540), TIMING),
        square.current!.animate(SQUARE_KEYFRAMES, TIMING),
      ];

      // Le rideau se retire quand les animations se terminent VRAIMENT, y
      // compris après un gel : plus aucun minuteur ne décide à leur place.
      Promise.all(running.current.map((animation) => animation.finished))
        .then(() => {
          if (overlay.current) overlay.current.style.visibility = "hidden";
          running.current = [];
          awaiting.current = false;
          timers.current.forEach((id) => window.clearTimeout(id));
          timers.current = [];
          busy.current = false;
        })
        .catch(() => {
          // `cancel()` rejette la promesse : démontage en pleine transition.
        });

      // Horloge du gel. Une animation sans effet visuel plutôt qu'un
      // setTimeout : elle vit sur le même timeline que le balayage et ne peut
      // donc pas dériver par rapport à lui. Un setTimeout est bridé à ~1 s dans
      // un onglet en arrière-plan — il manquerait la fenêtre de couverture et
      // figerait la séquence alors que la page est déjà réapparue.
      overlay
        .current!.animate([{ opacity: 1 }, { opacity: 1 }], { duration: HOLD_AT })
        .finished.then(() => {
          if (awaiting.current) {
            running.current.forEach((animation) => animation.pause());
          }
        })
        .catch(() => {});

      // Deux filets, volontairement séparés — les enchaîner d'un coup couperait
      // le rideau net au lieu de le laisser se refermer.
      timers.current = [
        window.setTimeout(() => router.push(href), COVER_AT),
        // 1. La navigation n'arrive pas : on relâche le gel et la fermeture
        //    se joue normalement.
        window.setTimeout(release, COVER_AT + MAX_WAIT),
        // 2. Les animations elles-mêmes ne progressent pas — un onglet en
        //    arrière-plan les gèle entièrement (mesuré : une animation de
        //    300 ms ne se termine pas en 3 s), donc `finished` ne se
        //    résoudrait jamais et l'overlay resterait en travers de la page.
        //    `finish()` les envoie à leur état final. Ce minuteur laisse
        //    d'abord au filet 1 le temps de jouer sa fermeture ; si elle a
        //    eu lieu, la transition est finie et tous les minuteurs sont
        //    déjà annulés. Les setTimeout, eux, sont seulement bridés à
        //    ~1 s en arrière-plan : ils finissent toujours par tomber.
        window.setTimeout(() => {
          running.current.forEach((animation) => animation.finish());
        }, COVER_AT + MAX_WAIT + TOTAL),
      ];

      return true;
    },
    [router, release],
  );

  // La page demandée est montée : c'est LE signal qui relance la fermeture.
  // `usePathname` change à la validation de la navigation, et un `useEffect`
  // passe après la peinture — la nouvelle page est donc déjà dessinée sous le
  // rideau au moment où celui-ci recommence à bouger.
  useEffect(() => {
    release();
  }, [pathname, release]);

  // Si le composant est démonté en pleine transition, ne pas laisser tourner
  // des animations ni un router.push différé.
  useEffect(
    () => () => {
      awaiting.current = false;
      running.current.forEach((animation) => animation.cancel());
      timers.current.forEach((id) => window.clearTimeout(id));
      // Ne jamais laisser le drapeau levé derrière soi : des apparitions
      // resteraient en attente d'une ouverture qui ne viendra plus.
      openCurtain();
    },
    [],
  );

  useEffect(() => {
    // Interception en phase de capture, pour passer avant le handler de
    // next/link. Évite d'avoir à remplacer les <Link> dans les 16 fichiers
    // qui en utilisent.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      if (anchor.hasAttribute("download") || (anchor.getAttribute("target") ?? "") === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Ancre interne ou lien vers la page courante : rien à balayer.
      if (url.pathname === window.location.pathname) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (run(`${url.pathname}${url.search}${url.hash}`, url.pathname)) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [run]);

  return (
    <>
      <div
        ref={overlay}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: "-2px",
          // Sous la Navbar (z-50), qui reste visible par-dessus le balayage.
          zIndex: 40,
          overflow: "hidden",
          pointerEvents: "none",
          visibility: "hidden",
        }}
      >
        <div ref={nearFan} style={FAN_STYLE} />
        <div ref={midFan} style={FAN_STYLE} />
        <div ref={square} style={SQUARE_STYLE} />
      </div>

      <div className="flex-1 flex flex-col">{children}</div>
    </>
  );
}

/**
 * `translate` est une propriété CSS indépendante de `transform` : elle nous
 * laisse centrer les calques ici pendant que framer-motion garde la main sur
 * `transform` (scaleX / scale / rotate) sans que les deux se marchent dessus.
 */
const FAN_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  bottom: "-88%",
  width: "300vmax",
  height: "220vmax",
  translate: "-50% 0",
  transformOrigin: "50% 100%",
  transform: `scaleX(${MIN_SCALE})`,
  clipPath: "polygon(50% 100%, 0 0, 100% 0)",
  willChange: "transform",
};

const SQUARE_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  width:
    "max(calc(0.9135 * 100vw + 0.4067 * 100vh + 4px), calc(0.4067 * 100vw + 0.9135 * 100vh + 4px))",
  aspectRatio: "1",
  translate: "-50% -50%",
  transformOrigin: "50% 50%",
  transform: "rotate(0deg) scale(0)",
  willChange: "transform",
};
