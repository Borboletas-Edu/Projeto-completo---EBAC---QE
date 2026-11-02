// Contrato do recurso "cupom" retornado por GET /wc/v3/coupons e POST /wc/v3/coupons
const cupomSchema = {
  type: "object",
  required: [
    "id",
    "code",
    "amount",
    "discount_type",
    "description",
    "date_created",
    "date_modified",
    "usage_count",
    "individual_use",
    "product_ids",
    "free_shipping",
    "minimum_amount",
    "maximum_amount",
    "email_restrictions",
    "_links"
  ],
  properties: {
    id: { type: "integer" },
    code: { type: "string", minLength: 1 },
    amount: { type: "string", pattern: "^-?\\d+(\\.\\d+)?$" },
    discount_type: { enum: ["percent", "fixed_cart", "fixed_product"] },
    description: { type: "string" },
    date_created: { type: "string" },
    date_created_gmt: { type: "string" },
    date_modified: { type: "string" },
    date_modified_gmt: { type: "string" },
    date_expires: { type: ["string", "null"] },
    date_expires_gmt: { type: ["string", "null"] },
    usage_count: { type: "integer", minimum: 0 },
    individual_use: { type: "boolean" },
    product_ids: { type: "array", items: { type: "integer" } },
    excluded_product_ids: { type: "array", items: { type: "integer" } },
    usage_limit: { type: ["integer", "null"] },
    usage_limit_per_user: { type: ["integer", "null"] },
    limit_usage_to_x_items: { type: ["integer", "null"] },
    free_shipping: { type: "boolean" },
    product_categories: { type: "array", items: { type: "integer" } },
    excluded_product_categories: { type: "array", items: { type: "integer" } },
    exclude_sale_items: { type: "boolean" },
    minimum_amount: { type: "string" },
    maximum_amount: { type: "string" },
    email_restrictions: { type: "array", items: { type: "string" } },
    used_by: { type: "array" },
    meta_data: { type: "array" },
    _links: { type: "object", required: ["self", "collection"] }
  }
};

const listaCuponsSchema = {
  type: "array",
  items: cupomSchema
};

module.exports = { cupomSchema, listaCuponsSchema };
