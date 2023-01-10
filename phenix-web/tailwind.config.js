/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/*.tsx',
    './src/**/**/*.tsx',
    './src/**/**/**/*.tsx',
    './src/**/**/*.css'
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
