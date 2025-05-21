/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        sidebar: '#0C365A',
        active: {
          DEFAULT: '#01D167', // green used in card text and logos
          secondary: '#23CEFD', // active tab
        },
        black: '#222222',
        action: '#325BAF',
        shade: '#00000014',
      },
      boxShadow: {
        tabShadow: '0 1px 12px #00000014',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
