const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1280,
  projectId: 'pefcjb',
  e2e: {
    baseUrl: 'https://nextjs-cypress-j6ls5tggc-muratkeremozcan.vercel.app/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
