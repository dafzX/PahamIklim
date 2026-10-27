/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#123D2B',
        leaf: '#21834A',
        lime: '#C5F36A',
        ink: '#17211B',
        muted: '#65736A',
        paper: '#F8FAF8',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
