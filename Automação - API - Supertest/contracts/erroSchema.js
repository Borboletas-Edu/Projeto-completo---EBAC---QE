// Contrato do corpo de erro padrão da REST API do WooCommerce/WordPress
const erroSchema = {
  type: "object",
  required: ["code", "message", "data"],
  properties: {
    code: { type: "string", minLength: 1 },
    message: { type: "string", minLength: 1 },
    data: {
      type: "object",
      required: ["status"],
      properties: {
        status: { type: "integer", minimum: 400, maximum: 599 }
      }
    }
  }
};

module.exports = { erroSchema };
