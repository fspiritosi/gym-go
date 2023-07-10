/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/index.html',
    './src/views/Landing/Landing.jsx',
    './src/components/Nav/Nav.jsx',
    './src/components/Footer/Footer.jsx',
    './src/components/Login/LoginButton.js',
    './src/components/Login/LogoutButton.js',
    './src/components/Login/Profile.js',
    './src/views/Landing/Landing.jsx',
    './src/components/Activities/Activities.jsx',
    './src/components/FilterandSort/FilterandSort.jsx',
    './src/components/SearchBar/SearchBar.jsx',
  ],
  theme: {
    colors: {
      'black': '#030712',
      'white': '#f9fafb',
      'green-neon': '#a3e635',
      'green.claro': '#c4ee72',
      'gray-claro': '#d1d5db',
      'gray-dark': '#1f2937',
      'gray': '#595959',
      'gray-light': '#f3f4f6',
    },
    extend: {},
  plugins: [],
}
}

