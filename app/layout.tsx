import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SCHOOL_INFO } from "@/lib/data/site-content";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#DF5B85",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mskmontessori.ma"),
  title: {
    default: "MSK Montessori School | École Inclusive & Réadaptation à Casablanca",
    template: "%s | MSK Montessori School Casablanca",
  },
  description:
    "Centre scolaire inclusif à Casablanca (Maroc). Pédagogie Montessori, réadaptation comportementale, Neuro-Gym et insertion scolaire pour enfants de 2 ans à l'âge adulte.",
  keywords: [
    "école inclusive Casablanca",
    "Montessori éducation inclusive",
    "insertion scolaire enfant Maroc",
    "TDA TDAH accompagnement Casablanca",
    "neuro gym Casablanca",
  ],
  openGraph: {
    title: "MSK Montessori School | École Inclusive à Casablanca",
    description:
      "MSK ne cherche pas à faire entrer tous les enfants dans le même cadre : c'est le cadre qui s'adapte à l'enfant.",
    url: "https://mskmontessori.ma",
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
    url: "https://mskmontessori.ma",
    telephone: SCHOOL_INFO.phone,
    email: SCHOOL_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Quartier Oasis / Val Fleuri",
      addressLocality: "Casablanca",
      addressRegion: "Grand Casablanca",
      addressCountry: "MA",
    },
    slogan: SCHOOL_INFO.coreQuote,
  };

  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#223242] antialiased selection:bg-msk-coral-100 selection:text-msk-coral-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
