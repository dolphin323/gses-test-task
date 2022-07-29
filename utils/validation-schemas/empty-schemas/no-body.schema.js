import { ExceptionMessage } from "../../enums/enums.js";

const noBodySchema = {
  properties: {},
  required: [],
  additionalProperties: false,
  errorMessage: ExceptionMessage.SHOULDNT_HAVE_BODY,
};

export { noBodySchema };
