module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-4': '#888',
        violet: '#7928CA',
        pink: '#FF0080',
        cyan: '#50E3C2',
        blue: '#0070F3',
        green: '#37B679',
        red: '#DA3C3C',
        primary: '#000',
        textColor: {
          primary: '#FFF',
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
  experimental: {
    applyComplexClasses: true,
  },
}
