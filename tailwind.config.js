/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
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
