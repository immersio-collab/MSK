import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * La carte polaroïd du site : cadre blanc, coins organiques et inclinaison qui
 * alternent avec la position, légende centrée dessous. L'accueil (marquee) et
 * la galerie (pellicule) en déclaraient chacune une copie ligne à ligne ; les
 * autres variantes (héros de la galerie, témoignages) gardent leurs propres
 * poses, plus libres.
 */

type PolaroidCardProps = {
  /** Pilote l'alternance inclinaison + coins (pair/impair). */
  index: number;
  caption: ReactNode;
  /** Le contenu photo (Image + éventuels badges), posé dans le cadre 4/3. */
  media: ReactNode;
  /** Classes du site d'appel : curseur, survol, focus ring… */
  className?: string;
} & (
  | { as: "figure" }
  | {
      as: "button";
      onClick: () => void;
      "aria-label": string;
      tabIndex?: number;
    }
);

export function PolaroidCard(props: PolaroidCardProps) {
  const { index, caption, media, className } = props;

  const frame = cn(
    "block w-[min(46vw,340px)] bg-white p-2 pb-3 shadow-xl",
    index % 2
      ? "mt-6 rotate-2 rounded-[6px_20px_8px_18px]"
      : "-rotate-2 rounded-[18px_6px_20px_8px]",
    className
  );
  const body = (
    <span className="relative block aspect-4/3 w-full overflow-hidden">
      {media}
    </span>
  );
  const captionClass =
    "mt-2 block text-center font-display text-xs font-semibold text-msk-night-800";

  if (props.as === "button") {
    return (
      <button
        type="button"
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        tabIndex={props.tabIndex}
        className={frame}
      >
        {body}
        <span className={captionClass}>{caption}</span>
      </button>
    );
  }

  return (
    <figure className={frame}>
      {body}
      <figcaption className={captionClass}>{caption}</figcaption>
    </figure>
  );
}
