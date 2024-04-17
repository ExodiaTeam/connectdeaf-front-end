/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#CCE6FF',
          300: '#59B3FF',
          500: '#3D66CC',
        },
        secondary: {
          300: '#FFCC40',
          500: '#FF9919',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      margin: {
        18: '4.5rem',
      },
      padding: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
}
