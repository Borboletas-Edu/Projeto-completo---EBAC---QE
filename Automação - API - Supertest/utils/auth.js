const { usuario, senha } = require("../config/env");

function retornaAuth() {
  const credenciais = Buffer.from(`${usuario}:${senha}`).toString("base64");
  return { Authorization: `Basic ${credenciais}` };
}

module.exports = { retornaAuth };
