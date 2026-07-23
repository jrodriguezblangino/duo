import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#0D0D0D", // Primary — deep black
        slate: "#1A1A1A", // Secondary — soft charcoal
        sand: "#D4C3B3", // Accent — warm sand
        offwhite: "#F5F5F5", // Typography — soft white
      },
      fontFamily: {
        // Fonts are self-hosted via next/font (app/layout.tsx) and exposed
        // as CSS variables; the literal family names remain as fallbacks.
        headline: ["var(--font-playfair)", "Playfair Display", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
};

export default config;
