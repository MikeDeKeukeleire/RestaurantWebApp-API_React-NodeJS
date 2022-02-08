module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      hairline: 100,
      'extra-light': 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
    },
    colors: {
      orange: {
        100: "#FFFAF0",
        200: "#FEEBC8",
        300: "#FBD38D",
        400: "#F6AD55",
        500: "#ED8936",
        600: "#DD6B20",
        700: "#C05621",
        800: "#9C4221",
        900: "#7B341E",
      },
      yellow: {
        100: "#FFFFF0",
        200: "#FEFCBF",
        300: "#FAF089",
        400: "#F6E05E",
        500: "#ECC94B",
        600: "#D69E2E",
        700: "#B7791F",
        800: "#975A16",
        900: "#744210",
      },
      gray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      white: "#FFFFFF",
    },
    extend: {
      gridTemplateColumns: {
        '2': '75% 25%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}