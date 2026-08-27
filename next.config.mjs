/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mskschoolmaroc.com',
      },
      {
        protocol: 'https',
        hostname: 'embed-ssl.wistia.com',
      },
      {
        protocol: 'https',
        hostname: 'fast.wistia.com',
      },
    ],
  },
  async redirects() {
    return [
      // `/notre-centre` est un segment de regroupement : les quatre pages vivent
      // dessous, aucune n'occupe le préfixe lui-même, qui répondait donc 404 à
      // qui tronque l'URL. Temporaire (307) et non permanent : un 308 se grave
      // dans le cache des navigateurs, et rien ne dit qu'une vraie page « Notre
      // centre » ne viendra pas. Personne ne lie ce préfixe et le sitemap
      // l'ignore — le gain SEO d'un permanent serait nul, son coût réel.
      {
        source: '/notre-centre',
        destination: '/notre-centre/enfants-accueillis',
        permanent: false,
      },
      // Les quatre suivantes sont PERMANENTES, à l'inverse : ces pages ont été
      // renommées pour que leur URL dise ce que le menu annonce, les anciens
      // chemins ne serviront plus jamais, et c'est un 308 qui transmet aux
      // nouvelles adresses le référencement acquis par les anciennes. C'est
      // aussi ce qui garde vivants les liens déjà partagés — la seule raison
      // pour laquelle ces chemins avaient été conservés. NE PAS SUPPRIMER.
      {
        source: '/notre-centre/troubles-accompagnes',
        destination: '/notre-centre/enfants-accueillis',
        permanent: true,
      },
      {
        source: '/notre-centre/la-methode',
        destination: '/notre-centre/notre-methode',
        permanent: true,
      },
      {
        source: '/notre-centre/la-fondatrice',
        destination: '/notre-centre/notre-fondatrice',
        permanent: true,
      },
      {
        source: '/notre-centre/galerie',
        destination: '/notre-centre/nos-espaces',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
