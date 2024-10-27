/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#3B82F6",
          ".btn": {
            border: "none",
          },
          ".btn-primary": {
            backgroundColor: "#3B82F6",
            fontWeight: "bold",
            color: "#FFFFFF",
          },
          ".btn-primary:hover": {
            backgroundColor: "#2563EB",
          },
        },
      },
    ],
  },
}

