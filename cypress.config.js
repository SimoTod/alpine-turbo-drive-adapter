const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents (on, config) {},
    supportFile: 'tests/bootstrap.js',
    specPattern: 'tests/integration/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'tests/res/turbo'
  }
})
