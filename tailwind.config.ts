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
