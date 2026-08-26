"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MediaBandProps {
  src: string;
  alt: string;
  /**
   * Fond de la section, visible dans le triangle laissé par la coupe inclinée.
   *
   * Il doit reprendre EXACTEMENT le fond de la section juste au-dessus, sinon
   * le triangle se lit comme un coin clair posé derrière la photo au lieu du
   * prolongement de la section précédente. Les deux appels portaient cream-50
   * sous des sections en cream-200 et cream-100 : ça donnait un liseré blanc
   * en biais sur toute la largeur.
   */
  sectionBg: string;
  priority?: boolean;
  /** Props vectoriels décoratifs posés sur la photo (positionnés en absolu). */
  overlay?: ReactNode;
}

/**
 * Bande photographique pleine largeur à bord supérieur incliné — la coupe du
 * site entre une section de texte et de la photographie. Une seule définition :
 * la-méthode et programmes en déclaraient chacune une copie identique.
 *
 * Apparition : la photo « se pose » en dézoomant (scale 1.12 → 1), SANS
 * opacité — une bande pleine largeur qui part de transparent laisserait un
 * trou de la couleur du fond si l'animation ne se jouait jamais ; ici l'état
 * de départ reste une photo visible, juste un peu zoomée.
 */
export const MediaBand = ({ src, alt, sectionBg, priority = false, overlay }: MediaBandProps) => {
  return (
    <section className={cn("relative w-full", sectionBg)}>
      <div
        className="relative min-h-[26rem] w-full overflow-hidden bg-msk-cream-300 md:min-h-[34rem]"
        style={{ clipPath: "polygon(0 6%, 100% 0, 100% 100%, 0 100%)" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={priority}
          />
        </motion.div>
        {overlay ? (
          <div className="pointer-events-none absolute inset-0">{overlay}</div>
        ) : null}
      </div>
    </section>
  );
};
