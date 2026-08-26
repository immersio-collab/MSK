"use client";


import { CloudDrift } from "@/components/motion/CloudDrift";
import { PageHero } from "@/components/common/PageHero";

/**
 * Hero des actualités. La BANDE est en sun-400 : c'est la seule page jaune du
 * site, introduite pour casser l'alternance bleu/rose des six héros. La
 * La page ENTIÈRE suit ce jaune : liste sur sun-50, pastille et liens en
 * sun-800. Seuls restent coral le mot accentué du titre (règle du site : les
 * mots accentués sont coral partout) et le sticker « À la une », accent de
 * contenu qui doit trancher sur le champ jaune.
 *
 * Les nuages portent une ombre portée : du blanc sur sun-400 ne donne que
 * 1,45:1, ils seraient invisibles sans elle.
 */
export const ActualitesHeroSection = () => {
  return (
    <PageHero
      band="bg-msk-sun-300"
      card="bg-white"
      title={
        <>
          Ressources, conseils et{" "}
          <span className="text-msk-coral-600">vie du centre</span>
        </>
      }
      titleClassName="text-msk-night-900"
      pill="Actualités · Blog"
      pillClassName="bg-msk-sun-100 text-msk-sun-800"
      subtitle={
        <>
          Découvrez nos derniers articles éducatifs, les événements à venir, et
          nos conseils pour accompagner au mieux le développement de votre enfant.
        </>
      }
      subtitleClassName="text-msk-night-800"
      anchor={{
        href: "#articles",
        label: "Aller aux articles",
        className:
          "border-msk-night-900/20 text-msk-night-700 hover:bg-msk-night-900 hover:text-white",
      }}
      decor={
        <>
          {/* Le Sunny qui vivait ici est retiré (retour client : collé à la
              navbar, et 4e occurrence du même soleil sur le site — il reste
              sur l'album galerie et la philosophie). */}
          <CloudDrift
            motion="float"
            shape="a"
            speed={52}
            phase={0.25}
            className="absolute left-0 top-[52%] w-40 text-white drop-shadow-md md:w-56"
          />
          <CloudDrift
            motion="float"
            shape="b"
            speed={40}
            phase={0.7}
            className="absolute left-0 top-[26%] w-48 text-white drop-shadow-md md:w-72"
          />
          <CloudDrift
            motion="float"
            shape="a"
            speed={64}
            phase={0.8}
            className="absolute left-0 top-[8%] hidden w-32 text-white drop-shadow-md lg:block"
          />
        </>
      }
      media={
        // Contrat des héros : le fichier est recadré sur son dessin (il n'était
        // peint qu'à 15% — l'avion minuscule du retour client). h-full + w-auto :
        // c'est la boîte commune qui fixe la taille.
        <img
          src="/Loading 40 _ Paperplane.svg"
          alt=""
          aria-hidden
          className="pointer-events-none h-full w-auto -rotate-2 object-contain"
        />
      }
    />
  );
};
