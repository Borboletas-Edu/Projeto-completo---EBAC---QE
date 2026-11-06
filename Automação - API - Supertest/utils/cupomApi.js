const request = require("supertest");
const { baseUrl } = require("../config/env");
const { retornaAuth } = require("./auth");

const api = request(baseUrl);
const ENDPOINT = "/wc/v3/coupons";

// Erros de infraestrutura do servidor da loja (nginx sem resposta do PHP), não da API em si.
const ERROS_DE_GATEWAY = [502, 503, 504];
const TENTATIVAS = 3;

/**
 * Repete a requisição quando o servidor responde com erro de gateway.
 * Usado apenas em GET (idempotente): repetir um POST poderia criar o recurso duas vezes.
 */
async function comRetentativa(requisicao) {
  for (let tentativa = 1; ; tentativa++) {
    const res = await requisicao();
    if (!ERROS_DE_GATEWAY.includes(res.status) || tentativa >= TENTATIVAS) {
      return res;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * tentativa));
  }
}

module.exports = {
  listar: (query = {}) =>
    comRetentativa(() => api.get(ENDPOINT).set(retornaAuth()).query(query)),

  buscarPorId: (id) =>
    comRetentativa(() => api.get(`${ENDPOINT}/${id}`).set(retornaAuth())),

  cadastrar: (payload) =>
    api.post(ENDPOINT).set(retornaAuth()).send(payload),

  listarSemAutenticacao: () => comRetentativa(() => api.get(ENDPOINT)),

  cadastrarSemAutenticacao: (payload) => api.post(ENDPOINT).send(payload)
};
