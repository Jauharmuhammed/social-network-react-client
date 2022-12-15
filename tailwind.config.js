/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'boogaloo': 'Boogaloo',
      'apercu': 'Apercu',
      // 'inter': 'Inter',
    },
    extend:{
      colors: {
        'custom-yellow': '#F0DB04',
        'custom-gray': '#6B6B6B',
        // 'gray': 'rgb(36 36 36)',
        'darkgray': '#1E2023',
        'custom-green': '#07D6A0',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
}