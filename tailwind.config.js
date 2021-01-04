module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: ['outline-none'],
      },
    },
  },
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      colors: {
        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accents-0': 'var(--accents-0)',
        'accents-1': 'var(--accents-1)',
        'accents-2': 'var(--accents-2)',
        'accents-3': 'var(--accents-3)',
        'accents-4': 'var(--accents-4)',
        'accents-5': 'var(--accents-5)',
        'accents-6': 'var(--accents-6)',
        'accents-7': 'var(--accents-7)',
        'accents-8': 'var(--accents-8)',
        'accents-9': 'var(--accents-9)',
        violet: 'var(--violet)',
        'violet-light': 'var(--violet-light)',
        pink: 'var(--pink)',
        cyan: 'var(--cyan)',
        blue: 'var(--blue)',
        green: 'var(--green)',
        red: 'var(--red)',
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        'outline-2': '0 0 0 2px var(--accents-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        120: '1.2',
      },
    },
  },
  plugins: [require('@tailwindcss/ui')],
}
