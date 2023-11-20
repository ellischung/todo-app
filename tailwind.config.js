/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        card: "#212121",
        hoverCard: "#3D3D3D",
        primary: "#FFFFFF",
        secondary: "#AAAAAA",
      },
    },
  },
  plugins: [],
};
