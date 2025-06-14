// Example `tailwind.config.js` file
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js, ts, jsx, tsx, mdx}",
    "./src/components/**/*.{js, ts, jsx, tsx, mdx}",
    "./src/app/**/*.{js, ts, jsx, tsx, mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {},
      keyframes: {
        "bounce-slight": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "bounce-slight": "bounce-slight 2s ease-in-out infinite",
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
