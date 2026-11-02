const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Retorna { valido, erros } para a asserção mostrar o que quebrou no contrato
function validarContrato(schema, dados) {
  const validate = ajv.compile(schema);
  const valido = validate(dados);
  const erros = (validate.errors || []).map(
    (e) => `${e.instancePath || "/"} ${e.message}`
  );
  return { valido, erros };
}

module.exports = { validarContrato };
