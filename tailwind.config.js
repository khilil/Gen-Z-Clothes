export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#d4c4b1",
        charcoal: "#121212",
        primary: "#000000",
        muted: "#717171",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Bodoni Moda", "serif"],
        impact: ["Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
}
