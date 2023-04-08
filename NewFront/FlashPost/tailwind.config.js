/** @type {import('tailwindcss').Config} */
export default{
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B3954',
        secondary: "#D2F5FF"
      //  secondary: '#FF7F50',
      },
    },
  },
  plugins: [],
}
