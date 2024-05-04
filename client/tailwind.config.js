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
      fontFamily: {
        'irishGrover': ['Irish Grover', 'serif'],
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
        '36': 'repeat(36, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-34': 'span 34 / span 34',
        'span-29': 'span 29 / span 29',
        'span-24': 'span 24 / span 24',
      },
      gridTemplateRows: {
        '24': 'repeat(24, minmax(0, 1fr))',
        '36': 'repeat(36, minmax(0, 1fr))',
      },
      gridRow: {
        'span-34': 'span 34 / span 34',
        'span-29': 'span 29 / span 29',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
        'span-25': 'span 25 / span 25',
        'span-26': 'span 26 / span 26',
        'span-27': 'span 27 / span 27',
        'span-28': 'span 28 / span 28',
        'span-30': 'span 30 / span 30',
      },
    },
  },
  plugins: [],
}

