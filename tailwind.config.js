/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors:{
        "primary": {
            200: "#0061FF1A",
            300: "#0061FF",
        },
        accent:{
          100: "#FBFBFD",
        },
        "black": {
            DEFAULT: "#000000",
            100: "#BCBE9B",
          200: "#666876",
          300: "#191d31",
        },
        "danger": {
          DEFAULT: "#F75555",
          100: "#FF3B30",
        },
      }
    },
  },
  plugins: [],
}