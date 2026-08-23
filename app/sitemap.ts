import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mskmontessori.ma";

  const routes = [
    "",
    "/notre-centre",
    "/notre-centre/la-methode",
    "/notre-centre/troubles-accompagnes",
    "/notre-centre/la-fondatrice",
    "/notre-centre/galerie",
    "/programmes",
    "/actualites",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/notre-centre") || route.startsWith("/programmes") ? 0.8 : 0.6,
  }));
}
