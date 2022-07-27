import fetch from "node-fetch";
import { ApiPath } from "../utils/enums/enums.js";

const initApi = (fastify, { controllers: { apiController } }, done) => {
  fastify
    .get(ApiPath.RATE, async (req, res) => {
      await apiController.getRate(req, res);
    })
    .post(ApiPath.SUBSCRIBE, async (req, res) => {
      await apiController.postSubscribe(req, res);
    })
    .post(ApiPath.SEND_EMAILS, async (req, res) => {
      await apiController.postSendEmails(req, res);
    });

  done();
};

export { initApi };
