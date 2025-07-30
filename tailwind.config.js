/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./public/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
