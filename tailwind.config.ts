import type { Config } from "tailwindcss";

// colors taken from design and named with https://chir.ag/projects/name-that-color
const reyaColors = {
  "reya-cod-gray": "#161616",
  "reya-cod-gray-2": "#0F0F0F",
  "reya-mine-shaft": "#222222",
  "reya-mine-shaft-2": "#323232",
  "reya-mine-shaft-3": "#252525",
  "reya-tundora": "#474747",
  "reya-boulder": "#7B7B7B",
  "reya-gray": "#8D8D8D",
  "reya-athens-gray": "#F9F9FA",
  "reya-brink-pink": "#FF6991",
  "reya-carnation-pink": "#FF9FB6",
  "reya-screamin-green": "#4BFF99",
  "reya-screamin-green-2": "#04F06ACC",
} as const;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: reyaColors,
      borderColor: reyaColors,
      fill: reyaColors,
    },
  },
  plugins: [],
} satisfies Config;
