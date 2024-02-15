const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: [
        {
          fern_green: {
            DEFAULT: '#4b7f52',
            100: '#0f1a11',
            200: '#1e3321',
            300: '#2d4d32',
            400: '#3c6742',
            500: '#4b7f52',
            600: '#65a46d',
            700: '#8bbb92',
            800: '#b2d2b6',
            900: '#d8e8db'
          },
          uranian_blue: {
            DEFAULT: '#a3cef1',
            100: '#0a2b46',
            200: '#15578c',
            300: '#1f82d2',
            400: '#5ca8e7',
            500: '#a3cef1',
            600: '#b4d7f4',
            700: '#c7e1f7',
            800: '#daebf9',
            900: '#ecf5fc'
          },
          hunyadi_yellow: {
            DEFAULT: '#f6bd60',
            100: '#412904',
            200: '#815308',
            300: '#c27c0b',
            400: '#f2a11f',
            500: '#f6bd60',
            600: '#f8ca80',
            700: '#f9d7a0',
            800: '#fbe4bf',
            900: '#fdf2df'
          },
          'tea_rose_(red)': {
            DEFAULT: '#f5cac3',
            100: '#4b150d',
            200: '#962a19',
            300: '#db432c',
            400: '#e88677',
            500: '#f5cac3',
            600: '#f7d4ce',
            700: '#f9deda',
            800: '#fbe9e7',
            900: '#fdf4f3'
          },
          rich_black: {
            DEFAULT: '#001514',
            100: '#000404',
            200: '#000808',
            300: '#000c0c',
            400: '#001010',
            500: '#001514',
            600: '#007670',
            700: '#00d8cd',
            800: '#3bfff5',
            900: '#9dfffa'
          }
        }
      ],
      fontFamily: {
        sans: ['var(--font-geist-sans)']
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
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
  ]
};
