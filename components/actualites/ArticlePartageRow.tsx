"use client";

import { useState } from "react";
import { Check, Facebook, Link2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

/**
 * Rangée de partage d'un article : WhatsApp, Facebook, copier le lien.
 *
 * L'URL est construite côté client au moment du clic (window.location.href) :
 * pas besoin de connaître le domaine au rendu, et ça reste juste en préprod.
 */
export function ArticlePartageRow({ titre }: { titre: string }) {
  const [copie, setCopie] = useState(false);

  const url = () => window.location.href;

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible (permissions, vieux navigateur) : on
      // sélectionne l'URL dans la barre d'adresse à défaut — rien à casser.
    }
  };

  const bouton =
    "flex h-11 w-11 items-center justify-center rounded-full border-2 border-msk-cream-300 bg-white text-msk-night-800 transition-colors hover:border-msk-coral-500 hover:text-msk-coral-700 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-msk-night-700">
        Partager
      </span>
      <button
        type="button"
        aria-label="Partager sur WhatsApp"
        className={bouton}
        onClick={() =>
          window.open(
            `https://wa.me/?text=${encodeURIComponent(`${titre} — ${url()}`)}`,
            "_blank",
            "noopener",
          )
        }
      >
        <WhatsAppIcon className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Partager sur Facebook"
        className={bouton}
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`,
            "_blank",
            "noopener",
          )
        }
      >
        <Facebook className="h-5 w-5" aria-hidden />
      </button>
      <button type="button" aria-label="Copier le lien" className={bouton} onClick={copier}>
        {copie ? <Check className="h-5 w-5 text-msk-coral-600" aria-hidden /> : <Link2 className="h-5 w-5" aria-hidden />}
      </button>
      <span aria-live="polite" className="text-sm font-medium text-msk-night-700">
        {copie ? "Lien copié !" : ""}
      </span>
    </div>
  );
}
