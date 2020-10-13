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
      backgroundOpacity: {
        075: '0.75',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#F1F3F5',
        'accent-4': '#888',
        'accent-8': '#111111',
        violet: '#7928CA',
        pink: '#FF0080',
        cyan: '#50E3C2',
        blue: '#0070F3',
        green: '#37B679',
        red: '#DA3C3C',
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        'primary-accent': 'var(--bg-primary-accent)',
        'primary-hover': 'var(--bg-primary-accent)',
      },
      textColor: {
        base: 'var(--text-primary)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
  experimental: {
    applyComplexClasses: true,
  },
}
