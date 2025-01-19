/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a3b18a",
          DEFAULT: "#588157",
          dark: "#3a5a40",
        },
        secondary: {
          light: "#e9c588",
          DEFAULT: "#da9141",
          dark: "#a85b26",
        },
      },
    },
  },
  plugins: [],
};
