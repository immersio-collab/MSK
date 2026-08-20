import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Article : ${params.slug} | MSK Casablanca`,
    description: "Article pédagogique de MSK Montessori School Casablanca.",
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const sections = [
    { id: "hero", title: `Article : ${params.slug} — En-tête` },
    { id: "contenu", title: "Corps de l'Article" },
    { id: "auteur", title: "À Propos de l'Auteur & Équipe MSK" },
    { id: "navigation", title: "Articles Similaires & Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-28 pb-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-msk-night-700">
            Article
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-msk-night-900">
            {params.slug.replace(/-/g, " ")}
          </h1>
        </div>

        {sections.map((section, idx) => (
          <div
            key={section.id}
            className="rounded-2xl border-2 border-dashed border-msk-cream-300/80 p-12 text-center bg-white"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-msk-night-700 block mb-2">
              Section {idx + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-msk-night-900">
              {section.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
