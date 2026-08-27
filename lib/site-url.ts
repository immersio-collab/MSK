/**
 * L'adresse publique du site, résolue à la construction.
 *
 * Elle était écrite en dur — `https://mskmontessori.ma` — dans trois fichiers
 * (`app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`), et ce domaine
 * N'EXISTAIT PAS : le DNS ne le résolvait pas. Conséquences en production :
 * aucune vignette quand un parent partage le lien sur WhatsApp ou Facebook
 * (l'image d'aperçu est résolue contre cette base), un sitemap listant huit
 * adresses introuvables, et un robots.txt renvoyant vers un sitemap absent.
 *
 * D'où cette résolution en cascade, du plus explicite au plus automatique :
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — à renseigner le jour où le vrai domaine est
 *    acheté. C'est le seul geste à faire : aucune ligne de code à rouvrir.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — fourni par Vercel. Il vaut le domaine
 *    personnalisé dès qu'il en existe un, et le `.vercel.app` sinon. C'est ce
 *    qui fait que le déploiement d'aujourd'hui est correct sans rien régler.
 * 3. `VERCEL_URL` — l'URL propre à CHAQUE déploiement, donc juste sur les
 *    aperçus de branche, où la production n'est pas la bonne réponse.
 * 4. `localhost` en développement.
 *
 * Les variables Vercel arrivent sans protocole (`exemple.vercel.app`), d'où le
 * `https://` ajouté ; `NEXT_PUBLIC_SITE_URL` est laissée telle quelle pour
 * accepter aussi bien `https://msk.ma` que `msk.ma`.
 */
const brut =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

export const SITE_URL = brut.startsWith("http") ? brut : `https://${brut}`;
