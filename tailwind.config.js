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
        background: "#07080C",
        surface: {
          DEFAULT: "#0D0F17",
          card: "#0D0F17",
          subtle: "#0B0D13",
          elevated: "#131622",
          border: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(255, 255, 255, 0.16)",
        },
        gold: {
          400: "#E5C158",
          500: "#D4AF37", // Primary surgical accent
          600: "#C5A028",
          700: "#9E7E1C",
        },
        foreground: {
          DEFAULT: "#EDEDED",
          secondary: "#94A3B8",
          muted: "#64748B",
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
        "card-inner": "inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.4)",
        "card-elevated": "inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 4px 20px -2px rgba(0, 0, 0, 0.6)",
        "gold-cta": "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
