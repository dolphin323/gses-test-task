import { ApiController } from "./api.controller.js";
import { emailService, currencyService } from "../services/services.js";

const apiController = new ApiController(emailService, currencyService);

export { apiController };
