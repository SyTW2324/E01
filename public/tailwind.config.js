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
        neth2: {
          50: "#e0f2f1",
          100: "#b2dfdb",
          200: "#80cbc3",
          300: "#4db6ab",
          400: "#26a699",
          500: "#009687",
          600: "#00897a",
          700: "#00796a",
          800: "#00695b",
          900: "#004d3f"
        }
      }
    },
  },
  plugins: []
}
