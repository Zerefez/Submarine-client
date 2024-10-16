/** @type {import('tailwindcss').Config} */

import tailwindsScrollbar from 'tailwind-scrollbar';

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:['Inter','sans-serif']
    },
  },
  plugins: [tailwindsScrollbar],
}