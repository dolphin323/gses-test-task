import sgMail from "@sendgrid/mail";

class SgMailRepository {
  constructor(API_KEY) {
    sgMail.setApiKey(API_KEY);
  }

  async sendMessage(data) {
    try {
      await sgMail.send(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { SgMailRepository };
