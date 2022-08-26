import { FilePath, ENV } from "../utils/enums/enums.js";
import {
  HttpRepository,
  JsonStorageRepository,
  SgMailRepository,
} from "./../repositories/repositories.js";
import { EmailService } from "./email.service.js";
import { CurrencyService } from "./currency.service.js";

const emailService = new EmailService(
  new JsonStorageRepository(FilePath.emailsFile),
  new SgMailRepository(ENV.SENDGRID.API_KEY)
);

const currencyService = new CurrencyService(new HttpRepository());

export { emailService, currencyService };
