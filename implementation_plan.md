# Programmes — Cohérence visuelle avec La Méthode

## Objectif

La page `/notre-centre/la-methode` a une identité visuelle forte et cohérente :
bande de couleur inclinée en hero, nuages SVG animés (GSAP), bannière cinétique
en marquee, cartes décalées en éventail sur scroll, sections à fond alternant
`msk-cream-*` / `msk-night-950`, `FadeUp` (Framer Motion) pour les entrées de
contenu, et boutons circulaires pour les CTA secondaires.

La page `/programmes` utilise actuellement un style différent (blobs flous CSS,
`#FAF8F5` codé en dur, framer-motion inline sans les patterns établis). L'objectif
est de lui donner **la même grammaire visuelle** sans copier le contenu.

---

## Ce que la methode apporte comme patterns réutilisables

| Pattern | Composant source | Réutilisable tel quel? |
|---|---|---|
| Bande de couleur inclinée (`clip-path`) | `MethodeHeroSection` | Oui (structure, pas contenu) |
| Nuages SVG flottants (GSAP `float`) | `MethodeCloud` | **Oui, directement** |
| Bannière marquee kinétique | `MethodeKineticBanner` | Oui (texte différent) |
| `FadeUp` Framer Motion | `FadeUp` (motion/) | **Oui, directement** |
| Section sombre `msk-night-950` | `MethodeKineticBanner` | Pattern à reproduire |
| Section photo pleine-largeur inclinée | `MethodeMediaBand` | Oui (image différente) |
| Déclaration oversized (texte `msk-coral-600`) | `MethodeStatementSection` | Pattern à reproduire |
| Carte ronde CTA secondaire | `MethodeStatementSection` | Pattern à reproduire |
| Fond de section en succession `cream-100 / cream-200 / night-950` | Toutes sections | Pattern à reproduire |
| Nuages décoratifs dans section sombre | `MethodeNextStopSection` | `MethodeCloud` directement |

---

## Analyse de l'état actuel de `/programmes`

### Ce qui fonctionne bien et à garder
- **`ProgrammesSelectorSection`** : les onglets avec `motion.div layoutId` sont bien faits, à garder mais à re-skinner
- **`ProgrammesTableSection`** : le tableau comparatif est fonctionnel et pertinent

### Ce qui est à remplacer/refactoriser
- **Hero** : blobs flous génériques remplacés par la bande inclinée + nuages flottants
- **Couleurs hardcodées** : `#FAF8F5` → `bg-msk-cream-50` ou `bg-msk-cream-100`
- **Marquee manquant** : aucune transition kinétique entre les sections
- **Pas de `FadeUp`** dans le Selector ni le Table → à ajouter
- **Pas de section sombre** (`msk-night-950`) → ajouter une section intermédiaire
- **Pas de photo pleine-largeur inclinée** → ajouter entre le selector et la table
- **Pas de section "Prochaine étape"** → ajouter avant le CTA final

---

## Plan de mise en œuvre

### Section 1 — Hero (`ProgrammesHeroSection.tsx`) — **MODIFIER**

**Remplacer** le hero basé sur blobs flous par le pattern de `MethodeHeroSection` :

- Fond `bg-msk-sun-400` en haut avec `clip-path: polygon(0 0, 100% 0, 100% 72%, 0 100%)`
- Sur fond `bg-msk-cream-100` en dessous
- **3 `MethodeCloud`** flottants (motion `float`, même principe que la méthode mais teintes différentes : `text-white` et `text-msk-sun-200`)
- Carte-titre centrée avec fond `bg-msk-blue-800`, arrondie (`rounded-[1.75rem]`), ombre
- `h1` en `font-display uppercase` couleur `text-msk-sun-300`
- Eyebrow pill `Programmes & Classes` en blanc sur fond transparent/border
- Chevron `href="#programmes"` comme sur la méthode
- `FadeUp` wrappant la carte
- **Supprimer** `animate-blob`, `#FAF8F5` hardcodé, les trois `div` de blobs

> Les clouds `MethodeCloud` sont importables directement depuis `@/components/methode/MethodeCloud`.

