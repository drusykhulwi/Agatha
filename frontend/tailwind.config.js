/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f8c8c8',
        'secondary': '#89CFF0'
      },
    },
  },
  plugins: [],
}