/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/index.html',
    './src/views/Landing/Landing.jsx',
    './src/components/Nav/Nav.jsx',
  ],
  theme: {
    colors: {
      'black': '#030712',
      'white': '#f9fafb',
      'green-neon': '#a3e635',
      'gray-claro': '#d1d5db',
      'gray-dark': '#1f2937',
      'gray': '#595959',
      'gray-light': '#f3f4f6',
    },
    extend: {},
  plugins: [],
}
}

