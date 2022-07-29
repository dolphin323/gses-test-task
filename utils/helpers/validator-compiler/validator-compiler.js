function validatorCompiler(schemaDefinition, ajv) {
  const { schema } = schemaDefinition;

  const validate = ajv.compile(schema);
  return validate;
}

export { validatorCompiler };
