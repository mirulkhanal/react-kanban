/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#734C61',
        'primary-dark': '#5C3F4D',
      },
    },
  },
  variants: {},
  plugins: [],
};
