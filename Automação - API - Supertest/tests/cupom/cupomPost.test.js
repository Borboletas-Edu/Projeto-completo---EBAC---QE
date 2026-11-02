const cupomApi = require("../../utils/cupomApi");
const { validarContrato } = require("../../utils/validarContrato");
const { cupomSchema } = require("../../contracts/cupomSchema");
const { erroSchema } = require("../../contracts/erroSchema");
const {
  payloadValido,
  payloadSemCodigo,
  payloadValorNegativo,
  payloadSemTipo,
  payloadTipoInvalido,
  payloadSemDescricao
} = require("../../data/payloadCupom");

function esperarContrato(schema, corpo) {
  const { valido, erros } = validarContrato(schema, corpo);
  expect(erros).toEqual([]);
  expect(valido).toBe(true);
}

describe("POST /wc/v3/coupons", () => {
  test("deve cadastrar cupom com todos os campos válidos e respeitar o contrato", async () => {
    const payload = payloadValido();
    const res = await cupomApi.cadastrar(payload);

    expect(res.status).toBe(201);
    // A API devolve o código em minúsculas
    expect(res.body.code).toBe(payload.code.toLowerCase());
    expect(res.body.amount).toBe(payload.amount);
    expect(res.body.discount_type).toBe(payload.discount_type);
    expect(res.body.description).toBe(payload.description);
    esperarContrato(cupomSchema, res.body);
  });

  test("deve cadastrar cupom sem descrição (campo opcional)", async () => {
    const res = await cupomApi.cadastrar(payloadSemDescricao());

    expect(res.status).toBe(201);
    expect(res.body.description).toBe("");
    esperarContrato(cupomSchema, res.body);
  });

  test("não deve cadastrar cupom sem código", async () => {
    const res = await cupomApi.cadastrar(payloadSemCodigo());

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("woocommerce_rest_empty_coupon_code");
    esperarContrato(erroSchema, res.body);
  });

  test("não deve cadastrar cupom com valor negativo", async () => {
    const res = await cupomApi.cadastrar(payloadValorNegativo());

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("coupon_invalid_amount");
    esperarContrato(erroSchema, res.body);
  });

  test("não deve cadastrar cupom sem tipo de desconto", async () => {
    const res = await cupomApi.cadastrar(payloadSemTipo());

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("rest_invalid_param");
    expect(res.body.message).toContain("discount_type");
    esperarContrato(erroSchema, res.body);
  });

  test("não deve cadastrar cupom com tipo de desconto inexistente", async () => {
    const res = await cupomApi.cadastrar(payloadTipoInvalido());

    expect(res.status).toBe(400);
    expect(res.body.code).toBe("rest_invalid_param");
    esperarContrato(erroSchema, res.body);
  });

  test("não deve cadastrar cupom com código repetido", async () => {
    const payload = payloadValido();
    const primeiro = await cupomApi.cadastrar(payload);
    const segundo = await cupomApi.cadastrar(payload);

    expect(primeiro.status).toBe(201);
    expect(segundo.status).toBe(400);
    expect(segundo.body.code).toBe("woocommerce_rest_coupon_code_already_exists");
    esperarContrato(erroSchema, segundo.body);
  });

  test("deve retornar 401 ao cadastrar cupom sem autenticação", async () => {
    const res = await cupomApi.cadastrarSemAutenticacao(payloadValido());

    expect(res.status).toBe(401);
    esperarContrato(erroSchema, res.body);
  });
});
