import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Cap radius at 2px; only `full` remains for true circles (play icons, etc.)
    borderRadius: {
      none: "0px",
      sm: "2px",
      DEFAULT: "2px",
      md: "2px",
      lg: "2px",
      xl: "2px",
      "2xl": "2px",
      "3xl": "2px",
      full: "9999px",
    },
    // Elevation = color step + hairline only — no blur shadows
    boxShadow: {
      none: "none",
    },
    extend: {
      colors: {
        carbon: "#0D0D0D",
        slate: "#1A1A1A",
        sand: "#D4C3B3",
        // Canonical token; `offwhite` kept as alias for existing class usage
        "off-white": "#F5F5F5",
        offwhite: "#F5F5F5",
      },
      fontFamily: {
        // Self-hosted / next/font CSS variables — see app/layout.tsx
        headline: [
          "var(--font-fraunces)",
          "Fraunces",
          "Canela",
          "Times New Instrument",
          "Georgia",
          "serif",
        ],
        body: ["var(--font-general-sans)", "General Sans", "sans-serif"],
        mono: [
          "var(--font-ibm-plex-mono)",
          "IBM Plex Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      maxWidth: {
        measure: "42ch",
        site: "1440px",
      },
      spacing: {
        section: "160px",
        "section-mobile": "96px",
        gutter: "80px",
        "gutter-mobile": "24px",
        nav: "88px",
        "nav-mobile": "64px",
      },
    },
  },
};

export default config;
