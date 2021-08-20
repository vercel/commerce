module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
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
        'primary-light': 'var(--primary-light)',
        'primary-lightest': 'var(--primary-lightest)',

        'info-dark': 'var(--info-dark)',
        'info': 'var(--info)',
        'info-border-line': 'var(--info-border-line)',
        'info-light': 'var(--info-light)',

        'positive-dark': 'var(--positive-dark)',
        'positive': 'var(--positive)',
        'positive-border-line': 'var(--positive-border-line)',
        'positive-light': 'var(--positive-light)',

        'warning-dark': 'var(--warning-dark)',
        'warning': 'var(--warning)',
        'warning-border-line': 'var(--warning-border-line)',
        'warning-light': 'var(--warning-light)',

        'negative-dark': 'var(--negative-dark)',
        'negative': 'var(--negative)',
        'negative-border-line': 'var(--negative-border-line)',
        'negative-light': 'var(--negative-light)',

        'line': 'var(--border-line)',
        'background': 'var(--background)',
        'white': 'var(--white)',

        'background-arrow':'var(--background-arrow)',

        // @deprecated (NOT use these variables)
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accent-0': 'var(--accent-0)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        'accent-9': 'var(--accent-9)',
        violet: 'var(--violet)',
        'violet-light': 'var(--violet-light)',
        'violet-dark': 'var(--violet-dark)',
        pink: 'var(--pink)',
        'pink-light': 'var(--pink-light)',
        cyan: 'var(--cyan)',
        blue: 'var(--blue)',
        green: 'var(--green)',
        red: 'var(--red)',
      },
      textColor: {
        base: 'var(--text-base)',
        active: 'var(--text-active)',
        label: 'var(--text-label)',
        placeholder: 'var(--text-placeholder)',
        
        // @deprecated (NOT use these variables)
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accent-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      fontSize: {
        base: ['1.6rem', '2.4rem'],
      },
      borderRadius: {
        rounded: '.8rem',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      caroucel:{
        "arrow-height":"64px"
      }
    },
  },
  plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')]
}
