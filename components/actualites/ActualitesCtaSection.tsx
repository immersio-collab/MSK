import { ArrowRight, MessageCircle } from "lucide-react";

import { MethodeCloud } from "@/components/methode/MethodeCloud";
import { MorphButton } from "@/components/motion/MorphButton";

/**
 * Bande de fin de page — remplace l'idée de newsletter, choix assumé : le lead
 * qui compte pour le centre est le rendez-vous de bilan, pas l'email. Zéro
 * entretien (pas de service d'envoi à brancher), conversion directe.
 *
 * Jaune sun : les CTA des autres pages sont en night-800 / blue-800, la
 * palette de fin de page reste donc variée.
 */
export const ActualitesCtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-msk-sun-300 px-6 py-20 text-center md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <MethodeCloud
          motion="float"
          shape="a"
          speed={50}
          phase={0.2}
          className="absolute left-0 top-[12%] w-36 text-white/60 md:w-48"
        />
        <MethodeCloud
          motion="float"
          shape="b"
          speed={64}
          phase={0.65}
          className="absolute left-0 top-[62%] hidden w-28 text-white/60 lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-msk-coral-700">
          Un doute ? Une question ?
        </span>
        <h2 className="mt-4 font-display text-[2.25rem] font-bold uppercase leading-[0.92] text-msk-night-900 sm:text-5xl">
          Parlons de votre enfant
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-msk-sun-900 md:text-lg">
          Nos articles ne remplacent pas un avis professionnel. Le bilan initial avec notre
          fondatrice est le vrai premier pas.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MorphButton
            href="/contact"
            className="font-semibold text-white"
            fillClassName="bg-msk-coral-600 shadow-lg shadow-msk-coral-700/30 group-hover:bg-msk-coral-700"
          >
            Prendre RDV pour un bilan gratuit
            <ArrowRight className="h-4 w-4" aria-hidden />
          </MorphButton>
          <MorphButton
            href="https://wa.me/212600000000"
            size="sm"
            className="font-semibold text-msk-night-900"
            fillClassName="bg-white shadow-md group-hover:bg-msk-cream-100"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </MorphButton>
        </div>
      </div>
    </section>
  );
};
