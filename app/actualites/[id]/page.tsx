import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { NextStepSection } from "@/components/common/NextStepSection";
import { ArticlePartageRow } from "@/components/actualites/ArticlePartageRow";
import { FaqSection } from "@/components/common/FaqSection";
import { FAQ_ARTICLE } from "@/lib/data/faq";
import { CloudDrift } from "@/components/motion/CloudDrift";
import { HERO_BAND_CLIP } from "@/components/common/PageHero";
import {
  ARTICLES,
  CATEGORIE_ARTICLE_BADGE,
  CATEGORIE_ARTICLE_BANDE,
  CATEGORIE_ARTICLE_LABEL,
  articlesLies,
  minutesLecture,
  type BlocArticle,
} from "@/lib/data/actualites";
import { cn } from "@/lib/utils";

/**
 * Page article. Tout le contenu vient de lib/data/actualites.ts : publier un
 * article = ajouter une entrée là-bas, cette page se charge de la mise en
 * scène (bande à la couleur de la catégorie, cadre polaroid, blocs typés).
 */

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: a.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = ARTICLES.find((a) => a.id === params.id);
  if (!article) return {};
  return {
    title: article.titre,
    description: article.extrait,
    openGraph: { title: article.titre, description: article.extrait, images: [article.image] },
  };
}

/** Les intertitres sont numérotés dans l'ordre : 1, 2, 3… */
function numeroter(corps: BlocArticle[]) {
  let n = 0;
  return corps.map((bloc) => ({ bloc, numero: bloc.type === "intertitre" ? ++n : 0 }));
}

