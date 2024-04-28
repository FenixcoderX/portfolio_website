/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xl-custom': ['1.25rem', { lineHeight: '1.5rem' }],
      },
      height: {
        'calc(100vh-5rem)': 'calc(100vh-5rem)',
      },
      // colors: {
      //   'color-1': '#878a8f', //gray
      //   'color-2': '#cfd0d2', //light gray
      //   'color-3': '#0f141e', //black
      //   'color-4': '#0f141e', //black
      // },
      colors: {
        'color-1': '#F4B940', //orange
        'color-2': '#F4C360', //light orange
        'color-3': '#EAE7DC', //white
        'color-4': '#fff', //real white
      },

      letterSpacing: {
        widest: '.4em',
        wide: '.2em',
      }
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
}

