import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        min: {
          primary: "#2563eb", // blue-600
          secondary: "#0891b2", // cyan-600
          accent: "#16a34a", // green-600
          neutral: "#111827", // gray-900
          "base-100": "#ffffff",
          "base-200": "#f7f7f8",
          "base-300": "#e5e7eb",
          info: "#0ea5e9",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      {
        "min-dark": {
          primary: "#60a5fa", // blue-400
          secondary: "#22d3ee", // cyan-400
          accent: "#34d399", // green-400
          neutral: "#e5e7eb", // gray-200
          "base-100": "#0b0f19",
          "base-200": "#0f1422",
          "base-300": "#1f2937",
          info: "#38bdf8",
          success: "#4ade80",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
      "light",
      "dark",
    ],
  },
}