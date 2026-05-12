/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
        "6xl": "2560px",
      },
      colors: {
        "oat-cream": "#EAE7DC",
        "rich-black": "#050505",
        cornflower: "#597FE8",
        "stone-line": "#D7D1BC",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        fraunces: ["Fraunces", "serif"],
      },
      letterSpacing: {
        tightest: "-0.18em",
        "custom-gap": "-0.05em",
      },
    },
  },
  plugins: [],
};
