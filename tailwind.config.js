"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("tailwindcss/colors");
var config = {
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
            colors: {},
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
exports.default = config;
