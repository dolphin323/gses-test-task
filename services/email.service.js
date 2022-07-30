import {
  ExceptionMessage,
  HttpCode,
  SgMailException,
} from "../utils/enums/enums.js";
import { createMail } from "../utils/helpers/helpers.js";

class EmailService {
  constructor(storage, mailRepository) {
    this.storage = storage;
    this.mailRepository = mailRepository;
  }

  getEmails() {
    const emails = this.storage.getItems();

    return emails;
  }

  addEmail(email) {
    if (this.checkIfEmailExists(email)) {
      throw new Error(ExceptionMessage.EMAIL_ALREADY_EXISTS);
    }

    const nextId = this.storage.nextId;
    const newEmailItem = { id: nextId, email };
    this.storage.pushItem(newEmailItem);

    return nextId - 1;
  }

  checkIfEmailExists(email) {
    const emails = this.getEmails();
    const isEmailExists = emails.some((item) => item.email === email);

    return isEmailExists;
  }

  async sendMessageToAllEmails({ html, subject }) {
    const emails = this.getEmails();
    const failedSendingEmails = [];

    await Promise.all(
      emails.map(async (item) => {
        try {
          await this.mailRepository.sendMessage(
            createMail({ html, subject, to: item.email })
          );
        } catch (error) {
          if (error.code === HttpCode.UNAUTHORIZED) {
            throw new Error(SgMailException.UNAUTHORIZED);
          }
          failedSendingEmails.push(item.email);
        }
      })
    );

    if (failedSendingEmails.length === emails.length) {
      throw new Error(ExceptionMessage.BAD_REQUEST);
    }

    return failedSendingEmails;
  }
}

export { EmailService };
