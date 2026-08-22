"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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

const ROUTE_PALETTES: ReadonlyArray<readonly [string, Palette]> = [
  ["/notre-centre/la-methode", p("coral", 100, 300, "blue-500")],
  ["/notre-centre/troubles-accompagnes", p("sun", 200, 400, "blue-700")],
  ["/notre-centre/equipe", p("coral", 200, 400, "sun-300")],
  ["/notre-centre/nos-espaces", p("blue", 100, 300, "coral-600")],
  ["/notre-centre", p("blue", 50, 200, "sun-500")],
  ["/programmes", p("sun", 100, 400, "blue-400")],
  ["/admissions", p("cream", 100, 300, "coral-700")],
  ["/actualites", p("blue", 200, 400, "sun-400")],
  ["/contact", p("coral", 100, 400, "blue-600")],
];

const HOME_PALETTE: Palette = p("sun", 100, 300, "coral-500");

function paletteFor(pathname: string): Palette {
  for (const [prefix, palette] of ROUTE_PALETTES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return palette;
  }
  return HOME_PALETTE;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const nearFan = useRef<HTMLDivElement>(null);
  const midFan = useRef<HTMLDivElement>(null);
  const square = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const running = useRef<Animation[]>([]);
  const timers = useRef<number[]>([]);

  const run = useCallback(
    (href: string, pathname: string) => {
      const layers = [overlay.current, nearFan.current, midFan.current, square.current];
      if (busy.current || layers.some((el) => el === null)) return false;
      busy.current = true;

      const palette = paletteFor(pathname);
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

      // La route bascule pendant que le carré couvre tout : le changement de
      // page n'est jamais visible.
      timers.current = [
        window.setTimeout(() => router.push(href), COVER_AT),
        window.setTimeout(() => {
          if (overlay.current) overlay.current.style.visibility = "hidden";
          running.current = [];
          busy.current = false;
        }, TOTAL),
      ];

      return true;
    },
    [router],
  );

  // Si le composant est démonté en pleine transition, ne pas laisser tourner
  // des animations ni un router.push différé.
  useEffect(
    () => () => {
      running.current.forEach((animation) => animation.cancel());
      timers.current.forEach((id) => window.clearTimeout(id));
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
