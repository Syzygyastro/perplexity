import type { Config } from "tailwindcss";

export default {
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
        primary: "#2563EB", // Perplexity's primary blue
        secondary: "#374151", // Neutral gray for text
        accent: "#D1D5DB", // Light gray for borders
      },
    },
  },
  plugins: [],
} satisfies Config;
