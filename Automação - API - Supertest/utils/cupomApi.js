const request = require("supertest");
const { baseUrl } = require("../config/env");
const { retornaAuth } = require("./auth");

const api = request(baseUrl);
const ENDPOINT = "/wc/v3/coupons";

module.exports = {
  listar: (query = {}) =>
    api.get(ENDPOINT).set(retornaAuth()).query(query),

  buscarPorId: (id) =>
    api.get(`${ENDPOINT}/${id}`).set(retornaAuth()),

  cadastrar: (payload) =>
    api.post(ENDPOINT).set(retornaAuth()).send(payload),

  listarSemAutenticacao: () => api.get(ENDPOINT),

  cadastrarSemAutenticacao: (payload) => api.post(ENDPOINT).send(payload)
};
