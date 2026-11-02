const { defineConfig } = require("cypress");
require("dotenv").config();

const baseUrl = (process.env.BASE_URL || "").trim().replace(/\/+$/, "");
if (!baseUrl) {
  throw new Error("A variável BASE_URL não foi definida (.env ou variável de ambiente).");
}

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
    baseUrl: /^https?:\/\//.test(baseUrl) ? baseUrl : `http://${baseUrl}`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
  },
});
