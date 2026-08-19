import React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href: string }[];
  highlight?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  breadcrumbs,
  highlight,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-msk-forest-50/70 via-msk-sand-50/50 to-transparent pt-32 pb-16 md:pt-40 md:pb-24 border-b border-msk-forest-100/60">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-msk-sage-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-msk-amber-100/40 blur-2xl pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6 max-w-5xl text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center justify-center gap-2 text-xs md:text-sm text-msk-slate-500" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-msk-forest-700 transition-colors">
              Accueil
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3 w-3 text-msk-slate-400" />
                {idx === breadcrumbs.length - 1 ? (
                  <span className="font-semibold text-msk-forest-800" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-msk-forest-700 transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-msk-forest-200 px-4 py-1.5 text-xs font-semibold text-msk-forest-700 shadow-sm backdrop-blur-sm mb-4">
            <Sparkles className="h-3.5 w-3.5 text-msk-terracotta-500" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-msk-forest-900 tracking-tight leading-tight mb-6">
          {title} {highlight && <span className="gradient-text-accent">{highlight}</span>}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-3xl text-base md:text-xl text-msk-slate-600 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
