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
          950: "#05070B",
          900: "#070A0F",
          850: "#0B0F17",
          800: "#101623",
          700: "#172033",
          600: "#1E2A42",
        },
        gold: {
          50: "#FCF9EE",
          100: "#F7F1D8",
          200: "#F0E3B3",
          300: "#E5C158",
          400: "#DCB842",
          500: "#D4AF37", // Primary Champagne Gold
          600: "#BA9528",
          700: "#94741B",
          800: "#6F5413",
          900: "#49360B",
        },
        champagne: {
          light: "#F7F1D8",
          DEFAULT: "#D4AF37",
          warm: "#E5C158",
          silk: "#F3E5AB",
          dark: "#B89628",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(212, 175, 55, 0.25)",
        "gold-subtle": "0 0 15px -3px rgba(212, 175, 55, 0.12)",
        "gold-pill": "0 4px 20px -2px rgba(212, 175, 55, 0.35)",
        "obsidian-card": "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA820A 100%)",
        "gold-shimmer": "linear-gradient(90deg, #D4AF37 0%, #FFF5D1 50%, #D4AF37 100%)",
        "dark-radial": "radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, rgba(7, 10, 15, 0) 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
