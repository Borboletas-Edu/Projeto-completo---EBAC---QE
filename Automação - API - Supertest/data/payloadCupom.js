const { randomUUID } = require("crypto");

function gerarCodigoCupom(prefixo = "TesteSupertest") {
  return `${prefixo}-${randomUUID().slice(0, 8)}`;
}

function criarPayloadCupom(codigo, quantidade, tipoDesconto, descricao) {
  return {
    code: codigo,
    amount: quantidade,
    discount_type: tipoDesconto,
    description: descricao
  };
}

// Funções (e não constantes) para gerar um código novo a cada uso e evitar colisão
const payloadValido = () =>
  criarPayloadCupom(gerarCodigoCupom(), "10.00", "fixed_product", "Cupom de teste");

const payloadSemCodigo = () =>
  criarPayloadCupom("", "10.00", "fixed_product", "Cupom de teste");

const payloadValorNegativo = () =>
  criarPayloadCupom(gerarCodigoCupom(), "-10.00", "fixed_product", "Cupom de teste");

const payloadSemTipo = () =>
  criarPayloadCupom(gerarCodigoCupom(), "10.00", "", "Cupom de teste");

const payloadTipoInvalido = () =>
  criarPayloadCupom(gerarCodigoCupom(), "10.00", "tipo_inexistente", "Cupom de teste");

const payloadSemDescricao = () =>
  criarPayloadCupom(gerarCodigoCupom(), "10.00", "fixed_product", "");

module.exports = {
  gerarCodigoCupom,
  criarPayloadCupom,
  payloadValido,
  payloadSemCodigo,
  payloadValorNegativo,
  payloadSemTipo,
  payloadTipoInvalido,
  payloadSemDescricao
};
