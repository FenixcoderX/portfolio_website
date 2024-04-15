/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'calc(100vh-5rem)': 'calc(100vh-5rem)',
      },
      colors: {
        'color-1': '#878a8f', //gray
        'color-2': '#cfd0d2', //light gray
        'color-3': '#0f141e', //black
      },
      // colors: {
      //   'color-1': '#F4B940', //orange
      //   'color-2': '#F4C360', //light orange
      //   'color-3': '#EAE7DC', //white
      // },

      letterSpacing: {
        widest: '.4em',
        wide: '.2em',
      }
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
}

