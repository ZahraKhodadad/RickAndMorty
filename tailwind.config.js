/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors:{

    // },
    extend: {
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
        "auto-fit-100": "repeat(auto-fit, minmax(145px, 1fr))",
      },
    },
    screens: {
      sm: "640px",
      md: "740px",
      medium:"880px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
