import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mskmontessori.ma";

  const routes = [
    "",
    "/notre-approche",
    "/notre-approche/la-methode",
    "/notre-approche/montessori-education-inclusive",
    "/notre-approche/reeducation-neuro-gym",
    "/notre-approche/troubles-accompagnes",
    "/programmes",
    "/programmes/petite-enfance",
    "/programmes/primaire",
    "/programmes/adolescents",
    "/programmes/adultes",
    "/vie-scolaire",
    "/admissions",
    "/actualites",
    "/actualites/comprendre-le-tdah-sans-stigmatiser-a-l-ecole",
    "/actualites/pourquoi-la-neuro-gym-revolutionne-les-apprentissages",
    "/actualites/admissions-sans-code-massar-ce-que-les-parents-doivent-savoir",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/notre-approche") || route.startsWith("/programmes") ? 0.8 : 0.6,
  }));
}
