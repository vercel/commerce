/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './icons/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: ['outline-none'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    extend: {
      colors: {
        app: '#ffffff',
        subtle: '#f8f8f8',
        ui: '#f3f3f3',
        'ui-hover': '#ededed',
        'ui-active': '#e8e8e8',
        'ui-separator': '#e2e2e2',
        'ui-border': '#dbdbdb',
        'ui-border-hover': '#c7c7c7',
        solid: '#8f8f8f',
        'solid-hover': '#858585',
        'low-contrast': '#585858',
        'high-contrast': '#333333',
        blue: '#369eff',
        green: '#55b467',
        red: '#ec5d40',
        yellow: '#ffcb47',
        // UI.SHADCN.COM
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))'
      },
      textColor: {
        base: '#333333',
        'low-contrast': '#585858',
        'high-contrast': '#333333'
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        display: ['var(--font-inter-tight)', ...fontFamily.sans]
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-high-contrast)',
            a: {
              textDecoration: 'underline',
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282'
              }
            }
          }
        }
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            };
          }
        },
        {
          values: theme('transitionDelay')
        }
      );
    })
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
};
