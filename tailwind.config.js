module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-1": "#FAFAFA",
        "accent-4": "#888",
        violet: "#7928CA",
        pink: "#FF0080",
        cyan: "#50E3C2",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
  experimental: {
    applyComplexClasses: true,
  },
};
