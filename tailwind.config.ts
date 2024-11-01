import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        color: {
          primary:"#DFF2EB",
          accent:"#7AB2D3",
          secondary:"#4A628A",
          tertiary:"#B9E5E8",
        }

      },
    },
  },
  plugins: [],
};
export default config;
