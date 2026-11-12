/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0B0F19",
          50: "#1E293D",
          100: "#162032",
          200: "#111827",
          300: "#0F172A",
          400: "#0D1322",
          500: "#0B0F19",
        },
        cardSurface: "#162032",
        gold: {
          light: "#38BDF8",
          DEFAULT: "#0077C8", // Remapped to Xero Institutional Azure
          hover: "#0284C7",
          dark: "#0369A1",
        },
        xero: {
          light: "#38BDF8",
          DEFAULT: "#0077C8",
          hover: "#0284C7",
          dark: "#00558F",
        },
        primary: {
          DEFAULT: "#0077C8",
          foreground: "#FFFFFF",
          hover: "#0284C7",
        },
        secondary: {
          DEFAULT: "#111827",
          foreground: "#F8FAFC",
          hover: "#162032",
        },
        accent: {
          DEFAULT: "#10B981", // Emerald 500
          light: "#D1FAE5",
          foreground: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#111827",
          muted: "#0F172A",
          card: "#162032",
          border: "#1F293D",
        },
        warning: {
          DEFAULT: "#DCAE53",
          light: "#FEF3C7",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
        },
        emerald: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        gold: "0 0 20px -3px rgba(220, 174, 83, 0.25)",
        "gold-glow": "0 0 35px -5px rgba(220, 174, 83, 0.35)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 16px -2px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