export default function ArticlePage({ params }: PageProps) {
  const article = ARTICLES.find((a) => a.id === params.id);
  if (!article) notFound();

  const bande = CATEGORIE_ARTICLE_BANDE[article.categorie];
  const badge = CATEGORIE_ARTICLE_BADGE[article.categorie];
  const lies = articlesLies(article);

  return (
    <div className="flex min-h-screen flex-col bg-msk-cream-100">
      <section className="relative overflow-hidden pt-28 md:pt-32">
        <div
          aria-hidden
          className={cn("absolute inset-x-0 top-0 h-[85%]", bande)}
          style={{ clipPath: HERO_BAND_CLIP }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <CloudDrift
            motion="float"
            shape="a"
            speed={52}
            phase={0.25}
            className="absolute left-0 top-[6%] w-36 text-white/90 md:w-48"
          />
          <CloudDrift
            motion="float"
            shape="b"
            speed={40}
            phase={0.7}
            className="absolute left-0 top-[26%] hidden w-32 text-white/90 lg:block"
          />
        </div>

        <div className="relative mx-auto w-full max-w-3xl px-6">
          <div className="mb-5">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-msk-night-900 shadow-md transition-transform hover:-translate-x-1 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Toutes les actualités
            </Link>
          </div>

          <header className="rounded-[1.75rem] bg-white px-7 py-9 shadow-2xl shadow-msk-night-900/20 md:px-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
              <span
                className={cn(
                  "rounded-full px-3 py-1.5 font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
                  badge,
                )}
              >
                {CATEGORIE_ARTICLE_LABEL[article.categorie]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden />
                {article.date}
              </span>
              <span aria-hidden>·</span>
              <span>{minutesLecture(article)} min de lecture</span>
            </div>
            <h1 className="mt-4 font-display text-[1.75rem] font-bold leading-[1.08] text-msk-night-900 sm:text-4xl md:text-[2.5rem]">
              {article.titre}
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-msk-night-700 md:text-lg">
              {article.extrait}
            </p>
          </header>
        </div>
      </section>

      <figure className="relative mx-auto mt-9 w-full max-w-4xl px-6">
        <div className="rotate-[-0.8deg] rounded-[1.5rem] bg-white p-3 shadow-2xl shadow-msk-night-900/20">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[1rem] bg-msk-cream-200">
            <Image
              src={article.image}
              alt={article.legende}
              fill
              priority
              sizes="(max-width: 900px) 92vw, 850px"
              className="object-cover"
            />
          </div>
        </div>
        <figcaption className="pt-3 text-center text-sm text-slate-500">{article.legende}</figcaption>
      </figure>

      <article className="mx-auto mt-10 w-full max-w-2xl px-6 text-[17px] leading-[1.75] text-msk-night-800">
        {numeroter(article.corps).map(({ bloc, numero }, i) => {
          switch (bloc.type) {
            case "paragraphe":
              return (
                <p key={i} className="mb-6">
                  {bloc.texte}
                </p>
              );
            case "intertitre":
              return (
                <h2
                  key={i}
                  className="mb-4 mt-10 font-display text-2xl font-semibold leading-tight text-msk-night-900"
                >
                  <span
                    aria-hidden
                    className="mr-3 inline-flex h-9 w-9 rotate-[-6deg] items-center justify-center rounded-full bg-msk-sun-300 align-[-0.35rem] text-[1.05rem] font-bold text-msk-coral-700"
                  >
                    {numero}
                  </span>
                  {bloc.texte}
                </h2>
              );
            case "encadre":
              return (
                <aside key={i} className="my-8 rotate-[-0.5deg] rounded-[1.25rem] bg-msk-blue-100 px-7 py-6">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-msk-blue-700">
                    {bloc.titre}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {bloc.points.map((point) => (
                      <li key={point} className="relative pl-6 text-[15.5px] leading-relaxed text-msk-night-800">
                        <span
                          aria-hidden
                          className="absolute left-0 top-[0.45rem] h-3 w-3 rounded-full bg-msk-blue-700"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </aside>
              );
            case "citation":
              return (
                <blockquote key={i} className="relative my-9 pl-8">
                  <span
                    aria-hidden
                    className="absolute -left-2 -top-5 font-display text-7xl font-bold leading-none text-msk-coral-600"
                  >
                    &ldquo;
                  </span>
                  <p className="font-display text-xl font-medium leading-snug text-msk-coral-700 md:text-2xl">
                    {bloc.texte}
                  </p>
                  <footer className="mt-3 text-sm font-medium text-slate-500">— {bloc.auteur}</footer>
                </blockquote>
              );
          }
        })}
      </article>

      <div className="mx-auto mt-10 w-full max-w-2xl space-y-6 px-6">
        <ArticlePartageRow titre={article.titre} />
        <div className="flex rotate-[0.5deg] items-center gap-4 rounded-[1.25rem] bg-white px-6 py-5 shadow-xl shadow-msk-night-900/10">
          <span
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-msk-coral-100 font-display text-lg font-bold text-msk-coral-700"
          >
            MSK
          </span>
          <div>
            <p className="font-display text-base font-semibold text-msk-night-900">
              L&apos;équipe pluridisciplinaire MSK
            </p>
            <p className="mt-0.5 text-sm text-slate-500">
              Éducateurs, orthophonistes et psychomotriciens du centre — Casablanca
            </p>
          </div>
        </div>
      </div>

      <section className="mt-16 bg-msk-cream-200 px-6 py-14 md:py-16">
        <h2 className="text-center font-display text-3xl font-bold uppercase leading-[0.95] text-msk-night-900 md:text-4xl">
          À lire ensuite
        </h2>
        <div className="mx-auto mt-9 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lies.map((lie, index) => (
            <Link
              key={lie.id}
              href={`/actualites/${lie.id}`}
              className={cn(
                "group block rounded-[1.25rem] bg-white p-2 pb-4 shadow-xl shadow-msk-night-900/10 transition-transform duration-300 hover:rotate-0 hover:-translate-y-2 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-msk-coral-300",
                index % 2 ? "rotate-[1.2deg]" : "rotate-[-1.4deg]",
              )}
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-[0.85rem]">
                <Image
                  src={lie.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 92vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span
                className={cn(
                  "ml-1.5 mt-3 inline-block rounded-full px-3 py-1 font-display text-[0.6rem] font-semibold uppercase tracking-[0.14em]",
                  CATEGORIE_ARTICLE_BADGE[lie.categorie],
                )}
              >
                {CATEGORIE_ARTICLE_LABEL[lie.categorie]}
              </span>
              <span className="mx-1.5 mt-2 block font-display text-[0.95rem] font-semibold leading-snug text-msk-night-900 transition-colors group-hover:text-msk-coral-600">
                {lie.titre}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bleu très pâle : c'est le registre calme de la page (l'encadré « À
          retenir » du corps d'article est en bleu-100), et c'est la seule
          valeur claire qui se détache à la fois du crème-200 au-dessus et du
          jaune de la CTA en dessous. Bouton encre, la CTA suivante étant
          corail. */}
      <FaqSection
        tone="blueLight"
        button="night"
        title="Après cette"
        titleAccent="lecture"
        description="Une question qui n'est pas là ? Écrivez-nous, nous répondons à chacune."
        items={FAQ_ARTICLE}
        ctaLabel="Poser votre question"
        ctaHref="/contact"
      />

      <NextStepSection
        eyebrow="Un doute ? Une question ?"
        title="Parlons de votre enfant"
        description="Nos articles ne remplacent pas un avis professionnel. Le bilan initial avec notre fondatrice est le vrai premier pas."
        buttonText="Prendre RDV pour un bilan gratuit"
        buttonHref="/contact"
        bgColor="bg-msk-sun-300"
        cloudColor="text-white/60"
        textColor="text-msk-sun-900"
        buttonTextColor="text-white"
        eyebrowColor="text-msk-coral-700"
        titleColor="text-msk-night-900"
        buttonBgColor="bg-msk-coral-600 shadow-lg shadow-msk-coral-700/30 group-hover:bg-msk-coral-700"
      />
    </div>
  );
}
