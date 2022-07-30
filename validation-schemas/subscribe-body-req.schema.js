import { HttpResponseMessage } from "../utils/enums/enums.js";

const subscribeBodyReqSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      errorMessage: HttpResponseMessage.WRONG_EMAIL_FORMAT,
    },
  },
  required: ["email"],
  additionalProperties: false,
  errorMessage: {
    type: HttpResponseMessage.NO_EMAIL,
    required: {
      email: HttpResponseMessage.NO_EMAIL,
    },
  },
};

export { subscribeBodyReqSchema };
