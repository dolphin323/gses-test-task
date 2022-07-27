import fetch from "node-fetch";
import {
  ApiPath,
  Currency,
  ENV,
  HttpCode,
  HttpResponseMessage,
  ExceptionMessage,
} from "../utils/enums/enums.js";
import { getMailTemplate, validateEmail } from "../utils/helpers/helpers.js";

const initApi = (
  fastify,
  { services: { emailService, currencyService } },
  done
) => {
  fastify
    .get(ApiPath.RATE, async (req, res) => {
      const rateData = await currencyService.getRate({});
      res.status(HttpCode.OK).send(rateData[Currency.UAH]);
      return;
    })
    .post(ApiPath.SUBSCRIBE, async (req, res) => {
      const email = req.body.email;
      if (!validateEmail(email)) {
        res
          .status(HttpCode.BAD_REQUEST)
          .send(HttpResponseMessage.WRONG_EMAIL_FORMAT);
        return;
      }

      try {
        emailService.addEmail(email);
        res.status(HttpCode.OK).send(HttpResponseMessage.EMAIL_ADDED);
      } catch (error) {
        if (error.message === ExceptionMessage.EMAIL_ALREADY_EXISTS) {
          res.status(HttpCode.CONFLICT).send(HttpResponseMessage.EMAIL_EXISTS);
        } else {
          res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
        }
      }
      return;
    })
    .post(ApiPath.SEND_EMAILS, async (req, res) => {
      const rateData = await currencyService.getRate({});
      const mail = getMailTemplate.currentRate(rateData[Currency.UAH]);

      try {
        await emailService.sendMessageToAllEmails(mail);
      } catch (error) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(error);
      }

      res.status(HttpCode.OK).send(HttpResponseMessage.EMAILS_SENT);
      return;
    });

  done();
};

export { initApi };
