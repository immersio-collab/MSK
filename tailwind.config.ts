import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        msk: {
          // #DF5B85 - Rose Corail Joyeux (Chaleur, Joie, Énergie douce)
          coral: {
            50: "#FDF4F7",
            100: "#FBE8EE",
            200: "#F8D1DD",
            300: "#F1A4BC",
            400: "#E8789C",
            500: "#DF5B85", // Joyous Coral Rose
            600: "#C73D68",
            700: "#A72B51",
            800: "#8B2443",
            900: "#5C172C",
          },
          // #F5B738 - Jaune Soleil Lumineux & Chaleureux (Éveil, Curiosité, Joie d'apprendre)
          sun: {
            50: "#FEF9EE",
            100: "#FDF2D7",
            200: "#FCE4AA",
            300: "#F9D277",
            400: "#F7C250",
            500: "#F5B738", // Luminous Child-Friendly Sunshine
            600: "#D9991E",
            700: "#B07514",
            800: "#8F5C12",
            900: "#5A380A",
          },
          // #6AAEE0 - Bleu Ciel Sérénité (Confiance, Apaisement, Douceur)
          blue: {
            50: "#F1F7FC",
            100: "#E1EFF9",
            200: "#C4E1F4",
            300: "#9BCBEC",
            400: "#7CBCE5",
            500: "#6AAEE0", // Serene Sky Blue
            600: "#4A92C9",
            700: "#3574A5",
            800: "#2A5C84",
            900: "#18283E", // Deep Midnight Blue for text & dark footer
          },
          // Fond Crème Doux
          cream: {
            50: "#FDFBF7",
            100: "#F9F6EE",
            200: "#F1EBE0",
            300: "#E6DDCF",
          },
          // Bleu Nuit Magique & Chaleureux pour le Footer et le Contraste
          night: {
            700: "#263952",
            800: "#1D2D42",
            900: "#152233", // Deep, warm kid-friendly night
            950: "#0E1724",
          }
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
