module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  testTimeout: 30000,
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports",
        filename: "relatorio-api-cupons.html",
        pageTitle: "Relatório - API de Cupons (Supertest)",
        openReport: false
      }
    ]
  ]
};
