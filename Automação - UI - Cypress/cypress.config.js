const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '868mwt',
  allowCypressEnv: false,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    overwrite: false,
    html: true,
    json: false
  },

  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },
});
