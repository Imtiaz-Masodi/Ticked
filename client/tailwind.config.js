/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.sky[300],
          DEFAULT: colors.sky[500],
          dark: colors.sky[700],
          darker: colors.sky[900],
        },
        secondary: {
          light: colors.emerald[300],
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[700],
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "toast-progress": "toast-progress linear forwards",
        "toast-enter": "toast-enter 0.3s ease-out",
        "toast-exit": "toast-exit 0.3s ease-in",
      },
      keyframes: {
        "toast-progress": {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        "toast-enter": {
          "0%": {
            opacity: "0",
            transform: "translateX(100%) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) scale(1)",
          },
        },
        "toast-exit": {
          "0%": {
            opacity: "1",
            transform: "translateX(0) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(100%) scale(0.95)",
          },
        },
      },
    },
  },
  plugins: [],
};
