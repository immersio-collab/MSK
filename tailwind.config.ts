import type { Config } from "tailwindcss";

/**
 * Wraps a CSS-variable colour so Tailwind opacity modifiers (`bg-primary/90`,
 * `ring-ring/50`, …) actually work. These variables hold complete `oklch()`
 * colours, so Tailwind's `<alpha-value>` placeholder cannot be substituted into
 * a channel list the usual way; `color-mix` applies the alpha instead. Without
 * this, every `/<opacity>` modifier on a semantic colour is silently dropped.
 */
const alpha = (value: string) =>
  `color-mix(in oklch, ${value} calc(<alpha-value> * 100%), transparent)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: alpha("var(--border)"),
        input: alpha("var(--input)"),
        ring: alpha("var(--ring)"),
        background: alpha("var(--background)"),
        foreground: alpha("var(--foreground)"),
        primary: {
          DEFAULT: alpha("var(--primary)"),
          foreground: alpha("var(--primary-foreground)"),
        },
        secondary: {
          DEFAULT: alpha("var(--secondary)"),
          foreground: alpha("var(--secondary-foreground)"),
        },
        destructive: {
          DEFAULT: alpha("var(--destructive)"),
          foreground: alpha("var(--destructive-foreground)"),
        },
        muted: {
          DEFAULT: alpha("var(--muted)"),
          foreground: alpha("var(--muted-foreground)"),
        },
        accent: {
          DEFAULT: alpha("var(--accent)"),
          foreground: alpha("var(--accent-foreground)"),
        },
        popover: {
          DEFAULT: alpha("var(--popover)"),
          foreground: alpha("var(--popover-foreground)"),
        },
        card: {
          DEFAULT: alpha("var(--card)"),
          foreground: alpha("var(--card-foreground)"),
        },
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
        sans: ["var(--font-dm-sans)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-jakarta)", "sans-serif"],
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
      },
      animation: {
        blob: "blob 7s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