---

### Section 2 — Bannière kinétique — **NOUVEAU COMPOSANT**
#### [NEW] `ProgrammesKineticBanner.tsx`

**Calqué sur** `MethodeKineticBanner` (CSS-only marquee, pas de GSAP).

- Fond `bg-msk-night-950`, `py-14 md:py-20`
- Texte de la bannière : les 4 tranches d'âge et noms de programmes —
  `"Maternelle · Primaire · Neuro-Gym · Insertion"` ou la phrase-clé du centre
- Alternance des couleurs : `text-msk-coral-400`, `text-msk-sun-400`, `text-msk-blue-400`
- Séparateurs : points ronds `bg-msk-cream-300`
- Animation CSS `animate-marquee` (déjà défini dans `globals.css`)

---

### Section 3 — Sélecteur de programme (`ProgrammesSelectorSection.tsx`) — **MODIFIER**

Le contenu et la logique de tabs sont bons. Re-skinner pour aligner sur la méthode :

- Fond de section : `bg-msk-cream-200` (au lieu de `bg-white`)
- Onglets actifs : garder `motion.div layoutId` mais s'assurer que la couleur
  est un token brand (déjà : `bg-msk-coral-500` / `bg-msk-sun-500` ✓)
- Onglets inactifs : `bg-msk-cream-100` au lieu de `#FAF8F5`
- Conteneur de contenu : remplacer `bg-[#FAF8F5]` par `bg-msk-cream-50`
- Envelopper la section dans un `FadeUp` ou envelopper le titre en `FadeUp`
- Titres section : ajouter un eyebrow `font-display text-xs uppercase tracking-[0.2em] text-msk-coral-600`

---

### Section 4 — Bande photo pleine-largeur — **NOUVEAU COMPOSANT**
#### [NEW] `ProgrammesMediaBand.tsx`

**Calqué sur** `MethodeMediaBand` :

- `clip-path: polygon(0 6%, 100% 0, 100% 100%, 0 100%)` (coupe en haut)
- Image `src="/neuro-gym.jpg"` (déjà en `/public`, correspond bien aux programmes)
- `alt="Séance en classe"`, `fill`, `object-cover`, `sizes="100vw"`
- Fond de fallback `bg-msk-cream-300`
- Hauteur `min-h-[26rem] md:min-h-[34rem]`

---

### Section 5 — Tableau comparatif (`ProgrammesTableSection.tsx`) — **MODIFIER (léger)**

Le tableau est bien structuré. Aligner uniquement le fond et les titres :

- Fond de section : `bg-msk-cream-100` (au lieu de `bg-white`)
- `h2` : ajouter `font-display` et augmenter à `text-4xl md:text-5xl`
- Ajouter un `FadeUp` autour du bloc titre
- Remplacer `hover:bg-gray-50/50` par `hover:bg-msk-cream-200/50`
- Supprimer le `<style dangerouslySetInnerHTML>` inline — utiliser l'utilitaire
  `hide-scrollbar` déjà défini dans `globals.css`

---

### Section 6 — Déclaration / Valeurs — **NOUVEAU COMPOSANT**
#### [NEW] `ProgrammesStatementSection.tsx`

**Calqué sur** `MethodeStatementSection` :

- Fond `bg-msk-cream-200`, `py-24 md:py-32`
- Grille `lg:grid-cols-[1.15fr_1fr]`
- Gauche : `h2` oversized en `font-display uppercase text-msk-blue-800` —
  ex. : *"Un programme conçu autour de chaque enfant, pas l'inverse."*
- Droite :
  - Paragraphe de corps (`text-msk-night-800`)
  - Bouton rond 144×144px `bg-msk-coral-600` lien vers `/admissions`
    (texte : *"Demander une inscription"*), avec `hover:scale-105`
  - Photo `Image src="/materrnelle.jpg"` arrondie `rounded-3xl overflow-hidden`
- `FadeUp` sur chaque bloc, staggered `delay={0.1}`

---

### Section 7 — Prochaine étape — **NOUVEAU COMPOSANT**
#### [NEW] `ProgrammesNextStopSection.tsx`

