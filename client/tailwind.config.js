/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: "#792ED6",
        lightPurple: "#B090D9",
        whitePurple: "#E8D6FF",
        smoothWhite: "#F1F1F1",
        smoothGrey: "#999999"
      },
    },
  },
  plugins: [],
}

