import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     "baseUrl": "http://localhost:3000",
     "viewportHeight": 1000,
     "viewportWidth": 1280,
    //  "experimentalStudio": true
  },
});
