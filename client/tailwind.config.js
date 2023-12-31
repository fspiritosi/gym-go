/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/index.html',
    './src/views/Landing/Landing.jsx',
    './src/views/Landing/Landing.jsx',
    './src/views/Landing/Profesores.jsx',
    './src/components/Nav/Nav.jsx',
    './src/components/Footer/Footer.jsx',
    './src/components/Login/LoginButton.js',
    './src/components/Login/LogoutButton.js',
    './src/components/Login/Profile.js',    
    './src/components/Activities/Activities.jsx',
    './src/components/FilterandSort/FilterandSort.jsx',
    './src/components/SearchBar/SearchBar.jsx',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/CardActivities/CardActivities.jsx',
    './src/components/FilterandSort/GoalFilterDropdown.jsx',
    './src/components/FilterandSort/Siderbar.jsx',
    './src/components/SearchBar/SearchBar.jsx',    
    './src/components/CardActivities/CardActivities.jsx',
    './src/components/CardProfesores/CardProfesores.jsx',
    './src/components/CardProfesores/CardPaqueteClase.jsx',
    './src/components/CardCompras/CardCompras.jsx',
    './src/components/CardReservas/CardReservas.jsx',
    './src/components/UserProfile/UserProfile.jsx',
    './src/**/*.{js,jsx,ts,tsx}',

  ],
  theme: {
    colors: {
      'black': '#0a0a0a',
      'white': '#f9fafb',
      'green-neon': '#a3e635',
      'green.claro': '#c4ee72',
      'gray-claro': '#d1d5db',
      'gray-dark': '#292524',
      'gray': '#595959',
      'gray-light': '#f3f4f6',
      'lighter-white':'rgba(255,255,255,0.17)',
      'yellow': '#facc15',
      'lima': '#ecfccb',
      'red': '#dc2626',
      'green':'#65a30d'
        
    },
    },
  extend: {},  
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    plugins: [],
};


