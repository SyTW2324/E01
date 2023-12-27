/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        neth: {
          DEFAULT: "#26a699",
          50: "#e9f6f5",
          100: "#d4edeb",
          150: "#bee4e0",
          200: "#a8dbd6",
          250: "#93d3cc",
          300: "#7dcac2",
          350: "#67c1b8",
          400: "#51b8ad",
          450: "#3cafa3",
          500: "#26a699",
          550: "#22958a",
          600: "#1e857a",
          650: "#1b746b",
          700: "#17645c",
          750: "#13534d",
          800: "#0f423d",
          850: "#0b322e",
          900: "#08211f",
          950: "#04110f"
        },
        ruster: "#37474f"
      }
    },
  },
  plugins: []
}
