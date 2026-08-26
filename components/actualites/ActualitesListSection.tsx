"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";


import {
  ARTICLES,
  CATEGORIES_ARTICLES,
  CATEGORIE_ARTICLE_BADGE,
  CATEGORIE_ARTICLE_LABEL,
  type Article,
  type ArticleCategorie,
} from "@/lib/data/actualites";
import { cn } from "@/lib/utils";

/**
 * Le tableau d'affichage : filtres par catégorie, article « À la une » en
 * grande carte inclinée, puis grille de cartes polaroid, sur sun-50 — la
 * teinte signature de la page (bande du hero, sticker « À la une »,
 * « Lire l'article »). Les badges de catégorie gardent leurs quatre couleurs.
 *
 * Tout le mouvement est en framer-motion : entrées au montage et transitions
 * de filtre — rien de scroll-driven ici.
 */

type Filtre = ArticleCategorie | "tous";

const SPRING = { type: "spring", stiffness: 300, damping: 26 } as const;

/** Inclinaison au repos des cartes, alternée façon stickers. */
const TILTS = [-1.6, 1.3, -1.2, 1.6, -1.4, 1.2];

function CarteArticle({ article, index }: { article: Article; index: number }) {
  const tilt = TILTS[index % TILTS.length] ?? 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, rotate: tilt }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ ...SPRING, delay: index * 0.05 }}
      style={{ borderRadius: 22 }}
      className="group relative flex h-full flex-col bg-white p-2.5 pb-5 shadow-xl shadow-msk-night-900/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem]">
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 350px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-2.5 top-2.5 rounded-full px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] shadow-sm",
            CATEGORIE_ARTICLE_BADGE[article.categorie],
          )}
        >
          {CATEGORIE_ARTICLE_LABEL[article.categorie]}
        </span>
      </div>

      <div className="flex grow flex-col px-3 pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
          <Calendar className="h-4 w-4" aria-hidden />
          {article.date}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-msk-night-900 transition-colors group-hover:text-msk-sun-800">
          <Link href={`/actualites/${article.id}`} className="focus-visible:outline-hidden">
            {article.titre}
            {/* Lien étiré : toute la carte est cliquable. */}
            <span aria-hidden className="absolute inset-0" />
          </Link>
        </h3>
        <p className="mt-2 grow text-sm leading-relaxed text-msk-night-700">{article.extrait}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-msk-sun-800">
          Lire l&apos;article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </motion.article>
  );
}

export const ActualitesListSection = () => {
  const [filtre, setFiltre] = useState<Filtre>("tous");

  const articles = useMemo(
    () => (filtre === "tous" ? ARTICLES : ARTICLES.filter((a) => a.categorie === filtre)),
    [filtre],
  );
  const [aLaUne, ...reste] = articles;

  const compte = (cle: Filtre) =>
    cle === "tous" ? ARTICLES.length : ARTICLES.filter((a) => a.categorie === cle).length;

  return (
    <section id="articles" className="relative overflow-hidden bg-msk-sun-50 pb-24 pt-20 md:pb-28 md:pt-24">
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        {/* Filtres : la pastille bleu nuit glisse d'une catégorie à l'autre. */}
        <div role="group" aria-label="Filtrer les articles" className="flex flex-wrap justify-center gap-2.5">
          {CATEGORIES_ARTICLES.map((cat) => {
            const actif = filtre === cat.cle;
            return (
              <button
                key={cat.cle}
                type="button"
                aria-pressed={actif}
                onClick={() => setFiltre(cat.cle)}
                className={cn(
                  "relative inline-flex h-10 items-center gap-2 rounded-full px-4 font-display text-[0.7rem] font-semibold uppercase tracking-[0.13em] transition-colors focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-sun-300",
                  actif ? "text-white" : "text-msk-night-900 hover:text-msk-sun-800",
                )}
              >
                {actif ? (
                  <motion.span
                    layoutId="actualites-filtre-actif"
                    aria-hidden
                    transition={SPRING}
                    className="absolute inset-0 rounded-full bg-msk-night-900 shadow-lg shadow-msk-night-900/30"
                  />
                ) : (
                  <span aria-hidden className="absolute inset-0 rounded-full border-2 border-msk-cream-300 bg-white" />
                )}
                {/* Espace explicite : sans lui le nom accessible du bouton
                    concatène les deux spans — « Tous6 » au lecteur d'écran. */}
                <span className="relative">{cat.label}</span>{" "}
                <span
                  className={cn(
                    "relative rounded-full px-1.5 py-0.5 text-[0.65rem]",
                    actif ? "bg-msk-sun-300 text-msk-night-900" : "bg-msk-cream-100 text-msk-night-700",
                  )}
                >
                  {compte(cat.cle)}
                </span>
              </button>
            );
          })}
        </div>

        {/* À la une : le premier article de la liste filtrée, en grand. */}
        <AnimatePresence mode="wait" initial={false}>
          {aLaUne ? (
            <motion.div
              key={`${filtre}-${aLaUne.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
              transition={SPRING}
              className="relative mt-12"
            >
              <motion.article
                whileHover={{ rotate: 0, y: -6 }}
                initial={false}
                animate={{ rotate: -0.8 }}
                transition={SPRING}
                style={{ borderRadius: 26 }}
                className="group relative grid gap-5 bg-white p-3.5 shadow-2xl shadow-msk-night-900/15 md:grid-cols-[1.05fr_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem]">
                  <Image
                    src={aLaUne.image}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 92vw, 560px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center px-2 pb-3 md:py-4 md:pr-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
                        CATEGORIE_ARTICLE_BADGE[aLaUne.categorie],
                      )}
                    >
                      {CATEGORIE_ARTICLE_LABEL[aLaUne.categorie]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <Calendar className="h-4 w-4" aria-hidden />
                      {aLaUne.date}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold leading-[1.12] text-msk-night-900 transition-colors group-hover:text-msk-sun-800 md:text-3xl">
                    <Link href={`/actualites/${aLaUne.id}`} className="focus-visible:outline-hidden">
                      {aLaUne.titre}
                      <span aria-hidden className="absolute inset-0" />
                    </Link>
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-msk-night-700">{aLaUne.extrait}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-bold text-msk-sun-800">
                    Lire l&apos;article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </motion.article>

              {/* Icône journal, posée sur le coin haut-GAUCHE de la carte, en
                  pendant du sticker « À la une » qui tient le coin droit. Elle
                  flottait auparavant dans la gouttière de la section, sans rien
                  à quoi se rattacher. */}
              <img
                src="/news error.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 -top-8 hidden w-28 -rotate-6 sm:block md:-left-10 md:w-36"
              />

              {/* Sticker « À la une », posé sur le coin. */}
              <span
                aria-hidden
                className="absolute -top-6 right-2 flex h-20 w-20 rotate-[9deg] items-center justify-center rounded-full bg-msk-coral-600 text-center font-display text-sm font-bold uppercase leading-[1.05] text-white shadow-lg shadow-msk-coral-600/40 md:-right-3"
              >
                À la
                <br />
                une
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Le reste des articles, en polaroids inclinés. `key={filtre}` :
            changer de filtre rejoue l'entrée de la grille. */}
        <div key={filtre} className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {reste.map((article, index) => (
            <CarteArticle key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
