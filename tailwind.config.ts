// Example `tailwind.config.js` file
import type { Config } from "tailwindcss";

const config: Config & { daisyui?: any; safelist?: any[] } = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  darkMode: "class",
  daisyui: {
    themes: ["light"], // Force uniquement le thème light
    darkTheme: "light", // Même en mode sombre, utilise le thème light
  },
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
  safelist: [
    // Safelister des classes spécifiques
    "bg-warning/30",
    "bg-warning/10",
    "border-warning/10",
    "border-warning/20",
    "bg-neutral/10",
    "bg-neutral/30",
    "bg-base-200",
    "bg-primary/5",
    "bg-primary/30",
    "bg-success/15",
    "bg-success/5",
    "from-red-100",
    "to-red-200",
    "from-blue-100",
    "to-blue-200",
    "from-amber-100",
    "to-amber-200",
    "from-pink-100",
    "to-pink-200",
    "from-emerald-100",
    "to-emerald-200",
    "border-base-300/50",
    "border-emerald-200",
    "-left-8",
    "left-3",
    "top-3",
    "bottom-3",
    "border-2",
    "w-px",

    // Ou utiliser un pattern pour plusieurs variantes
    {
      pattern: /bg-(warning|error|success|info)\/(10|20|30|40|50)/,
      variants: ["hover", "focus"],
    },
  ],
  // variants: {
  //   darkMode: "class",
  //   extend: {
  //     borderColor: ["focus-visible"],
  //     opacity: ["disabled"],
  //   },
  // },
};

export default config;
