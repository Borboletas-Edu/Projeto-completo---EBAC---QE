const cupomApi = require("../../utils/cupomApi");
const { validarContrato } = require("../../utils/validarContrato");
const { cupomSchema, listaCuponsSchema } = require("../../contracts/cupomSchema");
const { erroSchema } = require("../../contracts/erroSchema");
const { payloadValido } = require("../../data/payloadCupom");

describe("GET /wc/v3/coupons", () => {
  let cupomCriado;

  // Cria um cupom próprio para a busca por ID não depender de dados pré-existentes
  beforeAll(async () => {
    const res = await cupomApi.cadastrar(payloadValido());
    cupomCriado = res.body;
  });

  test("deve listar todos os cupons cadastrados e respeitar o contrato", async () => {
    const res = await cupomApi.listar({ per_page: 5 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const { valido, erros } = validarContrato(listaCuponsSchema, res.body);
    expect(erros).toEqual([]);
    expect(valido).toBe(true);
  });

  test("deve listar o cupom buscando por ID válido e respeitar o contrato", async () => {
    const res = await cupomApi.buscarPorId(cupomCriado.id);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(cupomCriado.id);
    expect(res.body.code).toBe(cupomCriado.code);

    const { valido, erros } = validarContrato(cupomSchema, res.body);
    expect(erros).toEqual([]);
    expect(valido).toBe(true);
  });

  test("deve retornar 404 ao buscar cupom com ID inexistente", async () => {
    const res = await cupomApi.buscarPorId(999999999);

    expect(res.status).toBe(404);
    expect(res.body.code).toBe("woocommerce_rest_shop_coupon_invalid_id");

    const { valido, erros } = validarContrato(erroSchema, res.body);
    expect(erros).toEqual([]);
    expect(valido).toBe(true);
  });

  test("deve retornar 401 ao listar cupons sem autenticação", async () => {
    const res = await cupomApi.listarSemAutenticacao();

    expect(res.status).toBe(401);
    expect(res.body.code).toBe("woocommerce_rest_cannot_view");

    const { valido, erros } = validarContrato(erroSchema, res.body);
    expect(erros).toEqual([]);
    expect(valido).toBe(true);
  });
});
