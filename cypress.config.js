//import axios from 'axios'
const axios = require('axios')

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
    viewportHeight: 1000,
    viewportWidth: 1280,
  },
})
