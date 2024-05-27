/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#111827',
        'dark-text': '#f9fafb',
      },
      imageRendering: {
        'pixelated': 'pixelated',
        'crisp-edges': 'crisp-edges',
      },

    },
  },
  plugins: [],
}

