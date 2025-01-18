import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white2: "#FAF8F4",
        primary1: "#FF3402",
        primary2: "#C62802",
        black1: "#262626",
        list1: "#FEA28B",
        list2: "#DEF258",
        list3: "#C9BDFD",
        list4: "#72FFC9",
      },
    },
  },
  plugins: [],
} satisfies Config;
