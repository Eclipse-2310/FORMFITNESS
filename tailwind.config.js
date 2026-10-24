/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F4F1EA',
          50: '#FBF9F4',
          100: '#F7F4ED',
          200: '#F4F1EA',
          300: '#EAE5D8',
          400: '#DDD6C4',
        },
        ink: {
          DEFAULT: '#23211D',
          50: '#5A574F',
          100: '#4A4841',
          200: '#3A3831',
          300: '#2E2C26',
          400: '#23211D',
          500: '#1A1814',
        },
        olive: {
          DEFAULT: '#5E6738',
          50: '#8A915C',
          100: '#7A8150',
          200: '#6E7544',
          300: '#5E6738',
          400: '#4F572E',
          500: '#414826',
        },
        clay: {
          DEFAULT: '#B8845C',
          50: '#D4B091',
          100: '#C89E78',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        'prose-ed': '68ch',
        'content': '1200px',
      },
    },
  },
  plugins: [],
};
