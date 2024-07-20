/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#F6CFCF',
        'custom-brown' : '#3E3E3E',
      },
    },
  },
  plugins: [],
};
