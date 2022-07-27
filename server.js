import fastify from "fastify";
import cors from "@fastify/cors";
import {
  ExitCode,
  ENV,
  ExceptionMessage,
  HttpCode,
} from "./utils/enums/enums.js";
import { emailService, currencyService } from "./services/services.js";
import { initApi } from "./routes/routes.js";

const app = fastify({ logger: true });

app.register(cors);

app.register(initApi, {
  services: {
    emailService,
    currencyService,
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
