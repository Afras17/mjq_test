import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ivory: "#FAFAF8",
        gold: {
          DEFAULT: "#C9A84C",
          dark: "#B8973E",
          light: "#D4BA6A",
        },
        deep: "#1A1A1A",
        cream: "#F5F3EF",
        border: "#E8E4DC",
        text: "#2C2C2C",
        "dark-bg": "#0D0D0D",
        "dark-card": "#1A1A1A",
        "dark-border": "#2A2A2A",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(3rem, 5vw, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "section": ["clamp(2rem, 3vw, 3rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        "card": "0 2px 20px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
        "luxury": "0 4px 40px rgba(0, 0, 0, 0.08)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "section": "5rem",
      },
      borderRadius: {
        "luxury": "6px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "gold-line": {
          "0%": { width: "0%" },
          "100%": { width: "80px" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-out": "fade-out 0.3s ease-in forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "slide-down": "slide-down 0.3s ease-out forwards",
        "shimmer": "shimmer 2s infinite linear",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "scale-out": "scale-out 0.3s ease-in forwards",
        "gold-line": "gold-line 1s ease-out 0.5s forwards",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
