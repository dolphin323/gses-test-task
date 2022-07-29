import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import {
  ExitCode,
  ENV,
  ExceptionMessage,
  HttpCode,
} from "./utils/enums/enums.js";
import { apiController } from "./controllers/controllers.js";
import { initApi } from "./routes/routes.js";
import { errorHandler, validatorCompiler } from "./utils/helpers/helpers.js";

const ajv = new Ajv({ allErrors: true });

AjvErrors(ajv);
addFormats(ajv);

const app = fastify({
  logger: true,
  ajv: { plugins: [AjvErrors, addFormats] },
});

app.setErrorHandler(errorHandler);

app.setValidatorCompiler(function (schemaDefinition) {
  return validatorCompiler(schemaDefinition, ajv);
});

app.register(cors);

app.register(swagger, {
  routePrefix: "/swagger",
  mode: "static",
  specification: {
    path: "./swagger/swagger.yaml",
  },
  exposeRoute: true,
});

app.register(initApi, {
  controllers: {
    apiController,
  },
  prefix: ENV.APP.API_PATH,
});

app.setNotFoundHandler((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(ExceptionMessage.HANDLER_NOT_FOUND);
});

const start = async () => {
  try {
    await app.listen({ port: ENV.APP.PORT, host: ENV.APP.HOST });
  } catch (error) {
    app.log.error(error);
    process.exit(ExitCode.ERROR);
  }
};

start();
