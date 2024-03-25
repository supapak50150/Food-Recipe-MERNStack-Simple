/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryTitle: "",
        primaryContent: "#FFFFFF",
        // primaryContent:"#FFEAD2",
        primaryBg: "#FBF9F1",
        navText: "#2f855a",
        primaryText: "#F6995C",
        secondaryText: "#E5C287",
      },
    },
  },
  plugins: [],
};
