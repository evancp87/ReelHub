/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        red: "#FC4747",
        white: "#ffffff",
        black: "#10141E",
        darkBlue: "#161D2F",
        lightBlue: "#FC4747",
      },
      fontSizes: {
        largeHeading: "32px",
        mediumHeading: "24px",
        smallHeading: "24px",
        extraSmallHeading: "18px",
        bodyMedium: "15px",
        bodySmall: "13px",
      },
    },
  },
  plugins: [require("daisyui")],
};