**Calqué sur** `MethodeNextStopSection` :

- Fond `bg-msk-coral-700`, `py-24 md:py-32`, texte centré
- 2 `MethodeCloud` décoratifs : `text-msk-coral-900`, positions mirroir à la methode
- Eyebrow `text-msk-sun-300 uppercase tracking-[0.2em]` : *"Prochaine étape"*
- `h2` `font-display uppercase text-white` : *"Admissions"*
- Paragraphe `text-msk-coral-100`
- Bouton rounded-full `bg-white text-msk-coral-800` lien vers `/admissions`
- `FadeUp` wrappant tout
- **Pas de** `MethodeAssetSlot` — pas d'artwork promis ici

---

### Assemblage — `app/programmes/page.tsx` — **MODIFIER**

Ordre des sections après le plan :

```
ProgrammesHeroSection        ← hero incliné + clouds
ProgrammesKineticBanner      ← marquee dark NEW
ProgrammesSelectorSection    ← onglets re-skinned
ProgrammesMediaBand          ← photo pleine-largeur inclinée NEW
ProgrammesStatementSection   ← déclaration oversized NEW
ProgrammesTableSection       ← tableau re-skinned
ProgrammesNextStopSection    ← hand-off vers admissions NEW
CtaFinalSection              ← déjà en place, inchangé
```

---

## Composants partagés utilisés (aucune modification)

| Composant | Import | Utilisé dans |
|---|---|---|
| `MethodeCloud` | `@/components/methode/MethodeCloud` | Hero, NextStop |
| `FadeUp` | `@/components/motion/FadeUp` | Toutes les nouvelles sections |

> **Règle** : `MethodeCloud` et `FadeUp` sont déjà partagés et utilisés par
> d'autres pages — les importer directement, ne pas les copier.

---

## Ce qui N'est PAS repris de la methode

| Pattern methode | Raison de ne pas l'appliquer aux programmes |
|---|---|
| Deck de cartes en éventail scroll-pinned (GSAP) | Le contenu des programmes est déjà bien présenté dans les onglets ; un deuxième deck scroll-pinné sur la même visite créerait de la confusion |
| `MethodeLottie` | Aucun fichier Lottie n'existe pour les programmes dans `/public` |
| `MethodeAssetSlot` | Pas d'artwork identifié comme manquant pour cette page |

---

## Fichiers à créer / modifier

### Nouveaux fichiers
- `components/programmes/ProgrammesKineticBanner.tsx`
- `components/programmes/ProgrammesMediaBand.tsx`
- `components/programmes/ProgrammesStatementSection.tsx`
- `components/programmes/ProgrammesNextStopSection.tsx`

### Fichiers modifiés
- `components/programmes/ProgrammesHeroSection.tsx` — refonte complète du hero
- `components/programmes/ProgrammesSelectorSection.tsx` — re-skin couleurs + FadeUp
- `components/programmes/ProgrammesTableSection.tsx` — fond + utilitaires
- `app/programmes/page.tsx` — import des nouvelles sections

### Fichiers inchangés
- `components/methode/MethodeCloud.tsx` ✓ (importé, pas modifié)
- `components/motion/FadeUp.tsx` ✓ (importé, pas modifié)
- `app/globals.css` ✓ (déjà tout ce qu'il faut)
- `lib/data/site-content.ts` ✓

---

## Vérification

- `npm run build` doit passer sans erreur
- `npx tsc --noEmit --incremental false` doit être propre
- Chaque nouvelle classe Tailwind doit exister dans la palette fermée (`msk-*` définie dans `globals.css`)
- Aucun `#FAF8F5` ni couleur hardcodée dans les fichiers modifiés
- Aucun composant ajouté dans `components/ui/` ou `components/animate-ui/`
- Les `MethodeCloud` dans le hero ne doivent pas utiliser `gsap.fromTo` avec `immediateRender` true — vérifier que le pattern `gsap.from(..., { immediateRender: false })` est respecté (il l'est déjà dans `MethodeCloud.tsx`)
