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
        primary: {
          DEFAULT: "#0F172A", // Slate 900
          foreground: "#FFFFFF",
          hover: "#1E293B",
        },
        secondary: {
          DEFAULT: "#F1F5F9", // Slate 100
          foreground: "#0F172A",
          hover: "#E2E8F0",
        },
        accent: {
          DEFAULT: "#047857", // Emerald 700 (tax compliance / verified)
          light: "#ECFDF5",   // Emerald 50
          foreground: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",   // Slate 50
          card: "#FFFFFF",
          border: "#E2E8F0",  // Slate 200
        },
        warning: {
          DEFAULT: "#B45309", // Amber 700
          light: "#FFFBEB",   // Amber 50
        },
        danger: {
          DEFAULT: "#B91C1C", // Red 700
          light: "#FEF2F2",   // Red 50
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
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
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)",
        modal: "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)",
      },
    },
  },
  plugins: [],
};
