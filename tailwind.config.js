import { neutral } from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './icons/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}'
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)']
    },
    colors: {
      gray: neutral,
      hotPink: '#FF1966',
      dark: '#111111',
      light: '#FAFAFA',
      violetDark: '#4c2889'
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-100%)' }
      },
      blink: {
        '0%': { opacity: 0.2 },
        '20%': { opacity: 1 },
        '100% ': { opacity: 0.2 }
      }
    },
    animation: {
      fadeIn: 'fadeIn .3s ease-in-out',
      carousel: 'marquee 60s linear infinite',
      blink: 'blink 1.4s both infinite'
    }
  }
};
export const future = {
  hoverOnlyWhenSupported: true
};
export const plugins = [
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
];
