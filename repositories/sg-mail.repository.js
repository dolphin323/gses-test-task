import sgMail from "@sendgrid/mail";

class SgMailRepository {
  constructor(API_KEY) {
    sgMail.setApiKey(API_KEY);
  }

  async sendMessage(data) {
    try {
      await sgMail.send(data);
    } catch (error) {
      throw {
        code: error.code,
        message: new Error(error.message),
      };
    }
  }
}

export { SgMailRepository };
