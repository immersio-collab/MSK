import type { Metadata, Viewport } from "next";
import { DM_Sans, Fredoka, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
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

// Rounded display face for the oversized all-caps titles on /notre-centre/la-methode.
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
    description: SCHOOL_INFO.coreQuote,
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
    <html lang="fr" className={cn(dmSans.variable, inter.variable, jakarta.variable, fredoka.variable, "font-sans")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-msk-cream-50 text-[#223242] antialiased selection:bg-msk-coral-100 selection:text-msk-coral-900">
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
