const plugin = require('tailwindcss/plugin');
import { carPartPlanetColor, remanTransmissionColor } from './lib/styles.ts';

const { STORE_PREFIX } = process.env;

const getCustomColors = {
  'car-part-planet': carPartPlanetColor,
  'reman-transmission': remanTransmissionColor
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: getCustomColors[STORE_PREFIX],
      fontFamily: {
        sans: ['var(--font-geist-sans)']
      },
      fontSize: {
        'label-sm': ['0.75rem', { lineHeight: '1rem' }],
        'label-md': ['0.875rem', { lineHeight: '1.25rem' }],
        'label-lg': ['1rem', { lineHeight: '1.5rem' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'heading-lg': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }]
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
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
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
    }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
};
