const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        body: '#1B1B1B',
        'futura-color': '#073B4C',
        'custom-blue': '#0B80A7'
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // add this line if not already present
        futura: ['Futura', 'sans-serif']
      },
      fontSize: {
        base: '1.5rem', // Tailwind's default for 'base' is 1rem, so you can name this size as you prefer
        '2rem': '2rem'
      },
      fontWeight: {
        normal: '400', // Tailwind's default 'normal' is '400'
        extrabold: '800'
      },
      lineHeight: {
        normal: '1.5' // 1.5 is the default value in Tailwind CSS for 'normal', you can adjust if necessary
      },
      letterSpacing: {
        custom: '0.04rem'
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
