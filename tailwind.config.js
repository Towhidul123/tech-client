/** @type {import('tailwindcss').Config} */


const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'text': '#05040c',
      'background': '#ebe7f8',
      'primary': '#ad9de2',
      'secondary': '#541235',
      'accent': '#4a30a1',
     },
     
    extend: {
      fontFamily:{
        cust: ' cursive'
        
      }
    },
  },
  plugins: [require("daisyui")],
});