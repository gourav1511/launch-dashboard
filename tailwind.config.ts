import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0a1320"
        },
        teal: {
          950: "#052a2b"
        }
      },
      boxShadow: {
        panel: "0 12px 28px rgba(9, 22, 34, 0.08)",
        soft: "0 8px 18px rgba(14, 36, 50, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
