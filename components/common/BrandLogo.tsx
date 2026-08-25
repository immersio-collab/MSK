import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  variant?: "default" | "white";
}

/**
 * Le nuage posé derrière les lettres. Quatre bosses sur une base plate,
 * composées de cercles sur un rectangle arrondi plutôt que d'un tracé unique :
 * la silhouette est la même et les proportions restent lisibles à la relecture.
 *
 * Le ratio 200×80 est fixe — les tailles Tailwind plus bas s'accrochent dessus.
 */
const NUAGE = (
  <svg
    viewBox="0 0 200 80"
    aria-hidden
    className="h-full w-full transition-transform duration-300 ease-out group-hover:-translate-y-[3px]"
  >
    <g fill="white">
      <rect x="6" y="36" width="188" height="38" rx="19" />
      <circle cx="48" cy="38" r="24" />
      <circle cx="92" cy="28" r="28" />
      <circle cx="136" cy="32" r="26" />
      <circle cx="170" cy="42" r="20" />
    </g>
  </svg>
);

/**
 * Le logo MSK.
 *
 * Les trois lettres sont posées sur un NUAGE. La navbar est transparente en
 * haut de page, donc le logo tombe directement sur la bande colorée du héros —
 * et comme chaque bande est corail, jaune ou bleue, il y avait toujours une
 * lettre qui se dissolvait dans son propre fond. Contraste mesuré le
 * 2026-08-25 : entre 1,04 et 3,00 selon la page, pour un minimum de 3,0 en gros
 * texte gras. Le nuage est le vocabulaire du site (CloudDrift, les SVG des
 * héros), pas une plaque rectangulaire.
 *
 * Les trois teintes 500 sont un CHOIX DU PROPRIÉTAIRE, tranché le 2026-08-25,
 * et ne doivent pas être « corrigées ». Sur blanc, coral-500 est à 3,52 mais
 * sun-500 tombe à 1,79 et blue-500 à 2,40, sous le minimum de 3,0. Un cran plus
 * foncé (sun-700, blue-600) réglait la mesure ; le rendu a été jugé moins beau
 * et écarté. Le nuage reste donc le seul remède : il supprime le camouflage
 * — la lettre qui se noie dans une bande de sa propre couleur — sans prétendre
 * remonter le contraste du S et du K.
 *
 * Le nuage remonte de 5px pour que les lettres tombent dans son corps et non
 * entre ses bosses. Il plafonne à 3.5rem (56px) dans une navbar de 74px — la
 * marge restante est mince, mesurer après toute modification de taille.
 *
 * La variante `white` (pied de page, fond night-900) n'a PAS de nuage : un
 * aplat blanc sur le bleu nuit serait une tache, et les lettres blanches y ont
 * déjà tout le contraste voulu.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", variant = "default" }) => {
  const isWhite = variant === "white";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-all duration-300 ${className}`}
      aria-label="MSK Montessori School"
    >
      <span className="relative inline-flex items-center">
        {!isWhite ? (
          <span className="pointer-events-none absolute left-1/2 top-1/2 -mt-[5px] h-[2.7rem] w-[6.75rem] -translate-x-1/2 -translate-y-1/2 sm:h-[3.2rem] sm:w-[8rem] md:h-[3.5rem] md:w-[8.75rem]">
            {NUAGE}
          </span>
        ) : null}

        <span
          className={`relative px-1 text-3xl font-black tracking-tight sm:text-4xl md:text-[38px] ${
            isWhite ? "text-white" : ""
          }`}
        >
          <span className={isWhite ? "" : "text-msk-coral-500"}>M</span>
          <span className={isWhite ? "" : "text-msk-sun-500"}>S</span>
          <span className={isWhite ? "" : "text-msk-blue-500"}>K</span>
        </span>
      </span>
    </Link>
  );
};
