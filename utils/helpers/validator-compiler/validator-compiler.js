function validatorCompiler(schemaDefinition, ajv) {
  const { schema, method, url, httpPart } = schemaDefinition;

  const validate = ajv.compile(schema);
  return validate;
}

export { validatorCompiler };
