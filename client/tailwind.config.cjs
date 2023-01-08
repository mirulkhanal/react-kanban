/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark-main': '#1D1D1D',
        'primary-dark_sub': '#333333',
        'test-dark-matte': '#1D1D1D',
      },
    },
  },
  variants: {},
  plugins: [],
};
