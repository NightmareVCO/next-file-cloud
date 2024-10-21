import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#2945FA",
              100: "#FBFBFB",
              200: "#D2E1F7",
              300: "#9FBFF4",
              400: "#465EB7",
              500: "#212E57",
            },
            secondary: {
              DEFAULT: "#EFAD29",
              100: "#FDF8E9",
              200: "#F8DE90",
              300: "#EFAD29",
              400: "#C06E0E",
              500: "#7F3F14",
            },
          },
        },
      },
    }),
    tailwindcssAnimate,
  ],
};
export default config;
