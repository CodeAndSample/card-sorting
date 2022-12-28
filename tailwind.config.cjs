// update theme https://daisyui.com/docs/themes/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui") ],
  daisyui: {
    themes: [ "light" ],
    
  },
}
