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
        navy: '#0C365A',
        action: { DEFAULT: '#325BAF', secondary: '#EDF3FF' },
        shade: '#00000014',
        disabled: '#AAAAAA',
        muted: '#F5F9FF',
      },
      boxShadow: {
        tabShadow: '0 1px 12px #00000014',
        smallShadow: '0 2px 8px #00000001A',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};
