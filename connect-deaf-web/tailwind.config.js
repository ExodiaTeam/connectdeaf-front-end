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
          50: '#EEF7FF',
          100: '#CCE6FF',
          300: '#59B3FF',
          500: '#3D66CC',
          700: '#E2E8F7',
        },
        secondary: {
          300: '#FFCC40',
          500: '#FF9919',
        },
        disabled: {
          500: '#999999',
          700: '#6C6C6C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'serif'],
      },
      margin: {
        18: '4.5rem',
      },
      padding: {
        18: '4.5rem',
      },
      width: {
        '89': '89%',
      },
    },
  },
  plugins: [],
}
