import { emailService, currencyService } from "../services/services.js";
import { ApiController } from "./api.controller.js";

const apiController = new ApiController(emailService, currencyService);

export { apiController };
