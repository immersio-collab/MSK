import { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/data/actualites";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const routes = [
    "",
    "/notre-centre/notre-methode",
    "/notre-centre/enfants-accueillis",
    "/notre-centre/notre-fondatrice",
    "/notre-centre/nos-espaces",
    "/programmes",
    "/actualites",
    "/contact",
  ];

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/notre-centre") || route.startsWith("/programmes") ? 0.8 : 0.6,
  }));

  // Un article publié = une URL de plus, automatiquement.
  const articles: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/actualites/${article.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...pages, ...articles];
}
