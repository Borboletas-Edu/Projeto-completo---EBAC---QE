const { defineConfig } = require("cypress");
require("dotenv").config();
const { garantirEstoque } = require("./cypress/support/estoqueApi");

const baseUrlEnv = (process.env.BASE_URL || "").trim().replace(/\/+$/, "");
if (!baseUrlEnv) {
  throw new Error("A variável BASE_URL não foi definida (.env ou variável de ambiente).");
}
const baseUrl = /^https?:\/\//.test(baseUrlEnv) ? baseUrlEnv : `http://${baseUrlEnv}`;

module.exports = defineConfig({
  projectId: '868mwt',
  allowCypressEnv: false,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    baseUrl,
    setupNodeEvents(on, config) {
      on("task", {
        // Setup via API do WooCommerce: repõe o estoque das variações usadas nos testes
        garantirEstoque(itens) {
          const usuario = process.env.API_USUARIO;
          const senha = process.env.API_SENHA;
          if (!usuario || !senha) {
            throw new Error("Defina API_USUARIO e API_SENHA (.env ou variável de ambiente) para o setup de estoque.");
          }
          return garantirEstoque({ baseUrl, usuario, senha, itens });
        },
      });
      return config
    },
  },
});
