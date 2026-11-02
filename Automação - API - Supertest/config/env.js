require("dotenv").config();

function obrigatoria(nome) {
  const valor = (process.env[nome] || "").trim().replace(/^["']|["']$/g, "");
  if (!valor) {
    throw new Error(`A variável ${nome} não foi definida no .env`);
  }
  return valor;
}

function normalizarBaseUrl(url) {
  const semBarra = url.replace(/\/+$/, "");
  return /^https?:\/\//.test(semBarra) ? semBarra : `http://${semBarra}`;
}

module.exports = {
  baseUrl: normalizarBaseUrl(obrigatoria("BASE_URL")),
  usuario: obrigatoria("USER_EMAIL"),
  senha: obrigatoria("USER_SENHA")
};
