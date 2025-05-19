// Example `tailwind.config.js` file
import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js, ts, jsx, tsx, mdx}",
    "./src/components/**/*.{js, ts, jsx, tsx, mdx}",
    "./src/app/**/*.{js, ts, jsx, tsx, mdx}",
  ],
  darkMode: "class",
  theme: {
    darkMode: "class",
    fontFamily: {
      //   sans: ["Graphik", "sans-serif"],
      //   serif: ["Merriweather", "serif"],
    },
    extend: {
      darkMode: "class",
      colors: {
        blue: "#1fb6ff",
        purple: "#7e5bef",
        indigo: "#ffc82c",
        green: "#13ce66",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
      },
    },
  },
  variants: {
    darkMode: "class",
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
};

export default config;
