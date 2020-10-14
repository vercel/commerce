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
        'accents-1': 'var(--accents-1)',
        'accents-2': 'var(--accents-2)',
        'accents-3': 'var(--accents-3)',
        'accents-4': 'var(--accents-4)',
        'accents-5': 'var(--accents-5)',
        'accents-6': 'var(--accents-6)',
        'accents-7': 'var(--accents-7)',
        'accents-8': 'var(--accents-8)',
        violet: '#7928CA',
        pink: '#FF0080',
        cyan: '#50E3C2',
        blue: '#0070F3',
        green: '#37B679',
        red: '#DA3C3C',
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        'primary-accent': 'var(--bg-primary-accent)',
        'primary-hover': 'var(--bg-primary-hover)',
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
