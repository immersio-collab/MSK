"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

/**
 * Renders one of the Lottie animations in public/methode/lottie.
 *
 * lottie-web is imported dynamically so its ~250KB stays out of the initial
 * bundle, and playback is gated on an IntersectionObserver: an animation that
 * is off-screen is paused rather than burning frames. With several of these on
 * one page that matters.
 *
 * The JSON carries its own colours, so these marks do not inherit their
 * container's tone the way the inline SVG components do — pick card fills that
 * sit behind them rather than expecting them to adapt.
 */
/** Frames sampled when measuring the artwork's travelled bounds. */
const SAMPLES = 12;

export const LottieMark = ({
  src,
  className,
  loop = true,
  fit = true,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  /** Crop the viewBox to the artwork so marks fill their box consistently. */
  fit?: boolean;
}) => {
  const host = useRef<HTMLDivElement | null>(null);
  const anim = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let isVisible = false;

    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled || !host.current) return;

      anim.current = lottie.loadAnimation({
        container: host.current,
        renderer: "svg",
        loop,
        autoplay: false,
        path: src,
      });

      // Only run while on screen. Compositor-driven, so it is independent of
      // however the page happens to be scrolled.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            isVisible = entry.isIntersecting;
            if (isVisible) anim.current?.play();
            else anim.current?.pause();
          }
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(host.current);

      // Crop the viewBox to the artwork.
      //
      // These files are exported on whatever canvas the comp happened to use,
      // and the art does not fill it consistently — card3 occupies 40% of its
      // 2018px canvas while card5 occupies 93% of a 1080px one. Rendered into
      // identical boxes that makes some marks look half the size of others.
      //
      // The bounds are sampled across the timeline and unioned, not taken from
      // a single frame: these animations move, and cropping to frame 0 would
      // clip whatever travels outside it later.
      anim.current.addEventListener("DOMLoaded", () => {
        if (!fit || !anim.current || !host.current) return;
        const svg = host.current.querySelector("svg");
        if (!svg) return;

        // Chaque échantillon est RABATTU sur la toile de la composition avant
        // d'être uni aux autres. Sans ce garde-fou, un élément qui entre en
        // volant depuis l'extérieur du cadre étire la boîte bien au-delà de la
        // toile, et le dessin se retrouve rendu minuscule au centre : mesuré le
        // 2026-08-25, `letter-m` produisait une boîte de 1379×1774 pour une
        // toile de 1247×1247, `teddy-car` 1322×1021 pour 1184×592. Ce qui vit
        // hors de la toile n'est de toute façon pas censé être vu.
        // La toile se lit sur le viewBox que lottie vient de poser (`0 0 W H`),
        // avant qu'on l'écrase — c'est la même valeur que `animationData.w/h`,
        // mais sans transtypage : le type `AnimationItem` n'expose pas ce champ.
        const toile = (svg.getAttribute("viewBox") ?? "").split(/\s+/).map(Number);
        const toileW = toile.length === 4 && toile[2] > 0 ? toile[2] : 0;
        const toileH = toile.length === 4 && toile[3] > 0 ? toile[3] : 0;

        /**
         * `svg.getBBox()` compte TOUT, y compris les fonds entièrement
         * transparents que ces exports traînent : `eyes-book` et `letter-m` en
         * portent un qui couvre la toile entière, si bien que la boîte mesurée
         * valait la toile et que le dessin, plus petit, était rendu minuscule.
         * On n'unit donc que les formes réellement peintes — opacité non nulle
         * en comptant celle des groupes parents, et au moins un remplissage ou
         * un contour. Les rectangles en `getBoundingClientRect` sont en pixels
         * écran : la conversion vers les unités du viewBox se fait par le
         * rapport entre les deux.
         */
        const boiteVisible = () => {
          const cadre = svg.getBoundingClientRect();
          if (!cadre.width || !cadre.height || !toileW || !toileH) return null;
          const kx = toileW / cadre.width;
          const ky = toileH / cadre.height;
          let a0 = Infinity;
          let b0 = Infinity;
          let a1 = -Infinity;
          let b1 = -Infinity;

          svg
            .querySelectorAll<SVGGraphicsElement>(
              "path, rect, circle, ellipse, polygon, polyline, image",
            )
            .forEach((el) => {
              const style = getComputedStyle(el);
              if (style.display === "none" || style.visibility === "hidden") return;
              if (style.fill === "none" && style.stroke === "none") return;

              let opacite = Number(style.opacity);
              for (
                let parent: Element | null = el;
                parent && parent !== svg;
                parent = parent.parentElement
              ) {
                opacite *= Number(getComputedStyle(parent).opacity);
              }
              if (!(opacite > 0.01)) return;

              const r = el.getBoundingClientRect();
              if (!r.width || !r.height) return;
              a0 = Math.min(a0, toile[0] + (r.left - cadre.left) * kx);
              b0 = Math.min(b0, toile[1] + (r.top - cadre.top) * ky);
              a1 = Math.max(a1, toile[0] + (r.right - cadre.left) * kx);
              b1 = Math.max(b1, toile[1] + (r.bottom - cadre.top) * ky);
            });

          return Number.isFinite(a0) && a1 > a0 && b1 > b0
            ? { x: a0, y: b0, width: a1 - a0, height: b1 - b0 }
            : null;
        };

        const total = anim.current.totalFrames;
        let x0 = Infinity;
        let y0 = Infinity;
        let x1 = -Infinity;
        let y1 = -Infinity;

        for (let i = 0; i <= SAMPLES; i += 1) {
          anim.current.goToAndStop((total * i) / SAMPLES, true);
          try {
            const b = boiteVisible() ?? svg.getBBox();
            if (!b.width || !b.height) continue;
            const bx0 = toileW ? Math.max(b.x, 0) : b.x;
            const by0 = toileH ? Math.max(b.y, 0) : b.y;
            const bx1 = toileW ? Math.min(b.x + b.width, toileW) : b.x + b.width;
            const by1 = toileH ? Math.min(b.y + b.height, toileH) : b.y + b.height;
            if (bx1 <= bx0 || by1 <= by0) continue;
            x0 = Math.min(x0, bx0);
            y0 = Math.min(y0, by0);
            x1 = Math.max(x1, bx1);
            y1 = Math.max(y1, by1);
          } catch {
            if (isVisible) anim.current.play();
            return;
          }
        }
        
        anim.current.goToAndStop(0, true);

        if (Number.isFinite(x0) && x1 > x0 && y1 > y0) {
          const pad = Math.max(x1 - x0, y1 - y0) * 0.04;
          const largeur = x1 - x0 + pad * 2;
          const hauteur = y1 - y0 + pad * 2;
          svg.setAttribute("viewBox", `${x0 - pad} ${y0 - pad} ${largeur} ${hauteur}`);
          svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

          /**
           * Le cadre carré donné par `className` est un BUDGET DE SURFACE, pas
           * une taille. Tel quel, `meet` cale le dessin sur son plus grand côté :
           * une marque de rapport 2,76 remplissait 176×64 quand une marque
           * carrée remplissait 176×176 — un tiers de la surface, et l'œil voit
           * deux illustrations de tailles différentes. On redimensionne donc le
           * cadre à surface constante, bornes larges pour ne pas déborder la
           * carte ni chasser le texte.
           */
          const base = host.current.getBoundingClientRect();
          const surface = base.width * base.height;
          if (surface > 0) {
            const rapport = largeur / hauteur;
            const h = Math.min(
              Math.sqrt(surface / rapport),
              base.height * 1.15,
            );
            const w = Math.min(h * rapport, base.width * 1.6);
            host.current.style.width = `${Math.round(w)}px`;
            host.current.style.height = `${Math.round((w / rapport))}px`;
          }
        }

        if (isVisible) anim.current.play();
      });
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      anim.current?.destroy();
      anim.current = null;
    };
  }, [src, loop, fit]);

  return <div ref={host} aria-hidden className={className} />;
};
