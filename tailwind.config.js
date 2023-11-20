/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        card: "#212121",
        hover: "#3D3D3D",
        secondary: "#AAAAAA",
        tag: "#636363",
      },
    },
  },
  plugins: [],
};
