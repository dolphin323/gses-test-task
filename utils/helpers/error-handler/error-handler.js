import { HttpCode } from "../../enums/enums.js";
import { capitalizeString } from "../helpers.js";

function errorHandler(error, request, reply) {
  if (error.validation) {
    const errorMessages = error.validation.map((error) =>
      capitalizeString(error.message)
    );

    reply.status(HttpCode.BAD_REQUEST).send(errorMessages.join(". "));
  }
}

export { errorHandler };
