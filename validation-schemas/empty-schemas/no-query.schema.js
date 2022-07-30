import { ExceptionMessage } from "../../utils/enums/enums.js";

const noQuerySchema = {
  properties: {},
  required: [],
  additionalProperties: false,
  errorMessage: ExceptionMessage.SHOULDNT_HAVE_QUERY,
};

export { noQuerySchema };
