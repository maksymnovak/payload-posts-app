import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "#111113",
      },
    },
  },
  plugins: [],
};

export default config
