/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
    },
  },
  plugins: [],
};
