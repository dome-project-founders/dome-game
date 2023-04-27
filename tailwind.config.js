/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'common':'#DCDCDC',
      'uncommon':'#03BB09',
      'rare':'#15B1C6',
      'epic':'#782BFF',
      'legendary':'#FF9A03',
      'mythic':'#B71508',
      'cta':'#784800',
      'beige':'#FFD19C',
      'fond-dark':'#124143',
      'white':'#FFFFFF',
      'fond-bright':"#ADDBB9",
      'black': "#000000",
      'fond-bright':"#ADDBB9",
      'item-bg':"#A2541E",
      'item-border':"#5B3100",
    },
    extend: {},
  },
  plugins: [],
  safelist: [{
    pattern: /border-(common|uncommon|rare|epic|legendary|mythic)/
}

]
}