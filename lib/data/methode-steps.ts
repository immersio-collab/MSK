/**
 * Les six étapes de la méthode MSK — l'identité canonique (numéro + verbe).
 *
 * C'est la seule source : l'accueil (AccueilSteps) et /la-methode
 * (MethodeStepsSection) composaient chacun leur propre tableau complet, et la
 * même liste de verbes vivait aussi en dur dans des phrases. Les titres,
 * descriptions et présentations restent propres à chaque surface — seule
 * l'identité est partagée. La phrase canonique correspondante est
 * SCHOOL_INFO.baseline.
 */
export const METHODE_STEPS = [
  { number: "01", verb: "Observer" },
  { number: "02", verb: "Comprendre" },
  { number: "03", verb: "Adapter" },
  { number: "04", verb: "Rééduquer" },
  { number: "05", verb: "Accompagner" },
  { number: "06", verb: "Insérer" },
] as const;
