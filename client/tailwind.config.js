/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          100: "#fff5f5",
          200: "#ffeaea",
          300: "#ffe0e0",
          400: "#ffd5d5",
          500: "#ffcbcb",
          600: "#cca2a2",
          700: "#997a7a",
          800: "#665151",
          900: "#332929",
          "out": "#ffb5b5"
        },
        primary: {
          50: "#ebf6fc",
          100: "#d9e2e7",
          200: "#b3c6cf",
          300: "#8ca9b8",
          400: "#668da0",
          500: "#407088",
          600: "#335a6d",
          700: "#264352",
          800: "#1a2d36",
          900: "#0d161b",
          "hover": "#9aeafd",
          "out": "#8cD4E5",
        },
      }
    },
  },
  plugins: [],
}