/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/*.tsx',
    './src/**/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Lexend, sans-serif'
      }
    },
  },
  plugins: [],
}
