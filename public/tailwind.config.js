/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        neth: {
          DEFAULT: "#26a69a",
          light: "#44d4c7",
          xdark: "#37474f",
        },
      }
    },
  },
  plugins: []
}
