import type { Metadata, Viewport } from "next";
import { DM_Sans, Fredoka, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site-url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/common/WhatsAppFloatingButton";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import PageTransition from "@/components/common/PageTransition";
import { SCHOOL_INFO } from "@/lib/data/site-content";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Headings reference var(--font-jakarta) in globals.css; it must actually be loaded.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// Rounded display face for the oversized all-caps titles on /notre-centre/notre-methode.
// Exposed to Tailwind as `font-display` via --font-display in globals.css.
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#DF5B85",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MSK Montessori School | École Inclusive & Réadaptation à Casablanca",
    template: "%s | MSK Montessori School Casablanca",
  },
  description:
    "Centre scolaire inclusif à Casablanca (Maroc). Pédagogie Montessori, réadaptation comportementale, Neuro-Gym et insertion scolaire pour les enfants de 2 à 11 ans, en maternelle et en primaire.",
  keywords: [
    "école inclusive Casablanca",
    "Montessori éducation inclusive",
    "insertion scolaire enfant Maroc",
    "décrochage scolaire Casablanca",
    "école enfant sans code Massar",
    "neuro gym Casablanca",
  ],
  openGraph: {
    title: "MSK Montessori School | École Inclusive à Casablanca",
    description: SCHOOL_INFO.coreQuote,
    url: SITE_URL,
    siteName: "MSK Montessori School",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SCHOOL_INFO.name,
    description:
      "Centre scolaire inclusif à Casablanca spécialisé dans la pédagogie Montessori, la réadaptation comportementale, la neuro-gym et l'insertion scolaire.",
    url: SITE_URL,
    telephone: SCHOOL_INFO.phone,
    email: SCHOOL_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SCHOOL_INFO.streetAddress,
      postalCode: SCHOOL_INFO.postalCode,
      addressLocality: SCHOOL_INFO.city,
      addressRegion: "Grand Casablanca",
      addressCountry: "MA",
    },
    sameAs: [SCHOOL_INFO.instagram, SCHOOL_INFO.facebook, SCHOOL_INFO.whatsapp],
    slogan: SCHOOL_INFO.coreQuote,
  };

  return (
    <html lang="fr" className={cn(dmSans.variable, inter.variable, jakarta.variable, fredoka.variable, "font-sans")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-msk-cream-50 text-msk-night-800 antialiased selection:bg-msk-coral-100 selection:text-msk-coral-900">
        <ScrollProgressBar />
        <Navbar />
        <main className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
