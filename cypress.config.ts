import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'mjja77',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1000,
    viewportWidth: 1280,
  },
})
