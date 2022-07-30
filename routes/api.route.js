import { ApiPath } from "../utils/enums/enums.js";
import {
  noBodySchema,
  subscribeBodyReqSchema,
} from "../validation-schemas/validation-schemas.js";

const initApi = (fastify, { controllers: { apiController } }, done) => {
  fastify
    .get(
      ApiPath.RATE,
      { schema: { querystring: noBodySchema } },
      async (req, res) => {
        await apiController.getRate(req, res);
      }
    )
    .post(
      ApiPath.SUBSCRIBE,
      {
        schema: {
          body: subscribeBodyReqSchema,
        },
      },
      async (req, res) => {
        await apiController.postSubscribe(req, res);
      }
    )
    .post(
      ApiPath.SEND_EMAILS,
      { schema: { body: noBodySchema, querystring: noBodySchema } },
      async (req, res) => {
        await apiController.postSendEmails(req, res);
      }
    );

  done();
};

export { initApi };
