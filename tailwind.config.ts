import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          turquoise: '#1AB3B3',
          gold: '#C5A572',
          midnight: '#0E1B1B',
          sand: '#F6EFE7'
        }
      },
      fontFamily: {
        display: ["ui-sans-serif", "system-ui"],
        body: ["ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
}

export default config


