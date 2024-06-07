/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#00008B',
        'secondary': '#FFFDD0',
      },
      textColor: {
        'primary': '#00008B',
        'secondary': '#FFFDD0',
      },
    },
  },
  plugins: [],
}

