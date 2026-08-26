/**
 * Poignée de main entre le rideau de PageTransition et les apparitions.
 *
 * Problème résolu : les animations de montage (héros) partaient dès que la
 * nouvelle page était montée — c'est-à-dire SOUS le rideau, qui couvre encore
 * l'écran ~0,5 s après le montage. Le visiteur n'en voyait que la fin, d'où
 * des entrées « fades » et incohérentes d'une navigation à l'autre.
 *
 * PageTransition lève le drapeau au départ du balayage (`raiseCurtain`) et le
 * baisse au moment précis où le rideau commence à se retirer (`openCurtain`) ;
 * `Reveal` et `TitreAnime` retiennent leurs animations tant que le drapeau est
 * levé, puis partent ensemble à l'ouverture.
 *
 * Au premier chargement (pas de rideau), le drapeau est baissé et rien ne
 * retient personne. Chaque consommateur garde en plus son propre filet
 * (timeout) : un rideau qui ne s'ouvrirait jamais ne doit jamais laisser une
 * page invisible.
 */

const EVENEMENT = "msk:rideau-ouvert";

let leve = false;

/** Le balayage démarre : les apparitions de la prochaine page attendront. */
export function raiseCurtain() {
  leve = true;
}

/** Le rideau se retire : libère toutes les apparitions en attente. */
export function openCurtain() {
  if (!leve) return;
  leve = false;
  window.dispatchEvent(new Event(EVENEMENT));
}

/** Vrai entre le départ du balayage et le début de son retrait. */
export function curtainActive() {
  return leve;
}

/** Abonne `cb` à l'ouverture ; renvoie la fonction de désabonnement. */
export function onCurtainOpen(cb: () => void): () => void {
  window.addEventListener(EVENEMENT, cb);
  return () => window.removeEventListener(EVENEMENT, cb);
}
