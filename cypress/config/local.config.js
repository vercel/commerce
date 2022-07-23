const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1280,
  projectId: 'pefcjb',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
