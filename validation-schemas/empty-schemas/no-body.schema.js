import { ExceptionMessage } from "../../utils/enums/enums.js";

const noBodySchema = {
  properties: {},
  required: [],
  additionalProperties: false,
  errorMessage: ExceptionMessage.SHOULDNT_HAVE_BODY,
};

export { noBodySchema };
