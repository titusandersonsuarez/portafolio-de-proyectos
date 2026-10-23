/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Geist', 'system-ui', 'sans-serif']
      },
      colors: {
        mint: { 400: '#3ee0b0', 500: '#16c795', 600: '#0ea47a' },
        ink: '#14213d',
        brand: {
          50:  '#eef6ff',
          100: '#d9eaff',
          200: '#bcdcff',
          300: '#8ec6ff',
          400: '#58a5ff',
          500: '#2d82ff',
          600: '#1664f0',
          700: '#114fcc',
          800: '#1342a3',
          900: '#143b80'
        }
      }
    }
  },
  plugins: []
};
