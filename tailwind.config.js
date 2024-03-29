/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        myblue: "#3f3a65",
      },
      translate: {
        100: "100%",
      },
    },
  },
  plugins: [],
};
