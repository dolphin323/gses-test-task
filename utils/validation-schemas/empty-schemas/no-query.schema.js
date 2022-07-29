import { ExceptionMessage } from "../../enums/enums.js";

const noQuerySchema = {
  properties: {},
  required: [],
  additionalProperties: false,
  errorMessage: ExceptionMessage.SHOULDNT_HAVE_QUERY,
};

export { noQuerySchema };
